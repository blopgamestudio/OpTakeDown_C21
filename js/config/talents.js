export const talentDefs = [

  // =========================
  // TIER 1 — DOCTRINE
  // =========================

  {
    id: "doctrine_recruitment",
    name: "Doctrine / Recrutement",
    desc: "+15% efficacité infanterie",
    tier: 1,
    unlockVictory: 3,
    cost: 1,
    exclusiveGroup: "doctrine",
    requires: [],
    effect: {
      infantryMult: 0.15
    }
  },
  {
    id: "doctrine_industry",
    name: "Doctrine / Industrie",
    desc: "+10% production globale",
    tier: 1,
    unlockVictory: 3,
    cost: 1,
    exclusiveGroup: "doctrine",
    requires: [],
    effect: {
      globalMult: 0.10
    }
  },
  {
    id: "doctrine_command",
    name: "Doctrine / Commandement",
    desc: "+1 puissance de clic",
    tier: 1,
    unlockVictory: 3,
    cost: 1,
    exclusiveGroup: "doctrine",
    requires: [],
    effect: {
      clickPower: 1
    }
  },

  // =========================
  // TIER 2 — FSU
  // =========================

  {
    id: "fsu_infantry",
    name: "FSU / Fantassin",
    desc: "+25% efficacité infanterie",
    tier: 2,
    unlockVictory: 6,
    cost: 2,
    exclusiveGroup: "fsu",
    requires: ["doctrine_recruitment"],
    effect: {
      infantryMult: 0.25
    }
  },
  {
    id: "fsu_support",
    name: "FSU / Support",
    desc: "+150 crédits / sec plats",
    tier: 2,
    unlockVictory: 6,
    cost: 2,
    exclusiveGroup: "fsu",
    requires: ["doctrine_industry"],
    effect: {
      globalFlat: 150
    }
  },
  {
    id: "fsu_command",
    name: "FSU / Commandement",
    desc: "+2 puissance de clic",
    tier: 2,
    unlockVictory: 6,
    cost: 2,
    exclusiveGroup: "fsu",
    requires: ["doctrine_command"],
    effect: {
      clickPower: 2
    }
  },

  // =========================
  // TIER 3 — FAU
  // =========================

  {
    id: "fau_heavy",
    name: "FAU / Appui lourd",
    desc: "+20% unités lourdes",
    tier: 3,
    unlockVictory: 10,
    cost: 3,
    exclusiveGroup: "fau",
    requires: ["fsu_infantry"],
    effect: {
      heavyMult: 0.20
    }
  },
  {
    id: "fau_logistics",
    name: "FAU / Logistique",
    desc: "+15% production globale",
    tier: 3,
    unlockVictory: 10,
    cost: 3,
    exclusiveGroup: "fau",
    requires: ["fsu_support"],
    effect: {
      globalMult: 0.15
    }
  },
  {
    id: "fau_elite",
    name: "FAU / Élite Spartan",
    desc: "+3 puissance clic et +10% global",
    tier: 3,
    unlockVictory: 10,
    cost: 3,
    exclusiveGroup: "fau",
    requires: ["fsu_command"],
    effect: {
      clickPower: 3,
      globalMult: 0.10
    }
  },

  // =========================
  // TIER 4 — FINAL
  // =========================

  {
    id: "final_overdrive",
    name: "Overdrive industriel",
    desc: "+25% production globale",
    tier: 4,
    unlockVictory: 20,
    cost: 4,
    exclusiveGroup: "final",
    requires: ["fau_logistics"],
    effect: {
      globalMult: 0.25
    }
  },
  {
    id: "final_war_machine",
    name: "Machine de guerre",
    desc: "+30% unités lourdes",
    tier: 4,
    unlockVictory: 20,
    cost: 4,
    exclusiveGroup: "final",
    requires: ["fau_heavy"],
    effect: {
      heavyMult: 0.30
    }
  },
  {
    id: "final_spartan_protocol",
    name: "Protocole Spartan",
    desc: "+5 clic +20% global",
    tier: 4,
    unlockVictory: 20,
    cost: 4,
    exclusiveGroup: "final",
    requires: ["fau_elite"],
    effect: {
      clickPower: 5,
      globalMult: 0.20
    }
  }
];