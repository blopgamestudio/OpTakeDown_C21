import { scriptedBosses, randomBossPool, ultraBoss } from "/js/config/bosses.js";

export function getBossDamagePerSecond(game, cps) {
  const bonus = game.upgradeEffects?.bossDmg || 0;
  return Math.max(1, Math.floor(cps * (0.04 + bonus)));
}

export function spawnBossIfNeeded(game) {
  if (game.activeBoss) return null;

  if (!Array.isArray(game.defeatedBosses)) {
    game.defeatedBosses = [];
  }

  const nextBoss = scriptedBosses.find(
    boss =>
      boss.unlockVictory === game.victories &&
      !game.defeatedBosses.includes(boss.id)
  );

  if (!nextBoss) return null;

  game.activeBoss = {
    id: nextBoss.id,
    name: nextBoss.name,
    hp: nextBoss.hp,
    maxHp: nextBoss.hp,
    reward: nextBoss.reward,
    type: "scripted",
    victoryGate: nextBoss.unlockVictory
  };

  return game.activeBoss;
}

export function maybeSpawnRandomBoss(game, cps) {
  if (game.activeBoss) return null;
  if (game.victories < 11 || game.victories >= 50) return null;

  const chance = 0.12;
  if (Math.random() > chance) return null;

  const template = randomBossPool[Math.floor(Math.random() * randomBossPool.length)];

  const hp = Math.floor(
    game.totalCredits * 0.08 +
    cps * 180 +
    game.victories * 45000 +
    game.techLevel * 7000
  );

  const reward = Math.floor(hp * template.rewardFactor);

  game.activeBoss = {
    id: `random_${template.id}_${Date.now()}`,
    name: template.name,
    hp,
    maxHp: hp,
    reward,
    type: "random",
    victoryGate: game.victories
  };

  return game.activeBoss;
}

export function spawnUltraBossIfNeeded(game, cps) {
  if (game.activeBoss) return null;

  if (!Array.isArray(game.defeatedBosses)) {
    game.defeatedBosses = [];
  }

  if (game.victories !== ultraBoss.victoryRequired) return null;
  if (game.defeatedBosses.includes(ultraBoss.id)) return null;

  const baseHp = Math.floor(
    game.totalCredits * 0.1 +
    cps * 220 +
    game.victories * 60000 +
    game.techLevel * 10000
  );

  const hp = Math.floor(baseHp * 10);
  const reward = Math.floor(hp * ultraBoss.rewardFactor);

  game.activeBoss = {
    id: ultraBoss.id,
    name: ultraBoss.name,
    hp,
    maxHp: hp,
    reward,
    type: "ultra",
    victoryGate: ultraBoss.victoryRequired
  };

  return game.activeBoss;
}

export function tickBoss(game, cps) {
  if (!game.activeBoss) return null;

  if (!Array.isArray(game.defeatedBosses)) {
    game.defeatedBosses = [];
  }

  const pressure = getBossDamagePerSecond(game, cps) / 10;
  game.activeBoss.hp -= pressure;

  if (game.activeBoss.hp <= 0) {
    const boss = { ...game.activeBoss };
    game.activeBoss = null;

    game.credits += boss.reward;
    game.totalCredits += boss.reward;
    game.bossesDefeated += 1;

    if (!game.defeatedBosses.includes(boss.id)) {
      game.defeatedBosses.push(boss.id);
    }

    return {
      defeated: true,
      boss,
      reward: boss.reward
    };
  }

  return {
    defeated: false,
    boss: game.activeBoss
  };
}