/**
 * Minimal synchronous event bus. Gameplay actions emit events here; ability engine subscribes.
 * Intentionally framework-agnostic so it can be shared between runtime and tests.
 */
export class EventBus {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(listener);
        return () => this.off(event, listener);
    }
    off(event, listener) {
        this.listeners.get(event)?.delete(listener);
    }
    emit(event, payload) {
        const listeners = this.listeners.get(event);
        if (!listeners?.size)
            return;
        for (const listener of Array.from(listeners)) {
            listener(payload);
        }
    }
}
