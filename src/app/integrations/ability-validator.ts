import { AbilityRegistry } from './ability-registry';

export interface AbilityValidationIssue {
  abilityId: string;
  reason: string;
}

export function validateNoNoop(registry: AbilityRegistry): AbilityValidationIssue[] {
  const issues: AbilityValidationIssue[] = [];
  for (const ability of registry.list()) {
    if (ability.effect === 'noop') {
      issues.push({ abilityId: ability.id, reason: 'ability effect is noop (placeholder)' });
    }
  }
  return issues;
}
