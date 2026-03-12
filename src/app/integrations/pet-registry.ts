import { Pet } from '../domain/entities/pet';

export class PetRegistry {
  private pets = new Map<string, Pet>();

  register(pet: Pet) {
    this.pets.set(pet.id, pet);
  }

  get(id: string) {
    const pet = this.pets.get(id);
    if (!pet) throw new Error(`Pet not found: ${id}`);
    return pet;
  }

  list() {
    return [...this.pets.values()];
  }
}
