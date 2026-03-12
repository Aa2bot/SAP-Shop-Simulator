import { AbilityDefinition } from './ability';

export interface Toy {
  id: string;
  name: string;
  durability: number; // turns left
  ability: AbilityDefinition;
}
