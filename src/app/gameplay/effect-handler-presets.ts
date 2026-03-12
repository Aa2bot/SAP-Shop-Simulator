import { EffectContext, EffectHandlerLibrary } from './effect-handlers';
import { Pet } from '../domain/entities/pet';
import { GameState } from '../runtime/game-state';
import { PetRegistry } from '../integrations/pet-registry';

function pickRandom<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

function buffPet(pet: Pet, atk: number, hp: number, permanent: boolean) {
  if (permanent) {
    pet.base.attack += atk;
    pet.base.health += hp;
  }
  pet.current.attack += atk;
  pet.current.health += hp;
}

export function registerCoreHandlers(lib: EffectHandlerLibrary, petRegistry?: PetRegistry) {
  lib.register('noop', () => {});

  lib.register('buff_target', (ctx: EffectContext) => {
    const { payload, state } = ctx;
    const { petId, atk = 0, hp = 0, permanent = false } =
      (payload as any) ?? {};
    if (!state || !petId) return;
    const game = state as GameState;
    const pet = game.findPetById?.(petId);
    if (pet) buffPet(pet, atk, hp, permanent);
  });

  lib.register('buff_random_friend', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    if (!state) return;
    const game = state as GameState;
    const { playerId, atk = 0, hp = 0, permanent = false } =
      (payload as any) ?? {};
    const team = game.getTeam?.(playerId);
    if (!team) return;
    const choices = team.pets.filter(Boolean) as Pet[];
    const target = pickRandom(choices);
    if (target) buffPet(target, atk, hp, permanent);
  });

  lib.register('buff_team', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    if (!state) return;
    const game = state as GameState;
    const { playerId, atk = 0, hp = 0, permanent = false } =
      (payload as any) ?? {};
    const team = game.getTeam?.(playerId);
    team?.pets.forEach((pet) => {
      if (pet) buffPet(pet, atk, hp, permanent);
    });
  });

  lib.register('deal_damage', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    if (!state) return;
    const { targetId, amount = 0 } = (payload as any) ?? {};
    const game = state as GameState;
    const pet = game.findPetById?.(targetId);
    if (!pet) return;
    pet.current.health -= amount;
    if (pet.current.health <= 0) {
      game.markPetDead?.(targetId);
    }
  });

  lib.register('gain_gold', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    const { playerId, amount = 0 } = (payload as any) ?? {};
    const game = state as GameState;
    const team = game?.getTeam?.(playerId);
    if (team) team.gold += amount;
  });

  lib.register('gain_mana', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    const { playerId, amount = 0 } = (payload as any) ?? {};
    const game = state as GameState;
    const team = game?.getTeam?.(playerId);
    if (team) team.mana += amount;
  });

  lib.register('buff_adjacent_friends', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    if (!state) return;
    const { petId, atk = 0, hp = 0, permanent = false } = (payload as any) ?? {};
    const game = state as GameState;
    const locate = game.findPetSlot?.(petId);
    if (!locate) return;
    const { team, index } = locate;
    const targets = [team.pets[index - 1], team.pets[index + 1]].filter(Boolean) as Pet[];
    targets.forEach((p) => buffPet(p, atk, hp, permanent));
  });

  lib.register('summon_pet', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    if (!state || !petRegistry) return;
    const { summonId, stats, position = 'after' } = (payload as any) ?? {};
    if (!summonId) return;
    const template = petRegistry.get(summonId);
    const summoned: Pet = {
      ...template,
      current: {
        attack: stats?.attack ?? template.base.attack,
        health: stats?.health ?? template.base.health,
      },
      base: {
        attack: stats?.attack ?? template.base.attack,
        health: stats?.health ?? template.base.health,
      },
    };
    (state as GameState).summonPet?.(summoned, position);
  });

  // Special-case handlers (currently minimal; to be expanded with full logic)
  lib.register('copy_ability', (_ctx: EffectContext) => {
    // TODO: copy source ability into target and enqueue
  });

  lib.register('roll_based_trigger_handler', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    const { playerId, bonusGold = 0 } = (payload as any) ?? {};
    const game = state as GameState;
    const team = game?.getTeam?.(playerId);
    if (team && bonusGold) team.gold += bonusGold;
  });

  lib.register('free_roll_handler', (ctx: EffectContext) => {
    const { state, payload } = ctx;
    const game = state as GameState;
    const { playerId } = (payload as any) ?? {};
    game.grantFreeRoll?.(playerId);
  });

  lib.register('toy_break_handler', (_ctx: EffectContext) => {
    // TODO: integrate with toy system durability and UI
  });

  lib.register('trumpet_handler', (_ctx: EffectContext) => {
    // TODO: integrate trumpet economy and summons
  });

  lib.register('perks_ailments_handler', (_ctx: EffectContext) => {
    // TODO: apply/remove perks/ailments via registries
  });

  lib.register('level_scaling_specials', (_ctx: EffectContext) => {
    // TODO: implement level-scaling unique behaviors
  });
}
