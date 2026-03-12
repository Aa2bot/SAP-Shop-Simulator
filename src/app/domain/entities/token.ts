export interface Token {
  id: string;
  name: string;
  source: string; // pet/ability that spawns it
  expiresAfterBattle?: boolean;
}
