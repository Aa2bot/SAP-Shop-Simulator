/**
 * Registry of reusable effect handlers. Each ability maps to one entry here.
 */
export class EffectHandlerLibrary {
    constructor() {
        this.handlers = new Map();
    }
    register(effectId, handler) {
        this.handlers.set(effectId, handler);
    }
    has(effectId) {
        return this.handlers.has(effectId);
    }
    run(effectId, ctx) {
        const handler = this.handlers.get(effectId);
        if (!handler) {
            throw new Error(`Missing effect handler: ${effectId}`);
        }
        handler(ctx);
    }
}
