import { AbilityDefinition } from './ability';

export interface PetStats {
  attack: number;
  health: number;
}

export interface Pet {
  id: string;
  name: string;
  tier: number;
  level: number;
  base: PetStats;
  current: PetStats;
  perk?: string; // perk id
  ailment?: string; // ailment id
  ability: AbilityDefinition;
  temporary?: {
    attack: number;
    health: number;
  };
}
