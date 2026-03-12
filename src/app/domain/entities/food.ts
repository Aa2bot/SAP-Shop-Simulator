import { AbilityDefinition } from './ability';

export interface Food {
  id: string;
  name: string;
  tier?: number;
  ability?: AbilityDefinition; // foods execute via ability engine
  perkGranted?: string;
  mana?: number;
}
