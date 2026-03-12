import { AbilityTrigger } from '../entities/ability';

export interface AbilityEvent {
  abilityType: string; // ability id or trigger label
  trigger: AbilityTrigger;
  priority: number;
  tieBreaker?: number;
  playerId?: string;
  petId?: string;
  payload?: unknown;
  execute: (api: unknown) => void; // TODO: replace unknown with GameAPI when defined
}
