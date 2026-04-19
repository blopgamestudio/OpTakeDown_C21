import { unitDefs } from "../config/units.js";
import { upgradeDefs } from "../config/upgrades.js";
import { formatNumber } from "../utils/format.js";

export function renderShops(game, onBuyUnit, onBuyUpgrade) {
  const unitsShop = document.getElementById("unitsShop");
  const upgradesShop = document.getElementById("upgradesShop");
  const unitsSummary = document.getElementById("unitsSummary");

  if (unitsShop) {
    unitsShop.innerHTML = "";

    unitDefs.forEach(unit => {
      const card = document.createElement("div");
      card.className = "shop-item";

      const cost = game.unitCosts[unit.id];
      const owned = game.units[unit.id];

      card.innerHTML = `
        <div>
          <h3>${unit.name}</h3>
          <p>+${unit.cps} crédits / sec</p>
          <small>Possédé : ${owned}</small>
        </div>
        <button class="buy-btn" ${game.credits < cost ? "disabled" : ""}>
  Acheter (${formatNumber(cost)})
</button>
      `;

      const btn = card.querySelector("button");
      btn.addEventListener("click", () => onBuyUnit(unit.id));

      unitsShop.appendChild(card);
    });
  }

  if (upgradesShop) {
  upgradesShop.innerHTML = "";

  upgradeDefs.forEach(upgrade => {
    const card = document.createElement("div");
    card.className = "shop-item";

    const cost = game.upgradeCosts[upgrade.id];
    const level = game.upgradeLevels[upgrade.id];

    const disabled = game.credits < cost;

    card.innerHTML = `
      <div>
        <h3>${upgrade.name}</h3>
        <p>${upgrade.effect} +${upgrade.value}</p>
        <small>Niveau : ${level}</small>
      </div>
      <button class="buy-btn" ${disabled ? "disabled" : ""}>
        Acheter (${formatNumber(cost)})
      </button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => onBuyUpgrade(upgrade.id));

    upgradesShop.appendChild(card);
  });
}

  if (unitsSummary) {
    unitsSummary.innerHTML = unitDefs
      .map(unit => `${unit.name} : ${game.units[unit.id]}`)
      .join("<br>");
  }
}