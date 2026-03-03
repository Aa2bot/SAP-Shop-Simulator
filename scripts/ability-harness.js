#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PACK_DATA_PATH = path.join(ROOT, 'pack-data.json');
const APP_JS_PATH = path.join(ROOT, 'app.js');
const OUT_DIR = path.join(ROOT, 'reports');
const OUT_JSON = path.join(OUT_DIR, 'ability-harness-report.json');
const OUT_TXT = path.join(OUT_DIR, 'ability-harness-report.txt');

function normalizeName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function readJson(p) {
  const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function readText(p) {
  return fs.readFileSync(p, 'utf8');
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return Object.values(value);
  return [];
}

function parseTrigger(text) {
  const s = String(text || '').trim();
  if (!s) return 'none';
  if (/^Start of turn:/i.test(s)) return 'start_turn';
  if (/^End turn:/i.test(s)) return 'end_turn';
  if (/^Tier 1 friend bought:/i.test(s)) return 'friend_bought_tier1';
  if (/^Buy:/i.test(s)) return 'buy';
  if (/^Sell:/i.test(s)) return 'sell';
  if (/^Level-up:/i.test(s)) return 'level_up';
  if (/^Eats? food:/i.test(s)) return 'food_eat';
  if (/^Friendly ate food:/i.test(s)) return 'food_eat';
  if (/^Food eaten:/i.test(s)) return 'food_eat';
  if (/^Gain perk or ailment:/i.test(s)) return 'gained_perk_or_ailment';
  if (/^Gain perk:/i.test(s)) return 'gained_perk';
  if (/^Friendly gained perk:/i.test(s)) return 'friendly_gained_perk';
  if (/^Friendly gains perk:/i.test(s)) return 'friendly_gained_perk';
  if (/^Friend lost perk:/i.test(s)) return 'friend_lost_perk';
  if (/^Faint:/i.test(s)) return 'faint';
  if (/^Start of battle:/i.test(s)) return 'start_battle';
  if (/^Before first attack:/i.test(s)) return 'before_attack';
  if (/^Before attack:/i.test(s)) return 'before_attack';
  if (/^Before battle:/i.test(s)) return 'before_battle';
  if (/^Hurt:/i.test(s)) return 'hurt';
  if (/^Knock out:/i.test(s)) return 'knock_out';
  if (/^After attack:/i.test(s)) return 'after_attack';
  if (/^Friend ahead attacks:/i.test(s)) return 'friend_ahead_attacks';
  if (/^Friend summoned:/i.test(s)) return 'friend_summoned';
  if (/^Friendly summoned:/i.test(s)) return 'friendly_summoned';
  if (/^Friend sold:/i.test(s)) return 'friend_sold';
  if (/^Friend bought:/i.test(s)) return 'friend_bought';
  if (/^Friendly toy broke:/i.test(s)) return 'friendly_toy_broke';
  if (/^Perks are .* in battle/i.test(s)) return 'passive_battle';
  if (/^Friendly toy repeats/i.test(s)) return 'passive_toy_repeat';
  return 'other';
}

function extractManualHandlerPets(appJs, fnName) {
  const idx = appJs.indexOf(`function ${fnName}(`);
  if (idx < 0) return new Set();
  const nextIdx = appJs.indexOf('\nfunction ', idx + 1);
  const body = appJs.slice(idx, nextIdx < 0 ? appJs.length : nextIdx);
  const set = new Set();
  const rx = /n\s*===\s*'([^']+)'/g;
  let m;
  while ((m = rx.exec(body)) !== null) {
    set.add(normalizeName(m[1]));
  }
  return set;
}

function getAbilityTriples(pet) {
  const a = pet.ability || {};
  return [
    { level: 1, text: String(a.level1 || '').trim() },
    { level: 2, text: String(a.level2 || '').trim() },
    { level: 3, text: String(a.level3 || '').trim() }
  ];
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  if (!fs.existsSync(PACK_DATA_PATH)) {
    console.error(`Missing file: ${PACK_DATA_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(APP_JS_PATH)) {
    console.error(`Missing file: ${APP_JS_PATH}`);
    process.exit(1);
  }

  const packData = readJson(PACK_DATA_PATH);
  const appJs = readText(APP_JS_PATH);

  const startManual = extractManualHandlerPets(appJs, 'executeStartOfTurnAbility');
  const endManual = extractManualHandlerPets(appJs, 'executeEndOfTurnAbility');
  const buyManual = extractManualHandlerPets(appJs, 'triggerBuyAbility');
  const sellManual = extractManualHandlerPets(appJs, 'triggerSellAbility');
  const faintManual = extractManualHandlerPets(appJs, 'triggerFaintAbility');

  const packs = packData.packs || {};
  const bridgePacks = new Set(['1', '2', '3', '4', '5', '6']);

  const rows = [];
  const triggerSummary = new Map();
  const unsupported = [];
  const risky = [];

  Object.keys(packs).forEach((packId) => {
    const pack = packs[packId] || {};
    const pets = toArray(pack.pets);

    pets.forEach((pet) => {
      const petKey = normalizeName(pet.name);
      getAbilityTriples(pet).forEach((entry) => {
        const trigger = parseTrigger(entry.text);
        const base = {
          packId: Number(packId),
          packName: pack.name || `Pack ${packId}`,
          petName: pet.name,
          petKey,
          level: entry.level,
          text: entry.text,
          trigger
        };

        let covered = false;
        let route = 'none';

        if (bridgePacks.has(packId)) {
          if ([
            'start_turn',
            'end_turn',
            'buy',
            'sell',
            'faint',
            'level_up',
            'food_eat',
            'friend_summoned',
            'friendly_summoned',
            'friend_sold',
            'friend_bought',
            'friend_bought_tier1',
            'friend_lost_perk',
            'gained_perk',
            'gained_perk_or_ailment',
            'friendly_gained_perk',
            'friendly_toy_broke',
            'before_attack',
            'after_attack',
            'knock_out',
            'friend_ahead_attacks',
            'start_battle',
            'passive_battle',
            'passive_toy_repeat',
            'hurt'
          ].includes(trigger)) {
            covered = true;
            route = `bridge_${trigger}`;
          } else {
            route = 'bridge_unclassified';
          }
        } else {
          if (trigger === 'start_turn' && startManual.has(petKey)) {
            covered = true;
            route = 'manual_start_turn';
          } else if (trigger === 'end_turn' && endManual.has(petKey)) {
            covered = true;
            route = 'manual_end_turn';
          } else if (trigger === 'buy' && buyManual.has(petKey)) {
            covered = true;
            route = 'manual_buy';
          } else if (trigger === 'sell' && sellManual.has(petKey)) {
            covered = true;
            route = 'manual_sell';
          } else if (trigger === 'faint' && faintManual.has(petKey)) {
            covered = true;
            route = 'manual_faint';
          } else {
            route = 'manual_unclassified';
          }
        }

        const row = {
          ...base,
          covered,
          route
        };
        rows.push(row);

        if (!triggerSummary.has(trigger)) {
          triggerSummary.set(trigger, { total: 0, covered: 0 });
        }
        const t = triggerSummary.get(trigger);
        t.total += 1;
        if (covered) t.covered += 1;

        if (
          !covered &&
          trigger !== 'none' &&
          trigger !== 'start_battle' &&
          trigger !== 'before_battle' &&
          trigger !== 'before_attack' &&
          trigger !== 'after_attack' &&
          trigger !== 'knock_out' &&
          trigger !== 'friend_ahead_attacks'
        ) {
          unsupported.push(row);
        }

        if (bridgePacks.has(packId) && trigger === 'other' && entry.text) {
          risky.push(row);
        }
      });
    });
  });

  // Level-scaling sanity check for all pets: does level text differ across levels?
  const levelScaling = [];
  Object.keys(packs).forEach((packId) => {
    const pack = packs[packId] || {};
    const pets = toArray(pack.pets);
    pets.forEach((pet) => {
      const levels = getAbilityTriples(pet).map((x) => x.text);
      const distinct = new Set(levels.filter(Boolean));
      levelScaling.push({
        packId: Number(packId),
        packName: pack.name || `Pack ${packId}`,
        petName: pet.name,
        hasAbilityText: levels.some(Boolean),
        hasLevelVariance: distinct.size > 1
      });
    });
  });

  const totals = {
    abilityEntries: rows.length,
    coveredEntries: rows.filter((r) => r.covered).length,
    unsupportedEntries: unsupported.length,
    riskyEntries: risky.length
  };

  const report = {
    generatedAt: new Date().toISOString(),
    totals,
    triggerSummary: Object.fromEntries(
      Array.from(triggerSummary.entries()).sort((a, b) => a[0].localeCompare(b[0]))
    ),
    unsupported,
    risky: risky.slice(0, 250),
    levelScaling
  };

  ensureDir(OUT_DIR);
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));

  const lines = [];
  lines.push(`Ability Harness Report`);
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(``);
  lines.push(`Totals`);
  lines.push(`- Ability entries: ${totals.abilityEntries}`);
  lines.push(`- Covered entries: ${totals.coveredEntries}`);
  lines.push(`- Unsupported entries: ${totals.unsupportedEntries}`);
  lines.push(`- Risky bridge entries: ${totals.riskyEntries}`);
  lines.push(``);
  lines.push(`Trigger Summary`);
  Array.from(triggerSummary.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([k, v]) => {
      const pct = v.total ? ((v.covered / v.total) * 100).toFixed(1) : '0.0';
      lines.push(`- ${k}: ${v.covered}/${v.total} (${pct}%)`);
    });
  lines.push(``);
  lines.push(`Top Unsupported (first 50)`);
  unsupported.slice(0, 50).forEach((r) => {
    lines.push(`- P${r.packId} ${r.petName} L${r.level} [${r.trigger}] ${r.text}`);
  });

  fs.writeFileSync(OUT_TXT, `${lines.join('\n')}\n`);

  console.log(`Wrote: ${OUT_JSON}`);
  console.log(`Wrote: ${OUT_TXT}`);
  console.log(`Unsupported entries: ${unsupported.length}`);
  console.log(`Risky bridge entries: ${risky.length}`);
}

main();
