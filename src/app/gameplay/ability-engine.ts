import { AbilityQueue } from './ability-queue';
import { AbilityEvent } from '../domain/interfaces/ability-event';

/**
 * Core ability processing loop modeled after SAP Calculator.
 * Responsible for draining the global queue, executing callbacks,
 * and coordinating post-execution cleanup (removing dead pets, etc.).
 */
export class AbilityEngine {
  private processed = 0;
  private readonly maxEvents = 100000;

  constructor(private queue: AbilityQueue) {}

  process(gameApi: unknown, opts?: { onExecute?: (event: AbilityEvent) => void }) {
    this.processed = 0;
    while (this.queue.hasEvents) {
      const next = this.queue.pop();
      if (!next) break;
      this.processed++;
      if (this.processed > this.maxEvents) {
        throw new Error(
          `Ability cycle overflow (${this.processed}). Last=${next.abilityType}`,
        );
      }
      opts?.onExecute?.(next);
      next.execute(gameApi);
    }
  }
}
