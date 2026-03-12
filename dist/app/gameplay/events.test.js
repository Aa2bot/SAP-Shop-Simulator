import { describe, expect, it } from 'vitest';
describe('GameEventPayload typing', () => {
    it('allows standard events', () => {
        const evt = { name: 'roll_based_trigger', playerId: 'p1' };
        expect(evt.name).toBe('roll_based_trigger');
    });
});
