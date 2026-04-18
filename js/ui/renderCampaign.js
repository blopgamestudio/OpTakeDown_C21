import { campaignSteps } from "/js/config/campaigns.js";
import { formatNumber } from "/js/utils/format.js";
import { getDynamicCampaignTarget } from "/js/systems/campaignSystem.js";

export function renderCampaign(game) {
  const campaignPanel = document.getElementById("campaignPanel");
  if (!campaignPanel) return;

  let title = "";
  let summary = "";
  let target = 0;
  let previousTarget = 0;

  if (game.victories < 10) {
    const index = Math.min(game.victories, campaignSteps.length - 1);
    const step = campaignSteps[index];
    title = step.name;
    summary = step.summary;
    target = step.target;
    previousTarget = index === 0 ? 0 : campaignSteps[index - 1].target;
  } else if (game.victories < 50) {
    const nextIndex = game.victories + 1;
    title = `Théâtre avancé ${nextIndex}`;
    summary = "Le commandement gère des menaces aléatoires et des incidents de campagne.";
    target = getDynamicCampaignTarget(nextIndex);
    previousTarget = getDynamicCampaignTarget(game.victories);
  } else {
    title = "Crise terminale";
    summary = "Un objectif stratégique hors norme bloque la progression du théâtre.";
    target = getDynamicCampaignTarget(50);
    previousTarget = getDynamicCampaignTarget(49);
  }

  const currentProgress = Math.max(0, game.totalCredits - previousTarget);
  const needed = Math.max(1, target - previousTarget);
  const percent = Math.max(0, Math.min(100, (currentProgress / needed) * 100));

  campaignPanel.innerHTML = `
    <div class="campaign-box">
      <h3>Palier actuel : ${title}</h3>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%;"></div>
      </div>
      <div>${formatNumber(currentProgress)} / ${formatNumber(needed)} crédits sur ce palier</div>
      <div style="margin-top:8px; opacity:0.85;">${summary}</div>
    </div>
  `;
}