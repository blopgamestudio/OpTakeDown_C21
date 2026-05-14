const mainPanel = document.getElementById("mainPanel");

const menus = {
  command: {
    title: "COMMAND CENTER",
    text: "Centre de commandement principal.",
    options: ["Rapport impérial", "Ressources", "Statut des colonies", "Alertes"]
  },

  galaxy: {
    title: "GALAXY MAP",
    text: "Carte galactique et exploration.",
    options: ["Voir la galaxie", "Scanner un secteur", "Explorer un système", "Créer une route commerciale"]
  },

  systems: {
    title: "SYSTEMS",
    text: "Gestion des systèmes stellaires.",
    options: ["Planètes contrôlées", "Colonies", "Stations orbitales", "Routes spatiales"]
  },

  construction: {
    title: "CONSTRUCTION",
    text: "Construis et améliore ton empire.",
    options: ["Mine de métal", "Extracteur de cristal", "Centrale énergétique", "Usine militaire"]
  },

  defense: {
    title: "DEFENSE",
    text: "Défenses planétaires et orbitales.",
    options: ["Tourelles laser", "Bouclier planétaire", "Batteries orbitales", "Champ de mines"]
  },

  technology: {
    title: "TECHNOLOGY",
    text: "Recherche scientifique et militaire.",
    options: ["Moteur Warp", "IA tactique", "Armes plasma", "Terraforming"]
  },

  fleet: {
    title: "FLEET",
    text: "Gestion des flottes.",
    options: ["Créer une flotte", "Déployer une mission", "Voir les vaisseaux", "Construire un croiseur"]
  },

  fleets: {
    title: "FLEETS",
    text: "Toutes les flottes actives.",
    options: ["Flotte Alpha", "Flotte Beta", "Flotte commerciale", "Flotte d'exploration"]
  },

  research: {
    title: "RESEARCH",
    text: "Laboratoires de recherche.",
    options: ["Militaire", "Économie", "Spatial", "Projets secrets"]
  },

  shipyard: {
    title: "SHIPYARD",
    text: "Chantier naval orbital.",
    options: ["Chasseur", "Frégate", "Croiseur", "Transporteur"]
  }
};

document.querySelectorAll("[data-menu]").forEach(button => {
  button.addEventListener("click", () => {
    const menu = menus[button.dataset.menu];

    if(!menu) return;

    mainPanel.innerHTML = `
      <h1>${menu.title}</h1>
      <p>${menu.text}</p>
      <div class="option-list">
        ${menu.options.map(option => `<div class="option">${option}</div>`).join("")}
      </div>
    `;
  });
});