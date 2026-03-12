import { Food } from '../domain/entities/food';

export class FoodRegistry {
  private foods = new Map<string, Food>();

  register(food: Food) {
    this.foods.set(food.id, food);
  }

  get(id: string) {
    const item = this.foods.get(id);
    if (!item) throw new Error(`Food not found: ${id}`);
    return item;
  }

  list() {
    return [...this.foods.values()];
  }
}
