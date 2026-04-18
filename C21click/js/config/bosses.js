export const scriptedBosses = [
  {
    id: "jackal_captain",
    name: "Capitaine Jackal",
    unlockVictory: 3,
    hp: 18000,
    reward: 4000,
    category: "scripted"
  },
  {
    id: "scarab_vanguard",
    name: "Scarab d'avant-garde",
    unlockVictory: 5,
    hp: 220000,
    reward: 45000,
    category: "scripted"
  },
  {
    id: "brute_command",
    name: "Chef Brute de secteur",
    unlockVictory: 6,
    hp: 480000,
    reward: 95000,
    category: "scripted"
  },
  {
    id: "covenant_flagship",
    name: "Croiseur d'assaut Covenant",
    unlockVictory: 10,
    hp: 4200000,
    reward: 850000,
    category: "scripted"
  }
];

export const randomBossPool = [
  {
    id: "corvette_raid",
    name: "Raid de corvettes",
    rewardFactor: 0.17
  },
  {
    id: "bombing_wing",
    name: "Escadre de bombardement",
    rewardFactor: 0.18
  },
  {
    id: "elite_cell",
    name: "Cellule d'élite Covenant",
    rewardFactor: 0.16
  },
  {
    id: "theater_breach",
    name: "Brèche de théâtre ennemie",
    rewardFactor: 0.19
  },
  {
    id: "hostile_task_force",
    name: "Task force hostile",
    rewardFactor: 0.2
  },
  {
    id: "opportunist_cruiser",
    name: "Croiseur opportuniste",
    rewardFactor: 0.18
  },
  {
    id: "orbital_assault_group",
    name: "Groupe d'assaut orbital",
    rewardFactor: 0.21
  },
  {
    id: "siege_column",
    name: "Colonne de siège Covenant",
    rewardFactor: 0.17
  },
  {
    id: "plasma_breakthrough",
    name: "Percée plasma coordonnée",
    rewardFactor: 0.19
  },
  {
    id: "heavy_invasion_wave",
    name: "Vague d'invasion lourde",
    rewardFactor: 0.22
  }
];

export const ultraBoss = {
  id: "ultra_boss_p50",
  name: "Supercroiseur de destruction",
  rewardFactor: 0.3,
  victoryRequired: 50
};