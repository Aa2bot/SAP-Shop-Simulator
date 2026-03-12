/** @type {import('vitest').UserConfig} */
module.exports = {
  test: {
    include: ['src/**/*.test.ts'],
    pool: 'threads',
    maxWorkers: 1,
  },
};
