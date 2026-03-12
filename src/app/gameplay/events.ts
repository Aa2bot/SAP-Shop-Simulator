import { AbilityTrigger } from '../domain/entities/ability';

export type GameEventName =
  | 'roll_shop'
  | 'buy_pet'
  | 'sell_pet'
  | 'start_of_turn'
  | 'end_turn'
  | 'start_of_battle'
  | 'before_attack'
  | 'attack'
  | 'hurt'
  | 'faint'
  | 'friend_faint'
  | 'summon'
  | 'toy_break'
  | 'trumpet'
  | 'perk_applied'
  | 'ailment_applied'
  | 'copy_ability'
  | 'roll_based_trigger';

export interface GameEventPayload {
  name: GameEventName;
  playerId?: string;
  petId?: string;
  data?: any;
}

export interface TriggerBinding {
  trigger: AbilityTrigger;
  abilityId: string;
}
