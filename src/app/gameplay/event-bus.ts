type EventName = string;
type Listener<T = unknown> = (payload: T) => void;

/**
 * Minimal synchronous event bus. Gameplay actions emit events here; ability engine subscribes.
 * Intentionally framework-agnostic so it can be shared between runtime and tests.
 */
export class EventBus {
  private listeners = new Map<EventName, Set<Listener>>();

  on<T>(event: EventName, listener: Listener<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as Listener);
    return () => this.off(event, listener);
  }

  off<T>(event: EventName, listener: Listener<T>) {
    this.listeners.get(event)?.delete(listener as Listener);
  }

  emit<T>(event: EventName, payload: T) {
    const listeners = this.listeners.get(event);
    if (!listeners?.size) return;
    for (const listener of Array.from(listeners)) {
      listener(payload);
    }
  }
}
