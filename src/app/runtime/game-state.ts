import { Pet } from '../domain/entities/pet';
import { Toy } from '../domain/entities/toy';

export interface TeamState {
  pets: (Pet | null)[];
  toy?: Toy;
  gold: number;
  mana: number;
  turn: number;
}

export class GameState {
  player: TeamState = { pets: [null, null, null, null, null], gold: 10, mana: 0, turn: 1 };
  opponent: TeamState = { pets: [null, null, null, null, null], gold: 10, mana: 0, turn: 1 };

  grantFreeRoll(playerId?: string) {
    // Placeholder: mark a flag on team; legacy UI should consume if wired
    const team = this.getTeam(playerId);
    (team as any).freeRolls = ((team as any).freeRolls ?? 0) + 1;
  }

  resetForBattle() {
    // TODO: clone pets into battle copies, reset temporary stats, trigger caps
  }

  getTeam(playerId?: string) {
    if (playerId === 'opponent') return this.opponent;
    return this.player;
  }

  findPetById(id?: string) {
    if (!id) return undefined;
    const all = [...this.player.pets, ...this.opponent.pets];
    return all.find((p) => p?.id === id) ?? undefined;
  }

  findPetSlot(id?: string) {
    if (!id) return undefined;
    let idx = this.player.pets.findIndex((p) => p?.id === id);
    if (idx >= 0) return { team: this.player, index: idx };
    idx = this.opponent.pets.findIndex((p) => p?.id === id);
    if (idx >= 0) return { team: this.opponent, index: idx };
    return undefined;
  }

  markPetDead(id?: string) {
    if (!id) return;
    const team = [this.player, this.opponent];
    for (const t of team) {
      const idx = t.pets.findIndex((p) => p?.id === id);
      if (idx >= 0) {
        t.pets[idx] = null;
        return;
      }
    }
  }

  summonPet(pet: Pet, position: 'after' | 'front' = 'after') {
    const team = this.player; // TODO: choose by context; default player
    const slot = position === 'front' ? 0 : team.pets.findIndex((p) => p === null);
    const idx = slot >= 0 ? slot : team.pets.length - 1;
    if (idx >= 0) team.pets[idx] = pet;
  }
}
