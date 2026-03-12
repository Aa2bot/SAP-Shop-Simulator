export function validateNoNoop(registry) {
    const issues = [];
    for (const ability of registry.list()) {
        if (ability.effect === 'noop') {
            issues.push({ abilityId: ability.id, reason: 'ability effect is noop (placeholder)' });
        }
    }
    return issues;
}
