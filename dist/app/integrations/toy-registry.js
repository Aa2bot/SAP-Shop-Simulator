export class ToyRegistry {
    constructor() {
        this.toys = new Map();
    }
    register(toy) {
        this.toys.set(toy.id, toy);
    }
    get(id) {
        const toy = this.toys.get(id);
        if (!toy)
            throw new Error(`Toy not found: ${id}`);
        return toy;
    }
}
