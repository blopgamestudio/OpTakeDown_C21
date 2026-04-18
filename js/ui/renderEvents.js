export function renderEvents(game) {
  const container = document.getElementById("eventsList");
  if (!container) return;

  container.innerHTML = "";

  if (!game.events.length) {
    container.innerHTML = `
      <div class="event-card">
        <strong>Journal de guerre</strong>
        <p>Aucun rapport de campagne pour le moment.</p>
      </div>
    `;
    return;
  }

  game.events.forEach(entry => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `<p>${entry}</p>`;
    container.appendChild(card);
  });
}