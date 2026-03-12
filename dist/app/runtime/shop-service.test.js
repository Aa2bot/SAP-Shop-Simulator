import { describe, expect, it } from 'vitest';
import { ShopService } from './shop-service';
import { PetRegistry } from '../integrations/pet-registry';
import { FoodRegistry } from '../integrations/food-registry';
function pet(id, tier) {
    return {
        id,
        name: id,
        tier,
        level: 1,
        base: { attack: 1, health: 1 },
        current: { attack: 1, health: 1 },
        ability: { id: `${id}_a`, ownerId: id, trigger: 'start_of_battle', effect: 'noop' },
    };
}
describe('ShopService', () => {
    it('excludes token pets from rolls', () => {
        const pets = new PetRegistry();
        const foods = new FoodRegistry();
        pets.register(pet('bee', 1)); // token
        pets.register(pet('ant', 1));
        const shop = new ShopService(pets, foods);
        const roll = shop.roll(1, 1, 0);
        expect(roll.pets).toEqual(['ant']);
    });
});
