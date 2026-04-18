import { campaignSteps } from "/js/config/campaigns.js";

export function getCurrentCampaignStep(game) {
  if (game.victories <= campaignSteps.length) {
    const index = Math.max(0, Math.min(game.currentCampaign, campaignSteps.length - 1));
    return campaignSteps[index];
  }

  return {
    id: game.victories + 1,
    target: getDynamicCampaignTarget(game.victories + 1),
    name: `Théâtre avancé ${game.victories + 1}`,
    reward: Math.max(2, Math.floor((game.victories + 1) / 10)),
    summary: "Le commandement poursuit son expansion stratégique."
  };
}

export function getPreviousCampaignTarget(game) {
  if (game.currentCampaign <= 0) return 0;

  if (game.currentCampaign <= campaignSteps.length - 1) {
    return campaignSteps[game.currentCampaign - 1].target;
  }

  return getDynamicCampaignTarget(game.currentCampaign);
}

export function getDynamicCampaignTarget(victoryIndex) {
  const base = 7000000;
  const extra = victoryIndex - 10;
  return Math.floor(base + extra * extra * 850000 + extra * 1500000);
}

export function checkCampaignProgress(game) {
  const unlockedSteps = [];

  while (true) {
    const nextVictoryIndex = game.victories + 1;
    const target =
      nextVictoryIndex <= 10
        ? campaignSteps[nextVictoryIndex - 1].target
        : getDynamicCampaignTarget(nextVictoryIndex);

    if (game.totalCredits < target) break;

    game.victories += 1;
    game.currentCampaign = Math.min(game.victories, campaignSteps.length - 1);
    game.talentPoints += nextVictoryIndex <= 10
      ? campaignSteps[nextVictoryIndex - 1].reward
      : Math.max(2, Math.floor(nextVictoryIndex / 10));

    unlockedSteps.push({
      id: nextVictoryIndex,
      name:
        nextVictoryIndex <= 10
          ? campaignSteps[nextVictoryIndex - 1].name
          : `Théâtre avancé ${nextVictoryIndex}`,
      reward:
        nextVictoryIndex <= 10
          ? campaignSteps[nextVictoryIndex - 1].reward
          : Math.max(2, Math.floor(nextVictoryIndex / 10))
    });
  }

  return unlockedSteps;
}