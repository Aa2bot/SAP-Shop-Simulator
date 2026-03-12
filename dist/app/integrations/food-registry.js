export class FoodRegistry {
    constructor() {
        this.foods = new Map();
    }
    register(food) {
        this.foods.set(food.id, food);
    }
    get(id) {
        const item = this.foods.get(id);
        if (!item)
            throw new Error(`Food not found: ${id}`);
        return item;
    }
    list() {
        return [...this.foods.values()];
    }
}
