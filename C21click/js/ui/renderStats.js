import { formatNumber } from "/js/utils/format.js";

export function renderStats(game, cps) {
  const statsPanel = document.getElementById("statsPanel");
  if (!statsPanel) return;

  statsPanel.innerHTML = `
    <div class="stats">
      <div class="stat">
        <span>Crédits UNSC</span>
        <strong>${formatNumber(game.credits)}</strong>
      </div>
      <div class="stat">
        <span>Production / sec</span>
        <strong>${formatNumber(cps)}</strong>
      </div>
      <div class="stat">
        <span>Puissance clic</span>
        <strong>${formatNumber(game.clickPower)}</strong>
      </div>
      <div class="stat">
        <span>Niveau techno</span>
        <strong>${formatNumber(game.techLevel)}</strong>
      </div>
      <div class="stat">
        <span>Victoires</span>
        <strong>${formatNumber(game.victories)}</strong>
      </div>
      <div class="stat">
        <span>Total gagné</span>
        <strong>${formatNumber(game.totalCredits)}</strong>
      </div>
    </div>
  `;
}