export type AbilityTrigger =
  | 'start_of_turn'
  | 'end_turn'
  | 'roll_shop'
  | 'buy_pet'
  | 'sell_pet'
  | 'buy_food'
  | 'eat_food'
  | 'level_up'
  | 'friend_bought'
  | 'start_of_battle'
  | 'before_attack'
  | 'attack'
  | 'hurt'
  | 'knockout'
  | 'faint'
  | 'friend_faint'
  | 'summon'
  | 'friend_summoned'
  | 'perk_applied'
  | 'ailment_applied'
  | 'toy_break';

export interface AbilityDefinition {
  id: string;
  ownerId: string; // pet id or toy/food id
  trigger: AbilityTrigger;
  effect: string; // effect handler key
  values?: number[]; // level-scaled numeric params
  maxTriggersPerTurn?: number;
  priorityOffset?: number; // tweak ordering within trigger type
}
