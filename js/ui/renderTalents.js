import { talentDefs } from "/js/config/talents.js";
import { getTalentStatus } from "/js/systems/talentSystem.js";

function formatRequirements(talent) {
  if (!talent.requires || talent.requires.length === 0) {
    return "Aucun prérequis";
  }

  const mode = talent.requiresMode || "all";
  const prefix = mode === "any" ? "1 des talents requis" : "Talents requis";

  return `${prefix} : ${talent.requires.join(", ")}`;
}

export function renderTalents(game, onBuyTalent) {
  const container = document.getElementById("talentTree");
  if (!container) return;

  container.innerHTML = "";

  const tiers = [1, 2, 3, 4];

  tiers.forEach(tier => {
    const tierTitle = document.createElement("div");
    tierTitle.className = "talent-card";
    tierTitle.innerHTML = `<strong>Tier ${tier}</strong><p>${
      tier === 1
        ? "Doctrine fondatrice"
        : tier === 2
        ? "Spécialisation FSU"
        : tier === 3
        ? "Doctrine FAU"
        : "Doctrine finale"
    }</p>`;
    container.appendChild(tierTitle);

    talentDefs
      .filter(talent => talent.tier === tier)
      .forEach(talent => {
        const status = getTalentStatus(game, talent.id);

        let buttonLabel = "Débloquer";
        if (status.owned) buttonLabel = "Débloqué";
        else if (status.lockedByExclusive) buttonLabel = "Voie verrouillée";
        else if (!status.hasRequiredVictories) buttonLabel = `Palier ${talent.unlockVictory} requis`;
        else if (!status.requirementsMet) buttonLabel = "Prérequis manquant";
        else if (!status.hasEnoughPoints) buttonLabel = "Points insuffisants";

        const card = document.createElement("div");
        card.className = "talent-card";

        card.innerHTML = `
          <strong>${talent.name}</strong>
          <p>${talent.desc}</p>
          <small>Coût : ${talent.cost} point(s)</small>
          <small>Déblocage : victoire ${talent.unlockVictory}</small>
          <small>Exclusivité : ${talent.exclusiveGroup || "aucune"}</small>
          <small>${formatRequirements(talent)}</small>
          <button ${status.buyable ? "" : "disabled"}>${buttonLabel}</button>
        `;

        const button = card.querySelector("button");
        button.addEventListener("click", () => onBuyTalent(talent.id));

        container.appendChild(card);
      });
  });
}