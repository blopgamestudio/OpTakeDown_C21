import { unitDefs } from "/js/config/units.js";

const infantryUnits = ["marine", "hellbringer", "odst", "spartan2"];
const heavyUnits = ["warthog", "elephant", "wolverine", "cougar", "scorpion", "hornet", "pelican", "longsword", "gladius", "stalwart", "marathon"];

export function getTotalUnits(game) {
  return Object.values(game.units).reduce((a, b) => a + b, 0);
}

export function getTalentBonus(game, defs, key) {
  let total = 0;
  defs.forEach(t => {
    if (game.talents[t.id] > 0 && t.effect[key]) total += t.effect[key];
  });
  return total;
}

export function getUnitCps(game, talentDefs, unitId) {
  const def = unitDefs.find(unit => unit.id === unitId);
  if (!def) return 0;

  let mult = 1;
  if (infantryUnits.includes(unitId)) {
    mult += game.upgradeEffects.infantryMult + getTalentBonus(game, talentDefs, "infantryMult");
  }
  if (heavyUnits.includes(unitId)) {
    mult += getTalentBonus(game, talentDefs, "heavyMult");
  }

  return def.cps * mult;
}

export function getBaseCps(game, talentDefs) {
  let total = 0;
  unitDefs.forEach(unit => {
    total += game.units[unit.id] * getUnitCps(game, talentDefs, unit.id);
  });
  return total;
}

export function getCps(game, talentDefs) {
  const globalBonus = 1 + game.upgradeEffects.globalMult + getTalentBonus(game, talentDefs, "globalMult");
  return Math.floor((getBaseCps(game, talentDefs) + game.upgradeEffects.globalFlat) * game.techLevel * globalBonus);
}