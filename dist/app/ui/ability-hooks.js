/**
 * Minimal UI hooks; replace with real Angular bindings later.
 * Subscribes to ability execution events and calls stub animation hooks.
 */
export class AbilityUiHooks {
    constructor(bus) {
        this.bus = bus;
    }
    init() {
        this.bus.on('ability_executed', (evt) => {
            this.glow(evt.petId);
            if (evt.trigger === 'summon') {
                this.summonAnimation(evt.petId);
            }
            this.refreshIcons();
        });
    }
    glow(petId) {
        // TODO: implement DOM/Angular glow
        void petId;
    }
    summonAnimation(petId) {
        // TODO: implement summon animation
        void petId;
    }
    refreshIcons() {
        // TODO: update mana/toy/perk/ailment icons
    }
}
