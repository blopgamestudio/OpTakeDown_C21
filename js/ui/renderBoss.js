import { formatNumber } from "/js/utils/format.js";

export function renderBoss(game) {
  const bossPanel = document.getElementById("bossPanel");
  if (!bossPanel) return;

  if (!game.activeBoss) {
    bossPanel.innerHTML = `
      <div class="boss-box">
        <h3>Menace majeure : aucune</h3>
        <div class="progress-bar">
          <div class="progress-fill boss-fill" style="width: 0%;"></div>
        </div>
        <div>Aucune menace stratégique en cours.</div>
      </div>
    `;
    return;
  }

  const percent = Math.max(
    0,
    Math.min(100, (game.activeBoss.hp / game.activeBoss.maxHp) * 100)
  );

  const label =
    game.activeBoss.type === "ultra"
      ? "Menace terminale"
      : "Menace majeure";

  bossPanel.innerHTML = `
    <div class="boss-box">
      <h3>${label} : ${game.activeBoss.name}</h3>
      <div class="progress-bar">
        <div class="progress-fill boss-fill" style="width: ${percent}%;"></div>
      </div>
      <div>
        Résistance ennemie : ${formatNumber(game.activeBoss.hp)} /
        ${formatNumber(game.activeBoss.maxHp)}
      </div>
    </div>
  `;
}