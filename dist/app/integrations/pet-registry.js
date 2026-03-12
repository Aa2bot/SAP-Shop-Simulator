export class PetRegistry {
    constructor() {
        this.pets = new Map();
    }
    register(pet) {
        this.pets.set(pet.id, pet);
    }
    get(id) {
        const pet = this.pets.get(id);
        if (!pet)
            throw new Error(`Pet not found: ${id}`);
        return pet;
    }
    list() {
        return [...this.pets.values()];
    }
}
