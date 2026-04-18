import { unitDefs } from "../config/units.js";
import { upgradeDefs } from "../config/upgrades.js";

export function buyUnit(game, id) {
  const def = unitDefs.find(unit => unit.id === id);
  if (!def) return false;

  const cost = game.unitCosts[id];
  if (game.credits < cost) return false;

  game.credits -= cost;
  game.units[id]++;
  game.unitCosts[id] = Math.floor(game.unitCosts[id] * def.growth);
  return true;
}

export function buyUpgrade(game, id) {
  const def = upgradeDefs.find(upg => upg.id === id);
  if (!def) return false;

  const cost = game.upgradeCosts[id];
  if (game.credits < cost) return false;

  game.credits -= cost;
  game.upgradeLevels[id]++;
  game.upgradeCosts[id] = Math.floor(game.upgradeCosts[id] * def.growth);

  if (def.effect === "click") game.clickPower += def.value;
  if (def.effect === "tech") game.techLevel += def.value;
  if (def.effect === "globalMult") game.upgradeEffects.globalMult += def.value;
  if (def.effect === "infantryMult") game.upgradeEffects.infantryMult += def.value;
  if (def.effect === "globalFlat") game.upgradeEffects.globalFlat += def.value;
  if (def.effect === "bossDmg") game.upgradeEffects.bossDmg += def.value;
  if (def.effect === "eventLuck") game.upgradeEffects.eventLuck += def.value;

  return true;
}