import { makeDefaultState } from "/js/gameState.js";
import { talentDefs } from "/js/config/talents.js";
import { achievementDefs } from "/js/config/achievements.js";

import { getCps } from "/js/systems/economySystem.js";
import { buyUnit, buyUpgrade } from "/js/systems/shopSystem.js";
import { saveGame, loadGame, resetSave } from "/js/systems/saveSystem.js";
import { checkAchievements } from "/js/systems/achievementSystem.js";
import { checkCampaignProgress } from "/js/systems/campaignSystem.js";
import {
  spawnBossIfNeeded,
  maybeSpawnRandomBoss,
  spawnUltraBossIfNeeded,
  tickBoss
} from "/js/systems/bossSystem.js";
import { triggerRandomEvent } from "/js/systems/eventSystem.js";
import { buyTalent } from "/js/systems/talentSystem.js";

import { renderStats } from "/js/ui/renderStats.js";
import { renderShops } from "/js/ui/renderShops.js";
import { renderAchievements } from "/js/ui/renderAchievements.js";
import { renderEvents } from "/js/ui/renderEvents.js";
import { renderTalents } from "/js/ui/renderTalents.js";
import { renderBoss } from "/js/ui/renderBoss.js";
import { renderCampaign } from "/js/ui/renderCampaign.js";

let game = loadGame(makeDefaultState());

function setLog(text) {
  const logPanel = document.getElementById("logPanel");
  if (logPanel) {
    logPanel.textContent = text;
  }
}

function addEvent(text) {
  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  game.events.unshift(`[${time}] ${text}`);

  if (game.events.length > 50) {
    game.events.pop();
  }
}

function addCredits(amount) {
  game.credits += amount;
  game.totalCredits += amount;
}

function floatingText(x, y, value) {
  const el = document.createElement("div");
  el.className = "floating-text";
  el.textContent = "+" + Math.floor(value);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 800);
}

function getAchievementName(id) {
  const achievement = achievementDefs.find(item => item.id === id);
  return achievement ? achievement.name : id;
}

function processAchievements(cps) {
  const unlockedAchievements = checkAchievements(game, cps);

  unlockedAchievements.forEach(id => {
    addEvent(`Haut fait débloqué : ${getAchievementName(id)}`);
  });
}

function processCampaign() {
  const campaignRewards = checkCampaignProgress(game);

  campaignRewards.forEach(step => {
    addEvent(`Victoire de campagne : ${step.name} // +${step.reward} point(s) de talent`);
    setLog(`Palier franchi : ${step.name}`);
  });
}

function processBossSpawns(cps) {
  const scriptedBoss = spawnBossIfNeeded(game);
  if (scriptedBoss) {
    addEvent(`Menace majeure détectée : ${scriptedBoss.name}`);
    setLog(`Nouvelle menace stratégique : ${scriptedBoss.name}`);
  }

  const ultraBoss = spawnUltraBossIfNeeded(game, cps);
  if (ultraBoss) {
    addEvent(`MENACE TERMINALE DÉTECTÉE : ${ultraBoss.name}`);
    setLog(`Crise terminale : ${ultraBoss.name}`);
  }
}

function processProgression(cps) {
  processAchievements(cps);
  processCampaign();
  processBossSpawns(cps);
}

function refresh() {
  const cps = getCps(game, talentDefs);

  renderStats(game, cps);
  renderCampaign(game);
  renderBoss(game);
  renderShops(game, onBuyUnit, onBuyUpgrade);
  renderAchievements(game);
  renderEvents(game);
  renderTalents(game, onBuyTalent);
}

function onBuyUnit(id) {
  const ok = buyUnit(game, id);

  if (ok) {
    addEvent(`Unité achetée : ${id}`);
    setLog("Unité achetée.");
  } else {
    setLog("Crédits insuffisants.");
  }

  refresh();
}

function onBuyUpgrade(id) {
  const ok = buyUpgrade(game, id);

  if (ok) {
    addEvent(`Amélioration achetée : ${id}`);
    setLog("Amélioration achetée.");
  } else {
    setLog("Crédits insuffisants.");
  }

  refresh();
}

function onBuyTalent(id) {
  const ok = buyTalent(game, id);

  if (ok) {
    addEvent(`Talent débloqué : ${id}`);
    setLog("Talent débloqué.");
  } else {
    setLog("Talent indisponible.");
  }

  refresh();
}

document.getElementById("mainClick")?.addEventListener("click", (e) => {
  const gain = game.clickPower * game.techLevel;
  addCredits(gain);
  floatingText(e.clientX, e.clientY, gain);
  setLog("Énergie récupérée.");
  refresh();
});

window.saveGame = () => {
  saveGame(game);
  setLog("Sauvegarde effectuée.");
};

window.resetGame = () => {
  resetSave();
  game = makeDefaultState();
  setLog("Partie réinitialisée.");
  refresh();
};

setInterval(() => {
  const cps = getCps(game, talentDefs);

  addCredits(cps / 25);

  processProgression(cps);

  const bossResult = tickBoss(game, cps);
  if (bossResult?.defeated) {
    const prefix =
      bossResult.boss.type === "ultra"
        ? "Menace terminale neutralisée"
        : "Menace neutralisée";

    addEvent(`${prefix} : ${bossResult.boss.name} // +${bossResult.reward} crédits`);
    setLog("Menace stratégique neutralisée.");
  }
}, 100);

setInterval(() => {
  refresh();
}, 300);

setInterval(() => {
  const cps = getCps(game, talentDefs);

  const randomBoss = maybeSpawnRandomBoss(game, cps);
  if (randomBoss) {
    addEvent(`Nouvelle menace détectée : ${randomBoss.name}`);
    setLog(`Alerte stratégique : ${randomBoss.name}`);
  }

  const eventResult = triggerRandomEvent(game, cps);
  if (eventResult) {
    addEvent(`${eventResult.label} // ${eventResult.text}`);
    setLog(eventResult.label);
  }
}, 12000);

setInterval(() => {
  saveGame(game);
}, 5000);

refresh();
setLog("Jeu initialisé.");