import packData from '../../assets/data/pack-data.json';
import { Pet } from '../domain/entities/pet';
import { Food } from '../domain/entities/food';
import { AbilityDefinition, AbilityTrigger } from '../domain/entities/ability';
import { PetRegistry } from './pet-registry';
import { FoodRegistry } from './food-registry';
import { AbilityRegistry } from './ability-registry';
import { EffectHandlerLibrary } from '../gameplay/effect-handlers';
import { PetAbilitySpec, buildAbilityTable } from '../domain/catalog/pets/ability-table';

type PackData = typeof packData;

const TOKEN_NAMES = new Set<string>(['Bee', 'Ram', 'Bus', 'Zombie Fly', 'Dirty Rat', 'Zombie Cricket']);

const triggerKeywords: Record<string, AbilityTrigger> = {
  faint: 'faint',
  'start of battle': 'start_of_battle',
  'start of turn': 'start_of_turn',
  'end turn': 'end_turn',
  'before attack': 'before_attack',
  hurt: 'hurt',
  buy: 'buy_pet',
  sell: 'sell_pet',
  level: 'level_up',
  summon: 'summon',
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function extractTrigger(text: string): AbilityTrigger {
  const lower = text.toLowerCase();
  for (const [key, trigger] of Object.entries(triggerKeywords)) {
    if (lower.includes(key)) return trigger;
  }
  return 'start_of_battle';
}

function extractBuff(text: string) {
  const atkMatch = text.match(/([+-]?\d+)\s*attack/i);
  const hpMatch = text.match(/([+-]?\d+)\s*health/i);
  const atk = atkMatch ? parseInt(atkMatch[1], 10) : 0;
  const hp = hpMatch ? parseInt(hpMatch[1], 10) : 0;
  return { atk, hp };
}

function detectEffect(text: string): { effect: string; values?: number[] } {
  const lower = text.toLowerCase();
  if (lower.includes('summon')) {
    return { effect: 'summon_pet' };
  }
  if (lower.includes('gold')) {
    return { effect: 'gain_gold' };
  }
  if (lower.includes('random friend')) {
    const { atk, hp } = extractBuff(text);
    return { effect: 'buff_random_friend', values: [atk, hp] };
  }
  if (lower.includes('friend') && (lower.includes('attack') || lower.includes('health'))) {
    const { atk, hp } = extractBuff(text);
    return { effect: 'buff_target', values: [atk, hp] };
  }
  return { effect: 'noop' };
}

export function loadCatalogs(
  pets: PetRegistry,
  foods: FoodRegistry,
  abilities: AbilityRegistry,
  effects: EffectHandlerLibrary,
) {
  const abilityTable: PetAbilitySpec[] = buildAbilityTable();
  const data: PackData = packData;
  for (const [packId, pack] of Object.entries(data.packs)) {
    const petList: any[] = Array.isArray((pack as any).pets) ? (pack as any).pets : [];
    for (const petRaw of petList) {
      const id = slugify(petRaw.name);
      const spec = abilityTable.find((a) => a.petId === id);
      const abilityId = spec?.abilityId ?? `${id}_ability`;
      const trigger = spec?.trigger ?? extractTrigger(petRaw.ability?.level1 ?? '');
      const effect = spec?.effect ?? 'noop';
      const values = spec?.values;
      const pet: Pet = {
        id,
        name: petRaw.name,
        tier: petRaw.tier,
        level: 1,
        base: { attack: petRaw.baseAttack, health: petRaw.baseHealth },
        current: { attack: petRaw.baseAttack, health: petRaw.baseHealth },
        ability: {
          id: abilityId,
          ownerId: id,
          trigger,
          effect,
          values,
          maxTriggersPerTurn: spec?.triggerCap,
        },
      };
      pets.register(pet);
      if (pet.ability) abilities.register(pet.ability);
    }

    const foodList: any[] = Array.isArray((pack as any).foods) ? (pack as any).foods : [];
    for (const foodRaw of foodList) {
      const id = slugify(foodRaw.name);
      const abilityText = foodRaw.ability?.level1 ?? foodRaw.effect ?? '';
      const abilityId = `${id}_food`;
      const { effect, values } = detectEffect(abilityText);
      const food: Food = {
        id,
        name: foodRaw.name,
        tier: foodRaw.tier ?? (packId ? Number(packId) : undefined),
        ability: {
          id: abilityId,
          ownerId: id,
          trigger: 'eat_food',
          effect,
          values,
        },
      };
      foods.register(food);
      if (food.ability) abilities.register(food.ability);
    }
  }

  // Register noop to avoid missing handler errors
  if (!effects.has('noop')) {
    effects.register('noop', () => {});
  }
}
