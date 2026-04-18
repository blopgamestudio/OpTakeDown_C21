import { unitDefs } from "/js/config/units.js";

export function hasAchievement(game, id) {
  return game.achievements.includes(id);
}

export function unlockAchievement(game, id) {
  if (hasAchievement(game, id)) return false;
  game.achievements.push(id);
  return true;
}

export function getTotalUnits(game) {
  return unitDefs.reduce((total, unit) => total + (game.units[unit.id] || 0), 0);
}

export function getUnlockedTalentsCount(game) {
  return Object.values(game.talents || {}).filter(value => value > 0).length;
}

export function checkAchievements(game, cps) {
  const unlockedNow = [];
  const totalUnits = getTotalUnits(game);
  const unlockedTalents = getUnlockedTalentsCount(game);

  const checks = [
    { id: "first_click", condition: game.totalCredits >= 1 },

    { id: "credits_100", condition: game.totalCredits >= 100 },
    { id: "credits_1000", condition: game.totalCredits >= 1000 },
    { id: "credits_10000", condition: game.totalCredits >= 10000 },
    { id: "credits_100000", condition: game.totalCredits >= 100000 },
    { id: "credits_1000000", condition: game.totalCredits >= 1000000 },
    { id: "credits_10000000", condition: game.totalCredits >= 10000000 },

    { id: "units_10", condition: totalUnits >= 10 },
    { id: "units_25", condition: totalUnits >= 25 },
    { id: "units_50", condition: totalUnits >= 50 },
    { id: "units_100", condition: totalUnits >= 100 },
    { id: "units_150", condition: totalUnits >= 150 },
    { id: "units_300", condition: totalUnits >= 300 },

    { id: "marine_10", condition: (game.units.marine || 0) >= 10 },
    { id: "marine_25", condition: (game.units.marine || 0) >= 25 },
    { id: "hellbringer_10", condition: (game.units.hellbringer || 0) >= 10 },
    { id: "odst_10", condition: (game.units.odst || 0) >= 10 },
    { id: "odst_25", condition: (game.units.odst || 0) >= 25 },
    { id: "drone_10", condition: (game.units.drone || 0) >= 10 },
    { id: "turret_10", condition: (game.units.turret || 0) >= 10 },
    { id: "warthog_10", condition: (game.units.warthog || 0) >= 10 },
    { id: "scorpion_5", condition: (game.units.scorpion || 0) >= 5 },
    { id: "scorpion_10", condition: (game.units.scorpion || 0) >= 10 },
    { id: "hornet_10", condition: (game.units.hornet || 0) >= 10 },
    { id: "pelican_10", condition: (game.units.pelican || 0) >= 10 },
    { id: "gladius_5", condition: (game.units.gladius || 0) >= 5 },
    { id: "stalwart_5", condition: (game.units.stalwart || 0) >= 5 },
    { id: "marathon_3", condition: (game.units.marathon || 0) >= 3 },
    { id: "spartan_1", condition: (game.units.spartan2 || 0) >= 1 },
    { id: "spartan_5", condition: (game.units.spartan2 || 0) >= 5 },

    { id: "cps_100", condition: cps >= 100 },
    { id: "cps_1000", condition: cps >= 1000 },
    { id: "cps_10000", condition: cps >= 10000 },
    { id: "cps_100000", condition: cps >= 100000 },
    { id: "cps_1000000", condition: cps >= 1000000 },

    { id: "click_10", condition: game.clickPower >= 10 },
    { id: "click_25", condition: game.clickPower >= 25 },
    { id: "click_50", condition: game.clickPower >= 50 },

    { id: "tech_3", condition: game.techLevel >= 3 },
    { id: "tech_5", condition: game.techLevel >= 5 },
    { id: "tech_10", condition: game.techLevel >= 10 },
    { id: "tech_20", condition: game.techLevel >= 20 },

    { id: "talent_1", condition: unlockedTalents >= 1 },
    { id: "talent_3", condition: unlockedTalents >= 3 },
    { id: "talent_5", condition: unlockedTalents >= 5 },

    { id: "victory_1", condition: game.victories >= 1 },
    { id: "victory_3", condition: game.victories >= 3 },
    { id: "victory_5", condition: game.victories >= 5 },
    { id: "victory_10", condition: game.victories >= 10 },
    { id: "victory_25", condition: game.victories >= 25 },
    { id: "victory_50", condition: game.victories >= 50 },

    { id: "boss_1", condition: game.bossesDefeated >= 1 },
    { id: "boss_3", condition: game.bossesDefeated >= 3 },
    { id: "boss_5", condition: game.bossesDefeated >= 5 },
    { id: "boss_10", condition: game.bossesDefeated >= 10 },

    { id: "events_5", condition: game.randomEventsTriggered >= 5 },
    { id: "events_20", condition: game.randomEventsTriggered >= 20 },
    { id: "events_50", condition: game.randomEventsTriggered >= 50 }
  ];

  checks.forEach(entry => {
    if (entry.condition && unlockAchievement(game, entry.id)) {
      unlockedNow.push(entry.id);
    }
  });

  return unlockedNow;
}