import { PetRegistry } from '../integrations/pet-registry';
import { FoodRegistry } from '../integrations/food-registry';

export type ShopRoll = {
  pets: string[];
  foods: string[];
};

const TOKEN_IDS = new Set<string>([
  'bee',
  'bus',
  'ram',
  'zombiefly',
  'zombie_fly',
  'zombie-fly',
  'zombiefly',
  'zombie cricket',
  'cricket_token',
  'sheep_token',
  'fly_token',
  'dirty_rat',
  'zombie cricket',
]);

export class ShopService {
  constructor(
    private pets: PetRegistry,
    private foods: FoodRegistry,
  ) {}

  roll(turn: number, petSlots: number, foodSlots: number): ShopRoll {
    const tier = this.tierForTurn(turn);
    const pool = this.pets.list().filter(
      (p) => p.tier <= tier && !TOKEN_IDS.has(p.id.toLowerCase()),
    );
    const foodPool = this.foods.list().filter((f) => (f as any).tier == null || (f as any).tier <= tier);
    return {
      pets: this.sampleIds(pool.map((p) => p.id), petSlots),
      foods: this.sampleIds(foodPool.map((f) => f.id), foodSlots),
    };
  }

  private tierForTurn(turn: number) {
    if (turn <= 2) return 1;
    if (turn <= 4) return 2;
    if (turn <= 6) return 3;
    if (turn <= 8) return 4;
    if (turn <= 10) return 5;
    return 6;
  }

  private sampleIds(ids: string[], count: number) {
    const result: string[] = [];
    const pool = [...ids];
    for (let i = 0; i < count && pool.length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return result;
  }
}
