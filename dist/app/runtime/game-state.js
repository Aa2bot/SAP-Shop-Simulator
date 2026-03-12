export class GameState {
    constructor() {
        this.player = { pets: [null, null, null, null, null], gold: 10, mana: 0, turn: 1 };
        this.opponent = { pets: [null, null, null, null, null], gold: 10, mana: 0, turn: 1 };
    }
    grantFreeRoll(playerId) {
        // Placeholder: mark a flag on team; legacy UI should consume if wired
        const team = this.getTeam(playerId);
        team.freeRolls = (team.freeRolls ?? 0) + 1;
    }
    resetForBattle() {
        // TODO: clone pets into battle copies, reset temporary stats, trigger caps
    }
    getTeam(playerId) {
        if (playerId === 'opponent')
            return this.opponent;
        return this.player;
    }
    findPetById(id) {
        if (!id)
            return undefined;
        const all = [...this.player.pets, ...this.opponent.pets];
        return all.find((p) => p?.id === id) ?? undefined;
    }
    findPetSlot(id) {
        if (!id)
            return undefined;
        let idx = this.player.pets.findIndex((p) => p?.id === id);
        if (idx >= 0)
            return { team: this.player, index: idx };
        idx = this.opponent.pets.findIndex((p) => p?.id === id);
        if (idx >= 0)
            return { team: this.opponent, index: idx };
        return undefined;
    }
    markPetDead(id) {
        if (!id)
            return;
        const team = [this.player, this.opponent];
        for (const t of team) {
            const idx = t.pets.findIndex((p) => p?.id === id);
            if (idx >= 0) {
                t.pets[idx] = null;
                return;
            }
        }
    }
    summonPet(pet, position = 'after') {
        const team = this.player; // TODO: choose by context; default player
        const slot = position === 'front' ? 0 : team.pets.findIndex((p) => p === null);
        const idx = slot >= 0 ? slot : team.pets.length - 1;
        if (idx >= 0)
            team.pets[idx] = pet;
    }
}
