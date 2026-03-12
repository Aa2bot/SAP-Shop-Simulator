import { EventBus } from '../gameplay/event-bus';
import { AbilityEvent } from '../domain/interfaces/ability-event';

/**
 * Minimal UI hooks; replace with real Angular bindings later.
 * Subscribes to ability execution events and calls stub animation hooks.
 */
export class AbilityUiHooks {
  constructor(private bus: EventBus) {}

  init() {
    this.bus.on<AbilityEvent>('ability_executed', (evt) => {
      this.glow(evt.petId);
      if (evt.trigger === 'summon') {
        this.summonAnimation(evt.petId);
      }
      this.refreshIcons();
    });
  }

  glow(petId?: string) {
    // TODO: implement DOM/Angular glow
    void petId;
  }

  summonAnimation(petId?: string) {
    // TODO: implement summon animation
    void petId;
  }

  refreshIcons() {
    // TODO: update mana/toy/perk/ailment icons
  }
}
