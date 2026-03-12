export class PerkRegistry {
    constructor() {
        this.perks = new Map();
    }
    register(perk) {
        this.perks.set(perk.id, perk);
    }
    get(id) {
        const perk = this.perks.get(id);
        if (!perk)
            throw new Error(`Perk not found: ${id}`);
        return perk;
    }
}
