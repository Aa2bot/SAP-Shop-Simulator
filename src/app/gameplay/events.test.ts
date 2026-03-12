import { describe, expect, it } from 'vitest';
import { GameEventPayload } from './events';

describe('GameEventPayload typing', () => {
  it('allows standard events', () => {
    const evt: GameEventPayload = { name: 'roll_based_trigger', playerId: 'p1' };
    expect(evt.name).toBe('roll_based_trigger');
  });
});
