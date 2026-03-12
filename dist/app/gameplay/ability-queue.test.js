import { describe, expect, it } from 'vitest';
import { AbilityQueue } from './ability-queue';
describe('AbilityQueue', () => {
    it('orders by priority table then event priority', () => {
        const queue = new AbilityQueue({ a: 10, b: 5 });
        queue.add({ abilityType: 'b', trigger: 'faint', priority: 1, execute: () => { } });
        queue.add({ abilityType: 'a', trigger: 'faint', priority: 0, execute: () => { } });
        expect(queue.pop().abilityType).toBe('a');
        expect(queue.pop().abilityType).toBe('b');
    });
});
