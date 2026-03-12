import { AbilityDefinition } from '../domain/entities/ability';
import { EffectHandlerLibrary } from '../gameplay/effect-handlers';
import { AbilityQueue } from '../gameplay/ability-queue';
import { AbilityEvent } from '../domain/interfaces/ability-event';

/**
 * Data-driven ability registry. Each pet/food/toy ability registers here.
 */
export class AbilityRegistry {
  private abilities = new Map<string, AbilityDefinition>();

  constructor(
    private effects: EffectHandlerLibrary,
    private queue: AbilityQueue,
  ) {}

  register(def: AbilityDefinition) {
    this.abilities.set(def.id, def);
    if (def.priorityOffset != null) {
      this.queue.setPriority(def.id, def.priorityOffset);
    }
  }

  get(id: string) {
    const ability = this.abilities.get(id);
    if (!ability) throw new Error(`Ability not found: ${id}`);
    return ability;
  }

  list(): AbilityDefinition[] {
    return [...this.abilities.values()];
  }

  trigger(abilityId: string, payload: Omit<AbilityEvent, 'abilityType' | 'execute'>) {
    const ability = this.get(abilityId);
    const execute = (api: unknown) =>
      this.effects.run(ability.effect, {
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
