/**
 * Priority queue for ability events. Mirrors SAP Calculator behavior:
 * - Sorted by trigger priority table (not yet implemented).
 * - Secondary sort on event.priority (higher first).
 * - Tertiary on random tieBreaker for fairness.
 */
export class AbilityQueue {
    constructor(prioritySeed) {
        this.queue = [];
        this.priorityTable = new Map();
        if (prioritySeed) {
            for (const [k, v] of Object.entries(prioritySeed)) {
                this.priorityTable.set(k, v);
            }
        }
    }
    get hasEvents() {
        return this.queue.length > 0;
    }
    snapshot() {
        return [...this.queue];
    }
    setPriority(trigger, priority) {
        this.priorityTable.set(trigger, priority);
    }
    add(event) {
        event.tieBreaker ?? (event.tieBreaker = Math.random());
        const idx = this.findInsertIndex(event);
        this.queue.splice(idx, 0, event);
    }
    pop() {
        return this.queue.shift() ?? null;
    }
    clear() {
        this.queue = [];
    }
    findInsertIndex(event) {
        let left = 0;
        let right = this.queue.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            const cmp = this.compare(event, this.queue[mid]);
            if (cmp < 0) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    }
    compare(a, b) {
        const aPri = this.priorityTable.get(a.abilityType) ?? 0;
        const bPri = this.priorityTable.get(b.abilityType) ?? 0;
        if (aPri !== bPri)
            return bPri - aPri;
        if (a.priority !== b.priority)
            return b.priority - a.priority;
        const aTie = a.tieBreaker ?? 0;
        const bTie = b.tieBreaker ?? 0;
        return aTie - bTie;
    }
}
