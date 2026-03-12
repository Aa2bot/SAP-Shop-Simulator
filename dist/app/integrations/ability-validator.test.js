import { describe, expect, it } from 'vitest';
import { AbilityRegistry } from './ability-registry';
import { EffectHandlerLibrary } from '../gameplay/effect-handlers';
import { AbilityQueue } from '../gameplay/ability-queue';
import { validateNoNoop } from './ability-validator';
describe('ability validator', () => {
    it('flags noop abilities', () => {
        const effects = new EffectHandlerLibrary();
        const queue = new AbilityQueue();
        const registry = new AbilityRegistry(effects, queue);
        registry.register({
            id: 'pet_noop',
            ownerId: 'pet',
            trigger: 'start_of_battle',
            effect: 'noop',
        });
        const issues = validateNoNoop(registry);
        expect(issues.length).toBe(1);
        expect(issues[0].abilityId).toBe('pet_noop');
    });
});
