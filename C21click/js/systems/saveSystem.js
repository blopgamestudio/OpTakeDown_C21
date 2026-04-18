const SAVE_KEY = "c21HaloClickV4";

function cloneDefaultState(defaultState) {
  return JSON.parse(JSON.stringify(defaultState));
}

export function saveGame(game) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

export function loadGame(defaultState) {
  const raw = localStorage.getItem(SAVE_KEY);
  const safeDefault = cloneDefaultState(defaultState);

  if (!raw) {
    return safeDefault;
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      ...safeDefault,
      ...parsed,

      units: {
        ...safeDefault.units,
        ...(parsed.units || {})
      },

      unitCosts: {
        ...safeDefault.unitCosts,
        ...(parsed.unitCosts || {})
      },

      upgradeLevels: {
        ...safeDefault.upgradeLevels,
        ...(parsed.upgradeLevels || {})
      },

      upgradeCosts: {
        ...safeDefault.upgradeCosts,
        ...(parsed.upgradeCosts || {})
      },

      talents: {
        ...safeDefault.talents,
        ...(parsed.talents || {})
      },

      upgradeEffects: {
        ...safeDefault.upgradeEffects,
        ...(parsed.upgradeEffects || {})
      },

      achievements: Array.isArray(parsed.achievements)
        ? parsed.achievements
        : [],

      events: Array.isArray(parsed.events)
        ? parsed.events
        : [],

      defeatedBosses: Array.isArray(parsed.defeatedBosses)
        ? parsed.defeatedBosses
        : [],

      activeBoss: parsed.activeBoss || null
    };
  } catch (error) {
    console.error("Erreur de chargement de sauvegarde :", error);
    return safeDefault;
  }
}

export function resetSave() {
  localStorage.removeItem(SAVE_KEY);
}