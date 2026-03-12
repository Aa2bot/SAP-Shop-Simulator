import { Perk } from '../domain/entities/perk';

export class PerkRegistry {
  private perks = new Map<string, Perk>();

  register(perk: Perk) {
    this.perks.set(perk.id, perk);
  }

  get(id: string) {
    const perk = this.perks.get(id);
    if (!perk) throw new Error(`Perk not found: ${id}`);
    return perk;
  }
}
