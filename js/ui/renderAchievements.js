import { achievementDefs } from "/js/config/achievements.js";

export function renderAchievements(game) {
  const container = document.getElementById("achievementsList");
  if (!container) return;

  container.innerHTML = "";

  achievementDefs.forEach(achievement => {
    const unlocked = game.achievements.includes(achievement.id);

    const card = document.createElement("div");
    card.className = `achievement-card${unlocked ? "" : " locked"}`;
    card.innerHTML = `
      <strong>${achievement.name}</strong>
      <p>${achievement.desc}</p>
    `;

    container.appendChild(card);
  });
}