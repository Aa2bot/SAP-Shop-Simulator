import packData from '../../../../assets/data/pack-data.json';
import { AbilityTrigger } from '../../entities/ability';

export type TargetType = 'self' | 'adjacent' | 'random_friend' | 'team' | 'opponent' | 'shop_slot' | 'none';

export interface PetAbilitySpec {
  petId: string;
  abilityId: string;
  trigger: AbilityTrigger;
  effect: string;
  values?: number[];
  triggerCap?: number;
  target?: TargetType;
  confidence: 'heuristic' | 'verified';
  rawText: string;
}

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
  roll: 'roll_shop',
  trumpet: 'start_of_battle',
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

function detectEffect(text: string): { effect: string; values?: number[]; target?: TargetType } {
  const lower = text.toLowerCase();
  if (lower.includes('copy')) return { effect: 'copy_ability' };
  if (lower.includes('free roll')) return { effect: 'free_roll_handler' };
  if (lower.includes('roll')) return { effect: 'roll_based_trigger_handler' };
  if (lower.includes('trumpet')) return { effect: 'trumpet_handler' };
  if (lower.includes('toy')) return { effect: 'toy_break_handler' };
  if (lower.includes('perk') || lower.includes('ailment')) return { effect: 'perks_ailments_handler' };
  if (lower.includes('summon')) return { effect: 'summon_pet', target: 'self' };
  if (lower.includes('adjacent')) {
    const { atk, hp } = extractBuff(text);
    return { effect: 'buff_adjacent_friends', values: [atk, hp], target: 'adjacent' };
  }
  if (lower.includes('random friend')) {
    const { atk, hp } = extractBuff(text);
    return { effect: 'buff_random_friend', values: [atk, hp], target: 'random_friend' };
  }
  if (lower.includes('friend') && (lower.includes('attack') || lower.includes('health'))) {
    const { atk, hp } = extractBuff(text);
    return { effect: 'buff_target', values: [atk, hp], target: 'team' };
  }
  return { effect: 'noop', values: undefined, target: 'none' };
}

export function buildAbilityTable(): PetAbilitySpec[] {
  const specs: PetAbilitySpec[] = [];
  const packs = (packData as any).packs ?? {};
  for (const pack of Object.values(packs) as any[]) {
    const pets = Array.isArray(pack?.pets) ? pack.pets : [];
    for (const pet of pets) {
      const petId = slugify(pet.name);
      const abilityText: string = pet?.ability?.level1 ?? '';
      const trigger = extractTrigger(abilityText);
      const detected = detectEffect(abilityText);
      specs.push({
        petId,
        abilityId: `${petId}_ability`,
        trigger,
        effect: detected.effect,
        values: detected.values,
        target: detected.target,
        confidence: detected.effect === 'noop' ? 'heuristic' : 'heuristic',
        rawText: abilityText,
      });
    }
  }
  return specs;
}
