import { talentDefs } from "../config/talents.js";

function getTalentById(talentId) {
  return talentDefs.find(talent => talent.id === talentId) || null;
}

function isOwned(game, talentId) {
  return (game.talents?.[talentId] || 0) > 0;
}

function hasRequiredVictories(game, talent) {
  return game.victories >= talent.unlockVictory;
}

function hasEnoughPoints(game, talent) {
  return game.talentPoints >= talent.cost;
}

function requirementsMet(game, talent) {
  if (!talent.requires || talent.requires.length === 0) {
    return true;
  }

  const mode = talent.requiresMode || "all";

  if (mode === "any") {
    return talent.requires.some(requiredId => isOwned(game, requiredId));
  }

  return talent.requires.every(requiredId => isOwned(game, requiredId));
}

function exclusiveGroupBlocked(game, talent) {
  if (!talent.exclusiveGroup) return false;

  return talentDefs.some(otherTalent => {
    if (otherTalent.id === talent.id) return false;
    if (otherTalent.exclusiveGroup !== talent.exclusiveGroup) return false;
    return isOwned(game, otherTalent.id);
  });
}

export function getTalentBonus(game, key) {
  let total = 0;

  talentDefs.forEach(talent => {
    if (isOwned(game, talent.id) && talent.effect?.[key]) {
      total += talent.effect[key];
    }
  });

  return total;
}

export function isTalentLockedByExclusiveChoice(game, talentId) {
  const talent = getTalentById(talentId);
  if (!talent || !talent.exclusiveGroup) return false;
  if (isOwned(game, talentId)) return false;

  return exclusiveGroupBlocked(game, talent);
}

export function canBuyTalent(game, talentId) {
  const talent = getTalentById(talentId);
  if (!talent) return false;
  if (isOwned(game, talentId)) return false;
  if (!hasRequiredVictories(game, talent)) return false;
  if (!requirementsMet(game, talent)) return false;
  if (!hasEnoughPoints(game, talent)) return false;
  if (exclusiveGroupBlocked(game, talent)) return false;

  return true;
}

export function buyTalent(game, talentId) {
  const talent = getTalentById(talentId);
  if (!talent) return false;
  if (!canBuyTalent(game, talentId)) return false;

  game.talentPoints -= talent.cost;
  game.talents[talentId] = 1;

  return true;
}

export function getUnlockedTalentsCount(game) {
  return Object.values(game.talents || {}).filter(value => value > 0).length;
}

export function getTalentStatus(game, talentId) {
  const talent = getTalentById(talentId);
  if (!talent) {
    return {
      exists: false,
      owned: false,
      buyable: false,
      lockedByExclusive: false,
      requirementsMet: false,
      hasRequiredVictories: false,
      hasEnoughPoints: false
    };
  }

  return {
    exists: true,
    owned: isOwned(game, talentId),
    buyable: canBuyTalent(game, talentId),
    lockedByExclusive: isTalentLockedByExclusiveChoice(game, talentId),
    requirementsMet: requirementsMet(game, talent),
    hasRequiredVictories: hasRequiredVictories(game, talent),
    hasEnoughPoints: hasEnoughPoints(game, talent)
  };
}