import { Toy } from '../domain/entities/toy';

export class ToyRegistry {
  private toys = new Map<string, Toy>();

  register(toy: Toy) {
    this.toys.set(toy.id, toy);
  }

  get(id: string) {
    const toy = this.toys.get(id);
    if (!toy) throw new Error(`Toy not found: ${id}`);
    return toy;
  }
}
