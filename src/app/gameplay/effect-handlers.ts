export type EffectContext = {
  sourceId: string;
  level?: number;
  playerId?: string;
  opponentId?: string;
  payload?: unknown;
  state?: any; // TODO: replace with concrete GameState/GameAPI once wired
};

type EffectHandler = (ctx: EffectContext) => void;

/**
 * Registry of reusable effect handlers. Each ability maps to one entry here.
 */
export class EffectHandlerLibrary {
  private handlers = new Map<string, EffectHandler>();

  register(effectId: string, handler: EffectHandler) {
    this.handlers.set(effectId, handler);
  }

  has(effectId: string) {
    return this.handlers.has(effectId);
  }

  run(effectId: string, ctx: EffectContext) {
    const handler = this.handlers.get(effectId);
    if (!handler) {
      throw new Error(`Missing effect handler: ${effectId}`);
    }
    handler(ctx);
  }
}
