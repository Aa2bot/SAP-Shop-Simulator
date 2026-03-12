function pickRandom(arr) {
    if (!arr.length)
        return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
}
function buffPet(pet, atk, hp, permanent) {
    if (permanent) {
        pet.base.attack += atk;
        pet.base.health += hp;
    }
    pet.current.attack += atk;
    pet.current.health += hp;
}
export function registerCoreHandlers(lib, petRegistry) {
    lib.register('noop', () => { });
    lib.register('buff_target', (ctx) => {
        const { payload, state } = ctx;
        const { petId, atk = 0, hp = 0, permanent = false } = payload ?? {};
        if (!state || !petId)
            return;
        const game = state;
        const pet = game.findPetById?.(petId);
        if (pet)
            buffPet(pet, atk, hp, permanent);
    });
    lib.register('buff_random_friend', (ctx) => {
        const { state, payload } = ctx;
        if (!state)
            return;
        const game = state;
        const { playerId, atk = 0, hp = 0, permanent = false } = payload ?? {};
        const team = game.getTeam?.(playerId);
        if (!team)
            return;
        const choices = team.pets.filter(Boolean);
        const target = pickRandom(choices);
        if (target)
            buffPet(target, atk, hp, permanent);
    });
    lib.register('buff_team', (ctx) => {
        const { state, payload } = ctx;
        if (!state)
            return;
        const game = state;
        const { playerId, atk = 0, hp = 0, permanent = false } = payload ?? {};
        const team = game.getTeam?.(playerId);
        team?.pets.forEach((pet) => {
            if (pet)
                buffPet(pet, atk, hp, permanent);
        });
    });
    lib.register('deal_damage', (ctx) => {
        const { state, payload } = ctx;
        if (!state)
            return;
        const { targetId, amount = 0 } = payload ?? {};
        const game = state;
        const pet = game.findPetById?.(targetId);
        if (!pet)
            return;
        pet.current.health -= amount;
        if (pet.current.health <= 0) {
            game.markPetDead?.(targetId);
        }
    });
    lib.register('gain_gold', (ctx) => {
        const { state, payload } = ctx;
        const { playerId, amount = 0 } = payload ?? {};
        const game = state;
        const team = game?.getTeam?.(playerId);
        if (team)
            team.gold += amount;
    });
    lib.register('gain_mana', (ctx) => {
        const { state, payload } = ctx;
        const { playerId, amount = 0 } = payload ?? {};
        const game = state;
        const team = game?.getTeam?.(playerId);
        if (team)
            team.mana += amount;
    });
    lib.register('buff_adjacent_friends', (ctx) => {
        const { state, payload } = ctx;
        if (!state)
            return;
        const { petId, atk = 0, hp = 0, permanent = false } = payload ?? {};
        const game = state;
        const locate = game.findPetSlot?.(petId);
        if (!locate)
            return;
        const { team, index } = locate;
        const targets = [team.pets[index - 1], team.pets[index + 1]].filter(Boolean);
        targets.forEach((p) => buffPet(p, atk, hp, permanent));
    });
    lib.register('summon_pet', (ctx) => {
        const { state, payload } = ctx;
        if (!state || !petRegistry)
            return;
        const { summonId, stats, position = 'after' } = payload ?? {};
        if (!summonId)
            return;
        const template = petRegistry.get(summonId);
        const summoned = {
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
        state.summonPet?.(summoned, position);
    });
    // Special-case handlers (currently minimal; to be expanded with full logic)
    lib.register('copy_ability', (_ctx) => {
        // TODO: copy source ability into target and enqueue
    });
    lib.register('roll_based_trigger_handler', (ctx) => {
        const { state, payload } = ctx;
        const { playerId, bonusGold = 0 } = payload ?? {};
        const game = state;
        const team = game?.getTeam?.(playerId);
        if (team && bonusGold)
            team.gold += bonusGold;
    });
    lib.register('free_roll_handler', (ctx) => {
        const { state, payload } = ctx;
        const game = state;
        const { playerId } = payload ?? {};
        game.grantFreeRoll?.(playerId);
    });
    lib.register('toy_break_handler', (_ctx) => {
        // TODO: integrate with toy system durability and UI
    });
    lib.register('trumpet_handler', (_ctx) => {
        // TODO: integrate trumpet economy and summons
    });
    lib.register('perks_ailments_handler', (_ctx) => {
        // TODO: apply/remove perks/ailments via registries
    });
    lib.register('level_scaling_specials', (_ctx) => {
        // TODO: implement level-scaling unique behaviors
    });
}
