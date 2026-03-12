Key risks / gaps
- Monolithic `app.js` makes engine replacement risky and hard to test.
- No event bus or ability queue; abilities likely mis-modeled vs SAP rules.
- Static pack HTML duplicates data; risks drift and missing content.
- No registries for pets/foods/toys/perks/ailments; token handling absent.
- No automated tests; impossible to verify ability correctness today.
- No build tool or module system; moving to SAP Calculator architecture will require new toolchain and incremental migration plan.
