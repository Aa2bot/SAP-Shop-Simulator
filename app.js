const START_GOLD = 10;
const BUY_COST = 3;
const TIER_UP_COST = 3;
const ROLL_COST = 1;
const SELL_VALUE = 1;
const BOARD_SIZE = 5;
const PET_SHOP_SIZE = 3;
const FOOD_SHOP_SIZE = 1;
const EXTRA_FOOD_SHOP_SIZE = 5;
const LEVEL_STEPS = [1, 1.5, 2, 2.5, 2.75, 3];
const MAGPIE_STORED_GOLD_CAP_BY_LEVEL = {
  1: 1,
  2: 2,
  3: 3
};
const HEART_ICON = 'assets/sap_textures/Texture2D/Heart.png';
const FIST_ICON = 'assets/sap_textures/Texture2D/Fist.png';
const ICE_ICON = 'assets/sap_textures/Texture2D/Icecube.png';
const UI_SOUNDS = {
  click: 'click',
  freeze: 'freeze',
  unfreeze: 'unfreeze',
  levelup: 'levelup',
  toybreak: 'deny'
};

const ALIASES = {
  penguin: 'africanpenguin',
  sleepingpill: 'pill'
};

const TEXTURE_ALIASES = {
  germanshepherd: 'germanshepard',
  belugawhale: 'belugasturgeon',
  birdofparadise: 'paradisebird',
  mantisshrimp: 'shrimpmantis',
  snappingturtle: 'snappingjawturtle',
  tahr: 'arabiantahr',
  wormofsand: 'sandworm',
  peachofimmortality: 'immortalpeach',
  waterofyouth: 'youthwater',
  purplefrog: 'frog',
  bilby: 'mouse',
  lemming: 'mouse',
  lime: 'slime',
  squash: 'watermelon',
  bokchoy: 'cucumber',
  honeydewmelon: 'watermelon',
  pumpkin: 'watermelon'
};

const SUPPLEMENTAL_TEXTURE_LOOKUP = {
  bilby: 'assets/sap_textures/Texture2D/Bilby.png',
  lemming: 'assets/sap_textures/Texture2D/Lemming.png',
  purplefrog: 'assets/sap_textures/Texture2D/PurpleFrog.png',
  lime: 'assets/sap_textures/Texture2D/Lime.png',
  squash: 'assets/sap_textures/Texture2D/Squash.png',
  bokchoy: 'assets/sap_textures/Texture2D/BokChoy.png',
  honeydewmelon: 'assets/sap_textures/Texture2D/HoneydewMelon.png',
  pumpkin: 'assets/sap_textures/Texture2D/Pumpkin.png'
};

const DEFAULT_PERK_NOTES = {
  honey: 'Faint: Summon one 1/1 Bee.',
  egg: 'Before attack: Deal 2 damage to the target once.',
  cashewnut: 'Before battle: Deal 1 damage to the second nearest pet ahead (double vs enemies).',
  strawberry: 'Faint: Give back-most friend +1/+1.',
  healthpotion: 'Before battle: Give front-most friend +2 health.',
  grosmichelbanana: 'Before attack: Transform into an Ant.',
  unagi: 'Before attack: Deal 2 damage to a random enemy.',
  blueberry: 'Enemy random abilities target this pet first.',
  macaron: 'Activates after other pets with the same trigger.',
  nachos: 'Before attack: Convert up to 3 health into attack.',
  walnut: 'Block 2 damage once.',
  meatbone: 'Attacks deal +3 damage.',
  lime: 'Takes 1 less damage.',
  rice: 'Sell for +2 gold.',
  caramel: 'Before attack: Combine friendly Caramels to deal 3 damage to healthiest enemy once.',
  bokchoy: 'When about to faint: Gain +3 health once.',
  cherries: 'Before battle: Gain 2 trumpets.',
  chocolatecake: 'Before attack: Gain +3 XP and faint.',
  faintbread: 'Faint: Summon a random tier 1 faint pet.',
  fairydust: 'If space ahead is empty: Jump forward and gain +2 mana once.',
  codroe: 'Faint: Summon a 2/3 Fish.',
  sudduthtomato: 'Hurt: If still alive, gain +1 permanent health once.',
  radish: 'Before battle: Gain a random useful perk from this pet tier.',
  coconut: 'Prevent all damage once.',
  melon: 'Prevent up to 20 damage once.',
  garlic: 'Take less damage from attacks.',
  blackberry: 'Gain +1 attack and +2 health.',
  croissant: 'End turn: Gain +1 attack.',
  squash: 'Before attack: Remove 6 attack from target once.',
  cucumber: 'End turn: Gain +1 health.',
  fig: 'Before attack: Deal 4 damage to lowest-health enemy once.',
  whitetruffle: 'Friend faints: Gain +4 attack and jump-attack highest-attack enemy once.',
  brusselssprout: 'Block being pushed or gain 5 XP once.',
  cake: 'End turn: Gain +2/+2 until next turn.',
  pineapple: 'Ability deals +2 extra damage three times.',
  pie: 'Before battle: Gain +4 attack and +3 health.',
  salt: 'Attack for double damage once.',
  sausage: 'Start of turn: Gain one free roll.',
  baguette: 'Before attack: Remove front enemy perk once.',
  cheese: 'Attack with at least 15 attack once.',
  grapes: 'Start of turn: Gain +1 gold.',
  banana: 'Faint: Summon a 4/4 Monkey.',
  potato: 'Block 10 damage from abilities/perks twice.',
  ambrosia: 'Block ailment or 8 damage once.',
  lovepotion: 'Before battle: Summon a 5/5 copy.',
  maplesyrup: 'Attack for 50% damage and block 50% damage three times.',
  donut: 'Friendly random abilities prioritize this pet.',
  fortunecookie: '50% chance to deal double attack damage.',
  oystermushroom: 'Before attack: Set stats to at least 9/9 once.',
  chili: 'Also attack second enemy for 5 damage.',
  lemon: 'Block 7 damage twice.',
  carrot: 'End turn: Gain +1/+1.',
  pepper: 'Health cannot drop below 1 (removed after trigger).',
  durian: 'Before attack: Remove 33% health from healthiest enemy once.',
  honeydewmelon: 'Block 10 damage and gain +5 attack once.',
  mushroom: 'Faint: Revive as 1/1.',
  steak: 'Attack with +20 damage once.',
  pancakes: 'Before battle: Give all friends +2/+2.',
  popcorn: 'Faint: Summon random pet from same tier.',
  pitabread: 'Faint: Gain +15 health once.',
  tomato: 'Before attack: Deal 10 damage to last enemy once.',
  yggdrasilfruit: 'Faint: Summon two 5/5 Nordic Goats.',
  sardiniancurrant: 'Start of turn: Gain +2 gold.',
  whiteokra: 'Block 10 damage twice or block one ailment.',
  peanut: 'Knock out any pet it damages.',
  peanutbutter: 'Knock out damaged pet once.',
  rambutan: 'Before attack: Gain +3 mana.',
  goldenegg: 'Before attack: Deal 6 damage once.',
  skewer: 'Also attack second and third enemies for 3 damage.'
};

const PERK_CANONICAL_NAMES = {
  meatbone: 'Meat Bone',
  riceball: 'Rice',
  goldenegg: 'Golden Egg',
  peanutbutter: 'Peanut Butter',
  grosmichelbanana: 'Gros Michel Banana',
  sardiniancurrant: 'Sardinian Currant',
  whiteokra: 'White Okra',
  healthpotion: 'Health Potion',
  cashewnut: 'Cashew Nut',
  bokchoy: 'Bok Choy',
  codroe: 'Cod Roe',
  sudduthtomato: 'Sudduth Tomato',
  brusselssprout: 'Brussels Sprout',
  yggdrasilfruit: 'Yggdrasil Fruit',
  pitabread: 'Pita Bread',
  honeydewmelon: 'Honeydew Melon',
  maplesyrup: 'Maple Syrup',
  whitetruffle: 'White Truffle',
  lovepotion: 'Love Potion',
  fortunecookie: 'Fortune Cookie',
  oystermushroom: 'Oyster Mushroom'
};

const AILMENT_CANONICAL_NAMES = {
  spooked: 'Spooked',
  toasty: 'Toasty',
  weak: 'Weak',
  cold: 'Cold',
  ink: 'Ink',
  confused: 'Confused',
  confusion: 'Confused',
  silly: 'Silly',
  webbed: 'Webbed',
  web: 'Webbed',
  tasty: 'Tasty',
  sleepy: 'Sleepy',
  dazed: 'Dazed',
  crisp: 'Crisp',
  bloated: 'Bloated',
  bloat: 'Bloated',
  cursed: 'Cursed',
  curse: 'Cursed',
  icky: 'Icky'
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
const TRIGGER_DEBUG_LIMIT = 120;
const TURN_ABILITY_STEP_MS = 300;
const MECHANICS_MODE = 'calculator_authoritative';
const WIKI_REFERENCE_LINKS = {
  pets: 'https://superautopets.wiki.gg/wiki/Pets',
  foodPerks: 'https://superautopets.wiki.gg/wiki/Food_Perks',
  food: 'https://superautopets.wiki.gg/wiki/Food',
  toys: 'https://superautopets.wiki.gg/wiki/Toys',
  tokens: 'https://superautopets.wiki.gg/wiki/Tokens',
  mana: 'https://superautopets.wiki.gg/wiki/Mana',
  trumpet: 'https://superautopets.wiki.gg/wiki/Trumpet'
};

const TOY_DEFINITIONS = [
  { name: 'Balloon', tier: 1, effect: 'Break: Give right-most friend +1/+1 (scales with pet level).', sourcePet: 'Ferret', pack: 'Puppy Pack' },
  { name: 'Tennis Ball', tier: 1, effect: 'Start of battle: Deal damage to two random enemies (scales with level).', sourcePet: 'Ferret', pack: 'Puppy Pack' },
  { name: 'Radio', tier: 2, effect: 'Break: Give all friends +health (scales with level).', sourcePet: 'Lemur', pack: 'Puppy Pack' },
  { name: 'Garlic Press', tier: 2, effect: 'Start of battle: Give right-most friend Garlic perk (scales to multiple friends).', sourcePet: 'Lemur', pack: 'Puppy Pack' },
  { name: 'Toilet Paper', tier: 3, effect: 'Start of battle: Make first 1-3 enemies Weak.', sourcePet: 'Puppy', pack: 'Puppy Pack' },
  { name: 'Oven Mitts', tier: 3, effect: 'Break: Stock free Lasagnas (1-3).', sourcePet: 'Puppy', pack: 'Puppy Pack' },
  { name: 'Melon Helmet', tier: 4, effect: 'Break: Give right-most friends Melon perk.', sourcePet: 'Gharial', pack: 'Puppy Pack' },
  { name: 'Foam Sword', tier: 4, effect: 'Start of battle: Deal 6 damage to image target (scales with level).', sourcePet: 'Gharial', pack: 'Puppy Pack' },
  { name: 'Toy Gun', tier: 4, effect: 'Start of battle: Deal 6 damage to last enemy (scales with level).', sourcePet: 'Gharial', pack: 'Puppy Pack' },
  { name: 'Flashlight', tier: 5, effect: 'Break: Give right-most friend +6/+6 (scales with level).', sourcePet: 'Sting Ray', pack: 'Puppy Pack' },
  { name: 'Stinky Sock', tier: 5, effect: 'Start of battle: Reduce highest-health enemy by 40% (scales with level).', sourcePet: 'Sting Ray', pack: 'Puppy Pack' },
  { name: 'Television', tier: 6, effect: 'Break: Give all friends +attack and +health (scales with level).', sourcePet: 'Mongoose', pack: 'Puppy Pack' },
  { name: 'Peanut Jar', tier: 6, effect: 'Start of battle: Give right-most friend(s) Peanut perk (scales with level).', sourcePet: 'Mongoose', pack: 'Puppy Pack' },
  { name: 'Air Palm Tree', tier: 6, effect: 'Start of battle: Give right-most friend(s) Coconut perk (scales with level).', sourcePet: 'Mongoose', pack: 'Puppy Pack' },
  { name: 'Magic Carpet', tier: '1-3', effect: 'Friend summoned: Gain image attack bonus (scales by level).', sourcePet: 'Sphinx', pack: 'Unicorn Pack' },
  { name: 'Magic Lamp', tier: '1-3', effect: 'Friendly level-up: Grant image stat bonus (scales by level).', sourcePet: 'Sphinx', pack: 'Unicorn Pack' },
  { name: 'Winged Sandals', tier: '1-3', effect: 'End turn: Gain 1-3 free rolls next turn.', sourcePet: 'Griffin', pack: 'Unicorn Pack' },
  { name: 'Treasure Map', tier: '1-3', effect: 'Break: Summon a Treasure Chest.', sourcePet: 'Griffin', pack: 'Unicorn Pack' },
  { name: 'Treasure Chest', tier: '1-3', effect: 'Break: Stock free pet from Tier 2/4/6.', sourcePet: 'Treasure Map', pack: 'Unicorn Pack' },
  { name: 'Nutcracker', tier: '1-3', effect: 'All friends fainted: Summon Salmon of Knowledge (scales 6/6 -> 18/18).', sourcePet: 'Fairy', pack: 'Unicorn Pack' },
  { name: 'Tinder Box', tier: '1-3', effect: 'Empty front space: Summon Giant Eyes Dog (scales 6/6 -> 18/18).', sourcePet: 'Fairy', pack: 'Unicorn Pack' },
  { name: 'Pandoras Box', tier: '1-3', effect: 'Start of battle: Give all pets random perks and ailments.', sourcePet: 'Bad Dog', pack: 'Unicorn Pack' },
  { name: 'Evil Book', tier: '1-3', effect: 'Empty front space: Summon Great One (scales damage by level).', sourcePet: 'Bad Dog', pack: 'Unicorn Pack' },
  { name: 'Excalibur', tier: '1-3', effect: 'End turn: Back-most friend gains scaling stats for 30 turns.', sourcePet: 'Questing Beast', pack: 'Unicorn Pack' },
  { name: 'Holy Grail', tier: '1-3', effect: 'Break: Summon free Holy Water (1-3).', sourcePet: 'Questing Beast', pack: 'Unicorn Pack' },
  { name: 'Microwave Oven', tier: '1-3', effect: 'Start of battle: Give Popcorn perk to front-most perkless friends.', sourcePet: 'Vervet', pack: 'Golden Pack' },
  { name: 'Witch Broom', tier: '1-3', effect: 'Start of battle: Make random perk-less enemies Weak (scales with level).', sourcePet: 'Cuddle Toad', pack: 'Unicorn Pack' }
];

const state = {
  gold: START_GOLD,
  turn: 1,
  phase: 'during',
  foodDiscount: 0,
  nextTurnBonusGold: 0,
  freeRolls: 0,
  nextTurnFreeRolls: 0,
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
  referenceData: {
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
  playerToyExplicitlySelected: false,
  teamToys: {
    player: null,
    opponent: null
  },
  pendingToyBreakFx: [],
  toyBreakListeners: [],
  toyBreakEventSeen: {},
  battleGeckoToyBreakBindings: [],
  toyChoices: [],
  toyChoiceContext: null,
  battleReport: null,
  battlePlaybackSkip: false,
  battleInProgress: false,
  textureAudit: null,
  rollsThisTurn: 0,
  rollCounterPulseUntilBySlot: Array.from({ length: BOARD_SIZE }, () => 0),
  rollCounterHideTimer: null,
  rollAbilityTagsByPetKey: {},
  rollTagFallbackUsed: false,
  level3SoldThisTurn: 0,
  summonedThisTurn: 0,
  nameIdAliases: {},
  perkNotes: { ...DEFAULT_PERK_NOTES },
  lastToySource: null,
  toyModalOpen: false,
  colorBlindMode: false,
  uiScale: 1,
  uiFilters: {
    sort: 'none',
    query: ''
  },
  battleActive: {
    side: null,
    idx: -1
  },
  toyModalFocusIndex: 0,
  battleReportModalOpen: false,
  debugRootCauseLogged: {},
  rollActionLocked: false,
  lastRollInputAt: 0,
  shopAilmentBySlot: Array.from({ length: BOARD_SIZE }, () => ''),
  shopManaBySlot: Array.from({ length: BOARD_SIZE }, () => 0),
  battleAilmentBySide: {
    player: Array.from({ length: BOARD_SIZE }, () => ''),
    opponent: Array.from({ length: BOARD_SIZE }, () => '')
  },
  battleManaBySide: {
    player: Array.from({ length: BOARD_SIZE }, () => 0),
    opponent: Array.from({ length: BOARD_SIZE }, () => 0)
  },
  battleManaRenderBySide: {
    player: Array.from({ length: BOARD_SIZE }, () => 0),
    opponent: Array.from({ length: BOARD_SIZE }, () => 0)
  },
  lastBattleRenderBySide: {
    player: [],
    opponent: []
  },
  debugTriggerLog: [],
  levelHistoryBySlot: Array.from({ length: BOARD_SIZE }, () => []),
  toyModalCloseTimer: null,
  battleReportModalCloseTimer: null
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
const activeToySlot = document.getElementById('activeToySlot');
const toyChoiceSlots = document.getElementById('toyChoiceSlots');
const toyPickerModal = document.getElementById('toyPickerModal');
const toyPickerTitle = document.getElementById('toyPickerTitle');
const toyPickerContext = document.getElementById('toyPickerContext');
const toyPickerCloseBtn = document.getElementById('toyPickerCloseBtn');
const battleReportModal = document.getElementById('battleReportModal');
const battleReportBtn = document.getElementById('battleReportBtn');
const battleReportCloseBtn = document.getElementById('battleReportCloseBtn');
const inventorySlots = document.getElementById('inventorySlots');
const itemSortSelect = document.getElementById('itemSortSelect');
const itemFilterInput = document.getElementById('itemFilterInput');
const colorBlindToggle = document.getElementById('colorBlindToggle');
const uiZoomRange = document.getElementById('uiZoomRange');
const tierUpInline = document.getElementById('tierUpInline');
const tierUpText = document.getElementById('tierUpText');
const tierUpChoices = document.getElementById('tierUpChoices');
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
const battleOpponentToy = document.getElementById('battleOpponentToy');
const battlePlayerToy = document.getElementById('battlePlayerToy');

function normalizeName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

const TOYS_BY_SOURCE = TOY_DEFINITIONS.reduce((acc, toy) => {
  const key = normalizeName(toy.sourcePet);
  if (!acc[key]) acc[key] = [];
  acc[key].push(toy);
  return acc;
}, {});

const TOYS_BY_NAME = TOY_DEFINITIONS.reduce((acc, toy) => {
  acc[normalizeName(toy.name)] = toy;
  return acc;
}, {});

function resolveTexture(name) {
  const raw = String(name || '').trim();
  const key = normalizeName(raw);
  const aliasKey = ALIASES[key];
  const textureAliasKey = TEXTURE_ALIASES[key];
  const nameIdAliasKey = state.nameIdAliases[key];
  const direct = state.textureLookup[key]
    || SUPPLEMENTAL_TEXTURE_LOOKUP[key]
    || (textureAliasKey ? state.textureLookup[textureAliasKey] : null)
    || (textureAliasKey ? SUPPLEMENTAL_TEXTURE_LOOKUP[textureAliasKey] : null)
    || (nameIdAliasKey ? state.textureLookup[nameIdAliasKey] : null)
    || (nameIdAliasKey ? SUPPLEMENTAL_TEXTURE_LOOKUP[nameIdAliasKey] : null)
    || (aliasKey ? state.textureLookup[aliasKey] : null);
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

function resolvePetTexture(name) {
  const key = normalizeName(name);
  if (!key) return null;
  const exact = state.textureLookup[key] || SUPPLEMENTAL_TEXTURE_LOOKUP[key];
  if (exact) return exact;
  const resolved = resolveTexture(name);
  if (!resolved) return null;
  const filename = String(resolved.split('/').pop() || '').replace(/\.[^.]+$/, '');
  const fileKey = normalizeName(filename);
  const looksVariant = fileKey === `no${key}`
    || fileKey === `${key}preview`
    || fileKey === `${key}draw`
    || fileKey === `${key}battle`
    || fileKey === `${key}build`
    || fileKey === `${key}victory`
    || fileKey === `${key}defeat`
    || fileKey === `${key}posejump`
    || fileKey === `${key}posefall`;
  if (looksVariant) {
    const fallback = state.textureLookup[key] || SUPPLEMENTAL_TEXTURE_LOOKUP[key];
    if (fallback) return fallback;
  }
  return resolved;
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
  const copy = Array.isArray(list) ? [...list] : [];
  for (let i = 0; i < count && copy.length; i += 1) {
    const pick = Math.floor(Math.random() * copy.length);
    const item = copy.splice(pick, 1)[0];
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

function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(ms || 0))));
}

function logRootCauseOnce(key, message) {
  if (!key || !message) return;
  if (!state.debugRootCauseLogged || typeof state.debugRootCauseLogged !== 'object') {
    state.debugRootCauseLogged = {};
  }
  if (state.debugRootCauseLogged[key]) return;
  state.debugRootCauseLogged[key] = true;
  pushDebugTrigger('RootCause', message);
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
  updateRollButtonState();
  renderActiveToyDisplay();
  renderToyChoiceDisplay();
  renderInventoryPanel();
  applyAccessibilitySettings();
}

function updateRollButtonState() {
  if (!rollBtn) return;
  rollBtn.disabled = Boolean(state.rollActionLocked);
  const freeRolls = Math.max(0, Number(state.freeRolls || 0));
  if (freeRolls > 0) {
    rollBtn.textContent = `Roll Shop (free x${freeRolls})`;
  } else {
    rollBtn.textContent = `Roll Shop (-${ROLL_COST} Gold)`;
  }
}

function getPetShopSizeForTurn(turn = state.turn) {
  if (turn >= 9) return 5;
  if (turn >= 5) return 4;
  return PET_SHOP_SIZE;
}

function getFoodShopSizeForTurn(turn = state.turn) {
  if (turn >= 5) return 2;
  return FOOD_SHOP_SIZE;
}

function updateShopGridLayout() {
  if (petSlots) {
    petSlots.style.setProperty('--pet-shop-cols', String(Math.max(3, state.shopPets.length)));
    petSlots.style.setProperty('--pet-shop-min', state.shopPets.length >= 5 ? '76px' : '100px');
  }
  if (foodSlots) {
    foodSlots.style.setProperty('--food-shop-cols', String(Math.max(1, state.shopFoods.length)));
  }
  if (document.body) {
    const wideShop = Number(state.turn || 1) >= 9 && state.shopPets.length >= 5;
    document.body.classList.toggle('shop-wide-turn', wideShop);
  }
}

function animateShopExpansion(kind) {
  const container = kind === 'food' ? foodSlots : petSlots;
  if (!container) return;
  container.classList.remove('shop-expand');
  void container.offsetWidth;
  container.classList.add('shop-expand');
  setTimeout(() => container.classList.remove('shop-expand'), 700);
}

function ensureShopSlotCounts() {
  const wantPets = getPetShopSizeForTurn(state.turn);
  const wantFoods = getFoodShopSizeForTurn(state.turn);
  if (state.shopPets.length < wantPets) {
    const add = wantPets - state.shopPets.length;
    state.shopPets.push(...Array.from({ length: add }, () => ({ item: null, frozen: false })));
    animateShopExpansion('pet');
  } else if (state.shopPets.length > wantPets) {
    state.shopPets = state.shopPets.slice(0, wantPets);
  }
  if (state.shopFoods.length < wantFoods) {
    const add = wantFoods - state.shopFoods.length;
    state.shopFoods.push(...Array.from({ length: add }, () => ({ item: null, frozen: false })));
    animateShopExpansion('food');
  } else if (state.shopFoods.length > wantFoods) {
    state.shopFoods = state.shopFoods.slice(0, wantFoods);
  }
  updateShopGridLayout();
}

function markFoodSlotFx(slot, fxKind, amount = 0) {
  if (!slot) return;
  const now = Date.now();
  if (fxKind === 'stock') {
    slot.stockPulseUntil = now + 900;
  } else if (fxKind === 'discount') {
    slot.discountPulseUntil = now + 900;
    slot.discountAmount = Math.max(0, Number(amount || 0));
  }
}

function renderActiveToyDisplay() {
  if (!activeToySlot) return;
  activeToySlot.innerHTML = '';
  const playerToy = getActiveTeamToy('player');
  const toyName = String(playerToy?.toy_id || state.playerToy || '').trim();
  if (!toyName || !playerToy) {
    const empty = document.createElement('div');
    empty.className = 'name';
    empty.textContent = 'No Toy';
    activeToySlot.appendChild(empty);
    return;
  }
  const toy = {
    name: toyName,
    tier: getToyMetaByName(toyName)?.tier || 1,
    path: resolveTexture(toyName)
  };
  const card = document.createElement('div');
  card.className = 'slot toy-slot';
  bindHoverTooltip(card, 'toy', toy);
  const media = renderCardImage(toy);
  const label = document.createElement('div');
  label.className = 'name';
  const toyLevel = Math.max(1, Math.min(3, Number(playerToy.toy_level || state.playerToyLevel || 1)));
  const remaining = Math.max(0, Number(playerToy.remaining_turns || 0));
  label.textContent = `${toyName} (L${toyLevel}) x${remaining}`;
  card.appendChild(media);
  card.appendChild(label);
  activeToySlot.appendChild(card);
}

function selectToyChoice(toyName) {
  const toy = (state.toyChoices || []).find((t) => normalizeName(t.name) === normalizeName(toyName));
  if (!toy) return;
  if (!doesPackSupportToys(state.currentPackId) || !isToyValidForPackAndTurn(toy.name, state.currentPackId, state.turn)) {
    setStatus(`Toy ${toy.name} is not valid for this pack/turn.`);
    return;
  }
  const petLevel = Math.max(1, Math.min(3, Number(state.toyChoiceContext?.petLevel || 1)));
  state.teamToys.player = buildTeamToyState(toy.name, petLevel, state.currentPackId);
  state.playerToyExplicitlySelected = true;
  syncLegacyPlayerToyFields();
  state.lastToySource = state.toyChoiceContext?.sourcePet || null;
  state.toyChoices = [];
  state.toyChoiceContext = null;
  closeToyPickerModal(false);
  renderActiveToyDisplay();
  renderToyChoiceDisplay();
  renderInventoryPanel();
  renderBattleReport();
  setStatus(`Selected toy: ${toy.name} (L${petLevel}) durability x2.`);
}

function renderToyChoiceDisplay() {
  if (!toyChoiceSlots) return;
  toyChoiceSlots.innerHTML = '';
  const choices = Array.isArray(state.toyChoices) ? state.toyChoices : [];
  if (!choices.length) {
    if (toyPickerContext) {
      toyPickerContext.textContent = 'No toy choices currently available.';
    }
    return;
  }
  if (toyPickerTitle) {
    toyPickerTitle.textContent = 'Pick Your Toy';
  }
  if (toyPickerContext) {
    const source = String(state.toyChoiceContext?.sourcePet || 'Unknown source');
    const tier = Number(state.toyChoiceContext?.toyLevel || 1);
    toyPickerContext.textContent = `${source} generated a Tier ${tier} toy. Pick one option.`;
  }

  choices.forEach((toy) => {
    const card = document.createElement('div');
    card.className = 'slot toy-choice-card';
    if (normalizeName(state.playerToy) === normalizeName(toy.name)) {
      card.classList.add('selected');
    }
    const view = {
      name: toy.name,
      tier: toy.tier,
      path: resolveTexture(toy.name)
    };
    bindHoverTooltip(card, 'toy', view);
    const media = renderCardImage(view);
    const label = document.createElement('div');
    label.className = 'name';
    label.textContent = `${toy.name} (T${toy.tier})`;
    const btn = document.createElement('button');
    btn.className = 'toy-choice-use';
    btn.type = 'button';
    btn.textContent = 'Use';
    btn.addEventListener('click', () => selectToyChoice(toy.name));
    card.tabIndex = 0;
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        selectToyChoice(toy.name);
      }
    });
    card.appendChild(media);
    card.appendChild(label);
    card.appendChild(btn);
    toyChoiceSlots.appendChild(card);
  });
  if (state.toyModalOpen) {
    focusToyChoiceByIndex(state.toyModalFocusIndex);
  }
}

function openToyPickerModal() {
  if (!toyPickerModal) return;
  if (state.toyModalCloseTimer) {
    clearTimeout(state.toyModalCloseTimer);
    state.toyModalCloseTimer = null;
  }
  toyPickerModal.classList.remove('hidden', 'closing');
  state.toyModalOpen = true;
  state.toyModalFocusIndex = 0;
  syncBodyModalState();
  focusToyChoiceByIndex(0);
}

function closeToyPickerModal(skipSelection = true) {
  if (!toyPickerModal) return;
  if (state.toyModalCloseTimer) {
    clearTimeout(state.toyModalCloseTimer);
    state.toyModalCloseTimer = null;
  }
  state.toyModalOpen = false;
  state.toyModalFocusIndex = 0;
  // Closing without choosing is treated as skipping toy selection.
  if (skipSelection) {
    state.teamToys.player = null;
    state.playerToyExplicitlySelected = false;
    syncLegacyPlayerToyFields();
  }
  state.toyChoices = [];
  state.toyChoiceContext = null;
  toyPickerModal.classList.add('closing');
  state.toyModalCloseTimer = setTimeout(() => {
    toyPickerModal.classList.add('hidden');
    toyPickerModal.classList.remove('closing');
    syncBodyModalState();
    state.toyModalCloseTimer = null;
  }, 170);
}

function syncBodyModalState() {
  if (!document.body) return;
  const anyOpen = Boolean(state.toyModalOpen || state.battleReportModalOpen);
  document.body.classList.toggle('modal-open', anyOpen);
}

function openBattleReportModal() {
  if (!battleReportModal) return;
  if (state.battleReportModalCloseTimer) {
    clearTimeout(state.battleReportModalCloseTimer);
    state.battleReportModalCloseTimer = null;
  }
  battleReportModal.classList.remove('hidden', 'closing');
  state.battleReportModalOpen = true;
  syncBodyModalState();
}

function closeBattleReportModal() {
  if (!battleReportModal) return;
  if (state.battleReportModalCloseTimer) {
    clearTimeout(state.battleReportModalCloseTimer);
    state.battleReportModalCloseTimer = null;
  }
  state.battleReportModalOpen = false;
  battleReportModal.classList.add('closing');
  state.battleReportModalCloseTimer = setTimeout(() => {
    battleReportModal.classList.add('hidden');
    battleReportModal.classList.remove('closing');
    syncBodyModalState();
    state.battleReportModalCloseTimer = null;
  }, 170);
}

function isUiModalBlocking() {
  const toyBlocking = Boolean(
    toyPickerModal
    && (state.toyModalOpen || toyPickerModal.classList.contains('closing'))
  );
  const reportBlocking = Boolean(
    battleReportModal
    && (state.battleReportModalOpen || battleReportModal.classList.contains('closing'))
  );
  return toyBlocking || reportBlocking;
}

function focusToyChoiceByIndex(idx) {
  if (!toyChoiceSlots) return;
  const buttons = Array.from(toyChoiceSlots.querySelectorAll('.toy-choice-use'));
  if (!buttons.length) return;
  const clamped = Math.max(0, Math.min(buttons.length - 1, Number(idx || 0)));
  state.toyModalFocusIndex = clamped;
  const btn = buttons[clamped];
  if (btn && typeof btn.focus === 'function') {
    btn.focus();
  }
}

function applyAccessibilitySettings() {
  const root = document.documentElement;
  if (root) {
    root.style.setProperty('--ui-scale', String(state.uiScale || 1));
  }
  if (document.body) {
    document.body.classList.toggle('colorblind-mode', Boolean(state.colorBlindMode));
  }
}

function renderInventoryPanel() {
  if (!inventorySlots) return;
  inventorySlots.innerHTML = '';
  const list = [];
  if (state.playerToy) {
    list.push({
      kind: 'toy',
      item: {
        name: state.playerToy,
        tier: getToyMetaByName(state.playerToy)?.tier || 1,
        path: resolveTexture(state.playerToy)
      },
      label: `Active toy (L${state.playerToyLevel || 1})`
    });
  }
  const stocked = [
    ...(state.shopFoods || []).map((slot) => slot.item).filter(Boolean),
    ...(state.extraShopFoods || []).map((slot) => slot.item).filter(Boolean)
  ];
  stocked.slice(0, 4).forEach((food) => {
    list.push({
      kind: 'food',
      item: food,
      label: 'Stocked food'
    });
  });
  if (!list.length) {
    const empty = document.createElement('div');
    empty.className = 'hint';
    empty.textContent = 'No active toy or stocked food.';
    inventorySlots.appendChild(empty);
    return;
  }
  list.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'slot inventory-card';
    bindHoverTooltip(card, entry.kind, entry.item);
    const media = renderCardImage(entry.item);
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = String(entry.item?.name || 'Unknown');
    const meta = document.createElement('div');
    meta.className = 'level-text';
    meta.textContent = entry.label;
    card.appendChild(media);
    card.appendChild(name);
    card.appendChild(meta);
    inventorySlots.appendChild(card);
  });
}

function stripHtmlToText(raw) {
  if (!raw) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = String(raw);
  return (tmp.textContent || tmp.innerText || '').trim();
}

function pushDebugTrigger(triggerName, reason, messages = []) {
  const lines = Array.isArray(messages)
    ? messages.map((x) => String(x || '').trim()).filter(Boolean)
    : [];
  const row = {
    ts: new Date().toISOString(),
    trigger: String(triggerName || 'Unknown'),
    reason: String(reason || ''),
    messages: lines
  };
  state.debugTriggerLog.push(row);
  if (state.debugTriggerLog.length > TRIGGER_DEBUG_LIMIT) {
    state.debugTriggerLog = state.debugTriggerLog.slice(-TRIGGER_DEBUG_LIMIT);
  }
  if (lines.length) {
    console.log(`[MECH:${row.trigger}] ${row.reason}`, lines);
  } else {
    console.log(`[MECH:${row.trigger}] ${row.reason}`);
  }
}

function renderBattleReport() {
  if (!battleSummary || !battleLog) return;

  if (!state.battleReport) {
    battleSummary.textContent = 'No battle yet.';
    const dbg = state.debugTriggerLog.slice(-24);
    if (!dbg.length) {
      battleLog.textContent = '';
      return;
    }
    battleLog.textContent = [
      `Mechanics Mode: ${MECHANICS_MODE}`,
      `Wiki refs: ${WIKI_REFERENCE_LINKS.pets}`,
      '',
      'Recent Trigger Debug:'
    ].concat(dbg.map((entry, i) => {
      const detail = entry.messages.length ? ` -> ${entry.messages.join(' | ')}` : '';
      return `${i + 1}. [${entry.trigger}] ${entry.reason}${detail}`;
    })).join('\n');
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
  const dbg = state.debugTriggerLog.slice(-8).map((entry, i) => {
    const detail = entry.messages.length ? ` -> ${entry.messages.join(' | ')}` : '';
    return `D${i + 1}. [${entry.trigger}] ${entry.reason}${detail}`;
  });
  if (dbg.length) {
    lines.push('');
    lines.push('Recent Trigger Debug');
    lines.push(...dbg);
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
  } else if (kind === 'damage') {
    tag.textContent = `-${Math.max(0, Number(amountOrText || 0))}`;
  } else if (kind === 'heal') {
    tag.textContent = `+${Math.max(0, Number(amountOrText || 0))}`;
  } else if (kind === 'level') {
    tag.textContent = String(amountOrText || 'LEVEL UP!');
  } else if (kind === 'ailment') {
    tag.textContent = String(amountOrText || 'AILMENT');
  } else if (kind === 'ailment-remove') {
    tag.textContent = String(amountOrText || 'CURED');
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

function animateAilmentMentions(text, snapshot) {
  const ailment = inferAilmentFromText(text);
  if (!ailment || !snapshot) return;
  const label = getCanonicalAilmentName(ailment) || ailment.toUpperCase();
  const lower = String(text || '').toLowerCase();
  const checkSide = (side) => {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const pet = snapshot?.[side]?.[i];
      if (!pet?.name) continue;
      const petName = String(pet.name).toLowerCase();
      if (!petName || !lower.includes(petName)) continue;
      const el = getBattleSlotElement(side, i);
      if (!el) continue;
      const badge = createAilmentBadgeElement(label);
      if (badge) {
        badge.classList.add('ailment-pop');
        const row = el.querySelector('.battle-effects-row');
        if (row) row.appendChild(badge);
      }
      spawnStatFloat(el, 'ailment', label.toUpperCase());
    }
  };
  checkSide('player');
  checkSide('opponent');
}

function animateBattleLevelMentions(text, snapshot) {
  if (!snapshot) return;
  const lower = String(text || '').toLowerCase();
  if (!/level[\s-]?up|leveled up|levelled up/i.test(lower)) return;
  const animateSide = (side) => {
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const pet = snapshot?.[side]?.[i];
      if (!pet?.name) continue;
      if (lower.includes(String(pet.name).toLowerCase())) {
        animateLevelUpAt('battle', i, side);
      }
    }
  };
  animateSide('player');
  animateSide('opponent');
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

function animateShopXpFillAt(idx) {
  const slotEl = getBoardSlotElement(idx);
  if (!slotEl) return;
  const fx = document.createElement('div');
  fx.className = 'xp-fill-fx';
  slotEl.appendChild(fx);
  setTimeout(() => fx.remove(), 760);
}

function animateLevelUpAt(scope, idx, side = 'player') {
  const slotEl = scope === 'battle' ? getBattleSlotElement(side, idx) : getBoardSlotElement(idx);
  if (!slotEl) return;
  slotEl.classList.remove('level-up-pulse');
  void slotEl.offsetWidth;
  slotEl.classList.add('level-up-pulse');
  spawnStatFloat(slotEl, 'level', 'LEVEL UP!');
  setTimeout(() => slotEl.classList.remove('level-up-pulse'), 620);
}

function animateTierUpRewardCue() {
  if (!tierUpInline || tierUpInline.classList.contains('hidden')) return;
  tierUpInline.classList.remove('reward-pulse');
  void tierUpInline.offsetWidth;
  tierUpInline.classList.add('reward-pulse');
  setTimeout(() => tierUpInline.classList.remove('reward-pulse'), 740);
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

function applyBattleManaDelta(snapshot, petName, delta) {
  const amount = Number(delta || 0);
  if (!snapshot || !petName || !Number.isFinite(amount) || amount === 0) return false;
  const playerIdx = findSnapshotPetIndexByName(snapshot?.player, petName);
  if (playerIdx >= 0) {
    const cur = Math.max(0, Number(state.battleManaBySide?.player?.[playerIdx] || 0));
    state.battleManaBySide.player[playerIdx] = Math.max(0, cur + amount);
    return true;
  }
  const opponentIdx = findSnapshotPetIndexByName(snapshot?.opponent, petName);
  if (opponentIdx >= 0) {
    const cur = Math.max(0, Number(state.battleManaBySide?.opponent?.[opponentIdx] || 0));
    state.battleManaBySide.opponent[opponentIdx] = Math.max(0, cur + amount);
    return true;
  }
  return false;
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
  state.battleActive = { side: attackerSide, idx: attackerIdx };

  attackerEl.classList.remove('clash-player', 'clash-opponent');
  defenderEl.classList.remove('hit-flash', 'target-shake');
  void attackerEl.offsetWidth;
  attackerEl.classList.add(attackerSide === 'player' ? 'clash-player' : 'clash-opponent');
  defenderEl.classList.add('hit-flash');
  defenderEl.classList.add('target-shake');
  attackerEl.classList.add('active-turn');
  spawnFlyIcon(attackerEl, defenderEl, FIST_ICON, Math.max(1, attack.damage || 1));
  spawnStatFloat(defenderEl, 'damage', Math.max(1, attack.damage || 1));
  setTimeout(() => {
    attackerEl.classList.remove('clash-player', 'clash-opponent');
    defenderEl.classList.remove('hit-flash', 'target-shake');
    attackerEl.classList.remove('active-turn');
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
      const parsed = parseBattleNameAndPerk(parsedName);
      out[slotNum - 1] = {
        name: parsed.displayName,
        attack: Number(m[3]),
        health: Number(m[4]),
        equipment: parsed.perkName || null,
        ailment: parsed.ailmentName || '',
        path: resolveTexture(parsed.displayName)
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
  if (!state.battleManaRenderBySide?.[side]) {
    state.battleManaRenderBySide = state.battleManaRenderBySide || { player: [], opponent: [] };
    state.battleManaRenderBySide[side] = Array.from({ length: BOARD_SIZE }, () => 0);
  }
  const prevSlots = Array.isArray(state.lastBattleRenderBySide?.[side]) ? state.lastBattleRenderBySide[side] : [];
  const prevIndexByKey = new Map();
  prevSlots.forEach((prevPet, prevIdx) => {
    if (!prevPet) return;
    const key = [
      normalizeName(prevPet.name),
      Number(prevPet.attack || 0),
      Number(prevPet.health || 0),
      normalizeName(prevPet.equipment || ''),
      normalizeName(prevPet.ailment || '')
    ].join('|');
    if (!prevIndexByKey.has(key)) prevIndexByKey.set(key, prevIdx);
  });
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = slots[i] || null;
    const el = document.createElement('div');
    el.className = `battle-slot${pet ? '' : ' empty'}`;
    el.dataset.battleSlot = String(i);
    el.dataset.battleSide = side;
    if (!pet) {
      if (!state.battleAilmentBySide?.[side]) {
        state.battleAilmentBySide[side] = Array.from({ length: BOARD_SIZE }, () => '');
      }
      if (!state.battleManaBySide?.[side]) {
        state.battleManaBySide[side] = Array.from({ length: BOARD_SIZE }, () => 0);
      }
      state.battleAilmentBySide[side][i] = '';
      state.battleManaBySide[side][i] = 0;
      state.battleManaRenderBySide[side][i] = 0;
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
    const maxAtk = Math.max(1, Number(initial?.attack || pet.attack || 1));
    const maxHp = Math.max(1, Number(initial?.health || pet.health || 1));
    const bars = createBattleStatBars(Number(pet.attack || 0), Number(pet.health || 0), maxAtk, maxHp);
    const initialExp = Number(initial?.exp ?? 0);
    const derivedLevel = calcLevelFromExp(initialExp);
    const levelBadge = document.createElement('div');
    levelBadge.className = 'battle-level-badge';
    levelBadge.textContent = `L${Math.max(1, Number(initial?.level || initial?.levelInt || derivedLevel || 1))}`;
    const perkName = getCanonicalPerkName(
      typeof pet.equipment === 'string'
        ? pet.equipment
        : (pet.equipment?.name || (typeof initial?.equipment === 'string' ? initial.equipment : (initial?.equipment?.name || '')))
    );
    const ailmentName = getCanonicalAilmentName(
      pet.ailment
      || (typeof pet.equipment === 'string' ? pet.equipment : (pet.equipment?.name || ''))
    );
    const perkBadge = createPerkBadgeElement(perkName);
    const ailmentBadge = createAilmentBadgeElement(ailmentName);
    const effectsRow = document.createElement('div');
    effectsRow.className = 'battle-effects-row';
    const prevAilment = String(state.battleAilmentBySide?.[side]?.[i] || '');
    if (!state.battleAilmentBySide?.[side]) {
      state.battleAilmentBySide[side] = Array.from({ length: BOARD_SIZE }, () => '');
    }
    state.battleAilmentBySide[side][i] = ailmentName;
    if (ailmentBadge && ailmentName && ailmentName !== prevAilment) {
      ailmentBadge.classList.add('ailment-pop');
    }
    if (!ailmentName && prevAilment) {
      const cleared = createAilmentBadgeElement(prevAilment);
      if (cleared) {
        cleared.classList.add('ailment-remove');
        effectsRow.appendChild(cleared);
      }
    }
    if (perkBadge) effectsRow.appendChild(perkBadge);
    if (ailmentBadge) effectsRow.appendChild(ailmentBadge);
    const name = document.createElement('div');
    name.className = 'battle-slot-name';
    name.textContent = pet.name;
    const trackedMana = Number(state.battleManaBySide?.[side]?.[i]);
    const snapshotMana = Number(pet?.mana);
    const mana = Number.isFinite(trackedMana)
      ? Math.max(0, trackedMana)
      : (Number.isFinite(snapshotMana) ? Math.max(0, snapshotMana) : 0);
    if (!state.battleManaBySide?.[side]) {
      state.battleManaBySide[side] = Array.from({ length: BOARD_SIZE }, () => 0);
    }
    state.battleManaBySide[side][i] = mana;
    const prevMana = Math.max(0, Number(state.battleManaRenderBySide?.[side]?.[i] ?? mana));
    const manaDelta = mana - prevMana;
    const manaBadge = createManaBadgeElement(mana, {
      delta: manaDelta,
      floatingGain: manaDelta > 0 ? manaDelta : 0
    });
    if (manaBadge) el.appendChild(manaBadge);
    state.battleManaRenderBySide[side][i] = mana;
    const moveKey = [
      normalizeName(pet.name),
      Number(pet.attack || 0),
      Number(pet.health || 0),
      normalizeName(perkName || ''),
      normalizeName(ailmentName || '')
    ].join('|');
    const prevIdx = prevIndexByKey.get(moveKey);
    if (Number.isInteger(prevIdx) && prevIdx !== i) {
      el.classList.add('battle-slot-jump');
      el.style.setProperty('--jump-shift-x', `${(prevIdx - i) * 96}px`);
    }
    const hoverPet = {
      name: String(initial?.name || pet.name || ''),
      tier: Number(initial?.tier || 1),
      baseAttack: Number(pet.attack || 0),
      baseHealth: Number(pet.health || 0),
      tempBuffs: [],
      levelInt: Math.max(1, Number(initial?.level || initial?.levelInt || 1)),
      levelValue: Math.max(1, Number(initial?.level || initial?.levelInt || derivedLevel || 1)),
      ability: initial?.ability || null,
      equipment: perkName || ''
    };
    bindHoverTooltip(el, 'pet', hoverPet);
    if (state.battleActive.side === side && state.battleActive.idx === i) {
      el.classList.add('active-turn');
    }
    el.appendChild(media);
    el.appendChild(levelBadge);
    el.appendChild(effectsRow);
    el.appendChild(stats);
    el.appendChild(bars);
    el.appendChild(name);
    container.appendChild(el);
  }
  if (!state.lastBattleRenderBySide) {
    state.lastBattleRenderBySide = { player: [], opponent: [] };
  }
  state.lastBattleRenderBySide[side] = slots.map((pet) => (pet ? { ...pet } : null));
}

function createBattleStatBars(attack, health, maxAttack, maxHealth) {
  const wrap = document.createElement('div');
  wrap.className = 'battle-stat-bars';

  const atkBar = document.createElement('div');
  atkBar.className = 'battle-stat-bar attack';
  const atkFill = document.createElement('span');
  atkFill.style.width = `${Math.max(0, Math.min(100, Math.round((100 * attack) / Math.max(1, maxAttack))))}%`;
  atkBar.appendChild(atkFill);

  const hpBar = document.createElement('div');
  hpBar.className = 'battle-stat-bar health';
  const hpFill = document.createElement('span');
  hpFill.style.width = `${Math.max(0, Math.min(100, Math.round((100 * health) / Math.max(1, maxHealth))))}%`;
  hpBar.appendChild(hpFill);

  wrap.appendChild(atkBar);
  wrap.appendChild(hpBar);
  return wrap;
}

function consumePendingToyBreakFx(side) {
  if (!Array.isArray(state.pendingToyBreakFx) || !state.pendingToyBreakFx.length) return null;
  const idx = state.pendingToyBreakFx.findIndex((row) => String(row?.side || '') === side);
  if (idx < 0) return null;
  const [entry] = state.pendingToyBreakFx.splice(idx, 1);
  return entry || null;
}

function renderBattleToyBadge(container, toyState, side) {
  if (!container) return;
  container.innerHTML = '';
  const toyId = String(toyState?.toy_id || '').trim();
  const remaining = Math.max(0, Number(toyState?.remaining_turns || 0));
  if (!toyId || remaining <= 0) {
    container.classList.add('empty');
    container.textContent = 'No Toy';
    return;
  }
  container.classList.remove('empty');
  const wrap = document.createElement('div');
  wrap.className = 'battle-team-toy toy-active';
  const tex = resolveTexture(toyId);
  if (tex) {
    const img = document.createElement('img');
    img.src = tex;
    img.alt = toyId;
    wrap.appendChild(img);
  }
  const counter = document.createElement('span');
  counter.className = 'battle-team-toy-counter';
  counter.textContent = `x${remaining}`;
  wrap.appendChild(counter);
  const breakFx = consumePendingToyBreakFx(side);
  if (breakFx) {
    wrap.classList.add('toy-break');
  }
  bindHoverTooltip(wrap, 'toy', {
    name: toyId,
    tier: getToyMetaByName(toyId)?.tier || 1,
    path: tex
  });
  container.appendChild(wrap);
}

function renderBattleTeamToyDisplays(report) {
  const playerToyState = report?.playerToyState || getActiveTeamToy('player');
  const opponentToyState = report?.opponentToyState || getActiveTeamToy('opponent');
  renderBattleToyBadge(battlePlayerToy, playerToyState, 'player');
  renderBattleToyBadge(battleOpponentToy, opponentToyState, 'opponent');
}

function setupBattleGeckoToyBreakBindings(report) {
  const out = [];
  const register = (side, toyState, pets) => {
    if (!toyState || Number(toyState.remaining_turns || 0) <= 0) return;
    const meta = getToyBreakMetadata(toyState.toy_id);
    if (!meta?.has_break_ability || !meta?.break_ability_kind) return;
    const geckoPresent = (pets || []).some((pet) => normalizeName(pet?.name || '') === 'gecko');
    if (!geckoPresent) return;
    out.push({
      side,
      pet_name: 'Gecko',
      toyState: { ...toyState },
      consumed: false
    });
  };
  register('player', report?.playerToyState, report?.playerInitialPets);
  register('opponent', report?.opponentToyState, report?.opponentInitialPets);
  state.battleGeckoToyBreakBindings = out;
}

function tryTriggerGeckoToyBreakFromFaintLog(text, snapshot) {
  const faintMatch = String(text || '').match(/^(.+?)\s+fainted\.?$/i);
  if (!faintMatch) return null;
  const faintedName = String(faintMatch[1] || '').trim().replace(/[.]+$/, '');
  if (normalizeName(faintedName) !== 'gecko') return null;
  const bindings = Array.isArray(state.battleGeckoToyBreakBindings) ? state.battleGeckoToyBreakBindings : [];
  for (const binding of bindings) {
    if (binding.consumed) continue;
    const idx = binding.side === 'player'
      ? findSnapshotPetIndexByName(snapshot?.player, faintedName)
      : findSnapshotPetIndexByName(snapshot?.opponent, faintedName);
    if (idx < 0) continue;
    const geckoPet = binding.side === 'player' ? snapshot?.player?.[idx] : snapshot?.opponent?.[idx];
    const ailmentKey = normalizeName(geckoPet?.ailment || '');
    if (ailmentKey.includes('silence')) {
      binding.consumed = true;
      return `${binding.side === 'player' ? 'Your' : 'Opponent'} Gecko was silenced; copied toy break skipped.`;
    }
    const result = dispatchToyBreakEvent({
      source: 'gecko_faint_copy',
      side: binding.side,
      toyState: { ...binding.toyState },
      nonce: `${state.turn}-${binding.side}-gecko`
    });
    binding.consumed = true;
    return `${binding.side === 'player' ? 'Your' : 'Opponent'} Gecko copied ${binding.toyState.toy_id} break: ${result?.note || 'resolved'}`;
  }
  return null;
}

function showBattleScene(report) {
  if (!battleScreen) return;
  state.battlePlaybackSkip = false;
  state.battleActive = { side: null, idx: -1 };
  state.battleAilmentBySide = {
    player: Array.from({ length: BOARD_SIZE }, () => ''),
    opponent: Array.from({ length: BOARD_SIZE }, () => '')
  };
  state.battleManaBySide = {
    player: Array.from({ length: BOARD_SIZE }, (_, i) => Math.max(0, Number(report?.playerInitialPets?.[i]?.mana || 0))),
    opponent: Array.from({ length: BOARD_SIZE }, (_, i) => Math.max(0, Number(report?.opponentInitialPets?.[i]?.mana || 0)))
  };
  state.battleManaRenderBySide = {
    player: Array.from({ length: BOARD_SIZE }, (_, i) => Math.max(0, Number(report?.playerInitialPets?.[i]?.mana || 0))),
    opponent: Array.from({ length: BOARD_SIZE }, (_, i) => Math.max(0, Number(report?.opponentInitialPets?.[i]?.mana || 0)))
  };
  state.lastBattleRenderBySide = { player: [], opponent: [] };
  battleSceneMeta.textContent = `Turn ${report.turn} | Opponent pack: ${report.opponentPackName} | Rolls: ${Math.max(0, Number(report.rollCountAtBattleStart || 0))}`;
  if (battleSceneLevels) {
    battleSceneLevels.textContent = `Your levels: ${summarizeTeamLevels(report.playerInitialPets) || 'none'} | Opponent levels: ${summarizeTeamLevels(report.opponentInitialPets) || 'none'}`;
  }
  if (battleSceneStatus) {
    const playerToyLabel = report.playerToyState?.toy_id
      ? `${report.playerToyState.toy_id} x${Math.max(0, Number(report.playerToyState.remaining_turns || 0))}`
      : 'None';
    const opponentToyLabel = report.opponentToyState?.toy_id
      ? `${report.opponentToyState.toy_id} x${Math.max(0, Number(report.opponentToyState.remaining_turns || 0))}`
      : 'None';
    battleSceneStatus.textContent = `Toys: You ${playerToyLabel} / Opp ${opponentToyLabel} | Trumpets: You 0 / Opp 0 | Ailments: none`;
  }
  battleSceneEvent.textContent = 'Battle start';
  battleSceneLog.textContent = '';
  setupBattleGeckoToyBreakBindings(report);
  renderBattleTeamToyDisplays(report);
  renderBattleSceneSlots(battlePlayerSlots, Array(BOARD_SIZE).fill(null), 'player', report);
  renderBattleSceneSlots(battleOpponentSlots, Array(BOARD_SIZE).fill(null), 'opponent', report);
  battleScreen.classList.remove('hidden');
}

function hideBattleScene() {
  if (!battleScreen) return;
  state.battleActive = { side: null, idx: -1 };
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
    const playerToyLabel = report.playerToyState?.toy_id
      ? `${report.playerToyState.toy_id} x${Math.max(0, Number(report.playerToyState.remaining_turns || 0))}`
      : 'None';
    const opponentToyLabel = report.opponentToyState?.toy_id
      ? `${report.opponentToyState.toy_id} x${Math.max(0, Number(report.opponentToyState.remaining_turns || 0))}`
      : 'None';
    battleSceneStatus.textContent = `Toys: You ${playerToyLabel} / Opp ${opponentToyLabel} | Trumpets: You ${playerTrumpets} / Opp ${opponentTrumpets}${lastAilment ? ` | Ailment: ${lastAilment}` : ''}`;
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
      animateAilmentMentions(text, lastSnapshot);
      animateBattleLevelMentions(text, lastSnapshot);

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
      let manaUiChanged = false;
      const manaGive = text.match(/^(.+?) gave (.+?)\s+\+?(\d+)\s+mana\b/i)
        || text.match(/^(.+?) gave (.+?)\s+an extra\s+(\d+)\s+bonus mana\b/i);
      if (manaGive) {
        const targetName = String(manaGive[2] || '').trim().replace(/[.]+$/, '');
        const amount = Number(manaGive[3] || 0);
        if (targetName && amount > 0) {
          if (/\bfriend(s)?\b/i.test(targetName)) {
            const ownerName = String(manaGive[1] || '').trim();
            const ownerPlayerIdx = findSnapshotPetIndexByName(lastSnapshot?.player, ownerName);
            const ownerOpponentIdx = findSnapshotPetIndexByName(lastSnapshot?.opponent, ownerName);
            const ownerSide = ownerPlayerIdx >= 0 ? 'player' : (ownerOpponentIdx >= 0 ? 'opponent' : '');
            const ownerIdx = ownerPlayerIdx >= 0 ? ownerPlayerIdx : ownerOpponentIdx;
            if (ownerSide && ownerIdx >= 0) {
              const countMatch = targetName.match(/(\d+)\s+friends?/i);
              const friendCount = Math.max(1, Number(countMatch?.[1] || 1));
              let applied = 0;
              for (let t = ownerIdx + 1; t < BOARD_SIZE && applied < friendCount; t += 1) {
                const candidate = lastSnapshot?.[ownerSide]?.[t];
                if (!candidate) continue;
                manaUiChanged = applyBattleManaDelta(lastSnapshot, candidate.name, amount) || manaUiChanged;
                applied += 1;
              }
            }
          } else {
            manaUiChanged = applyBattleManaDelta(lastSnapshot, targetName, amount) || manaUiChanged;
          }
        }
      }
      const manaGain = text.match(/^(.+?)\s+gain(?:ed|s)?\s+\+?(\d+)\s+mana\b/i);
      if (manaGain) {
        const owner = String(manaGain[1] || '').trim().replace(/[.]+$/, '');
        const amount = Number(manaGain[2] || 0);
        manaUiChanged = applyBattleManaDelta(lastSnapshot, owner, amount) || manaUiChanged;
      }
      const manaSpendFrom = text.match(/^(.+?)\s+spent\s+(\d+)\s+mana\s+from\s+(.+?)\s+to\b/i);
      if (manaSpendFrom) {
        const source = String(manaSpendFrom[3] || '').trim().replace(/[.]+$/, '');
        const amount = Number(manaSpendFrom[2] || 0);
        manaUiChanged = applyBattleManaDelta(lastSnapshot, source, -amount) || manaUiChanged;
      }
      const manaSpent = text.match(/^(.+?)\s+spent\s+(\d+)\s+mana\b/i);
      if (manaSpent) {
        const owner = String(manaSpent[1] || '').trim().replace(/[.]+$/, '');
        const amount = Number(manaSpent[2] || 0);
        manaUiChanged = applyBattleManaDelta(lastSnapshot, owner, -amount) || manaUiChanged;
      }
      const manaTaken = text.match(/^(.+?)\s+took\s+(\d+)\s+mana\s+from\s+(.+?)\.?$/i);
      if (manaTaken) {
        const owner = String(manaTaken[1] || '').trim().replace(/[.]+$/, '');
        const source = String(manaTaken[3] || '').trim().replace(/[.]+$/, '');
        const amount = Number(manaTaken[2] || 0);
        manaUiChanged = applyBattleManaDelta(lastSnapshot, owner, amount) || manaUiChanged;
        manaUiChanged = applyBattleManaDelta(lastSnapshot, source, -amount) || manaUiChanged;
      }
      if (manaUiChanged && lastSnapshot) {
        renderBattleSceneSlots(battlePlayerSlots, lastSnapshot.player, 'player', report);
        renderBattleSceneSlots(battleOpponentSlots, lastSnapshot.opponent, 'opponent', report);
      }
      const geckoBreakNote = tryTriggerGeckoToyBreakFromFaintLog(text, lastSnapshot);
      if (geckoBreakNote) {
        sceneLines.push(`[TOY_BREAK] ${geckoBreakNote}`);
        battleSceneLog.textContent = sceneLines.slice(-14).join('\n');
        renderBattleTeamToyDisplays(report);
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

function formatLevelValue(value) {
  const n = Number(value || 1);
  if (!Number.isFinite(n)) return '1';
  if (Math.abs(n - Math.round(n)) < 0.001) return String(Math.round(n));
  return String(Math.round(n * 100) / 100);
}

function getLevelDisplayForExp(exp) {
  const idx = Math.max(0, Math.min(LEVEL_STEPS.length - 1, Number(exp || 0)));
  return LEVEL_STEPS[idx];
}

function pushLevelHistory(slotIdx, pet, reason = 'update') {
  if (!Number.isInteger(slotIdx) || slotIdx < 0 || slotIdx >= BOARD_SIZE || !pet) return;
  if (!Array.isArray(state.levelHistoryBySlot[slotIdx])) {
    state.levelHistoryBySlot[slotIdx] = [];
  }
  const row = {
    turn: Number(state.turn || 1),
    name: String(pet.name || ''),
    exp: Math.max(0, Math.min(5, Number(pet.exp || 0))),
    levelValue: Number(pet.levelValue || getLevelDisplayForExp(pet.exp || 0)),
    levelInt: Number(pet.levelInt || levelStepToInt(Number(pet.exp || 0))),
    reason: String(reason || 'update')
  };
  const hist = state.levelHistoryBySlot[slotIdx];
  const last = hist.length ? hist[hist.length - 1] : null;
  if (
    last
    && last.name === row.name
    && last.exp === row.exp
    && last.levelValue === row.levelValue
    && last.levelInt === row.levelInt
  ) {
    return;
  }
  hist.push(row);
  if (hist.length > 48) {
    state.levelHistoryBySlot[slotIdx] = hist.slice(-48);
  }
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
  if (explicit) return Math.max(1, Math.min(6, Number(explicit[1])));
  if (/Choose one [^.]*toy/i.test(text)) {
    return Math.max(1, Math.min(6, Number(fallbackLevel || 1)));
  }
  return 0;
}

function parseToySourceFromAbility(abilityText = '') {
  const text = String(abilityText || '').trim();
  if (!text) return '';
  const explicit = text.match(/Choose one level\s*\d+\s+(.+?)\s+toy/i);
  if (!explicit) return '';
  return String(explicit[1] || '').trim();
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

function queueNextTurnGold(amount) {
  const add = Math.max(0, Number(amount || 0));
  if (!add) return 0;
  state.nextTurnBonusGold += add;
  return add;
}

function resolveTurnStartGold() {
  const storedBonus = Math.max(0, Number(state.nextTurnBonusGold || 0));
  if (storedBonus > 0) return START_GOLD + storedBonus;
  return START_GOLD;
}

function parseNextTurnGoldFromAbility(abilityText) {
  const text = String(abilityText || '').trim();
  if (!text) return 0;
  const direct = text.match(/Gain\s+\+(\d+)\s+gold(?:\s+on)?\s+next\s+turn/i);
  if (direct) return Math.max(0, Number(direct[1] || 0));
  // Covers wording like: "...and +2 gold next turn."
  const embedded = text.match(/\+(\d+)\s+gold(?:\s+on)?\s+next\s+turn/i);
  return Math.max(0, Number(embedded?.[1] || 0));
}

function parseNextTurnFreeRollsFromAbility(abilityText) {
  const text = String(abilityText || '').trim();
  if (!text) return 0;
  const direct = text.match(/Gain\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free\s+rolls?\s+next\s+turn/i);
  return Math.max(0, parseCountWord(direct?.[1] || ''));
}

function logsContainNextTurnGoldForPet(logs, petName = '') {
  const key = normalizeName(petName);
  if (!key) return false;
  return (Array.isArray(logs) ? logs : []).some((line) => {
    const text = String(line || '');
    const normalized = normalizeName(text);
    return normalized.includes(key) && /next\s+turn/i.test(text) && /gold/i.test(text);
  });
}

function getTemplatePetAcrossPacksByName(name) {
  const key = normalizeName(name);
  if (!key) return null;
  return getAllPetsAcrossPacks().find((pet) => normalizeName(pet?.name || '') === key) || null;
}

function getAbilityTextForPetLevel(petName, levelInt = 1) {
  const template = getTemplatePetAcrossPacksByName(petName);
  if (!template?.ability) return '';
  const key = levelInt >= 3 ? 'level3' : levelInt >= 2 ? 'level2' : 'level1';
  return String(template.ability?.[key] || '').trim();
}

function getNextTurnGoldForTrigger(petName, levelInt = 1, triggerLabel = '') {
  const trigger = String(triggerLabel || '').trim().toLowerCase();
  if (!trigger) return 0;
  const abilityText = getAbilityTextForPetLevel(petName, levelInt);
  if (!abilityText) return 0;
  const prefixMap = {
    faint: /^Faint:/i,
    sell: /^Sell:/i,
    end: /^End turn:/i,
    start: /^Start of turn:/i,
    levelup: /^Level-up:/i,
    level: /^Level-up:/i,
    level_up: /^Level-up:/i
  };
  const expected = prefixMap[trigger];
  if (!expected || !expected.test(abilityText)) return 0;
  return parseNextTurnGoldFromAbility(abilityText);
}

function getNextTurnFreeRollsForTrigger(petName, levelInt = 1, triggerLabel = '') {
  const trigger = String(triggerLabel || '').trim().toLowerCase();
  if (!trigger) return 0;
  const abilityText = getAbilityTextForPetLevel(petName, levelInt);
  if (!abilityText) return 0;
  const prefixMap = {
    faint: /^Faint:/i,
    sell: /^Sell:/i,
    end: /^End turn:/i,
    start: /^Start of turn:/i,
    levelup: /^Level-up:/i,
    level: /^Level-up:/i,
    level_up: /^Level-up:/i,
    roll: /^Roll:/i
  };
  const expected = prefixMap[trigger];
  if (!expected || !expected.test(abilityText)) return 0;
  return parseNextTurnFreeRollsFromAbility(abilityText);
}

function parseImmediateGoldFromAbility(abilityText) {
  const text = String(abilityText || '').trim();
  if (!text) return 0;
  if (/next\s+turn/i.test(text)) return 0;
  const direct = text.match(/Gain\s+\+(\d+)\s+gold\.?$/i);
  if (direct) return Math.max(0, Number(direct[1] || 0));
  const embedded = text.match(/\+(\d+)\s+gold\.?$/i);
  return Math.max(0, Number(embedded?.[1] || 0));
}

function getImmediateGoldForTrigger(petName, levelInt = 1, triggerLabel = '') {
  const trigger = String(triggerLabel || '').trim().toLowerCase();
  if (!trigger) return 0;
  const abilityText = getAbilityTextForPetLevel(petName, levelInt);
  if (!abilityText) return 0;
  const prefixMap = {
    sell: /^Sell:/i,
    faint: /^Faint:/i,
    end: /^End turn:/i,
    start: /^Start of turn:/i,
    levelup: /^Level-up:/i,
    level: /^Level-up:/i,
    level_up: /^Level-up:/i
  };
  const expected = prefixMap[trigger];
  if (!expected || !expected.test(abilityText)) return 0;
  return parseImmediateGoldFromAbility(abilityText);
}

function getMagpieStoredGoldCap(levelInt = 1) {
  const lvl = Math.max(1, Math.min(3, Number(levelInt || 1)));
  return Number(MAGPIE_STORED_GOLD_CAP_BY_LEVEL[lvl] || MAGPIE_STORED_GOLD_CAP_BY_LEVEL[1] || 1);
}

function getLemmingNextTurnGold(levelInt = 1) {
  const lvl = Math.max(1, Math.min(3, Number(levelInt || 1)));
  return lvl;
}

function queueNextTurnFreeRolls(amount) {
  const add = Math.max(0, Number(amount || 0));
  if (!add) return 0;
  state.nextTurnFreeRolls = Math.max(0, Number(state.nextTurnFreeRolls || 0)) + add;
  return add;
}

function queueImmediateFreeRollsFromLogs(logs = []) {
  const lines = Array.isArray(logs) ? logs : [];
  let gained = 0;
  lines.forEach((line) => {
    const text = stripHtmlToText(String(line || ''));
    if (!/free\s+roll/i.test(text)) return;
    const m = text.match(/gain(?:ed|s)?\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)?\s*free\s+roll/i);
    const parsed = parseCountWord(m?.[1] || 'one');
    gained += Math.max(0, parsed || 1);
  });
  if (gained > 0) {
    state.freeRolls = Math.max(0, Number(state.freeRolls || 0)) + gained;
  }
  return gained;
}

function applyBridgeEndTurnGoldEffects(logs = []) {
  const lines = Array.isArray(logs) ? logs.map((x) => String(x || '')) : [];
  if (!lines.length) return 0;
  let queued = 0;
  const magpies = state.board
    .filter(Boolean)
    .filter((pet) => normalizeName(pet?.name || '') === 'magpie')
    .map((pet) => getPetLevelInt(pet))
    .sort((a, b) => b - a);
  if (!magpies.length) return 0;

  lines.forEach((line) => {
    const text = stripHtmlToText(line);
    if (!/magpie/i.test(text)) return;
    if (!/gain\s+it\s+back\s+next\s+turn/i.test(text)) return;
    const parsedCap = Number((text.match(/spent\s+up\s+to\s+(\d+)\s+gold/i) || [])[1] || 0);
    const level = magpies.shift() || 1;
    const levelCap = getMagpieStoredGoldCap(level);
    const cap = Math.max(0, parsedCap || levelCap);
    const spend = Math.max(0, Math.min(cap, Number(state.gold || 0)));
    if (!spend) return;
    state.gold = Math.max(0, Number(state.gold || 0) - spend);
    queued += queueNextTurnGold(spend);
  });

  return queued;
}

function queueBattleNextTurnGoldFromReport(report) {
  const logs = Array.isArray(report?.logs) ? report.logs : [];
  const playerInitialPets = Array.isArray(report?.playerInitialPets) ? report.playerInitialPets : [];
  const playerNames = new Set(
    playerInitialPets
      .filter(Boolean)
      .map((pet) => normalizeName(pet?.name || ''))
      .filter(Boolean)
  );
  const playerLevelsByName = {};
  playerInitialPets.forEach((pet) => {
    const key = normalizeName(pet?.name || '');
    if (!key) return;
    if (!Array.isArray(playerLevelsByName[key])) playerLevelsByName[key] = [];
    playerLevelsByName[key].push(Math.max(1, Math.min(3, calcLevelFromExp(Number(pet?.exp || 0)))));
  });
  Object.keys(playerLevelsByName).forEach((k) => playerLevelsByName[k].sort((a, b) => a - b));
  if (!logs.length || !playerNames.size) return 0;
  let queued = 0;
  logs.forEach((entry) => {
    const raw = String(entry?.message || '');
    if (!raw) return;
    if (extractBattleSnapshot(raw)) return;
    const text = stripHtmlToText(raw);

    if (!/gold/i.test(text) || !/next\s+turn/i.test(text)) return;
    const amountMatch = text.match(/\+(\d+)\s+gold(?:\s+on)?\s+next\s+turn/i)
      || text.match(/gain(?:s|ed)?\s+(\d+)\s+gold(?:\s+on)?\s+next\s+turn/i);
    const amount = Math.max(0, Number(amountMatch?.[1] || 0));
    if (!amount) return;
    const normalizedText = normalizeName(text);
    const isPlayerTrigger = Array.from(playerNames).some((nameKey) => normalizedText.includes(nameKey));
    if (!isPlayerTrigger) return;
    queued += queueNextTurnGold(amount);
  });

  // Fallback: some battle logs omit explicit "next turn gold" text; infer from trigger + ability text.
  logs.forEach((entry) => {
    const raw = String(entry?.message || '');
    if (!raw) return;
    if (extractBattleSnapshot(raw)) return;
    const text = stripHtmlToText(raw);
    const lower = String(text || '').toLowerCase();
    if (/next\s+turn/i.test(lower)) return;
    const trigger = /level[\s-]?up|leveled up|levelled up/i.test(lower)
      ? 'levelup'
      : (/faint/i.test(lower) ? 'faint' : '');
    if (!trigger) return;

    Object.keys(playerLevelsByName).forEach((nameKey) => {
      if (!normalizeName(text).includes(nameKey)) return;
      const levels = playerLevelsByName[nameKey];
      if (!Array.isArray(levels) || !levels.length) return;
      let triggerLevel = levels[0];
      if (trigger === 'levelup') {
        const idx = levels.findIndex((lvl) => lvl < 3);
        if (idx >= 0) {
          triggerLevel = levels[idx];
          levels[idx] = Math.min(3, levels[idx] + 1);
        }
      } else if (trigger === 'faint') {
        triggerLevel = levels.shift();
      }
      const amount = getNextTurnGoldForTrigger(nameKey, triggerLevel, trigger);
      if (amount > 0) {
        queued += queueNextTurnGold(amount);
      }
    });
  });

  return queued;
}

function queueNextTurnFreeRollsFromLogs(logs = [], triggerHint = '') {
  const lines = Array.isArray(logs) ? logs : [];
  let queued = 0;
  lines.forEach((entry) => {
    const raw = String(entry?.message || entry || '');
    if (!raw || extractBattleSnapshot(raw)) return;
    const text = stripHtmlToText(raw);
    if (!/free\s+roll/i.test(text) || !/next\s+turn/i.test(text)) return;
    const m = text.match(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free\s+rolls?\s+next\s+turn/i);
    const amount = Math.max(0, parseCountWord(m?.[1] || ''));
    if (amount > 0) queued += queueNextTurnFreeRolls(amount);
  });
  if (queued > 0) return queued;

  // Fallback inference for concise logs that omit explicit amount.
  const trigger = String(triggerHint || '').trim().toLowerCase();
  if (!trigger) return 0;
  state.board.filter(Boolean).forEach((pet) => {
    const lvl = getPetLevelInt(pet);
    const inferred = getNextTurnFreeRollsForTrigger(pet.name, lvl, trigger);
    if (inferred > 0) queued += queueNextTurnFreeRolls(inferred);
  });
  return queued;
}

function mergeStackedPetStats(basePet, targetPet, sourcePet) {
  const merged = { ...(basePet || {}) };
  const targetAtk = Math.max(1, Number(targetPet?.baseAttack || 1));
  const targetHp = Math.max(1, Number(targetPet?.baseHealth || 1));
  const sourceAtk = Math.max(1, Number(sourcePet?.baseAttack || 1));
  const sourceHp = Math.max(1, Number(sourcePet?.baseHealth || 1));

  // Stacking rule: do not add stats together; keep best baseline and add +1/+1.
  merged.baseAttack = Math.max(1, targetAtk, sourceAtk);
  merged.baseHealth = Math.max(1, targetHp, sourceHp);
  merged.baseAttack += 1;
  merged.baseHealth += 1;

  const targetScore = targetAtk + targetHp;
  const sourceScore = sourceAtk + sourceHp;
  const preferred = sourceScore > targetScore ? sourcePet : targetPet;
  const persistentFields = [
    'equipment', 'mana', 'triggersConsumed', 'foodsEaten',
    'battlesFought', 'timesHurt', 'friendsDiedBeforeBattle', 'sellValue',
    'copiedAbilityName', 'copiedAbilityLevel', 'copyExpiresTurn', 'calcPetState'
  ];
  persistentFields.forEach((field) => {
    if (preferred && preferred[field] !== undefined) {
      merged[field] = cloneSerializable(preferred[field]);
    }
  });
  const targetTempBuffs = Array.isArray(targetPet?.tempBuffs) ? targetPet.tempBuffs.map((b) => ({ ...b })) : [];
  const sourceTempBuffs = Array.isArray(sourcePet?.tempBuffs) ? sourcePet.tempBuffs.map((b) => ({ ...b })) : [];
  merged.tempBuffs = [...targetTempBuffs, ...sourceTempBuffs];
  return merged;
}

function applyLuckyCatLevelUpNextTurnGold(pet, prevLevelInt, newLevelInt) {
  if (!pet) return 0;
  if (normalizeName(pet.name) !== 'luckycat') return 0;
  if (Number(newLevelInt || 0) <= Number(prevLevelInt || 0)) return 0;
  return queueNextTurnGold(getNextTurnGoldForTrigger(pet.name, newLevelInt, 'levelup'));
}

function extractToyCatalogFromCalculatorSource(source) {
  const start = source.indexOf('var toys_default = [');
  if (start < 0) return [];

  const end = source.indexOf('\n];', start);
  if (end < 0) return [];

  const segment = source.slice(start, end);
  const out = [];
  const seen = new Set();
  const rx = /Name:\s*"([^"]+)"[\s\S]*?Tier:\s*(\d+)[\s\S]*?(?:Random:\s*(true|false))?/g;
  let m;
  while ((m = rx.exec(segment)) !== null) {
    const name = String(m[1] || '').trim();
    const tierNum = Number(m[2] || 1);
    const tier = Math.max(1, Math.min(6, Number.isFinite(tierNum) ? tierNum : 1));
    const random = String(m[3] || '').toLowerCase() === 'true';
    const key = normalizeName(name);
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push({ name, tier, random });
  }
  return out;
}

function renderToyPickerOptions() {
  renderActiveToyDisplay();
}

function getFallbackToyChoicesByTier(toyTier) {
  const requestedTier = Math.max(1, Math.min(6, Number(toyTier || 1)));
  const catalog = Array.isArray(state.toyCatalog) ? state.toyCatalog : [];
  return catalog
    .filter((toy) => Number(toy?.tier || 0) === requestedTier)
    .filter((toy) => !Boolean(toy?.random))
    .map((toy) => ({
      name: String(toy.name || '').trim(),
      tier: requestedTier
    }))
    .filter((toy) => toy.name.length > 0);
}

function dedupeToyChoices(choices = []) {
  const seen = new Set();
  const out = [];
  choices.forEach((toy) => {
    const name = String(toy?.name || '').trim();
    const key = normalizeName(name);
    if (!name || seen.has(key)) return;
    seen.add(key);
    out.push(toy);
  });
  return out;
}

function getAllowedToyChoicesForSource(sourcePetName, toyTier, abilityText = '') {
  const sourceFromText = parseToySourceFromAbility(abilityText);
  const resolvedSource = sourceFromText || sourcePetName;
  const key = normalizeName(resolvedSource);
  const pool = dedupeToyChoices((TOYS_BY_SOURCE[key] || [])
    .filter((toy) => isToyValidForPackAndTurn(toy.name, state.currentPackId, state.turn)));
  if (!pool.length) {
    const text = String(abilityText || '').trim();
    if (/witch toy/i.test(text)) {
      return dedupeToyChoices((TOYS_BY_SOURCE[normalizeName('Cuddle Toad')] || [])
        .filter((toy) => isToyValidForPackAndTurn(toy.name, state.currentPackId, state.turn)));
    }
    // Never show broad/random global toy pools when source mapping is missing.
    return [];
  }
  const numericTier = Number(toyTier || 1);
  const exact = pool.filter((toy) => typeof toy.tier === 'number' && Number(toy.tier) === numericTier);
  if (exact.length) return exact;
  const ranged = pool.filter((toy) => String(toy.tier) === '1-3');
  if (ranged.length && numericTier >= 1 && numericTier <= 3) return ranged;
  return pool;
}

function chooseAutoToy(toyLevel = 1, abilityText = '', options = {}) {
  if (!doesPackSupportToys(state.currentPackId)) {
    state.toyChoices = [];
    state.toyChoiceContext = null;
    renderToyChoiceDisplay();
    return null;
  }
  const petName = String(options?.petName || '').trim();
  const pool = getAllowedToyChoicesForSource(petName, toyLevel, abilityText);
  state.toyChoices = [...pool];
  state.toyChoiceContext = {
    sourcePet: petName || '',
    toyLevel: Number(toyLevel || 1),
    petLevel: Math.max(1, Math.min(3, Number(options?.petLevel || 1))),
    triggerLabel: String(options?.triggerLabel || 'ability')
  };
  renderToyChoiceDisplay();
  if (!pool.length) return null;
  if (pool.length === 1) {
    selectToyChoice(pool[0].name);
    return pool[0];
  }
  // Always show modal for multi-choice toy events so selection is explicit.
  openToyPickerModal();
  setStatus(`Choose a toy from ${petName || 'this source'} in the popup.`);
  return null;
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
    petName: pet?.name || '',
    petLevel: level,
    triggerLabel: options?.triggerLabel || 'ability'
  });
}

function openToyPickerFromPetInteraction(boardIdx) {
  const pet = state.board[boardIdx];
  if (!pet) return;
  const level = getPetLevelInt(pet);
  const abilityText = getPetAbilityText(pet, level);
  const toyLevel = parseToyChoiceLevelFromAbility(abilityText, level);
  if (!toyLevel) {
    setStatus(`${pet.name} has no toy choice ability right now.`);
    return;
  }
  const chosen = chooseAutoToy(toyLevel, abilityText, {
    petName: pet.name,
    petLevel: level,
    triggerLabel: 'interaction'
  });
  if (chosen) {
    setStatus(`${pet.name}: selected ${chosen.name}.`);
  }
}

function hydrateLevelFields(pet, exp) {
  const clamped = Math.max(0, Math.min(exp, 5));
  pet.exp = clamped;
  pet.mergeStage = clamped;
  pet.levelValue = getLevelDisplayForExp(clamped);
  pet.levelInt = levelStepToInt(clamped);
  return pet;
}

function createBoardPetFromShopPet(shopPet) {
  return hydrateLevelFields({
    ...shopPet,
    path: resolvePetTexture(shopPet?.name || '') || shopPet?.path || null,
    sellValue: Math.max(1, Number(shopPet?.sellValue || 1)),
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
  const perk = getPetPerkName(pet);
  const ailment = getPetAilmentName(pet);
  const perkNote = getPerkNoteForName(perk);
  const atkNow = getPetDisplayAttack(pet);
  const hpNow = getPetDisplayHealth(pet);
  const lvlInt = pet.levelInt ?? 1;
  const abilityPreview = getPetAbilityText(pet, lvlInt);
  return {
    title: `${pet.name} (Tier ${pet.tier || '?'})`,
    atk: `${atkNow}`,
    hp: `${hpNow}`,
    lines: [
      `Level ${pet.levelInt ?? 1} (${pet.levelValue ?? LEVEL_STEPS[0]})`,
      `Level Value: ${formatLevelValue(pet.levelValue ?? getLevelDisplayForExp(pet.exp ?? 0))}`,
      perk ? `Perk: ${perk}` : 'Perk: none',
      ailment ? `Ailment: ${ailment}` : 'Ailment: none',
      temp.atk || temp.hp ? `Temporary: +${temp.atk}/+${temp.hp} until next turn` : 'Temporary: none',
      `Preview: Attacks for ${atkNow}, survives up to ${hpNow} damage.`,
      abilityPreview ? `Active Ability: ${abilityPreview}` : '',
      `L1: ${pet.ability?.level1 || 'N/A'}`,
      `L2: ${pet.ability?.level2 || 'N/A'}`,
      `L3: ${pet.ability?.level3 || 'N/A'}`,
      perk ? `Perk Ability: ${perkNote || 'Unknown'}` : 'Perk Ability: none',
      `Source: ${WIKI_REFERENCE_LINKS.pets}`,
      (() => {
        const idx = state.board.findIndex((x) => x === pet);
        if (idx < 0) return '';
        const h = state.levelHistoryBySlot[idx] || [];
        if (!h.length) return '';
        const tail = h.slice(-3).map((row) => `T${row.turn}:${formatLevelValue(row.levelValue)}`).join(', ');
        return `Level History: ${tail}`;
      })()
    ]
      .filter(Boolean)
  };
}

function tooltipTextForFood(food) {
  const perkName = parsePerkFromText(food?.ability || '');
  const perkNote = perkName ? getPerkNoteForName(perkName) : '';
  return {
    title: `${food.name} (Tier ${food.tier})`,
    atk: null,
    hp: null,
    lines: [
      `Type: ${perkName ? `Perk Food (${perkName})` : 'Food (one-time effect)'}`,
      `Ability: ${food.ability || 'N/A'}`,
      perkName ? `Perk Ability: ${perkNote || 'Unknown'}` : '',
      `Source: ${WIKI_REFERENCE_LINKS.food}${perkName ? ` | ${WIKI_REFERENCE_LINKS.foodPerks}` : ''}`
    ]
      .filter(Boolean)
  };
}

function getToyMetaByName(toyName = '') {
  return TOYS_BY_NAME[normalizeName(toyName)] || null;
}

function getToyPackLabelById(packId) {
  const calcPack = CALCULATOR_PACK_BY_APP_ID[Number(packId)];
  return calcPack ? `${calcPack} Pack` : '';
}

function getToyUnlockTier(toyMeta) {
  const raw = toyMeta?.tier;
  if (typeof raw === 'number') return Math.max(1, Math.min(6, Math.trunc(raw)));
  if (typeof raw === 'string') {
    const match = raw.match(/(\d+)/);
    if (match) return Math.max(1, Math.min(6, Number(match[1])));
  }
  return 1;
}

function isToyAvailableOnTurn(toyMeta, turn) {
  if (!toyMeta) return false;
  const unlockTier = getToyUnlockTier(toyMeta);
  return maxTierForTurn(turn) >= unlockTier;
}

function doesPackSupportToys(packId) {
  const packLabel = getToyPackLabelById(packId);
  if (!packLabel) return false;
  return TOY_DEFINITIONS.some((toy) => normalizeName(toy.pack) === normalizeName(packLabel));
}

function isToyValidForPackAndTurn(toyName, packId, turn) {
  const meta = getToyMetaByName(toyName);
  if (!meta) return false;
  const packLabel = getToyPackLabelById(packId);
  if (!packLabel || normalizeName(meta.pack) !== normalizeName(packLabel)) return false;
  return isToyAvailableOnTurn(meta, turn);
}

function syncLegacyPlayerToyFields() {
  const toy = state.teamToys?.player || null;
  if (!toy || Number(toy.remaining_turns || 0) <= 0) {
    state.playerToy = null;
    state.playerToyLevel = 1;
    state.playerToyExplicitlySelected = false;
    return;
  }
  state.playerToy = toy.toy_id;
  state.playerToyLevel = Math.max(1, Math.min(3, Number(toy.toy_level || 1)));
}

function buildTeamToyState(toyName, toyLevel, packId) {
  const sourcePack = getToyPackLabelById(packId);
  return {
    toy_id: String(toyName || ''),
    remaining_turns: 2,
    source_pack: sourcePack || '',
    activation_state: 'active',
    toy_level: Math.max(1, Math.min(3, Number(toyLevel || 1)))
  };
}

function getActiveTeamToy(side) {
  const toy = state.teamToys?.[side] || null;
  if (!toy) return null;
  if (Number(toy.remaining_turns || 0) <= 0) return null;
  return toy;
}

function getToyBreakAbilityKind(effectText = '') {
  const text = String(effectText || '').trim();
  if (!/^Break:/i.test(text)) return '';
  if (/^Break:\s*Give right-most friend\s+\+\d+\/\+\d+/i.test(text)) return 'right_most_friend_buff_scaled';
  if (/^Break:\s*Give all friends \+health/i.test(text)) return 'all_friends_health_scaled';
  if (/^Break:\s*Stock free Lasagnas/i.test(text)) return 'stock_lasagna_scaled';
  if (/^Break:\s*Give right-most friends Melon perk/i.test(text)) return 'right_most_friends_melon_scaled';
  if (/^Break:\s*Summon a Treasure Chest/i.test(text)) return 'summon_treasure_chest';
  if (/^Break:\s*Stock free pet from Tier/i.test(text)) return 'stock_tier_pet_scaled';
  if (/^Break:\s*Summon free Holy Water/i.test(text)) return 'stock_holy_water_scaled';
  return '';
}

function getToyBreakMetadata(toyName = '') {
  const toyMeta = getToyMetaByName(toyName);
  if (!toyMeta) return null;
  const breakAbilityKind = getToyBreakAbilityKind(toyMeta.effect);
  return {
    ...toyMeta,
    has_break_ability: /^Break:/i.test(String(toyMeta.effect || '').trim()),
    break_ability_kind: breakAbilityKind || null
  };
}

function getRightMostBoardPetIndices(count = 1) {
  const out = [];
  for (let i = BOARD_SIZE - 1; i >= 0; i -= 1) {
    if (!state.board[i]) continue;
    out.push(i);
    if (out.length >= count) break;
  }
  return out;
}

function executeToyBreakAbility(event) {
  const side = String(event?.side || '');
  const toyState = event?.toyState || null;
  const toyName = String(toyState?.toy_id || '').trim();
  const toyLevel = Math.max(1, Math.min(3, Number(toyState?.toy_level || 1)));
  const meta = getToyBreakMetadata(toyName);
  if (!meta || !meta.has_break_ability) {
    return { ok: false, note: `No break ability metadata for ${toyName || 'unknown toy'}.` };
  }
  if (!meta.break_ability_kind) {
    return { ok: false, note: `${toyName}: break text exists but no functional executor.` };
  }
  if (side !== 'player') {
    return { ok: true, note: `${toyName}: opponent break event acknowledged.` };
  }

  const levelScale = Math.max(1, Math.min(3, toyLevel));
  if (meta.break_ability_kind === 'right_most_friend_buff_scaled') {
    const base = Number((String(meta.effect || '').match(/\+(\d+)\/\+\d+/i) || [])[1] || 1);
    const idx = getRightMostBoardPetIndices(1)[0];
    if (!Number.isInteger(idx)) return { ok: true, note: `${toyName}: no target friend for break buff.` };
    const amount = Math.max(1, base * levelScale);
    buffPetAt(idx, amount, amount, { perkText: `${toyName.toUpperCase()} BREAK` });
    return { ok: true, note: `${toyName}: gave right-most friend +${amount}/+${amount}.` };
  }
  if (meta.break_ability_kind === 'all_friends_health_scaled') {
    const amount = levelScale;
    getBoardPetIndices().forEach((idx) => buffPetAt(idx, 0, amount, { perkText: `${toyName.toUpperCase()} BREAK` }));
    return { ok: true, note: `${toyName}: gave all friends +${amount} health.` };
  }
  if (meta.break_ability_kind === 'stock_lasagna_scaled') {
    const lasagna = getTemplateFoodByName('Lasagna')
      || getAllFoodsAcrossPacks().find((f) => normalizeName(f.name) === 'lasagna');
    if (!lasagna) return { ok: false, note: `${toyName}: Lasagna template missing.` };
    for (let i = 0; i < levelScale; i += 1) {
      stockFoodInShop({
        name: lasagna.name,
        tier: Number(lasagna.tier || 3),
        ability: String(lasagna.ability || ''),
        cost: 0,
        path: resolveTexture(lasagna.name)
      });
    }
    return { ok: true, note: `${toyName}: stocked ${levelScale} free Lasagna.` };
  }
  if (meta.break_ability_kind === 'right_most_friends_melon_scaled') {
    const targets = getRightMostBoardPetIndices(levelScale);
    targets.forEach((idx) => setPetPerk(idx, 'Melon'));
    return { ok: true, note: `${toyName}: gave Melon to ${targets.length} right-most friend(s).` };
  }
  if (meta.break_ability_kind === 'summon_treasure_chest') {
    state.teamToys.player = buildTeamToyState('Treasure Chest', toyLevel, state.currentPackId);
    syncLegacyPlayerToyFields();
    return { ok: true, note: `${toyName}: summoned Treasure Chest.` };
  }
  if (meta.break_ability_kind === 'stock_tier_pet_scaled') {
    const tiers = [2, 4, 6];
    const tier = tiers[Math.max(0, Math.min(2, levelScale - 1))];
    const pack = state.packs[String(state.currentPackId)];
    const pool = (pack?.pets || []).filter((p) => Number(p.tier || 1) === tier);
    const pick = randFrom(pool);
    if (!pick) return { ok: false, note: `${toyName}: no tier ${tier} pet available to stock.` };
    placeTierUpPetIntoShop({
      ...pick,
      baseAttack: Math.max(1, Number(pick.baseAttack || 1)),
      baseHealth: Math.max(1, Number(pick.baseHealth || 1))
    });
    return { ok: true, note: `${toyName}: stocked free tier ${tier} pet (${pick.name}).` };
  }
  if (meta.break_ability_kind === 'stock_holy_water_scaled') {
    const holy = getTemplateFoodByName('Holy Water')
      || getAllFoodsAcrossPacks().find((f) => normalizeName(f.name) === 'holywater');
    if (!holy) return { ok: false, note: `${toyName}: Holy Water template missing.` };
    for (let i = 0; i < levelScale; i += 1) {
      stockFoodInShop({
        name: holy.name,
        tier: Number(holy.tier || 6),
        ability: String(holy.ability || ''),
        cost: 0,
        path: resolveTexture(holy.name)
      });
    }
    return { ok: true, note: `${toyName}: stocked ${levelScale} free Holy Water.` };
  }
  return { ok: false, note: `${toyName}: unhandled break ability kind ${meta.break_ability_kind}.` };
}

function dispatchToyBreakEvent(input = {}) {
  const side = String(input?.side || '');
  const toyState = input?.toyState ? { ...input.toyState } : null;
  const toyId = String(toyState?.toy_id || '').trim();
  if (!side || !toyId) {
    return { ok: false, note: 'Invalid toy break event payload.' };
  }
  const eventKey = [
    String(input?.source || 'unknown'),
    side,
    normalizeName(toyId),
    Math.max(1, Math.min(3, Number(toyState?.toy_level || 1))),
    String(input?.nonce || state.turn)
  ].join(':');
  if (state.toyBreakEventSeen[eventKey]) {
    return { ok: true, note: `${toyId}: break event already processed.` };
  }
  state.toyBreakEventSeen[eventKey] = true;
  const result = executeToyBreakAbility({ ...input, side, toyState });
  if (Array.isArray(state.toyBreakListeners)) {
    state.toyBreakListeners.forEach((listener) => {
      try {
        listener({ type: 'TOY_BREAK', side, toyState: { ...toyState }, result, source: input?.source || 'unknown' });
      } catch (_) {
        // Listener failures should not block game state updates.
      }
    });
  }
  return result;
}

function tooltipTextForToy(toy) {
  const name = String(toy?.name || '').trim();
  const meta = getToyMetaByName(name);
  const tierText = (meta && meta.tier !== undefined) ? String(meta.tier) : String(toy?.tier || 1);
  return {
    title: `${name || 'No Toy'} (Tier ${tierText})`,
    atk: null,
    hp: null,
    lines: [
      `Source: ${meta?.sourcePet || 'Unknown'}`,
      `Pack: ${meta?.pack || 'Unknown'}`,
      `Effect: ${meta?.effect || 'No effect text available.'}`,
      `Source Ref: ${WIKI_REFERENCE_LINKS.toys}`
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
    const data = kind === 'pet'
      ? tooltipTextForPet(item)
      : kind === 'toy'
        ? tooltipTextForToy(item)
        : tooltipTextForFood(item);
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
    const isPetLike = Boolean(item?.ability && typeof item.ability === 'object');
    const safePath = isPetLike ? (resolvePetTexture(item?.name || '') || item.path) : item.path;
    const img = document.createElement('img');
    img.className = 'card-art';
    img.src = safePath;
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
  const badge = document.createElement('div');
  badge.className = 'perk-overlay';
  if (normalizeName(perkName) === 'honey') {
    badge.classList.add('perk-honey');
  }
  badge.title = perkName;
  if (tex) {
    const img = document.createElement('img');
    img.src = tex;
    img.alt = perkName;
    badge.appendChild(img);
  } else {
    badge.classList.add('perk-text');
    const text = document.createElement('span');
    text.textContent = String(perkName).slice(0, 3).toUpperCase();
    badge.appendChild(text);
  }
  return badge;
}

function createAilmentBadgeElement(ailmentName) {
  if (!ailmentName) return null;
  const canonical = getCanonicalAilmentName(ailmentName);
  if (!canonical) return null;
  const tex = resolveTexture(canonical);
  const badge = document.createElement('div');
  badge.className = 'perk-overlay ailment-overlay';
  badge.title = canonical;
  if (tex) {
    const img = document.createElement('img');
    img.src = tex;
    img.alt = canonical;
    badge.appendChild(img);
  } else {
    badge.classList.add('perk-text');
    const text = document.createElement('span');
    text.textContent = String(canonical).slice(0, 3).toUpperCase();
    badge.appendChild(text);
  }
  return badge;
}

function createManaBadgeElement(mana, options = {}) {
  const amount = Math.max(0, Number(mana || 0));
  const delta = Number(options?.delta || 0);
  const floatingGain = Math.max(0, Number(options?.floatingGain || 0));
  const tex = resolveTexture('ManaPotion_2x') || resolveTexture('ManaPotion');
  const badge = document.createElement('div');
  badge.className = 'mana-overlay';
  if (delta > 0) badge.classList.add('mana-gain');
  if (delta < 0) badge.classList.add('mana-loss');
  badge.title = `Mana: ${amount}`;
  if (tex) {
    const img = document.createElement('img');
    img.src = tex;
    img.alt = 'Mana';
    badge.appendChild(img);
  }
  const text = document.createElement('span');
  text.textContent = String(amount);
  badge.appendChild(text);
  if (floatingGain > 0) {
    const float = document.createElement('div');
    float.className = 'mana-float';
    float.textContent = `+${floatingGain} Mana`;
    badge.appendChild(float);
  }
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
  if (perk) return getCanonicalPerkName(perk[1].trim());
  if (/Give one pet Strawberry\.?/i.test(text)) return getCanonicalPerkName('Strawberry');
  return null;
}

function normalizePerkNameKey(perkName) {
  return normalizeName(String(perkName || '').replace(/\s*\([^)]*\)\s*$/, '').trim());
}

function normalizeAilmentNameKey(ailmentName) {
  return normalizeName(String(ailmentName || '').replace(/\s*\([^)]*\)\s*$/, '').trim());
}

function getCanonicalAilmentName(ailmentName) {
  const raw = String(ailmentName || '').trim();
  if (!raw) return '';
  const key = normalizeAilmentNameKey(raw);
  return AILMENT_CANONICAL_NAMES[key] || '';
}

function isAilmentName(value) {
  return Boolean(getCanonicalAilmentName(value));
}

function getCanonicalPerkName(perkName) {
  const raw = String(perkName || '').trim();
  if (!raw) return '';
  const key = normalizePerkNameKey(raw);
  if (AILMENT_CANONICAL_NAMES[key]) return '';
  return PERK_CANONICAL_NAMES[key] || raw;
}

function getPetPerkName(pet) {
  if (!pet) return '';
  const raw = typeof pet.equipment === 'string'
    ? pet.equipment
    : (pet.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : '');
  if (isAilmentName(raw)) return '';
  return getCanonicalPerkName(raw);
}

function getPetAilmentName(pet) {
  if (!pet) return '';
  const raw = typeof pet.equipment === 'string'
    ? pet.equipment
    : (pet.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : '');
  return getCanonicalAilmentName(raw);
}

function getPerkNoteForName(perkName) {
  const key = normalizePerkNameKey(perkName);
  if (!key) return '';
  return String(state.perkNotes[key] || DEFAULT_PERK_NOTES[key] || '');
}

function extractNameIdAliasesFromCalculatorSource(source) {
  const aliases = {};
  const rx = /Name:\s*"([^"]+)"[\s\S]{0,220}?NameId:\s*"([^"]+)"/g;
  let m;
  while ((m = rx.exec(source)) !== null) {
    const nameKey = normalizeName(m[1]);
    const idKey = normalizeName(m[2]);
    if (!nameKey || !idKey || nameKey === idKey) continue;
    aliases[nameKey] = idKey;
  }
  return aliases;
}

function extractPerkNotesFromCalculatorSource(source) {
  const notes = {};
  const rx = /Ability:\s*"Give one pet(?: the)? [^"]+?(?:perk\.?|Strawberry\.?)"[\s\S]{0,520}?Name:\s*"([^"]+)"[\s\S]{0,220}?PerkNote:\s*"([^"]+)"/g;
  let m;
  while ((m = rx.exec(source)) !== null) {
    const nameKey = normalizePerkNameKey(m[1]);
    const note = String(m[2] || '').trim();
    if (!nameKey || !note) continue;
    notes[nameKey] = note;
  }
  return notes;
}

function escapeRegex(text) {
  return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getKnownPerkNames() {
  const names = new Set();
  getAllFoodsAcrossPacks().forEach((food) => {
    const perkName = parsePerkFromText(food?.ability || '');
    if (perkName) names.add(String(perkName).trim());
  });
  Object.keys(DEFAULT_PERK_NOTES).forEach((key) => {
    const canonical = PERK_CANONICAL_NAMES[key];
    if (canonical) names.add(String(canonical));
    else names.add(String(key));
  });
  names.add('Honey');
  return Array.from(names)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
}

function parseBattleNameAndPerk(parsedName) {
  const raw = String(parsedName || '').trim();
  if (!raw) return { displayName: '', perkName: '', ailmentName: '' };
  const fullTexture = resolveTexture(raw);
  const ailmentNames = Object.values(AILMENT_CANONICAL_NAMES).sort((a, b) => b.length - a.length);
  for (const ailmentName of ailmentNames) {
    const m = raw.match(new RegExp(`^(.*?)\\s+${escapeRegex(ailmentName)}$`, 'i'));
    if (!m) continue;
    const displayName = String(m[1] || '').trim();
    if (!displayName) continue;
    const baseTexture = resolveTexture(displayName);
    if (baseTexture || !fullTexture) {
      return { displayName, perkName: '', ailmentName: getCanonicalAilmentName(ailmentName) };
    }
  }
  const perkNames = getKnownPerkNames();
  for (const perkName of perkNames) {
    const m = raw.match(new RegExp(`^(.*?)\\s+${escapeRegex(perkName)}$`, 'i'));
    if (!m) continue;
    const displayName = String(m[1] || '').trim();
    if (!displayName) continue;
    const baseTexture = resolveTexture(displayName);
    if (baseTexture || !fullTexture) {
      return { displayName, perkName, ailmentName: '' };
    }
  }
  return { displayName: raw, perkName: '', ailmentName: '' };
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

function resolveWhaleSharkTriggerAt(idx, reason = 'gain') {
  const pet = state.board[idx];
  if (!pet) return false;
  if (normalizeName(pet.name) !== 'whaleshark') return false;
  const lvl = Math.max(1, Math.min(3, Number(getPetLevelInt(pet) || 1)));
  const battleMult = state.phase === 'battle' ? 3 : 1;
  const amount = lvl * battleMult;
  pet.equipment = null;
  buffPetAt(idx, amount, amount, { perkText: 'WHALE SHARK' });
  pulseShopAbilityAt(idx, 'Whale Shark');
  setStatus(`Whale Shark (${reason}): removed perk/ailment and gained +${amount}/+${amount}.`);
  return true;
}

function clearPetEquipment(idx, reason = 'effect') {
  const pet = state.board[idx];
  if (!pet) return '';
  const previous = String(pet.equipment || '').trim();
  if (!previous) return '';
  if (useCalculatorShopBridge()) {
    triggerCalculatorPerkLost(idx, previous);
  }
  pet.equipment = null;
  if (normalizeName(pet.name) === 'whaleshark') {
    resolveWhaleSharkTriggerAt(idx, reason);
  }
  return previous;
}

function setPetPerk(idx, perkName, sourceEl = null) {
  const pet = state.board[idx];
  if (!pet || !perkName) return;
  const previousPerk = getPetPerkName(pet);
  const nextPerk = getCanonicalPerkName(perkName);
  if (!nextPerk) return;
  if (useCalculatorShopBridge() && previousPerk && normalizeName(previousPerk) !== normalizeName(nextPerk)) {
    triggerCalculatorPerkLost(idx, previousPerk);
  }
  pet.equipment = nextPerk;
  if (useCalculatorShopBridge()) {
    triggerCalculatorPerkGained(idx, perkName);
    // Bridge sync can drop equipment fields for shop pets; preserve explicit local perk.
    const live = state.board[idx];
    if (live && normalizeName(live.name) !== 'whaleshark') {
      live.equipment = nextPerk;
    }
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
  if (normalizeName(pet.name) === 'whaleshark') {
    resolveWhaleSharkTriggerAt(idx, 'perk gained');
  }
}

function setPetAilment(idx, ailmentName, sourceEl = null) {
  const pet = state.board[idx];
  if (!pet || !ailmentName) return;
  const canonicalAilment = getCanonicalAilmentName(ailmentName);
  if (!canonicalAilment) return;
  const previousPerk = getPetPerkName(pet);
  pet.equipment = canonicalAilment;
  if (useCalculatorShopBridge()) {
    if (previousPerk && normalizeName(previousPerk) !== normalizeName(canonicalAilment)) {
      triggerCalculatorPerkLost(idx, previousPerk);
    }
    const ctx = createCalculatorShopContext();
    const calcPet = ctx?.player?.getPet?.(idx);
    if (calcPet && typeof ctx?.runner?.abilityService?.triggerAilmentGainEvents === 'function') {
      const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
      ctx.runner.abilityService.triggerAilmentGainEvents(calcPet, canonicalAilment);
      runCalculatorAbilityQueue(ctx.runner);
      syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
      syncBoardStateFromCalculatorPlayer(ctx.player);
      const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
      pushDebugTrigger('AilmentGain', `Ailment gained at slot ${idx + 1}: ${canonicalAilment}.`, out);
    }
    // Bridge sync can drop equipment fields for shop pets; preserve explicit local ailment.
    const live = state.board[idx];
    if (live && normalizeName(live.name) !== 'whaleshark') {
      live.equipment = canonicalAilment;
    }
  }
  animateBoardStatDelta({
    scope: 'shop',
    toIdx: idx,
    perkText: canonicalAilment.toUpperCase()
  });
  if (sourceEl) {
    const targetEl = getBoardSlotElement(idx);
    if (targetEl) {
      const token = document.createElement('div');
      token.className = 'fx-fly-icon';
      token.textContent = canonicalAilment.toUpperCase();
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
  if (normalizeName(pet.name) === 'whaleshark') {
    resolveWhaleSharkTriggerAt(idx, 'ailment gained');
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
    setPetAilment(targetIdx, 'Weak', foodRef ? getFoodSlotElement(foodRef.listName, foodRef.idx) : null);
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
    const buffTierUpPet = (item) => {
      if (!item) return;
      item.baseAttack = Math.max(1, Number(item.baseAttack || 1) + atk);
      item.baseHealth = Math.max(1, Number(item.baseHealth || 1) + hp);
    };
    const applyToPending = (pending) => {
      if (!pending || !Array.isArray(pending.options)) return;
      pending.options.forEach((opt) => buffTierUpPet(opt?.item));
    };
    applyToPending(state.pendingTierUp);
    (state.pendingTierUpQueue || []).forEach(applyToPending);
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
    applyLuckyCatLevelUpNextTurnGold(state.board[targetIdx], bumped.prevLevelInt, bumped.newLevelInt);
    animateShopXpFillAt(targetIdx);
    maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt, targetIdx);
    if (bumped.newLevelInt > bumped.prevLevelInt) {
      animateLevelUpAt('shop', targetIdx);
    }
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
    path: resolvePetTexture(name)
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
  state.nameIdAliases = {
    ...state.nameIdAliases,
    ...extractNameIdAliasesFromCalculatorSource(source)
  };
  state.perkNotes = {
    ...DEFAULT_PERK_NOTES,
    ...state.perkNotes,
    ...extractPerkNotesFromCalculatorSource(source)
  };
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
  const expValue = Number.isInteger(pet.exp) ? pet.exp : calcExpForLevel(levelInt);
  const equipment = typeof pet.equipment === 'string'
    ? pet.equipment
    : (pet.equipment && typeof pet.equipment.name === 'string' ? pet.equipment.name : null);
  return {
    name: pet.name,
    attack: Math.max(1, Number(pet.baseAttack || 0) + temp.atk),
    health: Math.max(1, Number(pet.baseHealth || 0) + temp.hp),
    exp: expValue,
    level: levelInt,
    levelInt,
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
  const playerToy = getActiveTeamToy('player');
  const toyName = String(playerToy?.toy_id || state.playerToy || '').trim();
  const toyLevel = Math.max(1, Math.min(3, Number(playerToy?.toy_level || state.playerToyLevel || 1)));
  return {
    playerToy: toyName || null,
    playerToyLevel: toyName ? toyLevel : 1
  };
}

function getBridgeGameCounters() {
  return {
    playerRollAmount: Math.max(0, Number(state.rollsThisTurn || 0)),
    playerGoldSpent: Math.max(0, START_GOLD - state.gold),
    playerLevel3Sold: Math.max(0, Number(state.level3SoldThisTurn || 0)),
    playerSummonedAmount: Math.max(0, Number(state.summonedThisTurn || 0))
  };
}

function syncBridgeCountersFromGameApi(gameApi) {
  if (!gameApi || typeof gameApi !== 'object') return;
  state.level3SoldThisTurn = Math.max(0, Number(gameApi.playerLevel3Sold || state.level3SoldThisTurn || 0));
  state.summonedThisTurn = Math.max(0, Number(gameApi.playerSummonedAmount || state.summonedThisTurn || 0));
}

function isAuthoritativeMechanicsReady() {
  return Boolean(
    state.calculatorSim
    && typeof state.calculatorSim.runHeadlessSimulation === 'function'
    && typeof state.calculatorSim.__createSimulationRunner === 'function'
    && typeof state.calculatorSim.LogService === 'function'
  );
}

function useCalculatorShopBridge() {
  return state.currentPackId >= 1 && state.currentPackId <= 6 && isAuthoritativeMechanicsReady();
}

function isStrictAuthoritativePack() {
  return Number(state.currentPackId) === 2 && useCalculatorShopBridge();
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
  const prevBoard = Array.isArray(state.board) ? state.board.map((p) => (p ? { ...p } : null)) : [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const next = hydrateBoardFromCalcPet(player.getPet(i));
    const prev = prevBoard[i];
    if (next && prev && normalizeName(prev.name) === normalizeName(next.name)) {
      const prevExp = Math.max(0, Math.min(5, Number(prev.exp || 0)));
      const nextExp = Math.max(0, Math.min(5, Number(next.exp || 0)));
      if (nextExp < prevExp) {
        // Guard against accidental exp regressions during bridge sync.
        hydrateLevelFields(next, prevExp);
      }
    }
    state.board[i] = next;
    if (state.board[i]) {
      pushLevelHistory(i, state.board[i], 'calculator_sync');
    }
  }
  state.gold = Math.max(0, Number.isFinite(Number(player.gold)) ? Number(player.gold) : state.gold);
  // Toy ownership is controlled only by explicit app events (selection/grants), never by bridge sync.
  syncLegacyPlayerToyFields();
}

function createCalculatorShopContext() {
  const sim = state.calculatorSim;
  if (!sim || typeof sim.__createSimulationRunner !== 'function' || typeof sim.LogService !== 'function') {
    pushDebugTrigger('BridgeInit', 'Calculator simulation runtime unavailable.');
    return null;
  }

  const logService = new sim.LogService();
  if (typeof logService.setEnabled === 'function') logService.setEnabled(true);
  if (typeof logService.setDeferDecorations === 'function') logService.setDeferDecorations(true);

  const runner = sim.__createSimulationRunner(logService);
  if (!runner) {
    pushDebugTrigger('BridgeInit', 'Failed to create simulation runner.');
    return null;
  }

  const packName = CALCULATOR_PACK_BY_APP_ID[state.currentPackId] || 'Turtle';
  const blankTeam = Array(BOARD_SIZE).fill(null);
  const counters = getBridgeGameCounters();
  runner.setupGameEnvironment({
    turn: state.turn,
    simulationCount: 1,
    playerPack: packName,
    opponentPack: packName,
    playerPets: blankTeam,
    opponentPets: blankTeam,
    playerGoldSpent: counters.playerGoldSpent,
    opponentGoldSpent: 10,
    playerRollAmount: counters.playerRollAmount,
    opponentRollAmount: 0,
    playerLevel3Sold: counters.playerLevel3Sold,
    opponentLevel3Sold: 0,
    playerSummonedAmount: counters.playerSummonedAmount,
    opponentSummonedAmount: 0
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
    // Always keep core combat/level fields sourced from current board config.
    const cfg = petConfigs[i];
    if (cfg) {
      calcPet.attack = Math.max(1, Number(cfg.attack || calcPet.attack || 1));
      calcPet.health = Math.max(1, Number(cfg.health || calcPet.health || 1));
      calcPet.exp = Math.max(0, Math.min(5, Number(cfg.exp || calcPet.exp || 0)));
      calcPet.mana = Math.max(0, Number(cfg.mana || calcPet.mana || 0));
    }
  }

  player.gold = Number(state.gold || 0);
  runner.gameService.gameApi.playerLostLastBattle = Boolean(state.lastBattleLost);
  runner.gameService.gameApi.opponentLostLastBattle = false;
  runner.gameService.gameApi.playerRollAmount = counters.playerRollAmount;
  runner.gameService.gameApi.playerGoldSpent = counters.playerGoldSpent;
  runner.gameService.gameApi.playerLevel3Sold = counters.playerLevel3Sold;
  runner.gameService.gameApi.playerSummonedAmount = counters.playerSummonedAmount;

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
  state.level3SoldThisTurn = 0;
  state.summonedThisTurn = 0;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('StartTurn', 'Triggered all StartTurn abilities in authoritative engine.', out);
  return out;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('EndTurn', 'Triggered all EndTurn abilities in authoritative engine.', out);
  return out;
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
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('Buy', `Buy trigger for slot ${boardIdx + 1}.`, out);
}

function triggerCalculatorSell(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  const soldPet = ctx.player.getPet(boardIdx);
  if (!soldPet) return;
  if (Math.max(0, Math.min(5, Number(soldPet.exp || 0))) >= 5) {
    state.level3SoldThisTurn += 1;
    ctx.runner.gameService.gameApi.playerLevel3Sold = Math.max(0, Number(state.level3SoldThisTurn || 0));
  }
  const boardPet = state.board[boardIdx];
  if (boardPet) {
    maybeChooseToyFromPetAbility(boardPet, getPetLevelInt(boardPet), {
      trigger: 'sell',
      interactive: true,
      triggerLabel: 'sell'
    });
    applyCurrentToyToCalculatorPlayer(ctx);
  }
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  ctx.player.setPet(boardIdx, undefined, false);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('Sell', `Sell trigger for slot ${boardIdx + 1}.`, out);
}

function triggerCalculatorSpendGold(amount) {
  const spend = Math.max(0, Math.trunc(Number(amount || 0)));
  if (!spend) return;
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('SpendGold', `SpendGold x${spend}.`, out);
}

function triggerCalculatorRoll() {
  const ctx = createCalculatorShopContext();
  if (!ctx) return [];
  const aq = ctx.runner.abilityService?.abilityQueueService;
  if (!aq) return [];
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
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
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('Roll', 'Roll trigger processed.', out);
  return out;
}

function triggerCalculatorFoodEaten(boardIdx, foodName = '') {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const eater = ctx.player.getPet(boardIdx);
  if (!eater) return;
  if (typeof ctx.runner.abilityService?.triggerFoodEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerFoodEvents(eater, String(foodName || '').trim() || undefined);
  runCalculatorAbilityQueue(ctx.runner);
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('FoodEaten', `Food event for slot ${boardIdx + 1}: ${foodName || 'unknown food'}.`, out);
}

function triggerCalculatorPerkGained(boardIdx, perkName = '') {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const pet = ctx.player.getPet(boardIdx);
  if (!pet) return;
  if (typeof ctx.runner.abilityService?.triggerPerkGainEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerPerkGainEvents(pet, String(perkName || '').trim() || undefined);
  runCalculatorAbilityQueue(ctx.runner);
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('PerkGain', `Perk gained at slot ${boardIdx + 1}: ${perkName || 'unknown perk'}.`, out);
}

function triggerCalculatorPerkLost(boardIdx, perkName = '') {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const pet = ctx.player.getPet(boardIdx);
  if (!pet) return;
  if (typeof ctx.runner.abilityService?.triggerPerkLossEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerPerkLossEvents(pet, String(perkName || '').trim() || undefined);
  runCalculatorAbilityQueue(ctx.runner);
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('PerkLoss', `Perk lost at slot ${boardIdx + 1}: ${perkName || 'unknown perk'}.`, out);
}

function triggerCalculatorHurt(boardIdx, damageAmount = 1) {
  const dmg = Math.max(1, Number(damageAmount || 1));
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const pet = ctx.player.getPet(boardIdx);
  if (!pet) return;
  if (typeof ctx.runner.abilityService?.triggerHurtEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerHurtEvents(pet, dmg);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('Hurt', `Hurt trigger at slot ${boardIdx + 1} for ${dmg}.`, out);
}

function triggerCalculatorSummon(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const summoned = ctx.player.getPet(boardIdx);
  if (!summoned) return;
  if (typeof ctx.runner.abilityService?.triggerSummonEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerSummonEvents(summoned);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('Summon', `Summon trigger at slot ${boardIdx + 1}.`, out);
}

function triggerCalculatorLevelUp(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const leveled = ctx.player.getPet(boardIdx);
  if (!leveled) return;
  if (typeof ctx.runner.abilityService?.triggerLevelUpEvents !== 'function') return;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  ctx.runner.abilityService.triggerLevelUpEvents(leveled);
  runCalculatorAbilityQueue(ctx.runner);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  pushDebugTrigger('LevelUp', `LevelUp trigger at slot ${boardIdx + 1}.`, out);
}

function triggerCalculatorFaint(boardIdx) {
  const ctx = createCalculatorShopContext();
  if (!ctx) return;
  const fainted = ctx.player.getPet(boardIdx);
  if (!fainted) return;
  const boardPetBefore = state.board[boardIdx] ? { ...state.board[boardIdx] } : null;
  const beforeLen = Array.isArray(ctx.logService.getLogs?.()) ? ctx.logService.getLogs().length : 0;
  if (typeof ctx.runner.abilityService?.triggerFaintEvents !== 'function') return;
  ctx.runner.abilityService.triggerFaintEvents(fainted);
  if (typeof ctx.runner.abilityService?.triggerAfterFaintEvents === 'function') {
    ctx.runner.abilityService.triggerAfterFaintEvents(fainted);
  }
  runCalculatorAbilityQueue(ctx.runner);
  syncBridgeCountersFromGameApi(ctx.runner?.gameService?.gameApi);
  ctx.player.setPet(boardIdx, undefined, false);
  syncBoardStateFromCalculatorPlayer(ctx.player);
  const out = collectCalculatorLogMessages(ctx.logService, beforeLen);
  if (boardPetBefore) {
    const petName = String(boardPetBefore.name || '');
    const petLevel = Math.max(1, Math.min(3, getPetLevelInt(boardPetBefore)));
    const abilityText = getAbilityTextForPetLevel(petName, petLevel);
    const queuedByLog = logsContainNextTurnGoldForPet(out, petName);
    if (!queuedByLog && /^Faint:/i.test(abilityText)) {
      const n = normalizeName(petName);
      if (n !== 'pixiu' || Number(boardPetBefore.mana || 0) >= 4) {
        queueNextTurnGold(getNextTurnGoldForTrigger(petName, petLevel, 'faint'));
      }
    }
  }
  pushDebugTrigger('Faint', `Faint trigger at slot ${boardIdx + 1}.`, out);
}

function inferAilmentFromText(text) {
  const s = String(text || '').toLowerCase();
  const ailments = Object.keys(AILMENT_CANONICAL_NAMES);
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

function chooseToyForPackTurn(packId, turn) {
  const packLabel = getToyPackLabelById(packId);
  if (!packLabel) return null;
  const pool = TOY_DEFINITIONS.filter((toy) => normalizeName(toy.pack) === normalizeName(packLabel))
    .filter((toy) => isToyAvailableOnTurn(toy, turn));
  if (!pool.length) return null;
  return randFrom(pool) || null;
}

function getValidTeamToyForBattle(side, packId, turn) {
  const current = getActiveTeamToy(side);
  if (
    current
    && normalizeName(current.source_pack) === normalizeName(getToyPackLabelById(packId))
    && isToyValidForPackAndTurn(current.toy_id, packId, turn)
  ) {
    current.activation_state = 'active';
    return current;
  }
  if (side === 'opponent') {
    state.teamToys.opponent = null;
  }
  return null;
}

function decrementTeamToyDurabilityAtTurnEnd() {
  const out = [];
  ['player', 'opponent'].forEach((side) => {
    const toy = state.teamToys?.[side];
    if (!toy || Number(toy.remaining_turns || 0) <= 0) return;
    toy.remaining_turns = Math.max(0, Number(toy.remaining_turns || 0) - 1);
    if (toy.remaining_turns <= 0) {
      const breakResult = dispatchToyBreakEvent({
        source: 'durability_expire',
        side,
        toyState: { ...toy },
        nonce: `${state.turn}-durability`
      });
      toy.activation_state = 'broken';
      out.push({ side, toy_id: toy.toy_id, result: breakResult?.note || '' });
      state.teamToys[side] = null;
    } else {
      toy.activation_state = 'active';
    }
  });
  syncLegacyPlayerToyFields();
  if (out.length) {
    state.pendingToyBreakFx = [...(state.pendingToyBreakFx || []), ...out];
    playUiSound('toybreak', 0.85);
  }
  return out;
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
  if (!isAuthoritativeMechanicsReady()) {
    throw new Error('Calculator simulation API unavailable.');
  }

  const playerPets = getActiveBoardPets().map((pet) => boardPetToCalculatorPet(pet));
  const playerTeamNames = playerPets.filter(Boolean).map((pet) => pet.name);
  const playerPackName = CALCULATOR_PACK_BY_APP_ID[state.currentPackId] || 'Turtle';
  const opponentTeamSize = Math.max(1, playerTeamNames.length || 1);
  const opponent = buildRandomOpponentPetsForTurn(state.turn, opponentTeamSize);
  const opponentPackName = CALCULATOR_PACK_BY_APP_ID[opponent.opponentPackId] || 'Turtle';
  const playerToyState = getValidTeamToyForBattle('player', state.currentPackId, state.turn);
  const opponentToyState = getValidTeamToyForBattle('opponent', opponent.opponentPackId, state.turn);
  const toyCfg = {
    playerToy: playerToyState?.toy_id || null,
    playerToyLevel: playerToyState?.toy_level || 1,
    opponentToy: opponentToyState?.toy_id || null,
    opponentToyLevel: opponentToyState?.toy_level || 1
  };
  const simulation = state.calculatorSim.runHeadlessSimulation({
    turn: state.turn,
    simulationCount: 1,
    logsEnabled: true,
    maxLoggedBattles: 1,
    playerPack: playerPackName,
    opponentPack: opponentPackName,
    playerRollAmount: Math.max(0, Number(state.rollsThisTurn || 0)),
    opponentRollAmount: 0,
    playerToy: toyCfg.playerToy,
    playerToyLevel: toyCfg.playerToyLevel,
    opponentToy: toyCfg.opponentToy,
    opponentToyLevel: toyCfg.opponentToyLevel,
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
    rollCountAtBattleStart: Math.max(0, Number(state.rollsThisTurn || 0)),
    playerInitialPets: playerPets.map((p) => (p ? { ...p } : null)),
    opponentInitialPets: opponent.pets.map((p) => (p ? { ...p } : null)),
    opponentPackId: opponent.opponentPackId,
    playerToy: toyCfg.playerToy,
    playerToyLevel: toyCfg.playerToyLevel,
    opponentToy: toyCfg.opponentToy,
    opponentToyLevel: toyCfg.opponentToyLevel,
    playerToyState: playerToyState ? { ...playerToyState } : null,
    opponentToyState: opponentToyState ? { ...opponentToyState } : null,
    logs,
    phaseCounts: countBattlePhases(logs)
  };
  state.lastBattleLost = winner === 'opponent';
  pushDebugTrigger(
    'BattleSim',
    `Battle simulated via ${MECHANICS_MODE}. Source refs: pets/perks/food/toys/tokens/mana/trumpet wiki.`,
    logs.slice(0, 12).map((x) => stripHtmlToText(x?.message || '')).filter(Boolean)
  );
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
  const discountedCost = Math.max(0, Math.max(0, food.cost ?? BUY_COST) - Number(state.foodDiscount || 0));
  state.extraShopFoods[idx].item = {
    name: food.name,
    tier: food.tier ?? 1,
    ability: food.ability ?? '',
    path: food.path || resolveTexture(food.name),
    cost: discountedCost
  };
  state.extraShopFoods[idx].frozen = false;
  markFoodSlotFx(state.extraShopFoods[idx], 'stock');
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
    name: 'Gold Apple',
    fallback: 'Apple',
    ability: 'Give one pet +1 attack and +1 health.',
    cost: 2
  };
}

function getWormStockFoodDefinitionByName(name, fallbackLevel = 1) {
  const fallback = parseStockedApple(fallbackLevel);
  const requestedName = String(name || '').trim();
  const fallbackName = requestedName || fallback.name;
  const canonical = getTemplateFoodByName(fallbackName);
  const canonicalName = fallbackName;
  const fallbackAbility = canonicalName === 'Best Apple'
    ? 'Give one pet +3 attack and +3 health.'
    : canonicalName === 'Better Apple'
      ? 'Give one pet +2 attack and +2 health.'
      : 'Give one pet +1 attack and +1 health.';
  return {
    name: canonicalName,
    tier: Number(canonical?.tier || 2),
    ability: String(canonical?.ability || fallbackAbility),
    cost: 2,
    path: resolveTexture(canonicalName) || resolveTexture('Apple')
  };
}

function getWormStockPlan(level) {
  if (level >= 3) {
    return [
      { name: 'Best Apple', count: 1 }
    ];
  }
  if (level >= 2) {
    return [
      { name: 'Better Apple', count: 1 }
    ];
  }
  return [
    { name: 'Gold Apple', count: 1 }
  ];
}

function getWormStockFoodsForLevel(level) {
  const plan = getWormStockPlan(level);
  const out = [];
  plan.forEach((entry) => {
    const qty = Math.max(0, Number(entry?.count || 0));
    for (let i = 0; i < qty; i += 1) {
      out.push(getWormStockFoodDefinitionByName(entry?.name, level));
    }
  });
  return out;
}

function getWormStockFoodDefinition(level) {
  const fallback = parseStockedApple(level);
  const canonical = getTemplateFoodByName(fallback.name) || (fallback.fallback ? getTemplateFoodByName(fallback.fallback) : null);
  return {
    name: String(canonical?.name || fallback.name),
    tier: Number(canonical?.tier || 2),
    ability: String(canonical?.ability || fallback.ability || 'Give one pet +1 attack and +1 health.'),
    cost: 2,
    path: resolveTexture(canonical?.name || fallback.name || 'Apple')
  };
}

function applyShopStartTurnEffectAt(idx, forcedName = null, forcedLevel = null) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const level = forcedLevel ?? getPetLevelInt(pet);
  const n = normalizeName(forcedName || pet.name);

  if (n === 'worm') {
    const stockedFoods = getWormStockFoodsForLevel(level);
    stockedFoods.forEach((food) => stockFoodInShop({ ...food }));
    const summary = stockedFoods.reduce((acc, food) => {
      const key = String(food?.name || 'Apple');
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const summaryText = Object.entries(summary)
      .map(([name, count]) => `${count} ${name}`)
      .join(', ');
    logs.push(`${pet.name}: stocked ${summaryText || 'no apples'}`);
    return logs;
  }

  if (n === 'squirrel') {
    state.foodDiscount += level;
    const applyDiscount = (slot) => {
      if (!slot?.item) return;
      slot.item.cost = Math.max(0, (slot.item.cost ?? BUY_COST) - level);
      markFoodSlotFx(slot, 'discount', level);
    };
    state.shopFoods.forEach(applyDiscount);
    state.extraShopFoods.forEach(applyDiscount);
    logs.push(`${pet.name}: discounted shop food by ${level}`);
    return logs;
  }

  if (n === 'dromedary') {
    const valid = state.shopPets
      .map((slot, slotIdx) => ({ slot, slotIdx }))
      .filter((entry) => Boolean(entry.slot?.item))
      .slice(0, 2);
    valid.forEach(({ slot }) => {
      slot.item.baseAttack = Math.max(1, Number(slot.item.baseAttack || 1) + level);
      slot.item.baseHealth = Math.max(1, Number(slot.item.baseHealth || 1) + level);
    });
    if (valid.length) {
      logs.push(`${pet.name}: buffed ${valid.length} left-most shop pet(s) +${level}/+${level}`);
    }
    return logs;
  }

  if (n === 'goldfish') {
    const current = Math.max(1, Number(pet.sellValue || 1));
    const nextSell = current + level;
    pet.sellValue = nextSell;
    logs.push(`${pet.name}: sell value +${level} (now ${nextSell})`);
    return logs;
  }

  if (n === 'caterpillar') {
    const prevExp = getExpFromPet(pet);
    const nextExp = Math.max(0, Math.min(5, prevExp + 1));
    if (nextExp > prevExp) {
      const prevLevelInt = getPetLevelInt(pet);
      hydrateLevelFields(pet, nextExp);
      const newLevelInt = getPetLevelInt(pet);
      maybeQueueTierUpReward(prevLevelInt, newLevelInt, idx);
      logs.push(`${pet.name}: gained +1 experience`);
    }
    return logs;
  }

  return logs;
}

function replaceAllShopFoodsWithMilk() {
  const milk = {
    name: 'Milk',
    tier: 5,
    ability: 'Give one pet +1 attack and +2 health.',
    cost: 0,
    path: resolveTexture('Milk')
  };
  state.shopFoods.forEach((slot) => {
    slot.item = { ...milk };
    slot.frozen = false;
    markFoodSlotFx(slot, 'stock');
  });
  state.extraShopFoods.forEach((slot) => {
    slot.item = null;
    slot.frozen = false;
  });
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
    logs.push(...applyShopStartTurnEffectAt(idx, forcedName, forcedLevel));
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
    logs.push(...applyShopStartTurnEffectAt(idx, forcedName, forcedLevel));
    return logs;
  }

  if (n === 'dromedary' || n === 'goldfish' || n === 'caterpillar') {
    logs.push(...applyShopStartTurnEffectAt(idx, forcedName, forcedLevel));
    return logs;
  }

  if (n === 'owl') {
    const mouseTemplate = getTemplatePetByName('Mouse');
    if (mouseTemplate) {
      const summoned = createBoardPetFromShopPet({ ...mouseTemplate });
      hydrateLevelFields(summoned, calcExpForLevel(level));
      placeSummonedPet(summoned);
      logs.push(`${pet.name}: summoned level ${level} Mouse`);
    }
    return logs;
  }

  if (n === 'tropicalfish') {
    const neighbors = [];
    if (idx - 1 >= 0 && state.board[idx - 1]) neighbors.push(idx - 1);
    if (idx + 1 < BOARD_SIZE && state.board[idx + 1]) neighbors.push(idx + 1);
    neighbors.forEach((targetIdx) => buffPetAt(targetIdx, 0, level, { fromIdx: idx }));
    if (neighbors.length) logs.push(`${pet.name}: gave adjacent friends +${level} health`);
    return logs;
  }

  if (
    n === 'ferret'
    || n === 'lemur'
    || n === 'gharial'
    || n === 'puppy'
    || n === 'stingray'
    || n === 'mongoose'
  ) {
    const chosenToy = maybeChooseToyFromPetAbility(pet, level, {
      trigger: 'start',
      interactive: true,
      triggerLabel: 'start of turn'
    });
    if (chosenToy) logs.push(`${pet.name}: chose ${chosenToy.name} (L${state.playerToyLevel})`);
    return logs;
  }

  if (n === 'chicken') {
    state.cannedShopPetAtkBuff += level;
    state.cannedShopPetHpBuff += level;
    logs.push(`${pet.name}: future shop pets gain +${level}/+${level}`);
    return logs;
  }

  if (n === 'tyrannosaurus') {
    const eligible = getBoardPetIndices(idx).filter((targetIdx) => Number(state.board[targetIdx]?.tier || 1) >= 5);
    const picks = randomIndices(eligible, 2);
    const amount = 2 * level;
    picks.forEach((targetIdx) => buffPetAt(targetIdx, amount, amount, { fromIdx: idx }));
    if (picks.length) logs.push(`${pet.name}: buffed ${picks.length} tier 5+ friend(s) +${amount}/+${amount}`);
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

  if (n === 'bluebird') {
    const picks = randomIndices(getBoardPetIndices(idx), 1);
    picks.forEach((targetIdx) => buffPetAt(targetIdx, level, 0, { fromIdx: idx }));
    if (picks.length) logs.push(`${pet.name}: gave one random friend +${level} attack`);
    return logs;
  }

  if (n === 'hatchingchick') {
    const ahead = getNearestAheadIndices(idx, 1);
    const amount = 3 * level;
    ahead.forEach((targetIdx) => applyTemporaryBuffAt(targetIdx, amount, amount, state.turn + 1, { fromIdx: idx }));
    if (ahead.length) logs.push(`${pet.name}: gave nearest friend ahead +${amount}/+${amount} until next turn`);
    return logs;
  }

  if (n === 'llama') {
    const hasEmpty = state.board.some((slotPet) => !slotPet);
    if (!hasEmpty) return logs;
    buffPetAt(idx, level, 2 * level, { fromIdx: idx });
    logs.push(`${pet.name}: gained +${level}/+${2 * level} (empty space)`);
    return logs;
  }

  if (n === 'chameleon') {
    const activeToy = getActiveTeamToy('player');
    if (activeToy) {
      pet.copiedToyId = String(activeToy.toy_id || '');
      pet.copiedToyLevel = Math.max(1, Math.min(level, Number(activeToy.toy_level || 1)));
      pet.copiedToyExpiresTurn = state.turn + 1;
      logs.push(`${pet.name}: copied ${pet.copiedToyId} toy ability until next turn`);
    }
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

  if (n === 'magpie') {
    const spendCap = getMagpieStoredGoldCap(level);
    const spend = Math.max(0, Math.min(spendCap, Number(state.gold || 0)));
    if (spend > 0) {
      state.gold = Math.max(0, Number(state.gold || 0) - spend);
      queueNextTurnGold(spend);
      logs.push(`${pet.name}: spent ${spend} gold and queued ${spend} for next turn (cap ${spendCap})`);
    }
    return logs;
  }

  return logs;
}

function applyManualStartTurnPerk(idx) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const perkKey = normalizePerkNameKey(getPetPerkName(pet));
  if (!perkKey) return logs;

  if (perkKey === 'grapes') {
    state.gold += 1;
    logs.push(`${pet.name} (${getPetPerkName(pet)}): +1 gold`);
  } else if (perkKey === 'sardiniancurrant') {
    state.gold += 2;
    logs.push(`${pet.name} (${getPetPerkName(pet)}): +2 gold`);
  } else if (perkKey === 'sausage') {
    state.freeRolls = Math.max(0, Number(state.freeRolls || 0)) + 1;
    logs.push(`${pet.name} (${getPetPerkName(pet)}): +1 free roll`);
  }
  return logs;
}

function applyBridgeStartTurnPerkFallback(idx) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const perkName = getPetPerkName(pet);
  const perkKey = normalizePerkNameKey(perkName);
  if (perkKey === 'sausage') {
    state.freeRolls = Math.max(0, Number(state.freeRolls || 0)) + 1;
    logs.push(`${pet.name} (${perkName}): +1 free roll`);
  }
  return logs;
}

function applyManualEndTurnPerk(idx) {
  const pet = state.board[idx];
  if (!pet) return [];
  const logs = [];
  const perkName = getPetPerkName(pet);
  const perkKey = normalizePerkNameKey(perkName);
  if (!perkKey) return logs;

  if (perkKey === 'croissant') {
    buffPetAt(idx, 1, 0, { perkText: 'CROISSANT' });
    logs.push(`${pet.name} (${perkName}): +1 attack`);
  } else if (perkKey === 'cucumber') {
    buffPetAt(idx, 0, 1, { perkText: 'CUCUMBER' });
    logs.push(`${pet.name} (${perkName}): +1 health`);
  } else if (perkKey === 'carrot') {
    buffPetAt(idx, 1, 1, { perkText: 'CARROT' });
    logs.push(`${pet.name} (${perkName}): +1/+1`);
  } else if (perkKey === 'cake') {
    applyTemporaryBuffAt(idx, 2, 2, state.turn + 1, { perkText: 'CAKE' });
    logs.push(`${pet.name} (${perkName}): +2/+2 until next turn`);
  }
  return logs;
}

function resetTurnTriggerLimits() {
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = state.board[i];
    if (!pet) continue;
    pet.triggersConsumed = 0;
  }
}

function runStartOfTurnPhase() {
  state.phase = 'start';
  state.foodDiscount = 0;
  // Strict safety: always clear expired "until next turn" effects at turn start.
  clearExpiredTemporaryEffects();
  resetTurnTriggerLimits();
  if (!doesPackSupportToys(state.currentPackId)) {
    state.teamToys.player = null;
    state.playerToyExplicitlySelected = false;
    syncLegacyPlayerToyFields();
  } else {
    const playerToy = getActiveTeamToy('player');
    if (playerToy && !isToyValidForPackAndTurn(playerToy.toy_id, state.currentPackId, state.turn)) {
      state.teamToys.player = null;
      state.playerToyExplicitlySelected = false;
      syncLegacyPlayerToyFields();
    }
  }
  if (useCalculatorShopBridge()) {
    const preBridgeStartGold = Math.max(0, Number(state.gold || 0));
    const expectedSwanGold = state.board.reduce((sum, pet) => {
      if (!pet) return sum;
      return normalizeName(pet.name) === 'swan' ? (sum + getPetLevelInt(pet)) : sum;
    }, 0);
    const logs = triggerCalculatorStartTurn();
    if (Number(state.gold || 0) < preBridgeStartGold) {
      // Keep queued "next turn" gold from being overwritten by bridge sync.
      state.gold = preBridgeStartGold;
    }
    const goldAfterBridge = Math.max(0, Number(state.gold || 0));
    const missingSwanGold = Math.max(0, (preBridgeStartGold + expectedSwanGold) - goldAfterBridge);
    if (missingSwanGold > 0) {
      state.gold += missingSwanGold;
      logs.push(`Swan: +${missingSwanGold} gold (bridge fallback)`);
    }
    const localShopLogs = [];
    logRootCauseOnce(
      'worm_squirrel_bridge',
      'Worm/Squirrel/Swan StartTurn effects were bypassed in calculator bridge path because bridge sync updated board state without mutating local shop/gold state for all manual effects.'
    );
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      if (!state.board[i]) continue;
      localShopLogs.push(...applyShopStartTurnEffectAt(i));
      localShopLogs.push(...applyBridgeStartTurnPerkFallback(i));
    }
    logs.push(...localShopLogs);
    state.phase = 'during';
    return logs;
  }
  const logs = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (!state.board[i]) continue;
    logs.push(...executeStartOfTurnAbility(i));
    logs.push(...applyManualStartTurnPerk(i));
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
    const queued = applyBridgeEndTurnGoldEffects(logs);
    if (queued > 0) {
      logs.push(`Bridge gold reconcile: queued +${queued} next-turn gold.`);
    }
    state.phase = 'during';
    return logs;
  }
  const logs = [];
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    if (!state.board[i]) continue;
    logs.push(...executeEndOfTurnAbility(i));
    logs.push(...applyManualEndTurnPerk(i));
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

function findBoardPetIndexByName(name = '') {
  const key = normalizeName(name);
  if (!key) return -1;
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const pet = state.board[i];
    if (!pet) continue;
    if (normalizeName(pet.name) === key) return i;
  }
  return -1;
}

function parseAbilitySourceNameFromLog(text = '') {
  const raw = String(text || '').trim();
  if (!raw) return '';
  const m = raw.match(/^([^:]+):/);
  if (!m) return '';
  const source = String(m[1] || '').replace(/\s*\(.*?\)\s*$/, '').trim();
  return source;
}

async function playShopAbilityLogSequence(logs, phaseLabel = 'Abilities') {
  const messages = (Array.isArray(logs) ? logs : [])
    .map((entry) => stripHtmlToText(entry?.message || entry || '').trim())
    .filter(Boolean);
  for (const msg of messages) {
    setStatus(`${phaseLabel}: ${msg}`);
    const sourceName = parseAbilitySourceNameFromLog(msg);
    if (sourceName) {
      const idx = findBoardPetIndexByName(sourceName);
      if (idx >= 0) {
        pulseShopAbilityAt(idx, phaseLabel);
      }
    }
    renderBoard();
    renderShopPets();
    renderShopFoods();
    updateHud();
    await waitMs(TURN_ABILITY_STEP_MS);
  }
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
    } else if (n === 'pheasant') {
      // Pheasant's summon bonus is temporary for the current turn window.
      applyTemporaryBuffAt(summonedIdx, lvl, lvl, state.turn + 1, { fromIdx: idx, perkText: 'STRAWBERRY TEMP' });
    } else if (n === 'dog') {
      buffPetAt(idx, lvl, lvl, { fromIdx: summonedIdx });
    } else if (n === 'turkey') {
      buffPetAt(summonedIdx, 3 * lvl, 3 * lvl, { fromIdx: idx });
    }
  }
}

function triggerBuyAbility(pet, boardIdx) {
  if (!pet) return;
  const n = normalizeName(pet.name);
  const lvl = getPetLevelInt(pet);
  if (Number.isInteger(boardIdx) && boardIdx >= 0 && boardIdx < BOARD_SIZE) {
    pulseShopAbilityAt(boardIdx, 'Buy');
  }
  if (useCalculatorShopBridge()) {
    triggerCalculatorBuy(boardIdx);
    if (n === 'cow') {
      logRootCauseOnce(
        'cow_buy_bridge',
        'Cow buy replacement only touched one main food slot in manual logic and was skipped entirely when calculator bridge handled buy triggers.'
      );
      replaceAllShopFoodsWithMilk();
    }
    return;
  }

  if (n === 'otter') {
    const picks = randomIndices(getBoardPetIndices(boardIdx), Math.max(1, lvl));
    picks.forEach((idx) => buffPetAt(idx, 0, 1, { fromIdx: boardIdx }));
    return;
  }

  if (n === 'cow') {
    logRootCauseOnce(
      'cow_buy_manual',
      'Cow buy replacement only wrote slot 0 and stocked one extra food, leaving other shop-food slots unchanged after expansion.'
    );
    replaceAllShopFoodsWithMilk();
  }

  if (n === 'anglerfish') {
    const copies = Math.max(1, lvl);
    const oppPets = Array.isArray(state.battleReport?.opponentInitialPets)
      ? state.battleReport.opponentInitialPets.filter(Boolean)
      : [];
    if (oppPets.length > 0) {
      for (let i = 0; i < copies; i += 1) {
        const pick = randFrom(oppPets);
        if (!pick?.name) continue;
        const template = getTemplatePetAcrossPacksByName(pick.name) || getTemplatePetByName(pick.name);
        if (!template) continue;
        const stocked = {
          ...template,
          cost: 0,
          path: resolvePetTexture(template.name) || template.path || null
        };
        placeTierUpPetIntoShop(stocked, false);
      }
      setStatus(`${pet.name}: stocked ${copies} free pet copy(ies) from last opponent.`);
    }
  }

  maybeChooseToyFromPetAbility(pet, lvl, {
    trigger: 'buy',
    interactive: true,
    triggerLabel: 'buy'
  });
}

function triggerSellAbility(pet, sourceIdx = -1) {
  const stockPerkCopies = (copies) => {
    const perkName = getPetPerkName(pet);
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
  if (Number.isInteger(sourceIdx) && sourceIdx >= 0 && sourceIdx < BOARD_SIZE) {
    pulseShopAbilityAt(sourceIdx, 'Sell');
  }
  const petKey = normalizeName(pet?.name || '');
  const abilityText = getPetAbilityText(pet, lvl);
  const immediateSellGold = getImmediateGoldForTrigger(pet?.name || '', lvl, 'sell');
  const queuedNextTurnSellGold = petKey === 'lemming'
    ? getLemmingNextTurnGold(lvl)
    : getNextTurnGoldForTrigger(pet?.name || '', lvl, 'sell');
  const chipmunkCopyCount = parseStockCopyCountFromAbility(abilityText, lvl);
  const stockSleepingPills = (copies) => {
    const qty = Math.max(1, Number(copies || 1));
    const pill = getTemplateFoodByName('Sleeping Pill');
    for (let i = 0; i < qty; i += 1) {
      stockFoodInShop({
        name: String(pill?.name || 'Sleeping Pill'),
        tier: Number(pill?.tier || 1),
        ability: String(pill?.ability || 'Make one pet faint.'),
        cost: 0
      });
    }
  };
  const applyDuckShopHealthBuff = () => {
    state.shopPets.forEach((slot) => {
      if (slot.item) slot.item.baseHealth = Math.max(1, (slot.item.baseHealth || 1) + lvl);
    });
    const buffPending = (pending) => {
      if (!pending || !Array.isArray(pending.options)) return;
      pending.options.forEach((opt) => {
        if (opt?.item) {
          opt.item.baseHealth = Math.max(1, Number(opt.item.baseHealth || 1) + lvl);
        }
      });
    };
    buffPending(state.pendingTierUp);
    (state.pendingTierUpQueue || []).forEach(buffPending);
  };
  const stockPigeonFood = () => {
    const copies = parseCountWord((abilityText.match(/Stock\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free/i) || [])[1]) || lvl;
    for (let i = 0; i < Math.max(1, copies); i += 1) {
      stockFoodInShop({
        name: 'Bread Crumbs',
        tier: 1,
        ability: 'Give one pet +1 attack.',
        cost: 0
      });
    }
  };
  if (useCalculatorShopBridge()) {
    const preSellGold = Math.max(0, Number(state.gold || 0));
    triggerCalculatorSell(sourceIdx);
    // Keep hardcoded post-sell reconciliation active even in strict mode.
    // Bridge sell sync updates board/counters, but shop-side effects (like Duck buffing shop pets)
    // must still be applied to local shop state.
    if (normalizeName(pet?.name) === 'chipmunk') {
      stockPerkCopies(chipmunkCopyCount);
    }
    if (normalizeName(pet?.name) === 'duck') {
      applyDuckShopHealthBuff();
    }
    if (normalizeName(pet?.name) === 'pigeon') {
      stockPigeonFood();
    }
    if (normalizeName(pet?.name) === 'pillbug') {
      const pills = parseCountWord((abilityText.match(/Stock\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free\s+Sleeping\s+Pills?/i) || [])[1]) || lvl;
      stockSleepingPills(pills);
    }
    if (immediateSellGold > 0 && Number(state.gold || 0) < (preSellGold + immediateSellGold)) {
      state.gold = preSellGold + immediateSellGold;
    }
    queueNextTurnGold(queuedNextTurnSellGold);
    return;
  }
  const n = normalizeName(pet.name);
  if (n === 'beaver') {
    randomIndices(getBoardPetIndices(), 2).forEach((idx) => buffPetAt(idx, lvl, 0, { fromIdx: sourceIdx }));
  } else if (n === 'duck') {
    applyDuckShopHealthBuff();
  } else if (n === 'pig') {
    state.gold += lvl;
  } else if (n === 'pigeon') {
    stockPigeonFood();
  } else if (n === 'chipmunk') {
    stockPerkCopies(chipmunkCopyCount);
  } else if (n === 'pillbug') {
    const pills = parseCountWord((abilityText.match(/Stock\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+free\s+Sleeping\s+Pills?/i) || [])[1]) || lvl;
    stockSleepingPills(pills);
  } else if (n === 'chinchilla') {
    placeSummonedPet(makeTokenPet('Loyal Chinchilla', 2 * lvl, 2 * lvl, 1));
  }
  if (immediateSellGold > 0) {
    state.gold += immediateSellGold;
  }
  queueNextTurnGold(queuedNextTurnSellGold);

  maybeChooseToyFromPetAbility(pet, lvl, {
    trigger: 'sell',
    interactive: true,
    triggerLabel: 'sell'
  });
}

function triggerFaintAbility(pet, soldIdx) {
  const lvl = pet.levelInt ?? 1;
  const n = normalizeName(pet.name);
  if (Number.isInteger(soldIdx) && soldIdx >= 0 && soldIdx < BOARD_SIZE) {
    pulseShopAbilityAt(soldIdx, 'Faint');
  }
  const nearestBehind = (count = 1) => {
    const out = [];
    for (let i = soldIdx + 1; i < BOARD_SIZE; i += 1) {
      if (state.board[i]) out.push(i);
      if (out.length >= count) break;
    }
    return out;
  };
  const breakFriendlyToyUpToTier = (maxTier) => {
    const toy = getActiveTeamToy('player');
    if (!toy) return false;
    const meta = getToyMetaByName(toy.toy_id);
    const toyTier = meta ? getToyUnlockTier(meta) : 1;
    if (toyTier > maxTier) return false;
    dispatchToyBreakEvent({
      source: 'mandrill_faint',
      side: 'player',
      toyState: { ...toy },
      petName: pet.name,
      petLevel: lvl
    });
    toy.remaining_turns = 0;
    toy.activation_state = 'broken';
    state.teamToys.player = null;
    syncLegacyPlayerToyFields();
    return true;
  };
  if (n === 'ant') {
    const picks = randomIndices(getBoardPetIndices(), 1);
    if (picks.length) buffPetAt(picks[0], lvl, lvl, { fromIdx: soldIdx });
  } else if (n === 'belugasturgeon') {
    for (let i = 0; i < lvl; i += 1) {
      const dolphinTemplate = getTemplatePetAcrossPacksByName('Dolphin') || getTemplatePetByName('Dolphin');
      const dolphin = dolphinTemplate
        ? createBoardPetFromShopPet({ ...dolphinTemplate })
        : makeTokenPet('Dolphin', 2, 3, 2);
      dolphin.baseAttack = 2;
      dolphin.baseHealth = 3;
      hydrateLevelFields(dolphin, 0);
      placeSummonedPet(dolphin);
    }
    const spawned = getBoardPetIndices().filter((idx) => normalizeName(state.board[idx]?.name || '') === 'dolphin');
    spawned.slice(-lvl).forEach((idx) => setPetPerk(idx, 'Rice'));
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
  } else if (n === 'mandrill') {
    const maxToyTier = Math.max(2, 2 * lvl);
    breakFriendlyToyUpToTier(maxToyTier);
  } else if (n === 'pangolin') {
    if (getActiveTeamToy('player')) {
      const behind = nearestBehind(1);
      behind.forEach((idx) => buffPetAt(idx, 0, 4 * lvl, { fromIdx: soldIdx }));
    }
  } else if (n === 'tahr') {
    nearestBehind(Math.max(1, lvl)).forEach((idx) => setPetPerk(idx, 'Mild Chili'));
  } else if (n === 'snappingturtle') {
    nearestBehind(Math.max(1, lvl)).forEach((idx) => setPetPerk(idx, 'Skewer'));
  } else if (n === 'microbe') {
    const reach = 3 * lvl;
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      if (!state.board[i]) continue;
      if (Math.abs(i - soldIdx) <= reach) {
        setPetAilment(i, 'Weak');
      }
    }
  } else if (n === 'mole') {
    const candidates = getBoardPetIndices()
      .filter((idx) => getPetPerkName(state.board[idx]))
      .sort((a, b) => Math.abs(a - soldIdx) - Math.abs(b - soldIdx));
    candidates.slice(0, 2).forEach((idx) => {
      clearPetEquipment(idx, 'mole_faint');
    });
    placeSummonedPet(makeTokenPet('Mole', 6 * lvl, 6 * lvl, 3));
  } else if (n === 'eagle') {
    const sourceTier = Number(pet.tier || 5);
    const summonTier = Math.max(1, Math.min(6, sourceTier + 1));
    const pack = state.packs[String(state.currentPackId)] || {};
    const pool = (pack.pets || state.currentPool.pets || []).filter((x) => Number(x.tier || 1) === summonTier);
    const pick = randFrom(pool);
    if (pick) {
      const s = createBoardPetFromShopPet({ ...pick });
      const power = 5 * lvl;
      s.baseAttack = power;
      s.baseHealth = power;
      hydrateLevelFields(s, calcExpForLevel(lvl));
      placeSummonedPet(s);
    }
  } else if (n === 'hoopoebird') {
    // Battle-facing effect handled by authoritative battle engine.
  } else if (n === 'stonefish') {
    // Battle-facing effect handled by authoritative battle engine.
  } else if (n === 'lionfish') {
    // Battle-facing effect handled by authoritative battle engine.
  } else if (n === 'rooster') {
    const atk = Math.max(1, Math.ceil((pet.baseAttack || 1) * 0.5 * lvl));
    placeSummonedPet(makeTokenPet('Chick', atk, 1, 1));
  } else if (n === 'mammoth') {
    getBoardPetIndices().forEach((idx) => buffPetAt(idx, 2 * lvl, 2 * lvl, { fromIdx: soldIdx }));
  } else if (n === 'weasel') {
    queueNextTurnGold(lvl);
  } else if (n === 'pixiu') {
    if (Number(pet.mana || 0) >= 4) {
      queueNextTurnGold(3 * lvl);
    }
  }
}

function getManualPerkSellBonus(pet) {
  const perkKey = normalizePerkNameKey(getPetPerkName(pet));
  if (perkKey === 'rice') return 2;
  return 0;
}

function getSellGoldForPet(pet) {
  const explicitSellValue = Math.max(0, Number(pet?.sellValue || 0));
  const lvl = Math.max(1, Math.min(3, Number(getPetLevelInt(pet) || 1)));
  return Math.max(SELL_VALUE, lvl, explicitSellValue);
}

function sellPetAtIndex(idx) {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
  const pet = state.board[idx];
  if (!pet) return;
  playUiSound('click', 0.7);
  let goldGained = 0;
  if (useCalculatorShopBridge()) {
    goldGained = getSellGoldForPet(pet) + getManualPerkSellBonus(pet);
    state.gold += goldGained;
    triggerSellAbility(pet, idx);
    if (state.board[idx] === pet) {
      state.board[idx] = null;
    }
  } else {
    state.board[idx] = null;
    goldGained = getSellGoldForPet(pet) + getManualPerkSellBonus(pet);
    state.gold += goldGained;
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
  setStatus(`Sold ${pet.name} for ${goldGained} gold.`);
}

function toggleFreezePetSlot(idx) {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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

function maybeQueueTierUpReward(previousLevelInt, newLevelInt, leveledPetIdx = -1) {
  if (newLevelInt <= previousLevelInt) return 0;

  const rewardTier = Math.min(6, maxTierForTurn(state.turn) + 1);
  if (rewardTier === 6 && maxTierForTurn(state.turn) >= 6) {
    logRootCauseOnce(
      'tier6_reward',
      'Tier-up reward tier was computed as maxTierForTurn + 1, which became 7 on tier-6 turns and incorrectly skipped reward generation.'
    );
  }

  const pack = state.packs[String(state.currentPackId)];
  if (!pack) return 0;

  const rewardPool = (pack.pets || []).filter((p) => p.tier === rewardTier);
  if (!rewardPool.length) {
    setStatus(`Pet leveled up to ${newLevelInt}, but no tier ${rewardTier} pool exists in this pack.`);
    return 0;
  }

  const getWyvernExtraTierUpOptions = () => {
    let extra = 0;
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const pet = state.board[i];
      if (!pet) continue;
      if (normalizeName(pet.name) !== 'wyvern') continue;
      if (i === leveledPetIdx) continue;
      extra += Math.max(0, getPetLevelInt(pet));
    }
    return Math.max(0, extra);
  };

  const buildDistinctOptions = (count = 2) => {
    const byName = new Map();
    rewardPool.forEach((candidate) => {
      const key = normalizeName(candidate?.name || '');
      if (!key || byName.has(key)) return;
      byName.set(key, candidate);
    });
    const picks = pickN(Array.from(byName.values()), Math.max(1, Number(count || 2)));
    return picks.map((base) => ({
      item: {
        ...base,
        baseAttack: Math.max(1, Number(base.baseAttack || 1) + Number(state.cannedShopPetAtkBuff || 0)),
        baseHealth: Math.max(1, Number(base.baseHealth || 1) + Number(state.cannedShopPetHpBuff || 0))
      },
      frozen: false
    }));
  };

  let queuedCount = 0;
  const count = newLevelInt - previousLevelInt;
  const extraChoices = getWyvernExtraTierUpOptions();
  const optionCount = 2 + extraChoices;
  for (let i = 0; i < count; i += 1) {
    playUiSound('levelup', 0.9);
    const options = buildDistinctOptions(optionCount);
    if (!options.length) continue;
    state.pendingTierUpQueue.push({
      rewardTier,
      options
    });
    queuedCount += 1;
  }

  if (!state.pendingTierUp && state.pendingTierUpQueue.length > 0) {
    state.pendingTierUp = state.pendingTierUpQueue.shift();
    renderTierUpInline();
    animateTierUpRewardCue();
  }
  return queuedCount;
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
  const merged = mergeStackedPetStats(bumped.pet, target, source);

  state.board[targetIdx] = merged;
  state.board[sourceIdx] = null;
  resetSelection();
  renderBoard();

  setStatus(`${merged.name} stacked to level ${merged.levelValue}.`);
  maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt, targetIdx);
  applyLuckyCatLevelUpNextTurnGold(merged, bumped.prevLevelInt, bumped.newLevelInt);
  if (bumped.newLevelInt > bumped.prevLevelInt) {
    animateLevelUpAt('shop', targetIdx);
  }
  if (useCalculatorShopBridge() && bumped.newLevelInt > bumped.prevLevelInt) {
    triggerCalculatorLevelUp(targetIdx);
  }
}

function onBoardSlotClick(idx) {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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
  const merged = mergeStackedPetStats(bumped.pet, boardPet, shopPet);
  state.board[boardIdx] = merged;
  triggerBuyAbility(shopPet, boardIdx);
  slot.item = null;
  slot.frozen = false;
  updateHud();
  renderBoard();
  renderShopPets();
  renderShopFoods();
  playPetBuySound(shopPet.name);
  setStatus(`Bought and stacked ${shopPet.name} to level ${merged.levelValue}.`);
  maybeQueueTierUpReward(bumped.prevLevelInt, bumped.newLevelInt, boardIdx);
  applyLuckyCatLevelUpNextTurnGold(merged, bumped.prevLevelInt, bumped.newLevelInt);
  if (bumped.newLevelInt > bumped.prevLevelInt) {
    animateLevelUpAt('shop', boardIdx);
  }
  if (useCalculatorShopBridge() && bumped.newLevelInt > bumped.prevLevelInt) {
    triggerCalculatorLevelUp(boardIdx);
  }
}

function tryFeedFoodToBoard(listName, foodIdx, boardIdx) {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
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
  const bridgeMode = useCalculatorShopBridge();
  if (bridgeMode) {
    triggerCalculatorSpendGold(cost);
  }
  const manaGainMatch = String(food?.ability || '').match(/Give one pet \+(\d+) mana/i);
  const manaGain = Math.max(0, Number(manaGainMatch?.[1] || 0));
  const preMana = Number.isInteger(resolvedBoardIdx) && resolvedBoardIdx >= 0
    ? Math.max(0, Number(state.board[resolvedBoardIdx]?.mana || 0))
    : 0;

  if (bridgeMode) {
    if (!Number.isInteger(resolvedBoardIdx) || resolvedBoardIdx < 0 || resolvedBoardIdx >= BOARD_SIZE || !state.board[resolvedBoardIdx]) {
      state.gold += cost;
      setStatus(`Cannot use ${food.name}: no valid target pet.`);
      return;
    }
    removeFoodFromSlot(foodRef);
    triggerCalculatorFoodEaten(resolvedBoardIdx, food.name);
    const livePet = state.board[resolvedBoardIdx];
    if (livePet) {
      const perkFromFood = getCanonicalPerkName(parsePerkFromText(String(food?.ability || '')));
      if (perkFromFood) {
        livePet.equipment = perkFromFood;
        if (normalizeName(livePet.name) === 'whaleshark') {
          resolveWhaleSharkTriggerAt(resolvedBoardIdx, 'perk gained');
        } else {
          pulseShopAbilityAt(resolvedBoardIdx, perkFromFood);
        }
      } else {
        const ailmentFromFood = getCanonicalAilmentName(inferAilmentFromText(String(food?.ability || '')));
        if (ailmentFromFood) {
          livePet.equipment = ailmentFromFood;
          if (normalizeName(livePet.name) === 'whaleshark') {
            resolveWhaleSharkTriggerAt(resolvedBoardIdx, 'ailment gained');
          } else {
            pulseShopAbilityAt(resolvedBoardIdx, ailmentFromFood);
          }
        }
      }
    }
    if (manaGain > 0 && state.board[resolvedBoardIdx]) {
      const expected = preMana + manaGain;
      state.board[resolvedBoardIdx].mana = Math.max(expected, Number(state.board[resolvedBoardIdx].mana || 0));
    }
    updateHud();
    renderBoard();
    renderShopFoods();
    renderShopPets();
    setStatus(`Used ${food.name}${state.board[resolvedBoardIdx]?.name ? ` on ${state.board[resolvedBoardIdx].name}` : ''} (authoritative).`);
    return;
  }
  const applied = applyFoodToBoardPet(food, resolvedBoardIdx, foodRef);
  if (!applied.ok) {
    state.gold += cost;
    setStatus(`Cannot use ${food.name}: ${applied.note}`);
    return;
  }

  removeFoodFromSlot(foodRef);
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
      if (Array.isArray(state.shopAilmentBySlot)) {
        state.shopAilmentBySlot[idx] = '';
      }
      if (Array.isArray(state.shopManaBySlot)) {
        state.shopManaBySlot[idx] = 0;
      }
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
    levelText.textContent = `Level ${formatLevelValue(pet.levelValue ?? getLevelDisplayForExp(pet.exp ?? 0))}`;
    const perkName = getPetPerkName(pet);
    const ailmentName = getPetAilmentName(pet);
    const perkBadge = createPerkBadgeElement(perkName);
    const ailmentBadge = createAilmentBadgeElement(ailmentName);
    const effectsRow = document.createElement('div');
    effectsRow.className = 'battle-effects-row shop-effects-row';
    const prevAilment = String(state.shopAilmentBySlot?.[idx] || '');
    if (Array.isArray(state.shopAilmentBySlot)) {
      state.shopAilmentBySlot[idx] = ailmentName;
    }
    if (perkBadge) effectsRow.appendChild(perkBadge);
    if (ailmentBadge && ailmentName && ailmentName !== prevAilment) {
      ailmentBadge.classList.add('ailment-pop');
    }
    if (!ailmentName && prevAilment) {
      const removed = createAilmentBadgeElement(prevAilment);
      if (removed) {
        removed.classList.add('ailment-remove');
        effectsRow.appendChild(removed);
      }
    }
    if (ailmentBadge) effectsRow.appendChild(ailmentBadge);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const sellBtn = document.createElement('button');
    sellBtn.textContent = `+${getSellGoldForPet(pet) + getManualPerkSellBonus(pet)} Sell`;
    sellBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      sellPetAtIndex(idx);
    });

    actions.appendChild(sellBtn);
    el.appendChild(media);
    if (effectsRow.children.length > 0) el.appendChild(effectsRow);
    if (!Array.isArray(state.shopManaBySlot)) {
      state.shopManaBySlot = Array.from({ length: BOARD_SIZE }, () => 0);
    }
    const pulseUntil = Number(state.rollCounterPulseUntilBySlot?.[idx] || 0);
    const showRollCounter = Number(state.rollsThisTurn || 0) > 0
      && petHasRollTriggerTag(pet)
      && Date.now() <= pulseUntil;
    if (showRollCounter) {
      const rollCounter = document.createElement('div');
      rollCounter.className = 'roll-counter-overlay';
      rollCounter.textContent = String(Math.max(0, Number(state.rollsThisTurn || 0)));
      rollCounter.classList.add('show', 'pop');
      el.appendChild(rollCounter);
    }
    const mana = Math.max(0, Number(pet.mana || 0));
    const prevMana = Math.max(0, Number(state.shopManaBySlot[idx] ?? mana));
    const manaDelta = mana - prevMana;
    state.shopManaBySlot[idx] = mana;
    const manaBadge = createManaBadgeElement(mana, {
      delta: manaDelta,
      floatingGain: manaDelta > 0 ? manaDelta : 0
    });
    if (manaBadge) el.appendChild(manaBadge);
    el.appendChild(statsText);
    el.appendChild(levelText);
    el.appendChild(actions);
    el.addEventListener('click', () => onBoardSlotClick(idx));
    bindBoardDrop(el, idx);
    boardSlots.appendChild(el);
  });
}

function matchesUiFilterText(name = '', abilityText = '') {
  const q = String(state.uiFilters?.query || '').trim().toLowerCase();
  if (!q) return true;
  return String(name || '').toLowerCase().includes(q) || String(abilityText || '').toLowerCase().includes(q);
}

function sortEntriesByUiFilter(entries, type = 'pet') {
  const mode = String(state.uiFilters?.sort || 'none').toLowerCase();
  if (mode === 'none') return entries;
  const sorted = [...entries];
  if (mode === 'tier') {
    sorted.sort((a, b) => Number(a.slot?.item?.tier || 0) - Number(b.slot?.item?.tier || 0));
  } else if (mode === 'cost') {
    sorted.sort((a, b) => {
      const aCost = type === 'food' ? Number(a.slot?.item?.cost ?? BUY_COST) : BUY_COST;
      const bCost = type === 'food' ? Number(b.slot?.item?.cost ?? BUY_COST) : BUY_COST;
      return aCost - bCost;
    });
  } else if (mode === 'effect') {
    sorted.sort((a, b) => String(a.slot?.item?.ability || '').localeCompare(String(b.slot?.item?.ability || '')));
  }
  return sorted;
}

function renderShopPets() {
  updateShopGridLayout();
  petSlots.innerHTML = '';
  const entries = sortEntriesByUiFilter(
    state.shopPets
      .map((slot, idx) => ({ slot, idx }))
      .filter((x) => x.slot?.item ? matchesUiFilterText(x.slot.item.name, x.slot.item.ability) : true),
    'pet'
  );

  entries.forEach(({ slot, idx }) => {
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
  updateShopGridLayout();
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

    const now = Date.now();
    const stockPop = Number(slot.stockPulseUntil || 0) > now;
    const discountPop = Number(slot.discountPulseUntil || 0) > now;
    if (stockPop) el.classList.add('stock-pop');
    if (discountPop) {
      el.classList.add('food-discounted');
      el.dataset.discount = `-${Math.max(1, Number(slot.discountAmount || 1))}`;
    }

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

  const mainFoodEntries = sortEntriesByUiFilter(
    state.shopFoods
      .map((slot, idx) => ({ slot, idx }))
      .filter((x) => x.slot?.item ? matchesUiFilterText(x.slot.item.name, x.slot.item.ability) : true),
    'food'
  );
  mainFoodEntries.forEach(({ slot, idx }) => {
    foodSlots.appendChild(renderFoodCard(slot, idx, 'main'));
  });

  if (extraFoodSlots) {
    const extraEntries = sortEntriesByUiFilter(
      state.extraShopFoods
        .map((slot, idx) => ({ slot, idx }))
        .filter((x) => x.slot?.item ? matchesUiFilterText(x.slot.item.name, x.slot.item.ability) : true),
      'food'
    );
    extraEntries.forEach(({ slot, idx }) => {
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
  ensureShopSlotCounts();
  for (let i = 0; i < state.shopPets.length; i += 1) {
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

  for (let i = 0; i < state.shopFoods.length; i += 1) {
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

function clearExtraShopFoodsOnRoll(preserveFrozen = true) {
  if (!Array.isArray(state.extraShopFoods)) return;
  for (let i = 0; i < state.extraShopFoods.length; i += 1) {
    const slot = state.extraShopFoods[i];
    if (preserveFrozen && slot.frozen && slot.item) continue;
    slot.item = null;
    slot.frozen = false;
    if (!preserveFrozen) {
      slot.frozen = false;
    }
  }
}

function renderTierUpInline() {
  if (!state.pendingTierUp) {
    tierUpInline.classList.add('hidden');
    tierUpChoices.innerHTML = '';
    return;
  }

  const { rewardTier, options } = state.pendingTierUp;
  tierUpText.textContent = `Tier ${rewardTier} reward: pick 1 for ${TIER_UP_COST} gold. Freeze to keep an option, or roll past to discard.`;
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
  const uniqueByName = new Map();
  rewardPool.forEach((candidate) => {
    const key = normalizeName(candidate?.name || '');
    if (!key || uniqueByName.has(key)) return;
    uniqueByName.set(key, candidate);
  });
  const available = Array.from(uniqueByName.values());
  const lockedNames = new Set(
    state.pendingTierUp.options
      .filter((slot) => slot?.frozen && slot?.item)
      .map((slot) => normalizeName(slot.item.name))
  );
  state.pendingTierUp.options = state.pendingTierUp.options.map((slot) => {
    if (slot?.frozen && slot?.item) return slot;
    const pool = available.filter((pet) => !lockedNames.has(normalizeName(pet.name)));
    const pick = randFrom(pool);
    if (pick) {
      lockedNames.add(normalizeName(pick.name));
    }
    return {
      item: pick
        ? {
          ...pick,
          baseAttack: Math.max(1, Number(pick.baseAttack || 1) + Number(state.cannedShopPetAtkBuff || 0)),
          baseHealth: Math.max(1, Number(pick.baseHealth || 1) + Number(state.cannedShopPetHpBuff || 0))
        }
        : null,
      frozen: false
    };
  });
  renderTierUpInline();
  setStatus(`Rolled tier-up choices (Tier ${rewardTier}). Frozen choices stayed.`);
}

function chooseTierUpPet(optionIndex) {
  if (!state.pendingTierUp) return;
  playUiSound('click', 0.7);
  if (state.gold < TIER_UP_COST) {
    setStatus(`Not enough gold. Tier-up pick costs ${TIER_UP_COST} gold.`);
    return;
  }

  const pet = state.pendingTierUp.options[optionIndex]?.item || null;
  if (!pet) return;

  const placed = placeTierUpPetOnBoard(pet);
  if (!placed) {
    setStatus('Board is full. Sell or reposition to make space for tier-up pet.');
    return;
  }
  state.gold -= TIER_UP_COST;
  if (useCalculatorShopBridge()) {
    triggerCalculatorSpendGold(TIER_UP_COST);
  }

  state.pendingTierUp = state.pendingTierUpQueue.length > 0 ? state.pendingTierUpQueue.shift() : null;
  renderTierUpInline();
  renderBoard();
  renderShopPets();
  updateHud();
  setStatus(`Took ${pet.name} for ${TIER_UP_COST} gold and placed it on your board.`);
}

function placeTierUpPetIntoShop(pet, frozen = false) {
  const emptyShopSlot = firstEmptyShopPetSlot();
  if (emptyShopSlot >= 0) {
    state.shopPets[emptyShopSlot].item = { ...pet };
    state.shopPets[emptyShopSlot].frozen = Boolean(frozen);
    return;
  }
  const replaceIdx = state.shopPets.findIndex((s) => !s.frozen);
  const idx = replaceIdx >= 0 ? replaceIdx : 0;
  state.shopPets[idx].item = { ...pet };
  state.shopPets[idx].frozen = Boolean(frozen);
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

  frozenPets.forEach((pet) => placeTierUpPetIntoShop(pet, true));
  state.pendingTierUp = state.pendingTierUpQueue.length > 0 ? state.pendingTierUpQueue.shift() : null;
  renderTierUpInline();
  renderShopPets();
  return frozenPets.length;
}

function rollPastTierUpRewards() {
  if (!state.pendingTierUp) return { movedFrozen: 0, discardedRewards: 0 };
  const frozenPets = state.pendingTierUp.options
    .filter((slot) => slot?.frozen && slot?.item)
    .map((slot) => slot.item);
  frozenPets.forEach((pet) => placeTierUpPetIntoShop(pet, true));
  const discardedQueued = Number(state.pendingTierUpQueue?.length || 0);
  state.pendingTierUp = null;
  state.pendingTierUpQueue = [];
  renderTierUpInline();
  renderShopPets();
  return {
    movedFrozen: frozenPets.length,
    discardedRewards: 1 + discardedQueued
  };
}

function switchPack(packId) {
  state.currentPackId = packId;
  state.turn = 1;
  state.gold = START_GOLD;
  state.nextTurnBonusGold = 0;
  state.freeRolls = 0;
  state.nextTurnFreeRolls = 0;
  state.phase = 'during';
  state.foodDiscount = 0;
  state.cannedShopPetAtkBuff = 0;
  state.cannedShopPetHpBuff = 0;
  state.peachUpgradeBonus = 0;
  state.lastBattleLost = false;
  if (state.rollCounterHideTimer) {
    clearTimeout(state.rollCounterHideTimer);
    state.rollCounterHideTimer = null;
  }
  state.rollsThisTurn = 0;
  state.rollCounterPulseUntilBySlot = Array.from({ length: BOARD_SIZE }, () => 0);
  state.level3SoldThisTurn = 0;
  state.summonedThisTurn = 0;
  state.playerToy = null;
  state.playerToyLevel = 1;
  state.playerToyExplicitlySelected = false;
  state.teamToys = { player: null, opponent: null };
  state.pendingToyBreakFx = [];
  state.toyBreakEventSeen = {};
  state.battleGeckoToyBreakBindings = [];
  state.toyChoices = [];
  state.toyChoiceContext = null;
  state.lastToySource = null;
  state.toyModalOpen = false;
  state.battleActive = { side: null, idx: -1 };
  state.toyModalFocusIndex = 0;
  state.debugTriggerLog = [];
  state.shopAilmentBySlot = Array.from({ length: BOARD_SIZE }, () => '');
  state.shopManaBySlot = Array.from({ length: BOARD_SIZE }, () => 0);
  state.battleAilmentBySide = {
    player: Array.from({ length: BOARD_SIZE }, () => ''),
    opponent: Array.from({ length: BOARD_SIZE }, () => '')
  };
  state.battleManaBySide = {
    player: Array.from({ length: BOARD_SIZE }, () => 0),
    opponent: Array.from({ length: BOARD_SIZE }, () => 0)
  };
  state.battleManaRenderBySide = {
    player: Array.from({ length: BOARD_SIZE }, () => 0),
    opponent: Array.from({ length: BOARD_SIZE }, () => 0)
  };
  state.levelHistoryBySlot = Array.from({ length: BOARD_SIZE }, () => []);
  state.board = Array(BOARD_SIZE).fill(null);
  resetSelection();
  state.pendingTierUp = null;
  state.pendingTierUpQueue = [];
  state.battleReport = null;
  renderBattleReport();
  closeToyPickerModal(true);
  clearTooltip();
  renderTierUpInline();

  state.shopPets = Array.from({ length: getPetShopSizeForTurn(1) }, () => ({ item: null, frozen: false }));
  state.shopFoods = Array.from({ length: getFoodShopSizeForTurn(1) }, () => ({ item: null, frozen: false }));
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
  const now = Date.now();
  if ((now - Number(state.lastRollInputAt || 0)) < 120) {
    return;
  }
  state.lastRollInputAt = now;
  if (state.rollActionLocked) {
    return;
  }
  state.rollActionLocked = true;
  updateRollButtonState();
  try {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
  playUiSound('click', 0.7);
  const useFreeRoll = () => {
    const free = Math.max(0, Number(state.freeRolls || 0));
    if (free > 0) {
      state.freeRolls = free - 1;
      return true;
    }
    return false;
  };
  if (state.pendingTierUp) {
    const consumedFree = useFreeRoll();
    if (!consumedFree && state.gold < ROLL_COST) {
      setStatus('Not enough gold to roll.');
      return;
    }
    if (!consumedFree) {
      state.gold -= ROLL_COST;
    }
    state.rollsThisTurn += 1;
    pulseRollCountersOnBoard();
    if (useCalculatorShopBridge()) {
      if (!consumedFree) {
        triggerCalculatorSpendGold(ROLL_COST);
      }
      const rollLogs = triggerCalculatorRoll();
      queueImmediateFreeRollsFromLogs(rollLogs);
    }
    clearExtraShopFoodsOnRoll(true);
    const rolledPast = rollPastTierUpRewards();
    renderShopFoods();
    animateShopRefresh();
    renderBoard();
    updateHud();
    setStatus(
      rolledPast.movedFrozen > 0
        ? `Rolled past tier-up rewards${consumedFree ? ' (free)' : ''}. Moved ${rolledPast.movedFrozen} frozen option${rolledPast.movedFrozen > 1 ? 's' : ''} into the pet shop (frozen). Discarded ${rolledPast.discardedRewards} reward set${rolledPast.discardedRewards > 1 ? 's' : ''}.`
        : `Rolled past tier-up rewards${consumedFree ? ' (free)' : ''}. Discarded ${rolledPast.discardedRewards} reward set${rolledPast.discardedRewards > 1 ? 's' : ''}.`
    );
    return;
  }

  if (!state.currentPool.pets.length || !state.currentPool.foods.length) {
    setStatus('Selected pack has no available data for this turn.');
    return;
  }

  const consumedFree = useFreeRoll();
  if (!consumedFree && state.gold < ROLL_COST) {
    setStatus('Not enough gold to roll.');
    return;
  }

  if (!consumedFree) {
    state.gold -= ROLL_COST;
  }
  state.rollsThisTurn += 1;
  pulseRollCountersOnBoard();
  if (useCalculatorShopBridge()) {
    if (!consumedFree) {
      triggerCalculatorSpendGold(ROLL_COST);
    }
    const rollLogs = triggerCalculatorRoll();
    queueImmediateFreeRollsFromLogs(rollLogs);
  }
  clearExtraShopFoodsOnRoll(true);
  refillShop(true);
  renderBoard();
  updateHud();
  setStatus(`Rolled new pets and food${consumedFree ? ' (free)' : ''}. Frozen slots stayed in place.`);
  } finally {
    state.rollActionLocked = false;
    updateRollButtonState();
  }
}

async function endTurn() {
  if (isUiModalBlocking()) {
    setStatus('Resolve toy modal selection first.');
    return;
  }
  playUiSound('click', 0.7);
  if (state.battleInProgress) return;
  if (state.pendingTierUp) {
    setStatus('Choose your tier-up reward, or roll past it to discard.');
    return;
  }
  if (state.rollCounterHideTimer) {
    clearTimeout(state.rollCounterHideTimer);
    state.rollCounterHideTimer = null;
  }

  state.battleInProgress = true;
  state.phase = 'battle';
  const endLogs = runEndOfTurnPhase();
  await playShopAbilityLogSequence(endLogs, 'End Turn');
  const queuedFreeRollsFromEnd = queueNextTurnFreeRollsFromLogs(endLogs, 'end');
  let battleLabel = 'No battle';
  try {
    const activeCount = state.board.filter(Boolean).length;
    if (activeCount > 0) {
      const report = simulateBattleOnce();
      const queuedFromBattle = queueBattleNextTurnGoldFromReport(report);
      if (queuedFromBattle > 0) {
        pushDebugTrigger('BattleNextTurnGold', `Queued ${queuedFromBattle} gold from battle next-turn triggers.`);
      }
      const queuedFreeRollsFromBattle = queueNextTurnFreeRollsFromLogs(report?.logs || [], 'faint');
      if (queuedFreeRollsFromBattle > 0) {
        pushDebugTrigger('BattleNextTurnFreeRolls', `Queued ${queuedFreeRollsFromBattle} free rolls from battle next-turn triggers.`);
      }
      await playBattleScene(report);
      battleLabel = report.winner === 'player' ? 'Win' : report.winner === 'opponent' ? 'Loss' : 'Draw';
    } else {
      state.battleReport = {
        turn: state.turn,
        winner: 'draw',
        opponentPackName: 'N/A',
        playerTeamNames: [],
        opponentTeamNames: [],
        rollCountAtBattleStart: Math.max(0, Number(state.rollsThisTurn || 0)),
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

  const brokenToys = decrementTeamToyDurabilityAtTurnEnd();
  state.turn += 1;
  state.toyBreakEventSeen = {};
  state.battleGeckoToyBreakBindings = [];
  state.rollsThisTurn = 0;
  state.rollCounterPulseUntilBySlot = Array.from({ length: BOARD_SIZE }, () => 0);
  state.level3SoldThisTurn = 0;
  state.summonedThisTurn = 0;
  clearExpiredTemporaryEffects();
  const bonusGold = Math.max(0, Number(state.nextTurnBonusGold || 0));
  state.gold = resolveTurnStartGold();
  state.nextTurnBonusGold = 0;
  state.pendingTierUp = null;
  state.pendingTierUpQueue = [];
  state.extraShopFoods = Array.from({ length: EXTRA_FOOD_SHOP_SIZE }, () => ({ item: null, frozen: false }));
  state.freeRolls = Math.max(0, Number(state.freeRolls || 0)) + Math.max(0, Number(state.nextTurnFreeRolls || 0));
  state.nextTurnFreeRolls = 0;
  resetSelection();
  clearTooltip();
  applyTurnTierFilters();
  refillShop(true);
  const startLogs = runStartOfTurnPhase();
  await playShopAbilityLogSequence(startLogs, `Turn ${state.turn} Start`);
  renderBoard();
  renderShopFoods();
  renderShopPets();
  updateHud();
  const brokenLabel = brokenToys.length
    ? ` Toy broke: ${brokenToys.map((x) => `${x.side === 'player' ? 'You' : 'Opp'} ${x.toy_id}`).join(', ')}.`
    : '';
  const freeRollLabel = state.freeRolls > 0 ? ` Free rolls: ${state.freeRolls}.` : '';
  const queuedEndFreeLabel = queuedFreeRollsFromEnd > 0 ? ` Queued free rolls from end-turn: ${queuedFreeRollsFromEnd}.` : '';
  setStatus(`Turn ${state.turn} started. Last battle: ${battleLabel}. Turn flow: end(${endLogs.length}) -> battle -> start(${startLogs.length}). Gold: ${state.gold}.${freeRollLabel}${queuedEndFreeLabel} Shop now allows up to Tier ${maxTierForTurn(state.turn)}.${brokenLabel}`);
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
  const mapReferencePackTokenToIds = (tokenRaw) => {
    const token = String(tokenRaw || '').trim().toLowerCase();
    if (!token) return [];
    const direct = token.match(/^pack(\d+)$/i);
    if (direct) return [Number(direct[1])];
    const byName = {
      turtle: 1,
      puppy: 2,
      star: 3,
      golden: 4,
      unicorn: 5,
      danger: 6
    };
    const mapped = byName[token];
    return mapped ? [mapped] : [];
  };
  const buildAbilityLevelsFromReference = (abilities) => {
    const rows = Array.isArray(abilities) ? abilities : [];
    const getByLevel = (lvl) => String(rows.find((a) => Number(a?.Level || 0) === lvl)?.About || '').trim();
    const l1 = getByLevel(1);
    const l2 = getByLevel(2) || l1;
    const l3 = getByLevel(3) || l2 || l1;
    return {
      level1: l1,
      level2: l2,
      level3: l3
    };
  };

  Object.keys(packs).forEach((packId) => {
    const pack = packs[packId];
    const pets = toArray(pack?.pets);
    const foods = toArray(pack?.foods);
    out[packId] = {
      name: pack?.name || `Pack ${packId}`,
      pets: pets.map((p) => ({
        ...p,
        path: resolvePetTexture(p.name)
      })),
      foods: foods.map((f) => ({
        ...f,
        cost: normalizeName(f.name) === 'sleepingpill' ? 1 : f.cost,
        path: resolveTexture(f.name)
      }))
    };
  });

  // Merge hardcoded local reference data (copied from SAP-Calculator) to fill missing pets/foods.
  const refPets = Array.isArray(state.referenceData?.pets) ? state.referenceData.pets : [];
  const refFoods = Array.isArray(state.referenceData?.foods) ? state.referenceData.foods : [];
  refPets.forEach((pet) => {
    const name = String(pet?.Name || '').trim();
    if (!name) return;
    const packIds = Array.from(new Set((Array.isArray(pet?.Packs) ? pet.Packs : []).flatMap(mapReferencePackTokenToIds)));
    if (!packIds.length) return;
    packIds.forEach((packId) => {
      const bucket = out[String(packId)];
      if (!bucket || !Array.isArray(bucket.pets)) return;
      const exists = bucket.pets.some((p) => normalizeName(p?.name || '') === normalizeName(name));
      if (exists) return;
      bucket.pets.push({
        name,
        tier: Math.max(1, Number(pet?.Tier || 1)),
        baseAttack: Math.max(1, Number(pet?.Attack || 1)),
        baseHealth: Math.max(1, Number(pet?.Health || 1)),
        ability: buildAbilityLevelsFromReference(pet?.Abilities),
        path: resolvePetTexture(name)
      });
    });
  });
  refFoods.forEach((food) => {
    const name = String(food?.Name || '').trim();
    if (!name) return;
    const packIds = Array.from(new Set((Array.isArray(food?.Packs) ? food.Packs : []).flatMap(mapReferencePackTokenToIds)));
    if (!packIds.length) return;
    packIds.forEach((packId) => {
      const bucket = out[String(packId)];
      if (!bucket || !Array.isArray(bucket.foods)) return;
      const exists = bucket.foods.some((f) => normalizeName(f?.name || '') === normalizeName(name));
      if (exists) return;
      bucket.foods.push({
        name,
        tier: Math.max(1, Number(food?.Tier || 1)),
        ability: String(food?.Ability || ''),
        cost: normalizeName(name) === 'sleepingpill' ? 1 : BUY_COST,
        path: resolveTexture(name)
      });
    });
  });

  // Pack 2 hard-force: use full reference roster for pets/foods in Puppy pack.
  const strictPack2 = out['2'];
  if (strictPack2) {
    const refPack2Pets = refPets
      .filter((pet) => (Array.isArray(pet?.Packs) ? pet.Packs : []).some((pk) => mapReferencePackTokenToIds(pk).includes(2)))
      .map((pet) => ({
        name: String(pet?.Name || '').trim(),
        tier: Math.max(1, Number(pet?.Tier || 1)),
        baseAttack: Math.max(1, Number(pet?.Attack || 1)),
        baseHealth: Math.max(1, Number(pet?.Health || 1)),
        ability: buildAbilityLevelsFromReference(pet?.Abilities),
        path: resolvePetTexture(String(pet?.Name || '').trim())
      }))
      .filter((p) => p.name);
    if (refPack2Pets.length) {
      strictPack2.pets = refPack2Pets;
    }

    const refPack2Foods = refFoods
      .filter((food) => (Array.isArray(food?.Packs) ? food.Packs : []).some((pk) => mapReferencePackTokenToIds(pk).includes(2)))
      .map((food) => {
        const name = String(food?.Name || '').trim();
        return {
          name,
          tier: Math.max(1, Number(food?.Tier || 1)),
          ability: String(food?.Ability || ''),
          cost: normalizeName(name) === 'sleepingpill' ? 1 : BUY_COST,
          path: resolveTexture(name)
        };
      })
      .filter((f) => f.name);
    if (refPack2Foods.length) {
      strictPack2.foods = refPack2Foods;
    }
  }

  // Ensure Pack 5 ("Unicorn") includes ??? when present in authoritative reference.
  const unicornPack = out['5'];
  if (unicornPack && Array.isArray(unicornPack.pets)) {
    const hasQuestionPet = unicornPack.pets.some((p) => normalizeName(p?.name || '') === 'unknown' || String(p?.name || '') === '???');
    if (!hasQuestionPet) {
      unicornPack.pets.unshift({
        name: '???',
        tier: 1,
        baseAttack: 3,
        baseHealth: 2,
        ability: {
          level1: 'End turn: Give +1 attack and Spooked until next turn to the nearest friend ahead.',
          level2: 'End turn: Give +2 attack and Spooked until next turn to the nearest friend ahead.',
          level3: 'End turn: Give +3 attack and Spooked until next turn to the nearest friend ahead.'
        },
        path: resolvePetTexture('Leafling') || resolvePetTexture('???') || null
      });
    }
  }

  state.packs = out;
}

function buildRollAbilityTagIndex() {
  const tagsByPetKey = {};
  let fallbackUsed = false;
  const expForLevel = 0;
  const packIds = Object.keys(state.packs || {}).map((x) => Number(x)).filter((x) => Number.isFinite(x));
  const runnerCache = new Map();
  const canUseMeta = isAuthoritativeMechanicsReady();

  const getRunnerForPack = (packId) => {
    if (!canUseMeta) return null;
    const calcPack = CALCULATOR_PACK_BY_APP_ID[packId];
    if (!calcPack) return null;
    if (runnerCache.has(packId)) return runnerCache.get(packId);
    const sim = state.calculatorSim;
    if (!sim || typeof sim.__createSimulationRunner !== 'function' || typeof sim.LogService !== 'function') return null;
    const logService = new sim.LogService();
    if (typeof logService.setEnabled === 'function') logService.setEnabled(false);
    const runner = sim.__createSimulationRunner(logService);
    runner.setupGameEnvironment({
      turn: 7,
      simulationCount: 1,
      playerPack: calcPack,
      opponentPack: calcPack,
      playerPets: Array(BOARD_SIZE).fill(null),
      opponentPets: Array(BOARD_SIZE).fill(null),
      playerGoldSpent: 0,
      opponentGoldSpent: 0,
      playerRollAmount: 0,
      opponentRollAmount: 0,
      playerLevel3Sold: 0,
      opponentLevel3Sold: 0,
      playerSummonedAmount: 0,
      opponentSummonedAmount: 0
    });
    const ctx = { runner, player: runner.player };
    runnerCache.set(packId, ctx);
    return ctx;
  };

  packIds.forEach((packId) => {
    const pets = state.packs[String(packId)]?.pets || [];
    const runnerCtx = getRunnerForPack(packId);
    pets.forEach((pet) => {
      const key = normalizeName(pet?.name || '');
      if (!key) return;
      let hasMetaRoll = false;
      if (runnerCtx) {
        const { runner, player } = runnerCtx;
        for (let i = 0; i < BOARD_SIZE; i += 1) player.setPet(i, undefined, true);
        runner.createPets(player, [{ name: pet.name, attack: 5, health: 5, exp: expForLevel, mana: 0, equipment: null }, null, null, null, null]);
        const calcPet = player.getPet(0);
        const abilities = Array.isArray(calcPet?.abilityList) ? calcPet.abilityList : [];
        hasMetaRoll = abilities.some((a) => Array.isArray(a?.triggers) && a.triggers.some((t) => /roll/i.test(String(t || ''))));
      }
      const levels = [pet?.ability?.level1, pet?.ability?.level2, pet?.ability?.level3].map((x) => String(x || '').trim());
      const hasTextRoll = levels.some((txt) => /\broll(?:s|ed|ing)?\b/i.test(txt));
      const hasTag = hasMetaRoll || hasTextRoll;
      if (!hasTag) return;
      if (!hasMetaRoll && hasTextRoll) fallbackUsed = true;
      tagsByPetKey[key] = ['roll_trigger'];
    });
  });

  state.rollAbilityTagsByPetKey = tagsByPetKey;
  state.rollTagFallbackUsed = fallbackUsed;
}

function petHasRollTriggerTag(pet) {
  const key = normalizeName(pet?.name || '');
  if (!key) return false;
  const tags = state.rollAbilityTagsByPetKey?.[key];
  return Array.isArray(tags) && tags.includes('roll_trigger');
}

function pulseRollCountersOnBoard() {
  const until = Date.now() + 1600;
  for (let i = 0; i < BOARD_SIZE; i += 1) {
    state.rollCounterPulseUntilBySlot[i] = until;
  }
  if (state.rollCounterHideTimer) {
    clearTimeout(state.rollCounterHideTimer);
    state.rollCounterHideTimer = null;
  }
  state.rollCounterHideTimer = setTimeout(() => {
    state.rollCounterHideTimer = null;
    renderBoard();
  }, 1650);
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

async function loadReferenceData() {
  const safeFetchJson = async (path) => {
    try {
      const res = await fetch(path);
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json) ? json : [];
    } catch (_) {
      return [];
    }
  };
  const pets = await safeFetchJson('assets/reference-pets.json');
  const foods = await safeFetchJson('assets/reference-food.json');
  state.referenceData = {
    pets,
    foods
  };
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
      pushDebugTrigger('BridgeInit', `Loaded authoritative mechanics engine (${MECHANICS_MODE}).`);
    } catch (err) {
      pushDebugTrigger('BridgeInit', `Failed to load mechanics engine: ${err.message}`);
      setStatus(`Calculator not loaded: ${err.message}`);
    }
    const packData = await loadPackData();
    await loadReferenceData();

    hydratePackData(packData);
    buildRollAbilityTagIndex();
    state.textureAudit = computeTextureAudit([2, 3, 4, 5]);
    if ((state.textureAudit.missingPets.length + state.textureAudit.missingFoods.length) > 0) {
      console.log('Missing textures in P2-P5', state.textureAudit);
    }
    applyRandomWallpaper();
    renderBattleReport();
    updateHud();
    renderBoard();
    renderToyPickerOptions();

    packSelect.value = '1';
    switchPack(1);
    if (!isAuthoritativeMechanicsReady()) {
      setStatus(`Startup warning: ${MECHANICS_MODE} not ready. Mechanics may be incomplete until calculator engine loads.`);
    }
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
window.addEventListener('scroll', clearTooltip, true);
window.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') {
    if (state.toyModalOpen) {
      closeToyPickerModal(true);
      return;
    }
    if (state.battleReportModalOpen) {
      closeBattleReportModal();
      return;
    }
  }
  if (!state.toyModalOpen) return;
  const choices = Array.isArray(state.toyChoices) ? state.toyChoices : [];
  if (!choices.length) return;
  if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') {
    ev.preventDefault();
    focusToyChoiceByIndex(state.toyModalFocusIndex + 1);
    return;
  }
  if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') {
    ev.preventDefault();
    focusToyChoiceByIndex(state.toyModalFocusIndex - 1);
    return;
  }
  if (ev.key === 'Enter') {
    ev.preventDefault();
    const selected = choices[Math.max(0, Math.min(choices.length - 1, state.toyModalFocusIndex))];
    if (selected?.name) {
      selectToyChoice(selected.name);
    }
  }
});
if (battleSkipBtn) {
  battleSkipBtn.addEventListener('click', () => {
    state.battlePlaybackSkip = true;
  });
}
if (toyPickerCloseBtn) {
  toyPickerCloseBtn.addEventListener('click', () => closeToyPickerModal(true));
}
if (toyPickerModal) {
  toyPickerModal.addEventListener('click', (ev) => {
    if (ev.target === toyPickerModal) {
      closeToyPickerModal(true);
    }
  });
}
if (battleReportBtn) {
  battleReportBtn.addEventListener('click', () => {
    playUiSound('click', 0.7);
    openBattleReportModal();
  });
}
if (battleReportCloseBtn) {
  battleReportCloseBtn.addEventListener('click', closeBattleReportModal);
}
if (battleReportModal) {
  battleReportModal.addEventListener('click', (ev) => {
    if (ev.target === battleReportModal) {
      closeBattleReportModal();
    }
  });
}
if (itemSortSelect) {
  itemSortSelect.addEventListener('change', () => {
    state.uiFilters.sort = String(itemSortSelect.value || 'none');
    renderShopPets();
    renderShopFoods();
  });
}
if (itemFilterInput) {
  itemFilterInput.addEventListener('input', () => {
    state.uiFilters.query = String(itemFilterInput.value || '');
    renderShopPets();
    renderShopFoods();
  });
}
if (colorBlindToggle) {
  colorBlindToggle.addEventListener('change', () => {
    state.colorBlindMode = Boolean(colorBlindToggle.checked);
    applyAccessibilitySettings();
  });
}
if (uiZoomRange) {
  uiZoomRange.addEventListener('input', () => {
    const next = Math.max(0.85, Math.min(1.2, Number(uiZoomRange.value || 100) / 100));
    state.uiScale = next;
    applyAccessibilitySettings();
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
