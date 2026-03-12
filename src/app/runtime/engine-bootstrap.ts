import { AbilityQueue } from '../gameplay/ability-queue';
import { AbilityEngine } from '../gameplay/ability-engine';
import { EffectHandlerLibrary } from '../gameplay/effect-handlers';
import { registerCoreHandlers } from '../gameplay/effect-handler-presets';
import { AbilityRegistry } from '../integrations/ability-registry';
import { PetRegistry } from '../integrations/pet-registry';
import { FoodRegistry } from '../integrations/food-registry';
import { ToyRegistry } from '../integrations/toy-registry';
import { PerkRegistry } from '../integrations/perk-registry';
import { AilmentRegistry } from '../integrations/ailment-registry';
import { loadCatalogs } from '../integrations/catalog-loader';
import { GameState } from './game-state';
import { ShopService } from './shop-service';

export function bootstrapEngine() {
  const effects = new EffectHandlerLibrary();
  const petRegistry = new PetRegistry();
  registerCoreHandlers(effects, petRegistry);

  const abilityQueue = new AbilityQueue();
  const foodRegistry = new FoodRegistry();
  const toyRegistry = new ToyRegistry();
  const perkRegistry = new PerkRegistry();
  const ailmentRegistry = new AilmentRegistry();

  const abilityRegistry = new AbilityRegistry(effects, abilityQueue);
  loadCatalogs(petRegistry, foodRegistry, abilityRegistry, effects);

  const gameState = new GameState();
  const abilityEngine = new AbilityEngine(abilityQueue);
  const shopService = new ShopService(petRegistry, foodRegistry);

  return {
    effects,
    abilityQueue,
    abilityRegistry,
    petRegistry,
    foodRegistry,
    toyRegistry,
    perkRegistry,
    ailmentRegistry,
    gameState,
    abilityEngine,
    shopService,
  };
}
