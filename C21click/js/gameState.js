import { unitDefs } from "./config/units.js";
import { upgradeDefs } from "./config/upgrades.js";
import { talentDefs } from "./config/talents.js";

export function makeDefaultState() {
  const units = {};
  const unitCosts = {};
  unitDefs.forEach(unit => {
    units[unit.id] = 0;
    unitCosts[unit.id] = unit.baseCost;
  });

  const upgradeLevels = {};
  const upgradeCosts = {};
  upgradeDefs.forEach(upgrade => {
    upgradeLevels[upgrade.id] = 0;
    upgradeCosts[upgrade.id] = upgrade.baseCost;
  });

  const talents = {};
  talentDefs.forEach(talent => {
    talents[talent.id] = 0;
  });

  return {
    credits: 0,
    totalCredits: 0,
    clickPower: 1,
    techLevel: 1,
    victories: 0,
    currentCampaign: 0,
    bossesDefeated: 0,
    defeatedBosses: [],
    randomEventsTriggered: 0,
    talentPoints: 0,
    units,
    unitCosts,
    upgradeLevels,
    upgradeCosts,
    talents,
    achievements: [],
    events: [],
    activeBoss: null,
    upgradeEffects: {
      globalMult: 0,
      infantryMult: 0,
      heavyMult: 0,
      globalFlat: 0,
      bossDmg: 0,
      eventLuck: 0,
      eventResist: 0
    }
  };
}