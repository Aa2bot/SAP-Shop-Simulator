const START_GOLD = 10;
const BUY_COST = 3;
const ROLL_COST = 1;
const SELL_VALUE = 1;
const BOARD_SIZE = 5;
const PET_SHOP_SIZE = 3;
const FOOD_SHOP_SIZE = 1;
const EXTRA_FOOD_SHOP_SIZE = 5;
const LEVEL_STEPS = [1, 1.5, 2, 2.333, 2.666, 3];
const HEART_ICON = 'assets/sap_textures/Texture2D/Heart.png';
const FIST_ICON = 'assets/sap_textures/Texture2D/Fist.png';
const ICE_ICON = 'assets/sap_textures/Texture2D/Icecube.png';
const UI_SOUNDS = {
  click: 'click',
  freeze: 'freeze',
  unfreeze: 'unfreeze',
  levelup: 'levelup'
};

const ALIASES = {
  penguin: 'africanpenguin',
  sleepingpill: 'pill'
};

const CALCULATOR_BUNDLE_PATH = 'assets/sap-calculator-sim.js';
const CALCULATOR_PACK_BY_APP_ID = {
  1: 'Turtle',
  2: 'Puppy',
  3: 'Star',
  4: 'Golden',
  5: 'Unicorn',
  6: 'Danger'
};
const BATTLE_LOG_LIMIT = 140;

const state = {
  gold: START_GOLD,
  turn: 1,
  phase: 'during',
  foodDiscount: 0,
  nextTurnBonusGold: 0,
  cannedShopPetAtkBuff: 0,
  cannedShopPetHpBuff: 0,
  peachUpgradeBonus: 0,
  lastBattleLost: false,
  board: Array(BOARD_SIZE).fill(null),
  boardSelectedIndex: null,
  shopPets: Array.from({ length: PET_SHOP_SIZE }, () => ({ item: null, frozen: false })),
  shopFoods: Array.from({ length: FOOD_SHOP_SIZE }, () => ({ item: null, frozen: false })),
  extraShopFoods: Array.from({ length: EXTRA_FOOD_SHOP_SIZE }, () => ({ item: null, frozen: false })),
  textureLookup: {},
  soundLookup: {},
  spriteTxtPath: '',
  currentPackId: 1,
  packs: {},
  currentPool: {
    pets: [],
    foods: []
  },
  wallpapers: [],
  pendingTierUp: null,
  pendingTierUpQueue: [],
  calculatorSim: null,
  toyCatalog: [],
  playerToy: null,
  playerToyLevel: 1,
  battleReport: null,
  battlePlaybackSkip: false,
  battleInProgress: false,
  textureAudit: null,
  rollsThisTurn: 0,
  forcedToyName: null,
  forcedToyLevel: 1
};

const goldValue = document.getElementById('goldValue');
const turnValue = document.getElementById('turnValue');
const boardSlots = document.getElementById('boardSlots');
const petSlots = document.getElementById('petSlots');
const foodSlots = document.getElementById('foodSlots');
const extraFoodSlots = document.getElementById('extraFoodSlots');
const rollBtn = document.getElementById('rollBtn');
const restartBtn = document.getElementById('restartBtn');
const endTurnBtn = document.getElementById('endTurnBtn');
const statusText = document.getElementById('statusText');
const packSelect = document.getElementById('packSelect');
const playerToyInput = document.getElementById('playerToyInput');
const playerToyLevelInput = document.getElementById('playerToyLevelInput');
const tierUpInline = document.getElementById('tierUpInline');
const tierUpText = document.getElementById('tierUpText');
const tierUpChoices = document.getElementById('tierUpChoices');
const tierUpSkipBtn = document.getElementById('tierUpSkipBtn');
const hoverTooltip = document.getElementById('hoverTooltip');
const battleSummary = document.getElementById('battleSummary');
const battleLog = document.getElementById('battleLog');
const battleScreen = document.getElementById('battleScreen');
const battlePlayerSlots = document.getElementById('battlePlayerSlots');
const battleOpponentSlots = document.getElementById('battleOpponentSlots');
const battleSceneEvent = document.getElementById('battleSceneEvent');
const battleSceneMeta = document.getElementById('battleSceneMeta');
const battleSceneLevels = document.getElementById('battleSceneLevels');
const battleSceneStatus = document.getElementById('battleSceneStatus');
const battleSceneLog = document.getElementById('battleSceneLog');
const battleSkipBtn = document.getElementById('battleSkipBtn');

function normalizeName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveTexture(name) {
  const raw = String(name || '').trim();
  const key = normalizeName(raw);
  const aliasKey = ALIASES[key];
  const direct = state.textureLookup[key] || (aliasKey ? state.textureLookup[aliasKey] : null);
  if (direct) return direct;

  // Battle logs sometimes append perk names to pet names (e.g. "Pig Honey").
  // Fall back to the base pet name so we still render the correct pet texture.
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const drop1 = normalizeName(words.slice(0, -1).join(' '));
    if (state.textureLookup[drop1]) return state.textureLookup[drop1];
    if (words.length > 2) {
      const drop2 = normalizeName(words.slice(0, -2).join(' '));
      if (state.textureLookup[drop2]) return state.textureLookup[drop2];
    }
  }

  return null;
}

function resolveSound(name) {
  const key = normalizeName(name);
  const aliasKey = ALIASES[key];
  return state.soundLookup[key] || (aliasKey ? state.soundLookup[aliasKey] : null) || null;
}

function randFrom(list) {
  return list[Math.floor(Math.random() * list.length)] || null;
}

function pickN(list, count) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const item = randFrom(list);
    if (item) out.push(item);
  }
  return out;
}

function setStatus(msg) {
  statusText.textContent = msg;
  statusText.classList.remove('bump');
  void statusText.offsetWidth;
  statusText.classList.add('bump');
}

function playPetBuySound(name) {
  const src = resolveSound(name);
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = 0.85;
  audio.play().catch(() => {});
}

function playUiSound(key, volume = 0.75) {
  const mapped = UI_SOUNDS[key] || key;
  const src = resolveSound(mapped);
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}

function updateHud() {
  goldValue.textContent = String(state.gold);
  turnValue.textContent = String(state.turn);
}

function stripHtmlToText(raw) {
  if (!raw) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = String(raw);
  return (tmp.textContent || tmp.innerText || '').trim();
}

function renderBattleReport() {
  if (!battleSummary || !battleLog) return;

  if (!state.battleReport) {
    battleSummary.textContent = 'No battle yet.';
    battleLog.textContent = '';
    return;
  }

  const report = state.battleReport;
  const winnerLabel = report.winner === 'player'
    ? 'You win'
    : report.winner === 'opponent'
      ? 'You lose'
      : 'Draw';

  const phaseBits = [];
  if (report.phaseCounts.beforeBattle > 0) phaseBits.push(`before battle x${report.phaseCounts.beforeBattle}`);
  if (report.phaseCounts.startBattle > 0) phaseBits.push(`start of battle x${report.phaseCounts.startBattle}`);
  if (report.phaseCounts.afterStartBattle > 0) phaseBits.push(`after start x${report.phaseCounts.afterStartBattle}`);

  battleSummary.textContent = [
    `Turn ${report.turn}: ${winnerLabel}.`,
    `Opponent pack: ${report.opponentPackName}.`,
    `Your team: ${report.playerTeamNames.join(', ') || 'none'}.`,
    `Enemy team: ${report.opponentTeamNames.join(', ') || 'none'}.`,
    phaseBits.length ? `Phases: ${phaseBits.join(', ')}.` : 'Phases: no phase logs captured.'
  ].join(' ');

  const lines = [];
  report.logs.slice(0, BATTLE_LOG_LIMIT).forEach((entry, i) => {
    const text = stripHtmlToText(entry?.message || '');
    if (!text) return;
    lines.push(`${i + 1}. ${text}`);
  });
  if (report.logs.length > BATTLE_LOG_LIMIT) {
    lines.push(`... (${report.logs.length - BATTLE_LOG_LIMIT} more logs omitted)`);
  }
  battleLog.textContent = lines.join('\n');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBoardSlotElement(idx) {
  if (!boardSlots) return null;
  return boardSlots.querySelector(`[data-board-slot="${idx}"]`);
}

function getBattleSlotElement(side, idx) {
  const container = side === 'opponent' ? battleOpponentSlots : battlePlayerSlots;
  if (!container) return null;
  return container.querySelector(`[data-battle-slot="${idx}"]`);
}

function spawnStatFloat(targetEl, kind, amountOrText) {
  if (!targetEl) return;
  const tag = document.createElement('div');
  tag.className = `stat-float ${kind}`;
  if (kind === 'atk' || kind === 'hp') {
    const icon = document.createElement('img');
    icon.src = kind === 'atk' ? FIST_ICON : HEART_ICON;
    icon.alt = kind === 'atk' ? 'Attack' : 'Health';
    const text = document.createElement('span');
    text.textContent = `+${Number(amountOrText || 0)}`;
    tag.appendChild(icon);
    tag.appendChild(text);
  } else {
    tag.textContent = String(amountOrText || 'Perk');
  }
  targetEl.appendChild(tag);
  setTimeout(() => tag.remove(), 980);
}

function spawnFlyIcon(fromEl, toEl, iconSrc, amount) {
  if (!fromEl || !toEl || !iconSrc) return;
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();
  const token = document.createElement('div');
  token.className = 'fx-fly-icon';
  const icon = document.createElement('img');
  icon.src = iconSrc;
  icon.alt = 'Stat';
  const text = document.createElement('span');
  text.textContent = `+${Number(amount || 0)}`;
  token.appendChild(icon);
  token.appendChild(text);
  token.style.left = `${fromRect.left + fromRect.width / 2}px`;
  token.style.top = `${fromRect.top + fromRect.height / 2}px`;
  document.body.appendChild(token);
  requestAnimationFrame(() => {
    token.style.left = `${toRect.left + toRect.width / 2}px`;
    token.style.top = `${toRect.top + toRect.height / 2}px`;
    token.style.opacity = '0';
  });
  setTimeout(() => token.remove(), 760);
}

function animateBoardStatDelta({
  scope = 'shop',
  side = 'player',
  fromIdx = null,
  fromElement = null,
  toIdx,
  atk = 0,
  hp = 0,
  perkText = ''
}) {
  if (!Number.isInteger(toIdx) || toIdx < 0 || toIdx >= BOARD_SIZE) return;
  const targetEl = scope === 'battle' ? getBattleSlotElement(side, toIdx) : getBoardSlotElement(toIdx);
  if (!targetEl) return;
  const sourceFromIdx = Number.isInteger(fromIdx) && fromIdx >= 0 && fromIdx < BOARD_SIZE
    ? (scope === 'battle' ? getBattleSlotElement(side, fromIdx) : getBoardSlotElement(fromIdx))
    : null;
  const sourceEl = sourceFromIdx || fromElement || (scope === 'battle' ? battleSceneEvent?.parentElement : null);

  if (atk > 0) {
    spawnStatFloat(targetEl, 'atk', atk);
    if (sourceEl && sourceEl !== targetEl) spawnFlyIcon(sourceEl, targetEl, FIST_ICON, atk);
  }
  if (hp > 0) {
    spawnStatFloat(targetEl, 'hp', hp);
    if (sourceEl && sourceEl !== targetEl) spawnFlyIcon(sourceEl, targetEl, HEART_ICON, hp);
  }
  if (perkText) {
    spawnStatFloat(targetEl, 'perk', perkText);
  }
}

function animateSnapshotGains(prevSnapshot, nextSnapshot) {
  const checkSide = (side) => {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const prev = prevSnapshot?.[side]?.[i];
      const next = nextSnapshot?.[side]?.[i];
      if (!prev || !next) continue;
      if (normalizeName(prev.name) !== normalizeName(next.name)) continue;
      const atkGain = Math.max(0, Number(next.attack || 0) - Number(prev.attack || 0));
      const hpGain = Math.max(0, Number(next.health || 0) - Number(prev.health || 0));
      if (atkGain || hpGain) {
        animateBoardStatDelta({
          scope: 'battle',
          side,
          toIdx: i,
          atk: atkGain,
          hp: hpGain
        });
      }
    }
  };
  checkSide('player');
  checkSide('opponent');
}

function animatePerkMentions(text, snapshot) {
  if (!snapshot) return;
  const lower = String(text || '').toLowerCase();
  if (!lower.includes('perk')) return;
  const checkSide = (side) => {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const pet = snapshot?.[side]?.[i];
      if (!pet?.name) continue;
      const petName = String(pet.name).toLowerCase();
      if (!petName) continue;
      if (lower.includes(petName)) {
        animateBoardStatDelta({
          scope: 'battle',
          side,
          toIdx: i,
          perkText: 'PERK'
        });
      }
    }
  };
  checkSide('player');
  checkSide('opponent');
}

function pulseAbilityOnElement(el, label = 'Ability') {
  if (!el) return;
  el.classList.remove('ability-pulse');
  void el.offsetWidth;
  el.classList.add('ability-pulse');
  setTimeout(() => el.classList.remove('ability-pulse'), 440);
  spawnStatFloat(el, 'perk', label);
}

function pulseShopAbilityAt(idx, label) {
  const el = getBoardSlotElement(idx);
  pulseAbilityOnElement(el, label);
}

function findSnapshotPetIndexByName(sideArr, name) {
  const key = normalizeName(name);
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = sideArr?.[i];
    if (!pet) continue;
    if (normalizeName(pet.name) === key) return i;
  }
  return -1;
}

function parseAttackLog(text) {
  const m = String(text || '').match(/^(.+?) attacks (.+?) for (\d+)\.?$/i);
  if (!m) return null;
  return {
    attackerName: m[1].trim(),
    defenderName: m[2].trim(),
    damage: Number(m[3] || 0)
  };
}

function animateBattleClash(text, snapshot) {
  const attack = parseAttackLog(text);
  if (!attack || !snapshot) return;

  const playerAtkIdx = findSnapshotPetIndexByName(snapshot.player, attack.attackerName);
  const oppAtkIdx = findSnapshotPetIndexByName(snapshot.opponent, attack.attackerName);
  const playerDefIdx = findSnapshotPetIndexByName(snapshot.player, attack.defenderName);
  const oppDefIdx = findSnapshotPetIndexByName(snapshot.opponent, attack.defenderName);

  let attackerSide = null;
  let attackerIdx = -1;
  let defenderSide = null;
  let defenderIdx = -1;

  if (playerAtkIdx >= 0 && oppDefIdx >= 0) {
    attackerSide = 'player';
    attackerIdx = playerAtkIdx;
    defenderSide = 'opponent';
    defenderIdx = oppDefIdx;
  } else if (oppAtkIdx >= 0 && playerDefIdx >= 0) {
    attackerSide = 'opponent';
    attackerIdx = oppAtkIdx;
    defenderSide = 'player';
    defenderIdx = playerDefIdx;
  } else {
    return;
  }

  const attackerEl = getBattleSlotElement(attackerSide, attackerIdx);
  const defenderEl = getBattleSlotElement(defenderSide, defenderIdx);
  if (!attackerEl || !defenderEl) return;

  attackerEl.classList.remove('clash-player', 'clash-opponent');
  defenderEl.classList.remove('hit-flash');
  void attackerEl.offsetWidth;
  attackerEl.classList.add(attackerSide === 'player' ? 'clash-player' : 'clash-opponent');
  defenderEl.classList.add('hit-flash');
  spawnFlyIcon(attackerEl, defenderEl, FIST_ICON, Math.max(1, attack.damage || 1));
  setTimeout(() => {
    attackerEl.classList.remove('clash-player', 'clash-opponent');
    defenderEl.classList.remove('hit-flash');
  }, 320);
}

function animateBattlePhaseCue(text, snapshot) {
  const msg = String(text || '');
  const lower = msg.toLowerCase();
  let label = '';
  if (lower.includes('phase 1: before battle')) label = 'Before Battle';
  else if (lower.includes('phase 2: start of battle')) label = 'Start Battle';
  else if (lower.includes('phase 3: after start of battle')) label = 'After Start';
  if (!label || !snapshot) return;

  const pulseAll = (side) => {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const pet = snapshot?.[side]?.[i];
      if (!pet) continue;
      const el = getBattleSlotElement(side, i);
      pulseAbilityOnElement(el, label);
    }
  };
  pulseAll('player');
  pulseAll('opponent');
}

function extractBattleSnapshot(rawMessage) {
  const message = String(rawMessage || '');
  if (!message.includes('|')) return null;
  const normalized = message.replace(/<img[^>]*alt="([^"]+)"[^>]*>/gi, '$1 ');
  const parts = normalized.split('|');
  if (parts.length < 2) return null;

  const parseSide = (text, tokenPrefix) => {
    const out = Array(BOARD_SIZE).fill(null);
    const re = new RegExp(`${tokenPrefix}([1-5])\\s+([^()]+?)\\((\\d+)\\/(\\d+)\\)`, 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      const slotNum = Number(m[1]);
      if (!Number.isInteger(slotNum) || slotNum < 1 || slotNum > BOARD_SIZE) continue;
      const parsedName = String(m[2] || '').trim();
      let displayName = parsedName;
      let perkName = '';
      const honeySuffix = parsedName.match(/^(.*?)\s+Honey$/i);
      if (honeySuffix) {
        displayName = honeySuffix[1].trim();
        perkName = 'Honey';
      }
      out[slotNum - 1] = {
        name: displayName,
        attack: Number(m[3]),
        health: Number(m[4]),
        equipment: perkName || null,
        path: resolveTexture(displayName)
      };
    }
    return out;
  };

  return {
    player: parseSide(parts[0], 'P'),
    opponent: parseSide(parts[1], 'O')
  };
}

function renderBattleSceneSlots(container, slots, side = 'player', report = null) {
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = slots[i] || null;
    const el = document.createElement('div');
    el.className = `battle-slot${pet ? '' : ' empty'}`;
    el.dataset.battleSlot = String(i);
    el.dataset.battleSide = side;
    if (!pet) {
      const blank = document.createElement('div');
      blank.className = 'battle-slot-name';
      blank.textContent = 'Empty';
      el.appendChild(blank);
      container.appendChild(el);
      continue;
    }
    const media = renderCardImage(pet);
    const stats = createPetStatsElement({
      baseAttack: pet.attack,
      baseHealth: pet.health,
      tempBuffs: []
    });
    const initial = side === 'opponent' ? report?.opponentInitialPets?.[i] : report?.playerInitialPets?.[i];
    const perkName = typeof pet.equipment === 'string'
      ? pet.equipment
      : (pet.equipment?.name || (typeof initial?.equipment === 'string' ? initial.equipment : (initial?.equipment?.name || '')));
    const perkBadge = createPerkBadgeElement(perkName);
    const name = document.createElement('div');
    name.className = 'battle-slot-name';
    name.textContent = pet.name;
    el.appendChild(media);
    el.appendChild(stats);
    el.appendChild(name);
    if (perkBadge) el.appendChild(perkBadge);
    container.appendChild(el);
  }
}

function showBattleScene(report) {
  if (!battleScreen) return;
  state.battlePlaybackSkip = false;
  battleSceneMeta.textContent = `Turn ${report.turn} | Opponent pack: ${report.opponentPackName}`;
  if (battleSceneLevels) {
    battleSceneLevels.textContent = `Your levels: ${summarizeTeamLevels(report.playerInitialPets) || 'none'} | Opponent levels: ${summarizeTeamLevels(report.opponentInitialPets) || 'none'}`;
  }
  if (battleSceneStatus) {
    const toyLabel = report.playerToy ? `${report.playerToy} (L${report.playerToyLevel || 1})` : 'None';
    battleSceneStatus.textContent = `Toy: ${toyLabel} | Trumpets: You 0 / Opp 0 | Ailments: none`;
  }
  battleSceneEvent.textContent = 'Battle start';
  battleSceneLog.textContent = '';
  renderBattleSceneSlots(battlePlayerSlots, Array(BOARD_SIZE).fill(null), 'player', report);
  renderBattleSceneSlots(battleOpponentSlots, Array(BOARD_SIZE).fill(null), 'opponent', report);
  battleScreen.classList.remove('hidden');
}

function hideBattleScene() {
  if (!battleScreen) return;
  battleScreen.classList.add('hidden');
}

async function playBattleScene(report) {
  if (!battleScreen || !report) return;
  showBattleScene(report);
  const logs = Array.isArray(report.logs) ? report.logs : [];
  let lastSnapshot = null;
  const sceneLines = [];
  let playerTrumpets = 0;
  let opponentTrumpets = 0;
  let lastAilment = '';

  const updateBattleStatusLine = () => {
    if (!battleSceneStatus) return;
    const toyLabel = report.playerToy ? `${report.playerToy} (L${report.playerToyLevel || 1})` : 'None';
    battleSceneStatus.textContent = `Toy: ${toyLabel} | Trumpets: You ${playerTrumpets} / Opp ${opponentTrumpets}${lastAilment ? ` | Ailment: ${lastAilment}` : ''}`;
  };

  for (let i = 0; i < logs.length; i += 1) {
    if (state.battlePlaybackSkip) break;
    const entry = logs[i];
    const text = stripHtmlToText(entry?.message || '');
    if (!text) continue;

    const snap = extractBattleSnapshot(entry?.message || '');
    if (snap) {
      renderBattleSceneSlots(battlePlayerSlots, snap.player, 'player', report);
      renderBattleSceneSlots(battleOpponentSlots, snap.opponent, 'opponent', report);
      if (lastSnapshot) {
        animateSnapshotGains(lastSnapshot, snap);
      }
      lastSnapshot = snap;
    } else {
      battleSceneEvent.textContent = text;
      sceneLines.push(text);
      battleSceneLog.textContent = sceneLines.slice(-14).join('\n');
      animateBattlePhaseCue(text, lastSnapshot);
      animateBattleClash(text, lastSnapshot);
      animatePerkMentions(text, lastSnapshot);

      const gain = text.match(/gained?\s+(\d+)\s+trumpets?/i) || text.match(/gain(?:s)?\s+(\d+)\s+trumpets?/i);
      if (gain) {
        const amount = Number(gain[1] || 0);
        const ownerIdxPlayer = findSnapshotPetIndexByName(lastSnapshot?.player, text.split(' ')[0] || '');
        const ownerIdxOpp = findSnapshotPetIndexByName(lastSnapshot?.opponent, text.split(' ')[0] || '');
        if (ownerIdxPlayer >= 0) {
          playerTrumpets += amount;
          animateBoardStatDelta({ scope: 'battle', side: 'player', toIdx: ownerIdxPlayer, perkText: `+${amount} TRP` });
        } else if (ownerIdxOpp >= 0) {
          opponentTrumpets += amount;
          animateBoardStatDelta({ scope: 'battle', side: 'opponent', toIdx: ownerIdxOpp, perkText: `+${amount} TRP` });
        }
      }
      const spent = text.match(/spent?\s+(\d+)\s+trumpets?/i);
      if (spent) {
        const amount = Number(spent[1] || 0);
        const ownerIdxPlayer = findSnapshotPetIndexByName(lastSnapshot?.player, text.split(' ')[0] || '');
        const ownerIdxOpp = findSnapshotPetIndexByName(lastSnapshot?.opponent, text.split(' ')[0] || '');
        if (ownerIdxPlayer >= 0) {
          playerTrumpets = Math.max(0, playerTrumpets - amount);
        } else if (ownerIdxOpp >= 0) {
          opponentTrumpets = Math.max(0, opponentTrumpets - amount);
        }
      }
      const ailment = inferAilmentFromText(text);
      if (ailment) {
        lastAilment = ailment.toUpperCase();
      }
      updateBattleStatusLine();
    }
    await sleep(440);
  }

  if (!state.battlePlaybackSkip && lastSnapshot) {
    renderBattleSceneSlots(battlePlayerSlots, lastSnapshot.player, 'player', report);
    renderBattleSceneSlots(battleOpponentSlots, lastSnapshot.opponent, 'opponent', report);
  }

  const resultText = report.winner === 'player' ? 'You win this battle.' : report.winner === 'opponent' ? 'You lose this battle.' : 'Battle draw.';
  battleSceneEvent.textContent = resultText;
  await sleep(state.battlePlaybackSkip ? 120 : 900);
  hideBattleScene();
}

function firstEmptyBoardSlot() {
  return state.board.findIndex((x) => x === null);
}

function firstEmptyShopPetSlot() {
  return state.shopPets.findIndex((x) => x.item === null);
}

function maxTierForTurn(turn) {
  if (turn <= 2) return 1;
  if (turn <= 4) return 2;
  if (turn <= 6) return 3;
  if (turn <= 8) return 4;
  if (turn <= 10) return 5;
  return 6;
}

function levelStepToInt(stage) {
  if (stage >= 5) return 3;
  if (stage >= 2) return 2;
  return 1;
}

function getExpFromPet(pet) {
  if (!pet) return 0;
  if (Number.isInteger(pet.exp)) return pet.exp;
  if (Number.isInteger(pet.mergeStage)) return pet.mergeStage;
  return 0;
}

function getPetLevelInt(pet) {
  return pet?.levelInt ?? levelStepToInt(getExpFromPet(pet));
}

function getPetAbilityText(pet, level = getPetLevelInt(pet)) {
  if (!pet || !pet.ability || typeof pet.ability !== 'object') return '';
  const key = level >= 3 ? 'level3' : level >= 2 ? 'level2' : 'level1';
  return String(pet.ability[key] || '').trim();
}

function parseToyChoiceLevelFromAbility(abilityText, fallbackLevel = 1) {
  const text = String(abilityText || '').trim();
  if (!text) return 0;
  const explicit = text.match(/Choose one level\s*(\d)\s+[^.]*toy/i);
  if (explicit) return Math.max(1, Math.min(3, Number(explicit[1])));
  if (/Choose one [^.]*toy/i.test(text)) {
    return Math.max(1, Math.min(3, Number(fallbackLevel || 1)));
  }
  return 0;
}

function parseCountWord(raw) {
  const s = String(raw || '').trim().toLowerCase();
  if (/^\d+$/.test(s)) return Number(s);
  const words = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10
  };
  return words[s] || 0;
}

function parseStockCopyCountFromAbility(abilityText, fallback = 1) {
  const text = String(abilityText || '').trim();
  if (!text) return Math.max(1, Number(fallback || 1));
  const m = text.match(/Stock\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free\s+cop(?:y|ies)/i);
  const n = parseCountWord(m?.[1] || '');
  return n > 0 ? n : Math.max(1, Number(fallback || 1));
}

function extractToyCatalogFromCalculatorSource(source) {
  const start = source.indexOf('var toys_default = [');
  if (start < 0) return [];

  const end = source.indexOf('\n];', start);
  if (end < 0) return [];

  const segment = source.slice(start, end);
  const out = [];
  const seen = new Set();
  const rx = /Name:\s*"([^"]+)"[\s\S]*?Tier:\s*(\d+)/g;
  let m;
  while ((m = rx.exec(segment)) !== null) {
    const name = String(m[1] || '').trim();
    const tierNum = Number(m[2] || 1);
    const tier = Math.max(1, Math.min(6, Number.isFinite(tierNum) ? tierNum : 1));
    const key = normalizeName(name);
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push({ name, tier });
  }
  return out;
}

function renderToyPickerOptions() {
  if (!playerToyInput) return;
  const prior = String(playerToyInput.value || '__auto__');
  const options = ['<option value="__auto__">Auto (ability/random)</option>'];
  const sorted = [...(state.toyCatalog || [])]
    .sort((a, b) => Number(a.tier || 1) - Number(b.tier || 1) || String(a.name).localeCompare(String(b.name)));
  sorted.forEach((toy) => {
    const value = String(toy.name || '').trim();
    if (!value) return;
    options.push(`<option value="${value}">${value} (T${Number(toy.tier || 1)})</option>`);
  });
  playerToyInput.innerHTML = options.join('');
  const hasPrior = Array.from(playerToyInput.options).some((o) => o.value === prior);
  playerToyInput.value = hasPrior ? prior : '__auto__';
}

function getForcedToyChoice() {
  const selected = String(playerToyInput?.value || '__auto__').trim();
  if (!selected || selected === '__auto__') return null;
  const level = Math.max(1, Math.min(3, Number(playerToyLevelInput?.value || 1)));
  return { name: selected, level };
}

function getToyPoolForChooser(toyLevel = 1, abilityText = '') {
  const exactTier = (state.toyCatalog || []).filter((toy) => Number(toy.tier || 1) === Number(toyLevel || 1));
  if (exactTier.length) return exactTier;
  const maxTier = maxTierForTurn(state.turn);
  const available = (state.toyCatalog || []).filter((toy) => Number(toy.tier || 1) <= maxTier);
  return available.length ? available : (state.toyCatalog || []);
}

function promptToyChoice(toyLevel, abilityText, petName, triggerLabel) {
  const forced = getForcedToyChoice();
  if (forced) {
    state.forcedToyName = forced.name;
    state.forcedToyLevel = forced.level;
    state.playerToy = forced.name;
    state.playerToyLevel = forced.level;
    return { name: forced.name, tier: toyLevel };
  }

  const pool = getToyPoolForChooser(toyLevel, abilityText);
  if (!pool.length) return null;

  const lines = pool.map((toy, i) => `${i + 1}. ${toy.name} (T${toy.tier})`).join('\n');
  const msg = [
    `${petName}: choose one level ${toyLevel} toy (${triggerLabel}).`,
    'Enter number from list (or leave blank for random):',
    lines
  ].join('\n');
  const raw = window.prompt(msg, '1');
  if (raw === null) return randFrom(pool);
  const n = Number(raw.trim());
  if (!Number.isInteger(n) || n < 1 || n > pool.length) {
    return randFrom(pool);
  }
  return pool[n - 1];
}

function chooseAutoToy(toyLevel = 1, abilityText = '', options = {}) {
  const interactive = Boolean(options?.interactive);
  const petName = String(options?.petName || 'Pet');
  const triggerLabel = String(options?.triggerLabel || 'ability');
  const forced = getForcedToyChoice();
  if (forced) {
    state.forcedToyName = forced.name;
    state.forcedToyLevel = forced.level;
    state.playerToy = forced.name;
    state.playerToyLevel = forced.level;
    return { name: forced.name, tier: 1 };
  }
  if (!Array.isArray(state.toyCatalog) || !state.toyCatalog.length) return null;
  const pool = getToyPoolForChooser(toyLevel, abilityText);
  const chosen = interactive
    ? (promptToyChoice(toyLevel, abilityText, petName, triggerLabel) || randFrom(pool))
    : randFrom(pool);
  if (!chosen) return null;
  state.playerToy = chosen.name;
  state.playerToyLevel = Math.max(1, Math.min(3, Number(toyLevel || 1)));
  return chosen;
}

function maybeChooseToyFromPetAbility(pet, level = getPetLevelInt(pet), options = {}) {
  const abilityText = getPetAbilityText(pet, level);
  const toyLevel = parseToyChoiceLevelFromAbility(abilityText, level);
  if (!toyLevel) return null;
  const trigger = String(options?.trigger || '').toLowerCase();
  if (trigger === 'start' && !/^Start of turn:/i.test(abilityText)) return null;
  if (trigger === 'buy' && !/^Buy:/i.test(abilityText)) return null;
  if (trigger === 'sell' && !/^Sell:/i.test(abilityText)) return null;
  return chooseAutoToy(toyLevel, abilityText, {
    interactive: Boolean(options?.interactive),
    petName: pet?.name || 'Pet',
    triggerLabel: options?.triggerLabel || 'ability'
  });
}

function hydrateLevelFields(pet, exp) {
  const clamped = Math.max(0, Math.min(exp, 5));
  pet.exp = clamped;
  pet.mergeStage = clamped;
  pet.levelValue = LEVEL_STEPS[clamped];
  pet.levelInt = levelStepToInt(clamped);
  return pet;
}

function createBoardPetFromShopPet(shopPet) {
  return hydrateLevelFields({
    ...shopPet,
    tempBuffs: []
  }, 0);
}

function cloneBoardPet(pet) {
  return {
    ...pet,
    tempBuffs: Array.isArray(pet?.tempBuffs) ? pet.tempBuffs.map((b) => ({ ...b })) : []
  };
}

function getActiveTempBuffTotals(pet) {
  if (!pet || !Array.isArray(pet.tempBuffs)) return { atk: 0, hp: 0 };
  let atk = 0;
  let hp = 0;
  pet.tempBuffs.forEach((buff) => {
    if ((buff?.expiresOnTurn ?? 0) > state.turn) {
      atk += Number(buff.atk || 0);
      hp += Number(buff.hp || 0);
    }
  });
  return { atk, hp };
}

function getPetDisplayAttack(pet) {
  if (!pet) return 0;
  return Math.max(1, Number(pet.baseAttack || 0) + getActiveTempBuffTotals(pet).atk);
}

function getPetDisplayHealth(pet) {
  if (!pet) return 0;
  return Math.max(1, Number(pet.baseHealth || 0) + getActiveTempBuffTotals(pet).hp);
}

function applyTemporaryBuffAt(idx, atk, hp, expiresOnTurn = state.turn + 1, fx = {}) {
  const pet = state.board[idx];
  if (!pet) return;
  if (!Array.isArray(pet.tempBuffs)) pet.tempBuffs = [];
  pet.tempBuffs.push({
    atk: Number(atk || 0),
    hp: Number(hp || 0),
    expiresOnTurn: Number(expiresOnTurn || (state.turn + 1))
  });
  if ((atk || hp || fx.perkText) && !state.battleInProgress) {
    animateBoardStatDelta({
      scope: 'shop',
      fromIdx: Number.isInteger(fx.fromIdx) ? fx.fromIdx : null,
      fromElement: fx.fromElement || null,
      toIdx: idx,
      atk: Math.max(0, Number(atk || 0)),
      hp: Math.max(0, Number(hp || 0)),
      perkText: fx.perkText || ''
    });
  }
}

function clearExpiredTemporaryEffects() {
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = state.board[i];
    if (!pet || !Array.isArray(pet.tempBuffs)) continue;
    pet.tempBuffs = pet.tempBuffs.filter((buff) => (buff?.expiresOnTurn ?? 0) > state.turn);
  }
}

function bumpPetLevelByExp(pet, gainedExp) {
  const next = cloneBoardPet(pet);
  const prevLevelInt = next.levelInt ?? levelStepToInt(getExpFromPet(next));
  const nextExp = Math.min(5, getExpFromPet(next) + gainedExp);
  hydrateLevelFields(next, nextExp);
  return {
    pet: next,
    prevLevelInt,
    newLevelInt: next.levelInt
  };
}

function tooltipTextForPet(pet) {
  const temp = getActiveTempBuffTotals(pet);
  const perk = typeof pet?.equipment === 'string'
    ? pet.equipment
    : (pet?.equipment?.name || '');
  return {
    title: `${pet.name} (Tier ${pet.tier})`,
    atk: `${getPetDisplayAttack(pet)}`,
    hp: `${getPetDisplayHealth(pet)}`,
    lines: [
      `Level ${pet.levelInt ?? 1} (${pet.levelValue ?? LEVEL_STEPS[0]})`,
      perk ? `Perk: ${perk}` : 'Perk: none',
      temp.atk || temp.hp ? `Temporary: +${temp.atk}/+${temp.hp} until next turn` : 'Temporary: none',
      `L1: ${pet.ability?.level1 || 'N/A'}`,
      `L2: ${pet.ability?.level2 || 'N/A'}`,
      `L3: ${pet.ability?.level3 || 'N/A'}`
    ]
  };
}

function tooltipTextForFood(food) {
  const perkName = parsePerkFromText(food?.ability || '');
  return {
    title: `${food.name} (Tier ${food.tier})`,
    atk: null,
    hp: null,
    lines: [
      `Type: ${perkName ? `Perk Food (${perkName})` : 'Food (one-time effect)'}`,
      `Ability: ${food.ability || 'N/A'}`
    ]
  };
}

function positionTooltip(event) {
  const pad = 14;
  const width = hoverTooltip.offsetWidth || 260;
  const height = hoverTooltip.offsetHeight || 120;
  let left = event.clientX + pad;
  let top = event.clientY + pad;

  if (left + width > window.innerWidth - 8) {
    left = event.clientX - width - pad;
  }

  if (top + height > window.innerHeight - 8) {
    top = event.clientY - height - pad;
  }

  hoverTooltip.style.left = `${Math.max(8, left)}px`;
  hoverTooltip.style.top = `${Math.max(8, top)}px`;
}

function clearTooltip() {
  hoverTooltip.classList.add('hidden');
  hoverTooltip.innerHTML = '';
}

function animateShopRefresh() {
  [petSlots, foodSlots, extraFoodSlots].forEach((container) => {
    if (!container) return;
    const children = Array.from(container.children);
    children.forEach((child, idx) => {
      child.style.setProperty('--i', String(idx));
    });
    container.classList.remove('refresh');
    void container.offsetWidth;
    container.classList.add('refresh');
    setTimeout(() => container.classList.remove('refresh'), 420);
  });
}

function setTooltipContent(data) {
  hoverTooltip.innerHTML = '';

  const title = document.createElement('div');
  title.className = 'tooltip-title';
  title.textContent = data.title;
  hoverTooltip.appendChild(title);

  if (data.atk !== null && data.hp !== null) {
    const atkRow = document.createElement('div');
    atkRow.className = 'tooltip-row';

    const fist = document.createElement('img');
    fist.src = FIST_ICON;
    fist.alt = 'Attack';

    const atkText = document.createElement('span');
    atkText.textContent = `Attack: ${data.atk}`;

    atkRow.appendChild(fist);
    atkRow.appendChild(atkText);
    hoverTooltip.appendChild(atkRow);

    const hpRow = document.createElement('div');
    hpRow.className = 'tooltip-row';

    const heart = document.createElement('img');
    heart.src = HEART_ICON;
    heart.alt = 'Health';

    const hpText = document.createElement('span');
    hpText.textContent = `Health: ${data.hp}`;

    hpRow.appendChild(heart);
    hpRow.appendChild(hpText);
    hoverTooltip.appendChild(hpRow);
  }

  data.lines.forEach((line) => {
    const p = document.createElement('div');
    p.className = 'tooltip-ability';
    p.textContent = line;
    hoverTooltip.appendChild(p);
  });
}

function bindHoverTooltip(el, kind, item) {
  if (!item) return;

  const onEnter = (ev) => {
    const data = kind === 'pet' ? tooltipTextForPet(item) : tooltipTextForFood(item);
    setTooltipContent(data);
    hoverTooltip.classList.remove('hidden');
    positionTooltip(ev);
  };

  const onMove = (ev) => positionTooltip(ev);
  const onLeave = () => clearTooltip();

  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
}

function renderCardImage(item) {
  if (item && item.path) {
    const img = document.createElement('img');
    img.className = 'card-art';
    img.src = item.path;
    img.alt = item.name;
    return img;
  }

  const placeholder = document.createElement('div');
  placeholder.className = 'name';
  placeholder.textContent = item ? `${item.name} (no texture)` : 'No texture';
  return placeholder;
}

function renderFrozenChip(slotEl, isFrozen) {
  if (!isFrozen) return;

  const chip = document.createElement('div');
  chip.className = 'frozen-chip';

  const icon = document.createElement('img');
  icon.src = ICE_ICON;
  icon.alt = 'Frozen';

  const text = document.createElement('span');
  text.textContent = 'Frozen';

  chip.appendChild(icon);
  chip.appendChild(text);
  slotEl.appendChild(chip);
}

function createPetStatsElement(pet) {
  const wrap = document.createElement('div');
  wrap.className = 'pet-stats';

  const atk = document.createElement('span');
  atk.className = 'pet-stat-chip';
  const atkIcon = document.createElement('img');
  atkIcon.src = FIST_ICON;
  atkIcon.alt = 'Attack';
  const atkText = document.createElement('span');
  atkText.textContent = String(getPetDisplayAttack(pet));
  atk.appendChild(atkIcon);
  atk.appendChild(atkText);

  const hp = document.createElement('span');
  hp.className = 'pet-stat-chip';
  const hpIcon = document.createElement('img');
  hpIcon.src = HEART_ICON;
  hpIcon.alt = 'Health';
  const hpText = document.createElement('span');
  hpText.textContent = String(getPetDisplayHealth(pet));
  hp.appendChild(hpIcon);
  hp.appendChild(hpText);

  wrap.appendChild(atk);
  wrap.appendChild(hp);
  return wrap;
}

function createPerkBadgeElement(perkName) {
  if (!perkName) return null;
  const tex = resolveTexture(perkName);
  if (!tex) return null;
  const badge = document.createElement('div');
  badge.className = 'perk-overlay';
  if (normalizeName(perkName) === 'honey') {
    badge.classList.add('perk-honey');
  }
  badge.title = perkName;
  const img = document.createElement('img');
  img.src = tex;
  img.alt = perkName;
  badge.appendChild(img);
  return badge;
}

function getTemplatePetByName(name) {
  const pack = state.packs[String(state.currentPackId)];
  if (!pack?.pets) return null;
  return pack.pets.find((p) => normalizeName(p.name) === normalizeName(name)) || null;
}

function getTemplateFoodByName(name) {
  const pack = state.packs[String(state.currentPackId)];
  if (!pack?.foods) return null;
  return pack.foods.find((f) => normalizeName(f.name) === normalizeName(name)) || null;
}

function getAllFoodsAcrossPacks() {
  const out = [];
  Object.keys(state.packs || {}).forEach((pid) => {
    const foods = state.packs[pid]?.foods || [];
    foods.forEach((f) => out.push(f));
  });
  return out;
}

function getAllPetsAcrossPacks() {
  const out = [];
  Object.keys(state.packs || {}).forEach((pid) => {
    const pets = state.packs[pid]?.pets || [];
    pets.forEach((p) => out.push(p));
  });
  return out;
}

function parseSinglePetBuffText(abilityText) {
  const text = String(abilityText || '').trim();
  const plusAtkHp = text.match(/Give one pet \+(\d+) attack and \+(\d+) health\.?/i);
  if (plusAtkHp) return { atk: Number(plusAtkHp[1]), hp: Number(plusAtkHp[2]) };
  const plusAtk = text.match(/Give one pet \+(\d+) attack\.?/i);
  if (plusAtk) return { atk: Number(plusAtk[1]), hp: 0 };
  const plusHp = text.match(/Give one pet \+(\d+) health\.?/i);
  if (plusHp) return { atk: 0, hp: Number(plusHp[1]) };
  return null;
}

function parsePerkFromText(abilityText) {
  const text = String(abilityText || '').trim();
  const perk = text.match(/Give one pet(?: the)? ([A-Za-z0-9' -]+?) perk\.?/i);
  if (perk) return perk[1].trim();
  if (/Give one pet Strawberry\.?/i.test(text)) return 'Strawberry';
  return null;
}

function parseExperienceFromText(abilityText) {
  const text = String(abilityText || '').trim();
  const m = text.match(/Give one pet \+(\d+) experience\.?/i);
  return m ? Number(m[1]) : 0;
}

function getFoodSlotElement(listName, idx) {
  if (listName === 'extra') {
    return extraFoodSlots?.querySelector(`[data-food-list="extra"][data-food-slot="${idx}"]`) || null;
  }
  return foodSlots?.querySelector(`[data-food-list="main"][data-food-slot="${idx}"]`) || null;
}

function getFoodSlotRef(listName, idx) {
  const list = listName === 'extra' ? state.extraShopFoods : state.shopFoods;
  if (!Array.isArray(list)) return null;
  const slot = list[idx];
  if (!slot) return null;
  return { listName, idx, slot };
}

function removeFoodFromSlot(foodRef) {
  if (!foodRef?.slot) return;
  foodRef.slot.item = null;
  foodRef.slot.frozen = false;
}

function setFoodDragPayload(ev, listName, idx) {
  if (!ev?.dataTransfer) return;
  const normalized = listName === 'extra' ? 'extra' : 'main';
  ev.dataTransfer.setData('text/plain', `shop-food:${normalized}:${idx}`);
  ev.dataTransfer.effectAllowed = 'move';
}

function foodNeedsTarget(food) {
  const ability = String(food?.ability || '');
  return /one pet|a pet/i.test(ability);
}

function setPetPerk(idx, perkName, sourceEl = null) {
  const pet = state.board[idx];
  if (!pet || !perkName) return;
  pet.equipment = perkName;
  if (useCalculatorShopBridge()) {
    triggerCalculatorPerkGained(idx, perkName);
  }
  animateBoardStatDelta({
    scope: 'shop',
    toIdx: idx,
    perkText: perkName.toUpperCase()
  });
  if (sourceEl) {
    const targetEl = getBoardSlotElement(idx);
    if (targetEl) {
      const token = document.createElement('div');
      token.className = 'fx-fly-icon';
      token.textContent = perkName.toUpperCase();
      const fromRect = sourceEl.getBoundingClientRect();
      token.style.left = `${fromRect.left + fromRect.width / 2}px`;
      token.style.top = `${fromRect.top + fromRect.height / 2}px`;
      document.body.appendChild(token);
      requestAnimationFrame(() => {
        const toRect = targetEl.getBoundingClientRect();
        token.style.left = `${toRect.left + toRect.width / 2}px`;
        token.style.top = `${toRect.top + toRect.height / 2}px`;
        token.style.opacity = '0';
      });
      setTimeout(() => token.remove(), 430);
    }
  }
}

function triggerFoodFaintAtIndex(idx) {
  const pet = state.board[idx];
  if (!pet) return;
  if (useCalculatorShopBridge()) {
    triggerCalculatorFaint(idx);
    return;
  }
  state.board[idx] = null;
  triggerFaintAbility(pet, idx);
}

function stockRandomPerkFood({ minTier = 1, maxTier = 6, free = true } = {}) {
  const pool = getAllFoodsAcrossPacks().filter((f) => {
    const tier = Number(f.tier || 1);
    if (tier < minTier || tier > maxTier) return false;
    return /perk/i.test(String(f.ability || ''));
  });
  const pick = randFrom(pool);
  if (!pick) return null;
  stockFoodInShop({
    name: pick.name,
    tier: pick.tier,
    ability: pick.ability,
    cost: free ? 0 : (pick.cost ?? BUY_COST)
  });
  return pick;
}

function transformPetFromPool(targetIdx, pool, options = {}) {
  const current = state.board[targetIdx];
  if (!current) return false;
  const candidates = pool.filter((p) => normalizeName(p.name) !== normalizeName(current.name));
  const pick = randFrom(candidates.length ? candidates : pool);
  if (!pick) return false;
  const next = createBoardPetFromShopPet({ ...pick });
  next.exp = current.exp ?? next.exp;
  next.mergeStage = current.mergeStage ?? next.mergeStage;
  next.levelInt = current.levelInt ?? next.levelInt;
  next.levelValue = current.levelValue ?? next.levelValue;
  next.equipment = options.equipment || current.equipment || null;
  state.board[targetIdx] = next;
  pulseShopAbilityAt(targetIdx, 'Transform');
  return true;
}

function applySpecialFoodEffect(food, targetIdx, foodRef) {
  const ability = String(food.ability || '');
  const nFood = normalizeName(food.name);
  const pet = Number.isInteger(targetIdx) && targetIdx >= 0 ? state.board[targetIdx] : null;
  const sourceEl = foodRef ? getFoodSlotElement(foodRef.listName, foodRef.idx) : null;

  if (/Give one pet \+(\d+) attack and \+(\d+) health until next turn/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) attack and \+(\d+) health until next turn/i);
    const atk = Number(m?.[1] || 0);
    const hp = Number(m?.[2] || 0);
    applyTemporaryBuffAt(targetIdx, atk, hp, state.turn + 1);
    return { ok: true, note: `${food.name}: temporary +${atk}/+${hp}` };
  }

  if (/Give one pet \+(\d+) attack and Weak/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) attack and Weak/i);
    buffPetAt(targetIdx, Number(m?.[1] || 0), 0);
    setPetPerk(targetIdx, 'Weak', foodRef ? getFoodSlotElement(foodRef.listName, foodRef.idx) : null);
    return { ok: true, note: `${food.name}: attack + weak` };
  }

  if (/Give one pet \+(\d+) health and remove (\d+) attack/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) health and remove (\d+) attack/i);
    const hp = Number(m?.[1] || 0);
    const atkLoss = Number(m?.[2] || 0);
    buffPetAt(targetIdx, -atkLoss, hp);
    return { ok: true, note: `${food.name}: health up, attack down` };
  }

  if (/Give one pet \+(\d+) attack and remove (\d+) health/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) attack and remove (\d+) health/i);
    const atk = Number(m?.[1] || 0);
    const hpLoss = Number(m?.[2] || 0);
    buffPetAt(targetIdx, atk, -hpLoss);
    return { ok: true, note: `${food.name}: attack up, health down` };
  }

  if (/Make one pet faint/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    triggerFoodFaintAtIndex(targetIdx);
    return { ok: true, note: `${food.name}: made pet faint` };
  }

  if (/Swap Attack and Health of a pet/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const atk = Number(pet.baseAttack || 1);
    const hp = Number(pet.baseHealth || 1);
    pet.baseAttack = Math.max(1, hp);
    pet.baseHealth = Math.max(1, atk);
    pulseShopAbilityAt(targetIdx, 'Swap');
    return { ok: true, note: `${food.name}: swapped attack/health` };
  }

  if (/Give all current and future shop pets \+(\d+) attack and \+(\d+) health/i.test(ability)) {
    const m = ability.match(/Give all current and future shop pets \+(\d+) attack and \+(\d+) health/i);
    const atk = Number(m?.[1] || 0);
    const hp = Number(m?.[2] || 0);
    state.cannedShopPetAtkBuff += atk;
    state.cannedShopPetHpBuff += hp;
    state.shopPets.forEach((slot) => {
      if (!slot.item) return;
      slot.item.baseAttack = Math.max(1, Number(slot.item.baseAttack || 1) + atk);
      slot.item.baseHealth = Math.max(1, Number(slot.item.baseHealth || 1) + hp);
    });
    return { ok: true, note: `${food.name}: buffed current/future shop pets` };
  }

  if (/Give two random pets \+(\d+) attack and \+(\d+) health/i.test(ability)) {
    const m = ability.match(/Give two random pets \+(\d+) attack and \+(\d+) health/i);
    const atk = Number(m?.[1] || 0);
    const hp = Number(m?.[2] || 0);
    randomIndices(getBoardPetIndices(), 2).forEach((idx) => buffPetAt(idx, atk, hp, { fromElement: sourceEl }));
    return { ok: true, note: `${food.name}: buffed 2 random pets` };
  }

  if (/Give three random pets \+(\d+) attack and \+(\d+) health/i.test(ability)) {
    const m = ability.match(/Give three random pets \+(\d+) attack and \+(\d+) health/i);
    const atk = Number(m?.[1] || 0);
    const hp = Number(m?.[2] || 0);
    randomIndices(getBoardPetIndices(), 3).forEach((idx) => buffPetAt(idx, atk, hp, { fromElement: sourceEl }));
    return { ok: true, note: `${food.name}: buffed 3 random pets` };
  }

  if (/Give two random pets \+(\d+) attack/i.test(ability)) {
    const m = ability.match(/Give two random pets \+(\d+) attack/i);
    const atk = Number(m?.[1] || 0);
    randomIndices(getBoardPetIndices(), 2).forEach((idx) => buffPetAt(idx, atk, 0, { fromElement: sourceEl }));
    return { ok: true, note: `${food.name}: buffed random attack` };
  }

  if (/Gain \+(\d+) gold on next turn/i.test(ability)) {
    const m = ability.match(/Gain \+(\d+) gold on next turn/i);
    state.nextTurnBonusGold += Number(m?.[1] || 0);
    return { ok: true, note: `${food.name}: queued next-turn gold` };
  }

  if (/Give three pets from the current shop tier or higher \+(\d+) attack and \+(\d+) health/i.test(ability)) {
    const m = ability.match(/Give three pets from the current shop tier or higher \+(\d+) attack and \+(\d+) health/i);
    const atk = Number(m?.[1] || 0);
    const hp = Number(m?.[2] || 0);
    const minTier = maxTierForTurn(state.turn);
    const picks = randomIndices(getBoardPetIndices().filter((idx) => Number(state.board[idx]?.tier || 1) >= minTier), 3);
    picks.forEach((idx) => buffPetAt(idx, atk, hp, { fromElement: sourceEl }));
    return { ok: true, note: `${food.name}: buffed high-tier pets` };
  }

  if (/Activate buy ability or give \+(\d+) health/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Activate buy ability or give \+(\d+) health/i);
    const hp = Number(m?.[1] || 0);
    triggerBuyAbility(pet, targetIdx);
    buffPetAt(targetIdx, 0, hp);
    return { ok: true, note: `${food.name}: activated buy ability / health` };
  }

  if (/Give one pet \+(\d+) to their lowest stat/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) to their lowest stat/i);
    const v = Number(m?.[1] || 0);
    if (Number(pet.baseAttack || 0) <= Number(pet.baseHealth || 0)) {
      buffPetAt(targetIdx, v, 0);
    } else {
      buffPetAt(targetIdx, 0, v);
    }
    return { ok: true, note: `${food.name}: buffed lowest stat` };
  }

  if (/Transform one pet into another from the same tier/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const sameTierPool = getAllPetsAcrossPacks().filter((p) => Number(p.tier || 1) === Number(pet.tier || 1));
    const tier3Perks = getAllFoodsAcrossPacks().filter((f) => Number(f.tier || 1) === 3 && /perk/i.test(String(f.ability || '')));
    const randomPerk = randFrom(tier3Perks);
    const ok = transformPetFromPool(targetIdx, sameTierPool, { equipment: randomPerk?.name || pet.equipment || null });
    return { ok, note: `${food.name}: transformed same tier` };
  }

  if (/Transform one pet into another from one higher tier/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const higherTierPool = getAllPetsAcrossPacks().filter((p) => Number(p.tier || 1) === (Number(pet.tier || 1) + 1));
    if (!higherTierPool.length) return { ok: false, note: 'No higher-tier transform available.' };
    const ok = transformPetFromPool(targetIdx, higherTierPool);
    return { ok, note: `${food.name}: transformed higher tier` };
  }

  if (/Give one pet \+(\d+) mana/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) mana/i);
    pet.mana = Math.max(0, Number(pet.mana || 0) + Number(m?.[1] || 0));
    pulseShopAbilityAt(targetIdx, 'Mana');
    return { ok: true, note: `${food.name}: granted mana` };
  }

  if (/Choose one tier 5-6 perk food to stock for free/i.test(ability)) {
    const pick = stockRandomPerkFood({ minTier: 5, maxTier: 6, free: true });
    return { ok: Boolean(pick), note: pick ? `${food.name}: stocked ${pick.name}` : 'No tier 5-6 perk food available.' };
  }

  if (/Choose one free tier 6 food to stock from ALL packs/i.test(ability)) {
    const pool = getAllFoodsAcrossPacks().filter((f) => Number(f.tier || 1) === 6);
    const pick = randFrom(pool);
    if (!pick) return { ok: false, note: 'No tier 6 food available.' };
    stockFoodInShop({ name: pick.name, tier: pick.tier, ability: pick.ability, cost: 0 });
    return { ok: true, note: `${food.name}: stocked ${pick.name}` };
  }

  if (/Double if all pets are tier 4 or higher/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const pet = state.board[targetIdx];
    if (!pet) return { ok: false, note: 'No target pet.' };
    const allHighTier = state.board.filter(Boolean).every((p) => Number(p.tier || 1) >= 4);
    const mul = allHighTier ? 2 : 1;
    buffPetAt(targetIdx, 2 * mul, 2 * mul);
    return { ok: true, note: `${food.name}: +${2 * mul}/+${2 * mul}` };
  }

  if (/odd turns and \+(\d+) health on even turns/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    const m = ability.match(/Give one pet \+(\d+) attack on odd turns and \+(\d+) health on even turns/i);
    const oddAtk = Number(m?.[1] || 0);
    const evenHp = Number(m?.[2] || 0);
    if (state.turn % 2 === 1) {
      buffPetAt(targetIdx, oddAtk, 0);
    } else {
      buffPetAt(targetIdx, 0, evenHp);
    }
    return { ok: true, note: `${food.name}: turn-based buff applied` };
  }

  if (/Also convert 2 attack into health/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    buffPetAt(targetIdx, -2, 3);
    return { ok: true, note: `${food.name}: converted attack to health` };
  }

  if (/Also convert 2 health into attack/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    buffPetAt(targetIdx, 3, -2);
    return { ok: true, note: `${food.name}: converted health to attack` };
  }

  if (/Upgrade future peaches to give \+1 more attack and health/i.test(ability)) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    state.peachUpgradeBonus += 1;
    buffPetAt(targetIdx, 2 + state.peachUpgradeBonus, 2 + state.peachUpgradeBonus);
    return { ok: true, note: `${food.name}: upgraded future peaches` };
  }

  if (nFood === 'peach' && state.peachUpgradeBonus > 0) {
    if (!pet) return { ok: false, note: 'No target pet.' };
    buffPetAt(targetIdx, state.peachUpgradeBonus, state.peachUpgradeBonus);
    return { ok: true, note: `${food.name}: peach upgrade bonus applied` };
  }

  return { ok: false, note: 'Food ability not implemented yet.' };
}

function applyFoodToBoardPet(food, targetIdx, foodRef = null) {
  const pet = Number.isInteger(targetIdx) && targetIdx >= 0 ? state.board[targetIdx] : null;
  if (foodNeedsTarget(food) && !pet) return { ok: false, note: 'Target board slot is empty.' };

  const ability = String(food.ability || '').trim();
  const sourceEl = foodRef ? getFoodSlotElement(foodRef.listName, foodRef.idx) : null;
  const special = applySpecialFoodEffect(food, targetIdx, foodRef);
  if (special.ok) return special;

  const basicBuff = parseSinglePetBuffText(ability);
  if (basicBuff) {
    const extraPeach = normalizeName(food.name) === 'peach' ? state.peachUpgradeBonus : 0;
    buffPetAt(targetIdx, basicBuff.atk + extraPeach, basicBuff.hp + extraPeach, { fromElement: sourceEl });
  }

  const expGain = parseExperienceFromText(ability);
  if (expGain > 0) {
    const bumped = bumpPetLevelByExp(state.board[targetIdx], expGain);
    state.board[targetIdx] = bumped.pet;
    maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt);
    if (useCalculatorShopBridge() && bumped.newLevelInt > bumped.prevLevelInt) {
      triggerCalculatorLevelUp(targetIdx);
    }
    pulseShopAbilityAt(targetIdx, 'XP');
    return { ok: true, note: `${food.name}: +${expGain} experience` };
  }

  const perkName = parsePerkFromText(ability);
  if (perkName) {
    setPetPerk(targetIdx, perkName, sourceEl);
    return { ok: true, note: `${food.name}: granted ${perkName} perk` };
  }

  if (basicBuff) {
    return { ok: true, note: `${food.name}: buff applied` };
  }

  return special;
}

function makeTokenPet(name, attack, health, tier = 1) {
  return hydrateLevelFields({
    name,
    tier,
    baseAttack: attack,
    baseHealth: health,
    ability: { level1: '', level2: '', level3: '' },
    path: resolveTexture(name)
  }, 0);
}

function makePetFromTemplate(name) {
  const t = getTemplatePetByName(name);
  if (!t) return null;
  return createBoardPetFromShopPet({ ...t });
}

async function loadCalculatorSim() {
  if (state.calculatorSim) return state.calculatorSim;
  const res = await fetch(CALCULATOR_BUNDLE_PATH);
  if (!res.ok) {
    throw new Error(`Calculator bundle load failed: ${res.status}`);
  }
  const source = await res.text();
  const catalog = extractToyCatalogFromCalculatorSource(source);
  if (catalog.length) state.toyCatalog = catalog;
  renderToyPickerOptions();
  const module = { exports: {} };
  const evaluator = new Function(
    'module',
    'exports',
    `${source}\n;module.exports.__createSimulationRunner = (typeof createSimulationRunner === 'function') ? createSimulationRunner : null;\n;return module.exports;`
  );
  state.calculatorSim = evaluator(module, module.exports);
  return state.calculatorSim;
}

function getActiveBoardPets() {
  return state.board
    .map((pet) => (pet ? cloneBoardPet(pet) : null))
    .slice(0, BOARD_SIZE);
}

function calcExpForLevel(levelInt) {
  if (levelInt >= 3) return 5;
  if (levelInt >= 2) return 2;
  return 0;
}

function calcLevelFromExp(exp) {
  return levelStepToInt(Math.max(0, Number(exp || 0)));
}

function boardPetToCalculatorPet(pet) {
  if (!pet) return null;
  const temp = getActiveTempBuffTotals(pet);
  const levelInt = getPetLevelInt(pet);
  const equipment = typeof pet.equipment === 'string'
    ? pet.equipment
    : (pet.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : null);
  return {
    name: pet.name,
    attack: Math.max(1, Number(pet.baseAttack || 0) + temp.atk),
    health: Math.max(1, Number(pet.baseHealth || 0) + temp.hp),
    exp: Number.isInteger(pet.exp) ? pet.exp : calcExpForLevel(levelInt),
    mana: Math.max(0, Number(pet.mana || 0)),
    equipment: equipment || null
  };
}

function summarizeTeamLevels(pets) {
  return pets
    .filter(Boolean)
    .map((p) => `${p.name} L${calcLevelFromExp(p.exp)}`)
    .join(', ');
}

function parseToyConfigFromUi() {
  const forced = getForcedToyChoice();
  const toyName = String(forced?.name || state.playerToy || '').trim();
  const toyLevel = Math.max(1, Math.min(3, Number(forced?.level || state.playerToyLevel || 1)));
  return {
    playerToy: toyName || null,
    playerToyLevel: toyName ? toyLevel : 1
  };
}

function useCalculatorShopBridge() {
  return state.currentPackId >= 1 && state.currentPackId <= 6;
}

function boardPetToShopCalcPetConfig(pet) {
  if (!pet) return null;
  const equipment = typeof pet.equipment === 'string'
    ? pet.equipment
    : (pet.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : null);
  return {
    name: pet.name,
    attack: Math.max(1, Number(getPetDisplayAttack(pet) || 1)),
    health: Math.max(1, Number(getPetDisplayHealth(pet) || 1)),
    exp: Number.isInteger(pet.exp) ? pet.exp : calcExpForLevel(getPetLevelInt(pet)),
    mana: Math.max(0, Number(pet.mana || 0)),
    equipment: equipment || null,
    triggersConsumed: Math.max(0, Number(pet.triggersConsumed || 0)),
    foodsEaten: Math.max(0, Number(pet.foodsEaten || 0)),
    battlesFought: Math.max(0, Number(pet.battlesFought || 0)),
    timesHurt: Math.max(0, Number(pet.timesHurt || 0)),
    friendsDiedBeforeBattle: Math.max(0, Number(pet.friendsDiedBeforeBattle || 0))
  };
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function cloneSerializable(value, depth = 0) {
  if (depth > 4) return null;
  if (value === null || value === undefined) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.map((v) => cloneSerializable(v, depth + 1));
  if (value instanceof Set) return Array.from(value).map((v) => cloneSerializable(v, depth + 1));
  if (!isPlainObject(value)) return null;
  const out = {};
  Object.entries(value).forEach(([k, v]) => {
    if (typeof v === 'function') return;
    const c = cloneSerializable(v, depth + 1);
    if (c !== undefined) out[k] = c;
  });
  return out;
}

function snapshotCalcPetAbilityUsage(calcPet) {
  const abilities = Array.isArray(calcPet?.abilityList) ? calcPet.abilityList : [];
  return abilities.map((a) => ({
    name: String(a?.name || ''),
    abilityType: String(a?.abilityType || ''),
    triggers: Array.isArray(a?.triggers) ? a.triggers.map((t) => String(t)) : [],
    currentUses: Number(a?.currentUses || 0),
    initialCurrentUses: Number(a?.initialCurrentUses || 0),
    abilityLevel: Number(a?.abilityLevel || 1),
    maxUses: Number(a?.maxUses ?? -1)
  }));
}

function snapshotCalcPetState(calcPet) {
  if (!calcPet || typeof calcPet !== 'object') return null;
  const skip = new Set([
    'parent', 'logService', 'abilityService', 'gameService', 'equipment',
    'originalEquipment', 'abilityList', 'originalAbilityList',
    'currentTarget', 'lastAttacker', 'killedBy', 'transformedInto'
  ]);
  const stateOut = {};
  Object.entries(calcPet).forEach(([k, v]) => {
    if (skip.has(k)) return;
    if (typeof v === 'function') return;
    const c = cloneSerializable(v);
    if (c !== undefined && c !== null) stateOut[k] = c;
  });
  return {
    fields: stateOut,
    abilityUsage: snapshotCalcPetAbilityUsage(calcPet)
  };
}

function restoreCalcPetAbilityUsage(calcPet, usage) {
  if (!calcPet || !Array.isArray(calcPet.abilityList) || !Array.isArray(usage)) return;
  const sameSig = (a, b) => {
    if (!a || !b) return false;
    if (String(a.name || '') !== String(b.name || '')) return false;
    if (String(a.abilityType || '') !== String(b.abilityType || '')) return false;
    const at = Array.isArray(a.triggers) ? a.triggers.map((x) => String(x)).join('|') : '';
    const bt = Array.isArray(b.triggers) ? b.triggers.map((x) => String(x)).join('|') : '';
    return at === bt;
  };
  calcPet.abilityList.forEach((ability) => {
    const found = usage.find((u) => sameSig(ability, u));
    if (!found) return;
    ability.currentUses = Number(found.currentUses || 0);
    ability.initialCurrentUses = Number(found.initialCurrentUses || 0);
    ability.abilityLevel = Number(found.abilityLevel || ability.abilityLevel || 1);
    ability.maxUses = Number(found.maxUses ?? ability.maxUses ?? -1);
  });
}

function restoreCalcPetState(calcPet, snapshot) {
  if (!calcPet || !snapshot || typeof snapshot !== 'object') return;
  const blocked = new Set([
    'parent', 'logService', 'abilityService', 'gameService', 'abilityList',
    'originalAbilityList', 'equipment', 'originalEquipment'
  ]);
  const fields = snapshot.fields && typeof snapshot.fields === 'object' ? snapshot.fields : {};
  Object.entries(fields).forEach(([k, v]) => {
    if (blocked.has(k)) return;
    calcPet[k] = cloneSerializable(v);
  });
  restoreCalcPetAbilityUsage(calcPet, snapshot.abilityUsage);
}

function hydrateBoardFromCalcPet(calcPet) {
  if (!calcPet) return null;
  const template = getTemplatePetByName(calcPet.name);
  const equipmentName = calcPet.equipment?.name || null;
  const next = hydrateLevelFields({
    name: calcPet.name,
    tier: Number(template?.tier || calcPet?.tier || 1),
    baseAttack: Math.max(1, Number(calcPet.attack || 1)),
    baseHealth: Math.max(1, Number(calcPet.health || 1)),
    ability: template?.ability || { level1: '', level2: '', level3: '' },
    path: resolveTexture(calcPet.name),
    equipment: equipmentName,
    mana: Math.max(0, Number(calcPet.mana || 0)),
    triggersConsumed: Math.max(0, Number(calcPet.triggersConsumed || 0)),
    foodsEaten: Math.max(0, Number(calcPet.foodsEaten || 0)),
    battlesFought: Math.max(0, Number(calcPet.battlesFought || 0)),
    timesHurt: Math.max(0, Number(calcPet.timesHurt || 0)),
    friendsDiedBeforeBattle: Math.max(0, Number(calcPet.friendsDiedBeforeBattle || 0)),
    sellValue: Math.max(1, Number(calcPet.sellValue || 1)),
    tempBuffs: []
  }, Math.max(0, Math.min(5, Number(calcPet.exp || 0))));
  const snap = snapshotCalcPetState(calcPet);
  if (snap) next.calcPetState = snap;
  return next;
}

function syncBoardStateFromCalculatorPlayer(player) {
  if (!player) return;
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    state.board[i] = hydrateBoardFromCalcPet(player.getPet(i));
  }
  state.gold = Math.max(0, Number.isFinite(Number(player.gold)) ? Number(player.gold) : state.gold);
  if (player.toy?.name) {
    state.playerToy = player.toy.name;
    state.playerToyLevel = Math.max(1, Math.min(3, Number(player.toy.level || 1)));
  } else {
    state.playerToy = null;
    state.playerToyLevel = 1;
  }
}

function createCalculatorShopContext() {
  const sim = state.calculatorSim;
  if (!sim || typeof sim.__createSimulationRunner !== 'function' || typeof sim.LogService !== 'function') {
    return null;
  }

  const logService = new sim.LogService();
  if (typeof logService.setEnabled === 'function') logService.setEnabled(true);
  if (typeof logService.setDeferDecorations === 'function') logService.setDeferDecorations(true);

  const runner = sim.__createSimulationRunner(logService);
  if (!runner) return null;

  const packName = CALCULATOR_PACK_BY_APP_ID[state.currentPackId] || 'Turtle';
  const blankTeam = Array(BOARD_SIZE).fill(null);
  runner.setupGameEnvironment({
    turn: state.turn,
    simulationCount: 1,
    playerPack: packName,
    opponentPack: packName,
    playerPets: blankTeam,
    opponentPets: blankTeam,
    playerGoldSpent: Math.max(0, START_GOLD - state.gold),
    opponentGoldSpent: 10,
    playerRollAmount: Math.max(0, Number(state.rollsThisTurn || 0)),
    opponentRollAmount: 0,
    playerLevel3Sold: 0,
    opponentLevel3Sold: 0
  });

  const player = runner.player;
  const opponent = runner.opponent;
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    player.setPet(i, undefined, true);
    opponent.setPet(i, undefined, true);
  }

  const petConfigs = state.board.map((pet) => boardPetToShopCalcPetConfig(pet));
  runner.createPets(player, petConfigs);
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const source = state.board[i];
    const calcPet = player.getPet(i);
    if (!source || !calcPet || !source.calcPetState) continue;
    restoreCalcPetState(calcPet, source.calcPetState);
  }

  player.gold = Number(state.gold || 0);
  runner.gameService.gameApi.playerLostLastBattle = Boolean(state.lastBattleLost);
  runner.gameService.gameApi.opponentLostLastBattle = false;
  runner.gameService.gameApi.playerRollAmount = Math.max(0, Number(state.rollsThisTurn || 0));
  runner.gameService.gameApi.playerGoldSpent = Math.max(0, START_GOLD - state.gold);

  const toyCfg = parseToyConfigFromUi();
  if (toyCfg.playerToy) {
    player.toy = runner.toyService.createToy(toyCfg.playerToy, player, Math.max(1, Math.min(3, Number(toyCfg.playerToyLevel || 1))));
    player.originalToy = player.toy;
  } else {
    player.toy = null;
    player.originalToy = null;
  }

  if (typeof runner.initializeEquipmentMultipliers === 'function') {
    runner.initializeEquipmentMultipliers();
  }

  return { runner, player, logService };
}

function applyCurrentToyToCalculatorPlayer(ctx) {
  if (!ctx?.runner || !ctx?.player) return;
  const toyCfg = parseToyConfigFromUi();
  if (!toyCfg.playerToy) {
    ctx.player.toy = null;
    ctx.player.originalToy = null;
    return;
  }
  const newToy = ctx.runner.toyService.createToy(
    toyCfg.playerToy,
    ctx.player,
    Math.max(1, Math.min(3, Number(toyCfg.playerToyLevel || 1)))
  );
  ctx.player.toy = newToy || null;
  ctx.player.originalToy = ctx.player.toy;
}

function runCalculatorAbilityQueue(runner) {
  if (!runner || typeof runner.abilityCycle !== 'function') return;
  runner.abilityCycle();
}

function collectCalculatorLogMessages(logService, baseline = 0) {
  if (!logService || typeof logService.getLogs !== 'function') return [];
  const logs = logService.getLogs();
  if (!Array.isArray(logs)) return [];
  return logs
    .slice(Math.max(0, baseline))
    .map((entry) => stripHtmlToText(entry?.message || ''))
    .filter(Boolean);
}

function triggerCalculatorStartTurn() {
  const ctx = createCalculatorShopContext();
  if (!ctx) return [];
  state.board.forEach((pet) => {
    if (!pet) return;
    maybeChooseToyFromPetAbility(pet, getPetLevelInt(pet), {
      trigger: 'start',
      interactive: true,
      triggerLabel: 'start of turn'
    });
  });
  applyCurrentToyToCalculatorPlayer(ctx);
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return [];
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.player.petArray.forEach((pet) => {
    aq.triggerAbility(pet, 'StartTurn', pet);
  });
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  return collectCalculatorLogMessages(ctx.logService, beforeLen);
}

function triggerCalculatorEndTurn() {
  const ctx = createCalculatorShopContext();
  if (!ctx) return [];
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return [];
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.player.petArray.forEach((pet) => {
    aq.triggerAbility(pet, 'EndTurn', pet);
    aq.handleNumberedCounterTriggers(
      pet,
      pet,
      { trigger: 'EndTurn' },
      aq.getNumberedTriggersForPet(pet, 'EndTurn')
    );
  });
  if (typeof ctx.runner.abilityService?.initSpecialEndTurnAbility === 'function') {
    ctx.runner.abilityService.initSpecialEndTurnAbility(ctx.player);
  }
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  return collectCalculatorLogMessages(ctx.logService, beforeLen);
}

function triggerCalculatorBuy(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  const boughtPet = ctx.player.getPet(boardIdx);
  if (!boughtPet) return;
  const boardPet = state.board[boardIdx];
  if (boardPet) {
    maybeChooseToyFromPetAbility(boardPet, getPetLevelInt(boardPet), {
      trigger: 'buy',
      interactive: true,
      triggerLabel: 'buy'
    });
    applyCurrentToyToCalculatorPlayer(ctx);
  }
  ctx.player.petArray.forEach((pet) => {
    if (pet === boughtPet) {
      aq.triggerAbility(pet, 'ThisBought', boughtPet);
      return;
    }
    aq.triggerAbility(pet, 'FriendBought', boughtPet);
    aq.handleNumberedCounterTriggers(
      pet,
      boughtPet,
      { trigger: 'FriendBought' },
      aq.getNumberedTriggersForPet(pet, 'FriendBought')
    );
    if (Number(boughtPet.tier || 1) === 1) {
      aq.triggerAbility(pet, 'Tier1FriendBought', boughtPet);
    }
  });
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorSell(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  const soldPet = ctx.player.getPet(boardIdx);
  if (!soldPet) return;
  const boardPet = state.board[boardIdx];
  if (boardPet) {
    maybeChooseToyFromPetAbility(boardPet, getPetLevelInt(boardPet), {
      trigger: 'sell',
      interactive: true,
      triggerLabel: 'sell'
    });
    applyCurrentToyToCalculatorPlayer(ctx);
  }
  ctx.player.petArray.forEach((pet) => {
    if (pet === soldPet) {
      aq.triggerAbility(pet, 'ThisSold', soldPet);
      return;
    }
    aq.triggerAbility(pet, 'FriendSold', soldPet);
    aq.handleNumberedCounterTriggers(
      pet,
      soldPet,
      { trigger: 'FriendSold' },
      aq.getNumberedTriggersForPet(pet, 'FriendSold')
    );
  });
  runCalculatorAbilityQueue(ctx.runner);
  ctx.player.setPet(boardIdx, undefined, false);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorSpendGold(amount) {
  const spend = Math.max(0, Math.trunc(Number(amount || 0)));
  if (!spend) return;
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  for (let i = 0; i < spend; i += 1) {
    ctx.player.petArray.forEach((pet) => {
      aq.triggerAbility(pet, 'SpendGold', pet, { trigger: 'SpendGold' });
      aq.handleNumberedCounterTriggers(
        pet,
        pet,
        { trigger: 'SpendGold' },
        aq.getNumberedTriggersForPet(pet, 'SpendGold')
      );
    });
  }
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorRoll() {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  ctx.player.petArray.forEach((pet) => {
    aq.triggerAbility(pet, 'Roll', pet, { trigger: 'Roll' });
    aq.handleNumberedCounterTriggers(
      pet,
      pet,
      { trigger: 'Roll' },
      aq.getNumberedTriggersForPet(pet, 'Roll')
    );
  });
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorFoodEaten(boardIdx, foodName = '') {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const eater = ctx.player.getPet(boardIdx);
  if (!eater) return;
  if (typeof ctx.runner.abilityService?.triggerFoodEvents !== 'function') return;
  ctx.runner.abilityService.triggerFoodEvents(eater, String(foodName || '').trim() || undefined);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorPerkGained(boardIdx, perkName = '') {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const pet = ctx.player.getPet(boardIdx);
  if (!pet) return;
  if (typeof ctx.runner.abilityService?.triggerPerkGainEvents !== 'function') return;
  ctx.runner.abilityService.triggerPerkGainEvents(pet, String(perkName || '').trim() || undefined);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorHurt(boardIdx, damageAmount = 1) {
  const dmg = Math.max(1, Number(damageAmount || 1));
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const pet = ctx.player.getPet(boardIdx);
  if (!pet) return;
  if (typeof ctx.runner.abilityService?.triggerHurtEvents !== 'function') return;
  ctx.runner.abilityService.triggerHurtEvents(pet, dmg);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorSummon(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const summoned = ctx.player.getPet(boardIdx);
  if (!summoned) return;
  if (typeof ctx.runner.abilityService?.triggerSummonEvents !== 'function') return;
  ctx.runner.abilityService.triggerSummonEvents(summoned);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorLevelUp(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const leveled = ctx.player.getPet(boardIdx);
  if (!leveled) return;
  if (typeof ctx.runner.abilityService?.triggerLevelUpEvents !== 'function') return;
  ctx.runner.abilityService.triggerLevelUpEvents(leveled);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function triggerCalculatorFaint(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const fainted = ctx.player.getPet(boardIdx);
  if (!fainted) return;
  if (typeof ctx.runner.abilityService?.triggerFaintEvents !== 'function') return;
  ctx.runner.abilityService.triggerFaintEvents(fainted);
  if (typeof ctx.runner.abilityService?.triggerAfterFaintEvents === 'function') {
    ctx.runner.abilityService.triggerAfterFaintEvents(fainted);
  }
  runCalculatorAbilityQueue(ctx.runner);
  ctx.player.setPet(boardIdx, undefined, false);
  syncBoardStateFromCalculatorPlayer(ctx.player);
}

function inferAilmentFromText(text) {
  const s = String(text || '').toLowerCase();
  const ailments = ['weak', 'sleepy', 'spooked', 'dazed', 'toasty', 'crisp'];
  return ailments.find((a) => s.includes(a)) || '';
}

function maxRandomOpponentLevel(turn) {
  if (turn >= 11) return 3;
  if (turn >= 5) return 2;
  return 1;
}

function chooseOpponentPackId() {
  const packIds = Object.keys(state.packs || {})
    .map((x) => Number(x))
    .filter((id) => (state.packs[String(id)]?.pets || []).length > 0);
  if (!packIds.length) return state.currentPackId;
  const different = packIds.filter((id) => id !== state.currentPackId);
  return randFrom(different.length ? different : packIds);
}

function buildRandomOpponentPetsForTurn(turn, teamSize) {
  const opponentPackId = chooseOpponentPackId();
  const opponentPack = state.packs[String(opponentPackId)];
  const pool = (opponentPack?.pets || []).filter((p) => Number(p.tier || 1) <= maxTierForTurn(turn));
  const maxLevel = maxRandomOpponentLevel(turn);
  const pets = [];

  if (!pool.length) {
    return { opponentPackId, opponentPackName: opponentPack?.name || `Pack ${opponentPackId}`, pets: Array(BOARD_SIZE).fill(null) };
  }

  for (let i = 0; i < teamSize; i += 1) {
    const t = randFrom(pool);
    if (!t) continue;
    const levelInt = 1 + Math.floor(Math.random() * maxLevel);
    pets.push({
      name: t.name,
      attack: Math.max(1, Number(t.baseAttack || 1)),
      health: Math.max(1, Number(t.baseHealth || 1)),
      exp: calcExpForLevel(levelInt),
      equipment: null
    });
  }

  while (pets.length < BOARD_SIZE) pets.push(null);
  return {
    opponentPackId,
    opponentPackName: opponentPack?.name || `Pack ${opponentPackId}`,
    pets
  };
}

function countBattlePhases(logs) {
  const out = {
    beforeBattle: 0,
    startBattle: 0,
    afterStartBattle: 0
  };
  logs.forEach((entry) => {
    const msg = stripHtmlToText(entry?.message || '');
    if (msg === 'Phase 1: Before battle') out.beforeBattle += 1;
    else if (msg === 'Phase 2: Start of battle') out.startBattle += 1;
    else if (msg === 'Phase 3: After Start of Battle') out.afterStartBattle += 1;
  });
  return out;
}

function simulateBattleOnce() {
  if (!state.calculatorSim || typeof state.calculatorSim.runHeadlessSimulation !== 'function') {
    throw new Error('Calculator simulation API unavailable.');
  }

  const playerPets = getActiveBoardPets().map((pet) => boardPetToCalculatorPet(pet));
  const playerTeamNames = playerPets.filter(Boolean).map((pet) => pet.name);
  const playerPackName = CALCULATOR_PACK_BY_APP_ID[state.currentPackId] || 'Turtle';
  const opponentTeamSize = Math.max(1, playerTeamNames.length || 1);
  const opponent = buildRandomOpponentPetsForTurn(state.turn, opponentTeamSize);
  const opponentPackName = CALCULATOR_PACK_BY_APP_ID[opponent.opponentPackId] || 'Turtle';
  const toyCfg = parseToyConfigFromUi();
  const simulation = state.calculatorSim.runHeadlessSimulation({
    turn: state.turn,
    simulationCount: 1,
    logsEnabled: true,
    maxLoggedBattles: 1,
    playerPack: playerPackName,
    opponentPack: opponentPackName,
    playerToy: toyCfg.playerToy,
    playerToyLevel: toyCfg.playerToyLevel,
    playerPets,
    opponentPets: opponent.pets
  }, {
    enableLogs: true,
    includeBattles: true
  });

  const battle = Array.isArray(simulation?.battles) ? simulation.battles[0] : null;
  const logs = Array.isArray(battle?.logs) ? battle.logs : [];
  const winner = battle?.winner || (simulation.playerWins > simulation.opponentWins ? 'player' : simulation.opponentWins > simulation.playerWins ? 'opponent' : 'draw');
  state.battleReport = {
    turn: state.turn,
    winner,
    opponentPackName: opponent.opponentPackName,
    playerTeamNames,
    opponentTeamNames: opponent.pets.filter(Boolean).map((pet) => pet.name),
    playerInitialPets: playerPets.map((p) => (p ? { ...p } : null)),
    opponentInitialPets: opponent.pets.map((p) => (p ? { ...p } : null)),
    playerToy: toyCfg.playerToy,
    playerToyLevel: toyCfg.playerToyLevel,
    logs,
    phaseCounts: countBattlePhases(logs)
  };
  state.lastBattleLost = winner === 'opponent';
  renderBattleReport();
  return state.battleReport;
}

function getBoardPetIndices(excludeIdx = -1) {
  const out = [];
  for (let i = 0; i < state.board.length; i += 1) {
    if (i === excludeIdx) continue;
    if (state.board[i]) out.push(i);
  }
  return out;
}

function buffPetAt(idx, atk, hp, fx = {}) {
  const pet = state.board[idx];
  if (!pet) return;
  pet.baseAttack = Math.max(1, pet.baseAttack + atk);
  pet.baseHealth = Math.max(1, pet.baseHealth + hp);
  if (useCalculatorShopBridge() && Number(hp || 0) < 0) {
    triggerCalculatorHurt(idx, Math.abs(Number(hp || 0)));
  }
  if (((atk && atk > 0) || (hp && hp > 0) || fx.perkText) && !state.battleInProgress) {
    animateBoardStatDelta({
      scope: 'shop',
      fromIdx: Number.isInteger(fx.fromIdx) ? fx.fromIdx : null,
      fromElement: fx.fromElement || null,
      toIdx: idx,
      atk: Math.max(0, Number(atk || 0)),
      hp: Math.max(0, Number(hp || 0)),
      perkText: fx.perkText || ''
    });
  }
}

function randomIndices(indices, n) {
  const copy = [...indices];
  const out = [];
  for (let i = 0; i < n && copy.length; i += 1) {
    const pick = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(pick, 1)[0]);
  }
  return out;
}

function placeSummonedPet(pet) {
  const slot = firstEmptyBoardSlot();
  if (slot < 0) return -1;
  state.board[slot] = pet;
  triggerFriendSummonedAbilities(slot);
  return slot;
}

function stockFoodInShop(food) {
  let idx = state.extraShopFoods.findIndex((s) => !s.item);
  if (idx < 0) {
    idx = state.extraShopFoods.findIndex((s) => !s.frozen);
  }
  if (idx < 0) idx = 0;
  state.extraShopFoods[idx].item = {
    name: food.name,
    tier: food.tier ?? 1,
    ability: food.ability ?? '',
    path: resolveTexture(food.name),
    cost: Math.max(0, food.cost ?? BUY_COST)
  };
  state.extraShopFoods[idx].frozen = false;
}

function getNearestAheadIndices(idx, count) {
  const out = [];
  for (let i = idx - 1; i >= 0; i -= 1) {
    if (state.board[i]) out.push(i);
    if (out.length >= count) break;
  }
  return out;
}

function getFrontMostFriendIndex(excludeIdx = -1) {
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (i === excludeIdx) continue;
    if (state.board[i]) return i;
  }
  return -1;
}

function parseStockedApple(level) {
  if (level >= 3) {
    return {
      name: 'Best Apple',
      fallback: 'Apple',
      ability: 'Give one pet +3 attack and +3 health.',
      cost: 2
    };
  }
  if (level >= 2) {
    return {
      name: 'Better Apple',
      fallback: 'Apple',
      ability: 'Give one pet +2 attack and +2 health.',
      cost: 2
    };
  }
  return {
    name: 'Apple',
    fallback: null,
    ability: 'Give one pet +1 attack and +1 health.',
    cost: 2
  };
}

function setParrotCopyFromAhead(parrotIdx, parrotLevel) {
  const parrot = state.board[parrotIdx];
  if (!parrot) return false;
  const ahead = getNearestAheadIndices(parrotIdx, 1);
  if (!ahead.length) {
    delete parrot.copiedAbilityName;
    delete parrot.copiedAbilityLevel;
    delete parrot.copyExpiresTurn;
    return false;
  }
  const source = state.board[ahead[0]];
  if (!source) return false;
  parrot.copiedAbilityName = source.name;
  parrot.copiedAbilityLevel = parrotLevel;
  parrot.copyExpiresTurn = state.turn + 1;
  return true;
}

function executeStartOfTurnAbility(idx, forcedName = null, forcedLevel = null) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const level = forcedLevel ?? getPetLevelInt(pet);
  const n = normalizeName(forcedName || pet.name);
  pulseShopAbilityAt(idx, 'Start');

  if (n === 'swan') {
    state.gold += level;
    logs.push(`${pet.name}: +${level} gold`);
    return logs;
  }

  if (n === 'worm') {
    const apple = parseStockedApple(level);
    const canonical = getTemplateFoodByName(apple.name) || (apple.fallback ? getTemplateFoodByName(apple.fallback) : null);
    stockFoodInShop({
      name: canonical?.name || apple.name,
      tier: canonical?.tier ?? 2,
      ability: canonical?.ability || apple.ability,
      cost: apple.cost
    });
    logs.push(`${pet.name}: stocked ${canonical?.name || apple.name}`);
    return logs;
  }

  if (n === 'giraffe') {
    const targetCount = Math.min(3, level);
    const ahead = getNearestAheadIndices(idx, targetCount);
    ahead.forEach((targetIdx) => buffPetAt(targetIdx, 1, 1, { fromIdx: idx }));
    if (ahead.length) logs.push(`${pet.name}: buffed ${ahead.length} friend(s) ahead`);
    return logs;
  }

  if (n === 'penguin') {
    const eligible = getBoardPetIndices(idx).filter((targetIdx) => getPetLevelInt(state.board[targetIdx]) >= 2);
    randomIndices(eligible, 2).forEach((targetIdx) => buffPetAt(targetIdx, level, level, { fromIdx: idx }));
    if (eligible.length) logs.push(`${pet.name}: buffed level 2+ friends`);
    return logs;
  }

  if (n === 'squirrel') {
    state.foodDiscount += level;
    state.shopFoods.forEach((slot) => {
      if (!slot.item) return;
      slot.item.cost = Math.max(0, (slot.item.cost ?? BUY_COST) - level);
    });
    logs.push(`${pet.name}: discounted shop food by ${level}`);
    return logs;
  }

  const chosenToy = maybeChooseToyFromPetAbility(pet, level, {
    trigger: 'start',
    interactive: true,
    triggerLabel: 'start of turn'
  });
  if (chosenToy) {
    logs.push(`${pet.name}: chose ${chosenToy.name} (L${state.playerToyLevel})`);
    return logs;
  }

  return logs;
}

function executeEndOfTurnAbility(idx, forcedName = null, forcedLevel = null) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const level = forcedLevel ?? getPetLevelInt(pet);
  const n = normalizeName(forcedName || pet.name);
  pulseShopAbilityAt(idx, 'End');

  if (n === 'snail') {
    if (!state.lastBattleLost) return logs;
    const ahead = getNearestAheadIndices(idx, 3);
    ahead.forEach((targetIdx) => buffPetAt(targetIdx, level, 0, { fromIdx: idx }));
    if (ahead.length) logs.push(`${pet.name}: buffed ${ahead.length} friends after loss`);
    return logs;
  }

  if (n === 'bison') {
    const hasLevel3Friend = getBoardPetIndices(idx).some((targetIdx) => getPetLevelInt(state.board[targetIdx]) >= 3);
    if (!hasLevel3Friend) return logs;
    buffPetAt(idx, level, 2 * level, { fromIdx: idx });
    logs.push(`${pet.name}: gained +${level}/+${2 * level}`);
    return logs;
  }

  if (n === 'parrot') {
    if (setParrotCopyFromAhead(idx, level)) {
      logs.push(`${pet.name}: copied nearest ahead ability for next turn`);
    }
    return logs;
  }

  if (n === 'monkey') {
    const frontIdx = getFrontMostFriendIndex(idx);
    if (frontIdx >= 0) {
      buffPetAt(frontIdx, 2 * level, 2 * level, { fromIdx: idx });
      logs.push(`${pet.name}: buffed front-most friend`);
    }
    return logs;
  }

  return logs;
}

function runStartOfTurnPhase() {
  state.phase = 'start';
  state.foodDiscount = 0;
  if (useCalculatorShopBridge()) {
    const logs = triggerCalculatorStartTurn();
    state.phase = 'during';
    return logs;
  }
  const logs = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (!state.board[i]) continue;
    logs.push(...executeStartOfTurnAbility(i));
    const parrot = state.board[i];
    if (
      normalizeName(parrot.name) === 'parrot' &&
      parrot.copiedAbilityName &&
      parrot.copyExpiresTurn === state.turn
    ) {
      logs.push(...executeStartOfTurnAbility(i, parrot.copiedAbilityName, parrot.copiedAbilityLevel ?? 1));
    }
  }
  state.phase = 'during';
  return logs;
}

function runEndOfTurnPhase() {
  state.phase = 'end';
  if (useCalculatorShopBridge()) {
    const logs = triggerCalculatorEndTurn();
    state.phase = 'during';
    return logs;
  }
  const logs = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (!state.board[i]) continue;
    logs.push(...executeEndOfTurnAbility(i));
    const parrot = state.board[i];
    if (
      normalizeName(parrot.name) === 'parrot' &&
      parrot.copiedAbilityName &&
      parrot.copyExpiresTurn === state.turn
    ) {
      logs.push(...executeEndOfTurnAbility(i, parrot.copiedAbilityName, parrot.copiedAbilityLevel ?? 1));
      delete parrot.copiedAbilityName;
      delete parrot.copiedAbilityLevel;
      delete parrot.copyExpiresTurn;
    }
  }
  state.phase = 'during';
  return logs;
}

function triggerFriendSummonedAbilities(summonedIdx) {
  if (useCalculatorShopBridge()) {
    triggerCalculatorSummon(summonedIdx);
    return;
  }
  const summoned = state.board[summonedIdx];
  if (!summoned) return;

  const allies = getBoardPetIndices(summonedIdx);
  for (const idx of allies) {
    const pet = state.board[idx];
    if (!pet) continue;
    const lvl = pet.levelInt ?? 1;
    const n = normalizeName(pet.name);
    if (n === 'horse') {
      applyTemporaryBuffAt(summonedIdx, lvl, 0, state.turn + 1, { fromIdx: idx });
    } else if (n === 'dog') {
      buffPetAt(idx, lvl, lvl, { fromIdx: summonedIdx });
    } else if (n === 'turkey') {
      buffPetAt(summonedIdx, 3 * lvl, 3 * lvl, { fromIdx: idx });
    }
  }
}

function triggerBuyAbility(pet, boardIdx) {
  if (!pet) return;
  if (useCalculatorShopBridge()) {
    triggerCalculatorBuy(boardIdx);
    return;
  }
  const n = normalizeName(pet.name);
  const lvl = getPetLevelInt(pet);

  if (n === 'otter') {
    const picks = randomIndices(getBoardPetIndices(boardIdx), Math.max(1, lvl));
    picks.forEach((idx) => buffPetAt(idx, 0, 1, { fromIdx: boardIdx }));
    return;
  }

  if (n === 'cow') {
    const milk = {
      name: 'Milk',
      tier: 5,
      ability: 'Give one pet +1 attack and +2 health.',
      cost: 0
    };
    state.shopFoods[0].item = {
      ...milk,
      path: resolveTexture(milk.name)
    };
    state.shopFoods[0].frozen = false;
    stockFoodInShop(milk);
  }

  maybeChooseToyFromPetAbility(pet, lvl, {
    trigger: 'buy',
    interactive: true,
    triggerLabel: 'buy'
  });
}

function triggerSellAbility(pet, sourceIdx = -1) {
  const stockPerkCopies = (copies) => {
    const perkName = typeof pet?.equipment === 'string'
      ? pet.equipment
      : (pet?.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : '');
    if (!perkName) return;
    const perkFood = getAllFoodsAcrossPacks().find((f) => normalizeName(f.name) === normalizeName(perkName));
    if (!perkFood) return;
    for (let i = 0; i < copies; i += 1) {
      stockFoodInShop({
        name: perkFood.name,
        tier: Number(perkFood.tier || 1),
        ability: String(perkFood.ability || ''),
        cost: 0
      });
    }
  };
  const lvl = getPetLevelInt(pet);
  const abilityText = getPetAbilityText(pet, lvl);
  const chipmunkCopyCount = parseStockCopyCountFromAbility(abilityText, lvl);
  if (useCalculatorShopBridge()) {
    triggerCalculatorSell(sourceIdx);
    if (normalizeName(pet?.name) === 'chipmunk') {
      stockPerkCopies(chipmunkCopyCount);
    }
    if (normalizeName(pet?.name) === 'duck') {
      state.shopPets.forEach((slot) => {
        if (slot.item) slot.item.baseHealth = Math.max(1, (slot.item.baseHealth || 1) + lvl);
      });
    }
    return;
  }
  const n = normalizeName(pet.name);
  if (n === 'beaver') {
    randomIndices(getBoardPetIndices(), 2).forEach((idx) => buffPetAt(idx, lvl, 0, { fromIdx: sourceIdx }));
  } else if (n === 'duck') {
    state.shopPets.forEach((slot) => {
      if (slot.item) slot.item.baseHealth = Math.max(1, (slot.item.baseHealth || 1) + lvl);
    });
  } else if (n === 'pig') {
    state.gold += lvl;
  } else if (n === 'pigeon') {
    stockFoodInShop({
      name: 'Bread Crumbs',
      tier: 1,
      ability: 'Summon one 1/1 Chick.'
    });
  } else if (n === 'chipmunk') {
    stockPerkCopies(chipmunkCopyCount);
  }

  maybeChooseToyFromPetAbility(pet, lvl, {
    trigger: 'sell',
    interactive: true,
    triggerLabel: 'sell'
  });
}

function triggerFaintAbility(pet, soldIdx) {
  const lvl = pet.levelInt ?? 1;
  const n = normalizeName(pet.name);
  if (n === 'ant') {
    const picks = randomIndices(getBoardPetIndices(), 1);
    if (picks.length) buffPetAt(picks[0], lvl, lvl, { fromIdx: soldIdx });
  } else if (n === 'cricket') {
    placeSummonedPet(makeTokenPet('Zombie Cricket', lvl, lvl, 1));
  } else if (n === 'flamingo') {
    const behind = [];
    for (let i = soldIdx + 1; i < BOARD_SIZE; i += 1) {
      if (state.board[i]) behind.push(i);
      if (behind.length >= 2) break;
    }
    behind.forEach((idx) => buffPetAt(idx, lvl, lvl, { fromIdx: soldIdx }));
  } else if (n === 'hedgehog') {
    const dmg = 2 * lvl;
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const p = state.board[i];
      if (!p) continue;
      p.baseHealth -= dmg;
      if (p.baseHealth <= 0) state.board[i] = null;
    }
  } else if (n === 'spider') {
    const tier3Pool = state.currentPool.pets.filter((x) => x.tier === 3);
    const pick = randFrom(tier3Pool);
    if (pick) {
      const s = createBoardPetFromShopPet({ ...pick });
      s.baseAttack = 2 * lvl;
      s.baseHealth = 2 * lvl;
      placeSummonedPet(s);
    }
  } else if (n === 'sheep') {
    for (let i = 0; i < 2; i += 1) {
      placeSummonedPet(makeTokenPet('Ram', 2 * lvl, 2 * lvl, 1));
    }
  } else if (n === 'deer') {
    placeSummonedPet(makeTokenPet('Bus', 5 * lvl, 5 * lvl, 1));
  } else if (n === 'rooster') {
    const atk = Math.max(1, Math.ceil((pet.baseAttack || 1) * 0.5 * lvl));
    placeSummonedPet(makeTokenPet('Chick', atk, 1, 1));
  } else if (n === 'mammoth') {
    getBoardPetIndices().forEach((idx) => buffPetAt(idx, 2 * lvl, 2 * lvl, { fromIdx: soldIdx }));
  }
}

function sellPetAtIndex(idx) {
  const pet = state.board[idx];
  if (!pet) return;
  playUiSound('click', 0.7);
  if (useCalculatorShopBridge()) {
    state.gold += Math.max(1, Number(pet.sellValue || SELL_VALUE));
    triggerSellAbility(pet, idx);
    if (state.board[idx] === pet) {
      state.board[idx] = null;
    }
  } else {
    state.board[idx] = null;
    state.gold += SELL_VALUE;
    triggerSellAbility(pet, idx);
    triggerFaintAbility(pet, idx);
  }
  if (state.boardSelectedIndex === idx) {
    resetSelection();
  }
  updateHud();
  renderBoard();
  renderShopPets();
  renderShopFoods();
  setStatus(`Sold ${pet.name} for ${SELL_VALUE} gold.`);
}

function toggleFreezePetSlot(idx) {
  const slot = state.shopPets[idx];
  if (!slot || !slot.item) {
    setStatus('Cannot freeze an empty pet slot.');
    return;
  }
  slot.frozen = !slot.frozen;
  playUiSound(slot.frozen ? 'freeze' : 'unfreeze', 0.85);
  renderShopPets();
  setStatus(slot.frozen ? `${slot.item.name} is frozen.` : `${slot.item.name} is unfrozen.`);
}

function toggleFreezeFoodSlot(idx) {
  const slot = state.shopFoods[idx];
  if (!slot || !slot.item) {
    setStatus('Cannot freeze an empty food slot.');
    return;
  }
  slot.frozen = !slot.frozen;
  playUiSound(slot.frozen ? 'freeze' : 'unfreeze', 0.85);
  renderShopFoods();
  setStatus(slot.frozen ? `${slot.item.name} is frozen.` : `${slot.item.name} is unfrozen.`);
}

function toggleFreezeExtraFoodSlot(idx) {
  const slot = state.extraShopFoods[idx];
  if (!slot || !slot.item) {
    setStatus('Cannot freeze an empty extra food slot.');
    return;
  }
  slot.frozen = !slot.frozen;
  playUiSound(slot.frozen ? 'freeze' : 'unfreeze', 0.85);
  renderShopFoods();
  setStatus(slot.frozen ? `${slot.item.name} is frozen.` : `${slot.item.name} is unfrozen.`);
}

function resetSelection() {
  state.boardSelectedIndex = null;
}

function maybeQueueTierUpReward(previousLevelInt, newLevelInt) {
  if (newLevelInt <= previousLevelInt) return;

  const rewardTier = maxTierForTurn(state.turn) + 1;
  if (rewardTier > 6) {
    setStatus(`Pet leveled up to ${newLevelInt}, but no higher tier is available.`);
    return;
  }

  const pack = state.packs[String(state.currentPackId)];
  if (!pack) return;

  const rewardPool = (pack.pets || []).filter((p) => p.tier === rewardTier);
  if (!rewardPool.length) {
    setStatus(`Pet leveled up to ${newLevelInt}, but no tier ${rewardTier} pool exists in this pack.`);
    return;
  }

  const count = newLevelInt - previousLevelInt;
  for (let i = 0; i < count; i += 1) {
    playUiSound('levelup', 0.9);
    const picks = pickN(rewardPool, 2);
    if (!picks.length) continue;
    const options = picks.map((pet) => ({ item: pet, frozen: false }));
    state.pendingTierUpQueue.push({
      rewardTier,
      options
    });
  }

  if (!state.pendingTierUp && state.pendingTierUpQueue.length > 0) {
    state.pendingTierUp = state.pendingTierUpQueue.shift();
    renderTierUpInline();
  }
}

function combineBoardPets(sourceIdx, targetIdx) {
  const source = state.board[sourceIdx];
  const target = state.board[targetIdx];

  if (!source || !target) {
    setStatus('Both board slots must have pets to stack.');
    return;
  }

  if (normalizeName(source.name) !== normalizeName(target.name)) {
    setStatus('You can only stack pets with the same name.');
    return;
  }

  if (getExpFromPet(target) >= 5) {
    setStatus(`${target.name} is already max level.`);
    return;
  }

  const gainedExp = getExpFromPet(source) + 1;
  const bumped = bumpPetLevelByExp(target, gainedExp);

  state.board[targetIdx] = bumped.pet;
  state.board[sourceIdx] = null;
  resetSelection();
  renderBoard();

  setStatus(`${bumped.pet.name} stacked to level ${bumped.pet.levelValue}.`);
  maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt);
  if (useCalculatorShopBridge() && bumped.newLevelInt > bumped.prevLevelInt) {
    triggerCalculatorLevelUp(targetIdx);
  }
}

function onBoardSlotClick(idx) {
  if (state.pendingTierUp) {
    setStatus('Choose a tier-up reward first.');
    return;
  }

  const clicked = state.board[idx];
  if (!clicked) {
    resetSelection();
    renderBoard();
    return;
  }

  if (state.boardSelectedIndex === null) {
    state.boardSelectedIndex = idx;
    renderBoard();
    setStatus(`Selected ${clicked.name}. Click matching pet to stack.`);
    return;
  }

  if (state.boardSelectedIndex === idx) {
    resetSelection();
    renderBoard();
    return;
  }

  combineBoardPets(state.boardSelectedIndex, idx);
}

function tryBuyShopPetToBoard(shopIdx, boardIdx) {
  const slot = state.shopPets[shopIdx];
  if (!slot || !slot.item) {
    setStatus('That shop pet slot is empty.');
    return;
  }

  if (state.pendingTierUp) {
    setStatus('Pick one tier-up pet first.');
    return;
  }

  if (state.gold < BUY_COST) {
    setStatus('Not enough gold.');
    return;
  }

  const boardPet = state.board[boardIdx];
  const shopPet = slot.item;

  if (!boardPet) {
    state.gold -= BUY_COST;
    if (useCalculatorShopBridge()) {
      triggerCalculatorSpendGold(BUY_COST);
    }
    state.board[boardIdx] = createBoardPetFromShopPet(shopPet);
    triggerBuyAbility(shopPet, boardIdx);
    triggerFriendSummonedAbilities(boardIdx);
    slot.item = null;
    slot.frozen = false;
    updateHud();
    renderBoard();
    renderShopPets();
    renderShopFoods();
    playPetBuySound(shopPet.name);
    setStatus(`Bought ${shopPet.name} and placed it on board slot ${boardIdx + 1}.`);
    return;
  }

  if (normalizeName(boardPet.name) !== normalizeName(shopPet.name)) {
    setStatus('Drop onto an empty slot or same pet to stack.');
    return;
  }

  if (getExpFromPet(boardPet) >= 5) {
    setStatus(`${boardPet.name} is already max level.`);
    return;
  }

  state.gold -= BUY_COST;
  if (useCalculatorShopBridge()) {
    triggerCalculatorSpendGold(BUY_COST);
  }
  const gainedExp = getExpFromPet(shopPet) + 1;
  const bumped = bumpPetLevelByExp(boardPet, gainedExp);
  state.board[boardIdx] = bumped.pet;
  triggerBuyAbility(shopPet, boardIdx);
  slot.item = null;
  slot.frozen = false;
  updateHud();
  renderBoard();
  renderShopPets();
  renderShopFoods();
  playPetBuySound(shopPet.name);
  setStatus(`Bought and stacked ${shopPet.name} to level ${bumped.pet.levelValue}.`);
  maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt);
  if (useCalculatorShopBridge() && bumped.newLevelInt > bumped.prevLevelInt) {
    triggerCalculatorLevelUp(boardIdx);
  }
}

function tryFeedFoodToBoard(listName, foodIdx, boardIdx) {
  const foodRef = getFoodSlotRef(listName, foodIdx);
  const slot = foodRef?.slot;
  if (!slot || !slot.item) {
    setStatus('That food slot is empty.');
    return;
  }
  if (state.pendingTierUp) {
    setStatus('Pick one tier-up pet first.');
    return;
  }
  const food = slot.item;
  const cost = Math.max(0, Number(food.cost ?? BUY_COST));
  if (state.gold < cost) {
    setStatus('Not enough gold.');
    return;
  }
  let resolvedBoardIdx = boardIdx;
  if ((!Number.isInteger(resolvedBoardIdx) || resolvedBoardIdx < 0 || resolvedBoardIdx >= BOARD_SIZE || !state.board[resolvedBoardIdx]) && foodNeedsTarget(food)) {
    setStatus('Drop food on a pet.');
    return;
  }
  if (!foodNeedsTarget(food) && (!Number.isInteger(resolvedBoardIdx) || resolvedBoardIdx < 0 || resolvedBoardIdx >= BOARD_SIZE || !state.board[resolvedBoardIdx])) {
    resolvedBoardIdx = state.board.findIndex(Boolean);
  }

  state.gold -= cost;
  if (useCalculatorShopBridge()) {
    triggerCalculatorSpendGold(cost);
  }
  const applied = applyFoodToBoardPet(food, resolvedBoardIdx, foodRef);
  if (!applied.ok) {
    state.gold += cost;
    setStatus(`Cannot use ${food.name}: ${applied.note}`);
    return;
  }

  removeFoodFromSlot(foodRef);
  if (useCalculatorShopBridge() && Number.isInteger(resolvedBoardIdx) && resolvedBoardIdx >= 0) {
    triggerCalculatorFoodEaten(resolvedBoardIdx, food.name);
  }
  updateHud();
  renderBoard();
  renderShopFoods();
  renderShopPets();
  setStatus(`Used ${food.name}${state.board[resolvedBoardIdx]?.name ? ` on ${state.board[resolvedBoardIdx].name}` : ''} (${applied.note}).`);
}

function moveBoardPetWithShift(fromIdx, toIdx) {
  if (fromIdx === toIdx) return;
  const moving = state.board[fromIdx];
  if (!moving) return;

  if (fromIdx < toIdx) {
    for (let i = fromIdx; i < toIdx; i += 1) {
      state.board[i] = state.board[i + 1];
    }
    state.board[toIdx] = moving;
  } else {
    for (let i = fromIdx; i > toIdx; i -= 1) {
      state.board[i] = state.board[i - 1];
    }
    state.board[toIdx] = moving;
  }
}

function bindBoardDrop(el, idx) {
  el.addEventListener('dragover', (ev) => {
    ev.preventDefault();
    el.classList.add('drag-target');
  });
  el.addEventListener('dragleave', () => {
    el.classList.remove('drag-target');
  });
  el.addEventListener('drop', (ev) => {
    ev.preventDefault();
    el.classList.remove('drag-target');
    const raw = ev.dataTransfer.getData('text/plain');
    if (raw.startsWith('shop-pet:')) {
      const shopIdx = Number(raw.split(':')[1]);
      if (Number.isNaN(shopIdx)) return;
      tryBuyShopPetToBoard(shopIdx, idx);
      return;
    }
    if (raw.startsWith('board-pet:')) {
      const fromIdx = Number(raw.split(':')[1]);
      if (Number.isNaN(fromIdx)) return;
      if (!state.board[fromIdx]) return;
      moveBoardPetWithShift(fromIdx, idx);
      resetSelection();
      renderBoard();
      setStatus('Repositioned pet.');
      return;
    }
    if (raw.startsWith('shop-food:')) {
      const parts = raw.split(':');
      const listName = parts[1];
      const foodIdx = Number(parts[2]);
      if (Number.isNaN(foodIdx)) return;
      tryFeedFoodToBoard(listName, foodIdx, idx);
      return;
    }
    if (raw.startsWith('food:')) {
      const parts = raw.split(':');
      const listName = parts[1];
      const foodIdx = Number(parts[2]);
      if (Number.isNaN(foodIdx)) return;
      tryFeedFoodToBoard(listName, foodIdx, idx);
    }
  });
}

function renderBoard() {
  boardSlots.innerHTML = '';

  state.board.forEach((pet, idx) => {
    const el = document.createElement('div');
    el.className = 'slot';
    el.dataset.boardSlot = String(idx);
    if (state.boardSelectedIndex === idx) {
      el.classList.add('selected');
    }

    if (!pet) {
      const empty = document.createElement('div');
      empty.className = 'name';
      empty.textContent = `Empty (${idx + 1})`;
      el.appendChild(empty);
      el.addEventListener('click', () => onBoardSlotClick(idx));
      bindBoardDrop(el, idx);
      boardSlots.appendChild(el);
      return;
    }

    bindHoverTooltip(el, 'pet', pet);
    el.draggable = true;
    el.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setData('text/plain', `board-pet:${idx}`);
      ev.dataTransfer.effectAllowed = 'move';
    });

    const media = renderCardImage(pet);
    const statsText = createPetStatsElement(pet);
    const levelText = document.createElement('div');
    levelText.className = 'level-text';
    levelText.textContent = `Level ${pet.levelValue ?? LEVEL_STEPS[0]}`;
    const perkName = typeof pet.equipment === 'string' ? pet.equipment : (pet.equipment?.name || '');
    const perkBadge = createPerkBadgeElement(perkName);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const sellBtn = document.createElement('button');
    sellBtn.textContent = '+1 Sell';
    sellBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      sellPetAtIndex(idx);
    });

    actions.appendChild(sellBtn);
    el.appendChild(media);
    el.appendChild(statsText);
    el.appendChild(levelText);
    if (perkBadge) el.appendChild(perkBadge);
    el.appendChild(actions);
    el.addEventListener('click', () => onBoardSlotClick(idx));
    bindBoardDrop(el, idx);
    boardSlots.appendChild(el);
  });
}

function renderShopPets() {
  petSlots.innerHTML = '';

  state.shopPets.forEach((slot, idx) => {
    const el = document.createElement('div');
    el.className = 'slot';

    if (!slot.item) {
      const empty = document.createElement('div');
      empty.className = 'name';
      empty.textContent = 'Empty';
      el.appendChild(empty);
      petSlots.appendChild(el);
      return;
    }

    const pet = slot.item;
    bindHoverTooltip(el, 'pet', { ...pet, levelInt: 1, levelValue: 1 });

    el.draggable = true;
    el.addEventListener('dragstart', (ev) => {
      ev.dataTransfer.setData('text/plain', `shop-pet:${idx}`);
      ev.dataTransfer.effectAllowed = 'move';
    });

    el.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      toggleFreezePetSlot(idx);
    });

    renderFrozenChip(el, slot.frozen);

    const media = renderCardImage(pet);
    const statsText = createPetStatsElement(pet);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const buyBtn = document.createElement('button');
    buyBtn.textContent = '-3 Buy';
    buyBtn.disabled = state.gold < BUY_COST || Boolean(state.pendingTierUp);
    buyBtn.addEventListener('click', () => {
      playUiSound('click', 0.7);
      const boardIdx = firstEmptyBoardSlot();
      if (boardIdx < 0) {
        setStatus('Board is full. Drag onto matching pet to stack, or sell first.');
        return;
      }
      tryBuyShopPetToBoard(idx, boardIdx);
    });

    const freezeBtn = document.createElement('button');
    freezeBtn.textContent = slot.frozen ? 'Unfreeze' : 'Freeze';
    freezeBtn.addEventListener('click', () => toggleFreezePetSlot(idx));

    actions.appendChild(buyBtn);
    actions.appendChild(freezeBtn);
    el.appendChild(media);
    el.appendChild(statsText);
    el.appendChild(actions);
    petSlots.appendChild(el);
  });
}

function renderShopFoods() {
  foodSlots.innerHTML = '';
  if (extraFoodSlots) extraFoodSlots.innerHTML = '';

  const renderFoodCard = (slot, idx, listName) => {
    const el = document.createElement('div');
    el.className = 'slot';

    if (!slot.item) {
      const empty = document.createElement('div');
      empty.className = 'name';
      empty.textContent = 'Empty';
      el.appendChild(empty);
      return el;
    }

    const food = slot.item;
    bindHoverTooltip(el, 'food', food);
    el.dataset.foodList = listName === 'extra' ? 'extra' : 'main';
    el.dataset.foodSlot = String(idx);
    el.draggable = true;
    el.addEventListener('dragstart', (ev) => {
      setFoodDragPayload(ev, listName, idx);
    });

    el.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      if (listName === 'extra') {
        toggleFreezeExtraFoodSlot(idx);
      } else {
        toggleFreezeFoodSlot(idx);
      }
    });

    renderFrozenChip(el, slot.frozen);

    const media = renderCardImage(food);
    media.draggable = true;
    media.addEventListener('dragstart', (ev) => setFoodDragPayload(ev, listName, idx));

    const name = document.createElement('div');
    name.className = 'name';
    const foodCost = Math.max(0, Number(food.cost ?? BUY_COST));
    name.textContent = `${food.name} (T${food.tier}, $${foodCost})`;
    name.draggable = true;
    name.addEventListener('dragstart', (ev) => setFoodDragPayload(ev, listName, idx));

    const actions = document.createElement('div');
    actions.className = 'actions';

    const freezeBtn = document.createElement('button');
    freezeBtn.textContent = slot.frozen ? 'Unfreeze' : 'Freeze';
    freezeBtn.addEventListener('click', () => {
      if (listName === 'extra') {
        toggleFreezeExtraFoodSlot(idx);
      } else {
        toggleFreezeFoodSlot(idx);
      }
    });
    freezeBtn.draggable = true;
    freezeBtn.addEventListener('dragstart', (ev) => setFoodDragPayload(ev, listName, idx));

    actions.appendChild(freezeBtn);
    el.appendChild(media);
    el.appendChild(name);
    el.appendChild(actions);
    return el;
  };

  state.shopFoods.forEach((slot, idx) => {
    foodSlots.appendChild(renderFoodCard(slot, idx, 'main'));
  });

  if (extraFoodSlots) {
    state.extraShopFoods.forEach((slot, idx) => {
      extraFoodSlots.appendChild(renderFoodCard(slot, idx, 'extra'));
    });
  }
}

function applyTurnTierFilters() {
  const pack = state.packs[String(state.currentPackId)];
  if (!pack) {
    state.currentPool.pets = [];
    state.currentPool.foods = [];
    return;
  }

  const maxTier = maxTierForTurn(state.turn);
  state.currentPool.pets = (pack.pets || []).filter((x) => x.tier <= maxTier);
  state.currentPool.foods = (pack.foods || []).filter((x) => x.tier <= maxTier);
}

function refillShop(preserveFrozen = true) {
  for (let i = 0; i < PET_SHOP_SIZE; i += 1) {
    const slot = state.shopPets[i];
    if (preserveFrozen && slot.frozen && slot.item) continue;
    const picked = randFrom(state.currentPool.pets);
    slot.item = picked ? { ...picked } : null;
    if (slot.item) {
      slot.item.baseAttack = Math.max(1, Number(slot.item.baseAttack || 1) + Number(state.cannedShopPetAtkBuff || 0));
      slot.item.baseHealth = Math.max(1, Number(slot.item.baseHealth || 1) + Number(state.cannedShopPetHpBuff || 0));
    }
    if (!slot.item) {
      slot.frozen = false;
    }
    if (!preserveFrozen) {
      slot.frozen = false;
    }
  }

  for (let i = 0; i < FOOD_SHOP_SIZE; i += 1) {
    const slot = state.shopFoods[i];
    if (preserveFrozen && slot.frozen && slot.item) continue;
    const picked = randFrom(state.currentPool.foods);
    slot.item = picked ? { ...picked, cost: Math.max(0, BUY_COST - state.foodDiscount) } : null;
    if (!slot.item) {
      slot.frozen = false;
    }
    if (!preserveFrozen) {
      slot.frozen = false;
    }
  }

  renderShopPets();
  renderShopFoods();
  animateShopRefresh();
}

function renderTierUpInline() {
  if (!state.pendingTierUp) {
    tierUpInline.classList.add('hidden');
    tierUpChoices.innerHTML = '';
    return;
  }

  const { rewardTier, options } = state.pendingTierUp;
  tierUpText.textContent = `Tier ${rewardTier} reward: pick 1. You can freeze options, then roll.`;
  tierUpChoices.innerHTML = '';

  options.forEach((slot, idx) => {
    const pet = slot?.item || null;
    const card = document.createElement('div');
    card.className = 'tier-up-choice slot';

    if (!pet) {
      const empty = document.createElement('div');
      empty.className = 'name';
      empty.textContent = 'Empty';
      card.appendChild(empty);
      tierUpChoices.appendChild(card);
      return;
    }

    bindHoverTooltip(card, 'pet', { ...pet, levelInt: 1, levelValue: 1 });
    renderFrozenChip(card, Boolean(slot.frozen));
    card.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      toggleFreezeTierUpOption(idx);
    });
    const media = renderCardImage(pet);
    const stats = createPetStatsElement(pet);
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = pet.name;

    const takeBtn = document.createElement('button');
    takeBtn.textContent = 'Take';
    takeBtn.addEventListener('click', () => chooseTierUpPet(idx));
    const freezeBtn = document.createElement('button');
    freezeBtn.textContent = slot.frozen ? 'Unfreeze' : 'Freeze';
    freezeBtn.addEventListener('click', () => toggleFreezeTierUpOption(idx));

    card.appendChild(media);
    card.appendChild(stats);
    card.appendChild(name);
    card.appendChild(takeBtn);
    card.appendChild(freezeBtn);
    tierUpChoices.appendChild(card);
  });

  const controls = document.createElement('div');
  controls.className = 'tier-up-choice slot';
  const title = document.createElement('div');
  title.className = 'name';
  title.textContent = 'Roll costs 1';
  const skipBtn = document.createElement('button');
  skipBtn.textContent = 'Skip';
  skipBtn.addEventListener('click', skipTierUpReward);
  controls.appendChild(title);
  controls.appendChild(skipBtn);
  tierUpChoices.appendChild(controls);

  tierUpInline.classList.remove('hidden');
}

function toggleFreezeTierUpOption(idx) {
  if (!state.pendingTierUp) return;
  const slot = state.pendingTierUp.options[idx];
  if (!slot || !slot.item) return;
  slot.frozen = !slot.frozen;
  playUiSound(slot.frozen ? 'freeze' : 'unfreeze', 0.85);
  renderTierUpInline();
}

function rerollPendingTierUpOptions() {
  if (!state.pendingTierUp) return;
  const { rewardTier } = state.pendingTierUp;
  const pack = state.packs[String(state.currentPackId)];
  if (!pack) return;
  const rewardPool = (pack.pets || []).filter((p) => p.tier === rewardTier);
  if (!rewardPool.length) return;
  state.pendingTierUp.options = state.pendingTierUp.options.map((slot) => {
    if (slot?.frozen && slot?.item) return slot;
    return {
      item: randFrom(rewardPool),
      frozen: false
    };
  });
  renderTierUpInline();
  setStatus(`Rolled tier-up choices (Tier ${rewardTier}). Frozen choices stayed.`);
}

function chooseTierUpPet(optionIndex) {
  if (!state.pendingTierUp) return;
  playUiSound('click', 0.7);

  const pet = state.pendingTierUp.options[optionIndex]?.item || null;
  if (!pet) return;

  const placed = placeTierUpPetOnBoard(pet);
  if (!placed) {
    setStatus('Board is full. Sell or reposition to make space for tier-up pet.');
    return;
  }

  state.pendingTierUp = state.pendingTierUpQueue.length > 0 ? state.pendingTierUpQueue.shift() : null;
  renderTierUpInline();
  renderBoard();
  renderShopPets();
  setStatus(`Took ${pet.name} and placed it on your board.`);
}

function placeTierUpPetIntoShop(pet) {
  const emptyShopSlot = firstEmptyShopPetSlot();
  if (emptyShopSlot >= 0) {
    state.shopPets[emptyShopSlot].item = { ...pet };
    state.shopPets[emptyShopSlot].frozen = false;
    return;
  }
  const replaceIdx = state.shopPets.findIndex((s) => !s.frozen);
  const idx = replaceIdx >= 0 ? replaceIdx : 0;
  state.shopPets[idx].item = { ...pet };
  state.shopPets[idx].frozen = false;
}

function placeTierUpPetOnBoard(pet) {
  const boardIdx = firstEmptyBoardSlot();
  if (boardIdx < 0) return false;
  state.board[boardIdx] = createBoardPetFromShopPet({ ...pet });
  triggerFriendSummonedAbilities(boardIdx);
  return true;
}

function claimFrozenTierUpOptions() {
  if (!state.pendingTierUp) return 0;
  const frozenPets = state.pendingTierUp.options
    .filter((slot) => slot?.frozen && slot?.item)
    .map((slot) => slot.item);
  if (!frozenPets.length) return 0;

  frozenPets.forEach((pet) => placeTierUpPetIntoShop(pet));
  state.pendingTierUp = state.pendingTierUpQueue.length > 0 ? state.pendingTierUpQueue.shift() : null;
  renderTierUpInline();
  renderShopPets();
  return frozenPets.length;
}

function skipTierUpReward() {
  playUiSound('click', 0.7);
  state.pendingTierUp = state.pendingTierUpQueue.length > 0 ? state.pendingTierUpQueue.shift() : null;
  renderTierUpInline();
  setStatus('Skipped tier-up reward.');
}

function switchPack(packId) {
  state.currentPackId = packId;
  state.turn = 1;
  state.gold = START_GOLD;
  state.nextTurnBonusGold = 0;
  state.phase = 'during';
  state.foodDiscount = 0;
  state.cannedShopPetAtkBuff = 0;
  state.cannedShopPetHpBuff = 0;
  state.peachUpgradeBonus = 0;
  state.lastBattleLost = false;
  state.rollsThisTurn = 0;
  state.playerToy = null;
  state.playerToyLevel = 1;
  state.board = Array(BOARD_SIZE).fill(null);
  resetSelection();
  state.pendingTierUp = null;
  state.pendingTierUpQueue = [];
  state.battleReport = null;
  renderBattleReport();
  clearTooltip();
  renderTierUpInline();

  state.shopPets = Array.from({ length: PET_SHOP_SIZE }, () => ({ item: null, frozen: false }));
  state.shopFoods = Array.from({ length: FOOD_SHOP_SIZE }, () => ({ item: null, frozen: false }));
  state.extraShopFoods = Array.from({ length: EXTRA_FOOD_SHOP_SIZE }, () => ({ item: null, frozen: false }));

  applyTurnTierFilters();
  refillShop(false);
  const startLogs = runStartOfTurnPhase();
  renderBoard();
  renderShopFoods();
  renderShopPets();
  updateHud();
  packSelect.value = String(packId);

  const pack = state.packs[String(packId)];
  const maxTier = maxTierForTurn(state.turn);

  if (!pack || !(pack.pets || []).length) {
    setStatus(`Pack ${packId} has no data yet. Pack 1 is configured.`);
    return;
  }

  const missingPets = state.currentPool.pets.filter((x) => !x.path).length;
  const missingFoods = state.currentPool.foods.filter((x) => !x.path).length;
  const globalMissingPets = state.textureAudit?.missingPets?.length || 0;
  const globalMissingFoods = state.textureAudit?.missingFoods?.length || 0;
  const globalAuditTail = (globalMissingPets || globalMissingFoods)
    ? ` Global P2-P5 missing textures: pets ${globalMissingPets}, foods ${globalMissingFoods}.`
    : '';

  if (missingPets || missingFoods) {
    setStatus(`${pack.name} loaded (Turn ${state.turn}, up to Tier ${maxTier}). Start phase done${startLogs.length ? ` (${startLogs.length} triggers)` : ''}. Missing textures: pets ${missingPets}, foods ${missingFoods}.${globalAuditTail}`);
    return;
  }

  setStatus(`${pack.name} loaded (Turn ${state.turn}, up to Tier ${maxTier}). Start phase done${startLogs.length ? ` (${startLogs.length} triggers)` : ''}.${globalAuditTail}`);
}

function rollShop() {
  playUiSound('click', 0.7);
  if (state.pendingTierUp) {
    if (state.gold < ROLL_COST) {
      setStatus('Not enough gold to roll.');
      return;
    }
    state.gold -= ROLL_COST;
    state.rollsThisTurn += 1;
    if (useCalculatorShopBridge()) {
      triggerCalculatorSpendGold(ROLL_COST);
      triggerCalculatorRoll();
    }
    const claimed = claimFrozenTierUpOptions();
    if (claimed > 0) {
      updateHud();
      setStatus(`Claimed ${claimed} frozen tier-up pet${claimed > 1 ? 's' : ''} into the pet shop. Other tier-up options were removed.`);
      return;
    }
    rerollPendingTierUpOptions();
    updateHud();
    return;
  }

  if (!state.currentPool.pets.length || !state.currentPool.foods.length) {
    setStatus('Selected pack has no available data for this turn.');
    return;
  }

  if (state.gold < ROLL_COST) {
    setStatus('Not enough gold to roll.');
    return;
  }

  state.gold -= ROLL_COST;
  state.rollsThisTurn += 1;
  if (useCalculatorShopBridge()) {
    triggerCalculatorSpendGold(ROLL_COST);
    triggerCalculatorRoll();
  }
  refillShop(true);
  updateHud();
  setStatus('Rolled new pets and food. Frozen slots stayed in place.');
}

async function endTurn() {
  playUiSound('click', 0.7);
  if (state.battleInProgress) return;
  if (state.pendingTierUp) {
    setStatus('Choose or skip your tier-up reward first.');
    return;
  }

  state.battleInProgress = true;
  state.phase = 'battle';
  const endLogs = runEndOfTurnPhase();
  let battleLabel = 'No battle';
  try {
    const activeCount = state.board.filter(Boolean).length;
    if (activeCount > 0) {
      const report = simulateBattleOnce();
      await playBattleScene(report);
      battleLabel = report.winner === 'player' ? 'Win' : report.winner === 'opponent' ? 'Loss' : 'Draw';
    } else {
      state.battleReport = {
        turn: state.turn,
        winner: 'draw',
        opponentPackName: 'N/A',
        playerTeamNames: [],
        opponentTeamNames: [],
        logs: [{ message: 'No pets on your board. Battle skipped.' }],
        phaseCounts: { beforeBattle: 0, startBattle: 0, afterStartBattle: 0 }
      };
      state.lastBattleLost = false;
      renderBattleReport();
      await playBattleScene(state.battleReport);
      battleLabel = 'Skipped (no team)';
    }
  } catch (err) {
    battleLabel = 'Simulation error';
    state.lastBattleLost = false;
    setStatus(`Battle simulation failed: ${err.message}`);
  } finally {
    state.battleInProgress = false;
    state.phase = 'during';
  }

  state.turn += 1;
  state.rollsThisTurn = 0;
  clearExpiredTemporaryEffects();
  const bonusGold = Number(state.nextTurnBonusGold || 0);
  state.gold = START_GOLD + bonusGold;
  state.nextTurnBonusGold = 0;
  resetSelection();
  clearTooltip();
  applyTurnTierFilters();
  refillShop(true);
  const startLogs = runStartOfTurnPhase();
  renderBoard();
  renderShopFoods();
  renderShopPets();
  updateHud();
  setStatus(`Turn ${state.turn} started. Last battle: ${battleLabel}. Turn flow: end(${endLogs.length}) -> battle -> start(${startLogs.length}). Gold: ${state.gold}. Shop now allows up to Tier ${maxTierForTurn(state.turn)}.`);
}

function applyRandomWallpaper() {
  const wp = randFrom(state.wallpapers);
  if (!wp) return;

  document.body.style.backgroundImage = `linear-gradient(rgba(9,11,13,0.5), rgba(9,11,13,0.45)), url('${wp.path}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
}

function hydratePackData(packData) {
  const packs = packData.packs || {};
  const out = {};
  const toArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value && typeof value === 'object') return Object.values(value);
    return [];
  };

  Object.keys(packs).forEach((packId) => {
    const pack = packs[packId];
    const pets = toArray(pack?.pets);
    const foods = toArray(pack?.foods);
    out[packId] = {
      name: pack?.name || `Pack ${packId}`,
      pets: pets.map((p) => ({
        ...p,
        path: resolveTexture(p.name)
      })),
      foods: foods.map((f) => ({
        ...f,
        path: resolveTexture(f.name)
      }))
    };
  });

  state.packs = out;
}

function computeTextureAudit(packIds = [2, 3, 4, 5]) {
  const missingPets = [];
  const missingFoods = [];
  packIds.forEach((id) => {
    const pack = state.packs[String(id)];
    if (!pack) return;
    (pack.pets || []).forEach((p) => {
      if (!p.path) missingPets.push({ packId: id, pack: pack.name, name: p.name });
    });
    (pack.foods || []).forEach((f) => {
      if (!f.path) missingFoods.push({ packId: id, pack: pack.name, name: f.name });
    });
  });
  return {
    packIds: [...packIds],
    missingPets,
    missingFoods
  };
}

async function loadManifest() {
  const res = await fetch('assets-manifest.json');
  if (!res.ok) {
    throw new Error(`Manifest load failed: ${res.status}`);
  }

  const manifest = await res.json();
  state.wallpapers = manifest.wallpapers || [];
  state.textureLookup = manifest.textureLookup || {};
  state.soundLookup = manifest.soundLookup || {};
  state.spriteTxtPath = manifest.spriteTxtPath || '';
}

async function loadPackData() {
  const res = await fetch('pack-data.json');
  if (!res.ok) {
    throw new Error(`Pack data load failed: ${res.status}`);
  }

  return res.json();
}

async function verifySpriteData() {
  if (!state.spriteTxtPath) return;

  try {
    const res = await fetch(state.spriteTxtPath);
    if (!res.ok) return;
    const txt = await res.text();
    const lines = txt.split(/\r?\n/).length;
    setStatus(`Loaded sprite data (${lines} lines).`);
  } catch (_) {
    setStatus('Shop loaded. Sprite data file not readable from this host path.');
  }
}

async function init() {
  try {
    await loadManifest();
    try {
      await loadCalculatorSim();
    } catch (err) {
      setStatus(`Calculator not loaded: ${err.message}`);
    }
    const packData = await loadPackData();

    hydratePackData(packData);
    state.textureAudit = computeTextureAudit([2, 3, 4, 5]);
    if ((state.textureAudit.missingPets.length + state.textureAudit.missingFoods.length) > 0) {
      console.log('Missing textures in P2-P5', state.textureAudit);
    }
    applyRandomWallpaper();
    renderBattleReport();
    updateHud();
    renderBoard();

    renderToyPickerOptions();
    if (playerToyLevelInput) playerToyLevelInput.value = '1';

    packSelect.value = '1';
    switchPack(1);
    await verifySpriteData();
  } catch (err) {
    setStatus(`Startup error: ${err.message}`);
  }
}

rollBtn.addEventListener('click', rollShop);
restartBtn.addEventListener('click', () => {
  playUiSound('click', 0.7);
  const ok = window.confirm('Restart game from turn 1 with current pack?');
  if (!ok) return;
  switchPack(state.currentPackId);
  setStatus('Game restarted.');
});
endTurnBtn.addEventListener('click', endTurn);
tierUpSkipBtn.addEventListener('click', skipTierUpReward);
if (playerToyInput) {
  playerToyInput.addEventListener('change', () => {
    const forced = getForcedToyChoice();
    if (forced) {
      state.forcedToyName = forced.name;
      state.forcedToyLevel = forced.level;
      state.playerToy = forced.name;
      state.playerToyLevel = forced.level;
    } else {
      state.forcedToyName = null;
      state.playerToy = null;
      state.playerToyLevel = 1;
    }
    renderBattleReport();
  });
}
if (playerToyLevelInput) {
  playerToyLevelInput.addEventListener('change', () => {
    const lvl = Math.max(1, Math.min(3, Number(playerToyLevelInput.value || 1)));
    playerToyLevelInput.value = String(lvl);
    state.forcedToyLevel = lvl;
    if (state.forcedToyName) state.playerToyLevel = lvl;
    renderBattleReport();
  });
}
window.addEventListener('scroll', clearTooltip, true);
if (battleSkipBtn) {
  battleSkipBtn.addEventListener('click', () => {
    state.battlePlaybackSkip = true;
  });
}

packSelect.addEventListener('change', (e) => {
  const packId = Number(e.target.value);
  if (packId === state.currentPackId) return;
  const ok = window.confirm('Switching packs will fully restart your game. Continue?');
  if (!ok) {
    packSelect.value = String(state.currentPackId);
    return;
  }
  playUiSound('click', 0.7);
  switchPack(packId);
});

init();
