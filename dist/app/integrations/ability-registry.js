/**
 * Data-driven ability registry. Each pet/food/toy ability registers here.
 */
export class AbilityRegistry {
    constructor(effects, queue) {
        this.effects = effects;
        this.queue = queue;
        this.abilities = new Map();
    }
    register(def) {
        this.abilities.set(def.id, def);
        if (def.priorityOffset != null) {
            this.queue.setPriority(def.id, def.priorityOffset);
        }
    }
    get(id) {
        const ability = this.abilities.get(id);
        if (!ability)
            throw new Error(`Ability not found: ${id}`);
        return ability;
    }
    list() {
        return [...this.abilities.values()];
    }
    trigger(abilityId, payload) {
        const ability = this.get(abilityId);
        const execute = (api) => this.effects.run(ability.effect, {
            sourceId: ability.ownerId,
            level: ability.values?.length,
            payload: payload.payload,
            state: api,
        });
        this.queue.add({
            abilityType: abilityId,
            trigger: ability.trigger,
            priority: payload.priority,
            tieBreaker: payload.tieBreaker,
            playerId: payload.playerId,
            petId: payload.petId,
            payload: payload.payload,
            execute,
        });
    }
}
