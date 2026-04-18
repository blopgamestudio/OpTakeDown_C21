import { unitDefs } from "/js/config/units.js";

function getOwnedUnits(game) {
  return unitDefs.filter(unit => (game.units[unit.id] || 0) > 0);
}

export function triggerRandomEvent(game, cps) {
  if (game.victories < 11) return null;

  const luck = game.upgradeEffects.eventLuck || 0;
  const resist = game.upgradeEffects.eventResist || 0;

  const chance = 0.18 + luck;
  if (Math.random() > chance) return null;

  game.randomEventsTriggered += 1;

  const events = [
    {
      id: "unit_support",
      run: () => {
        const available = unitDefs.slice(0, 8);
        const picked = available[Math.floor(Math.random() * available.length)];
        game.units[picked.id] += 1;
        return {
          label: "Soutien d'unité",
          text: `renfort gratuit : +1 ${picked.name}`
        };
      }
    },
    {
      id: "base_construction",
      run: () => {
        const gain = Math.max(100, Math.floor(cps * 10));
        game.credits += gain;
        game.totalCredits += gain;
        return {
          label: "Construction de base avancée",
          text: `+${gain} crédits de capacité logistique`
        };
      }
    },
    {
      id: "parade",
      run: () => {
        game.clickPower += 2;
        return {
          label: "Défilé d'unités",
          text: "+2 puissance de clic"
        };
      }
    },
    {
      id: "production_chain",
      run: () => {
        game.upgradeEffects.globalFlat += 80;
        return {
          label: "Gestion de chaîne de production",
          text: "+80 crédits / sec plats"
        };
      }
    },
    {
      id: "secured_convoy",
      run: () => {
        const gain = Math.max(150, Math.floor(cps * 14));
        game.credits += gain;
        game.totalCredits += gain;
        return {
          label: "Convoi sécurisé",
          text: `+${gain} crédits`
        };
      }
    },
    {
      id: "tactical_redeployment",
      run: () => {
        game.talentPoints += 1;
        return {
          label: "Redéploiement tactique",
          text: "+1 point de talent"
        };
      }
    },
    {
      id: "weapons_delivery",
      run: () => {
        game.upgradeEffects.infantryMult += 0.03;
        return {
          label: "Livraison d'armement",
          text: "+3% efficacité infanterie"
        };
      }
    },
    {
      id: "maintenance_window",
      run: () => {
        game.upgradeEffects.globalMult += 0.04;
        return {
          label: "Maintenance réussie",
          text: "+4% production globale"
        };
      }
    },
    {
      id: "forward_outpost",
      run: () => {
        const gain = Math.max(120, Math.floor(cps * 9));
        game.credits += gain;
        game.totalCredits += gain;
        return {
          label: "Avant-poste avancé",
          text: `+${gain} crédits de rendement`
        };
      }
    },
    {
      id: "material_recovery",
      run: () => {
        const owned = getOwnedUnits(game);
        if (!owned.length) {
          return {
            label: "Récupération de matériel",
            text: "aucun renfort applicable"
          };
        }
        const picked = owned[Math.floor(Math.random() * owned.length)];
        game.units[picked.id] += 1;
        return {
          label: "Récupération de matériel ennemi",
          text: `+1 ${picked.name}`
        };
      }
    },
    {
      id: "supply_break",
      run: () => {
        const lossFactor = Math.max(0.03, 0.1 - resist);
        const loss = Math.floor(game.credits * lossFactor);
        game.credits = Math.max(0, game.credits - loss);
        return {
          label: "Rupture d'approvisionnement",
          text: `-${loss} crédits`
        };
      }
    },
    {
      id: "sabotage",
      run: () => {
        const owned = getOwnedUnits(game);
        if (!owned.length) {
          return {
            label: "Sabotage détecté",
            text: "aucune perte confirmée"
          };
        }
        const picked = owned[Math.floor(Math.random() * owned.length)];
        game.units[picked.id] = Math.max(0, game.units[picked.id] - 1);
        return {
          label: "Sabotage logistique",
          text: `1 ${picked.name} perdu`
        };
      }
    },
    {
      id: "production_delay",
      run: () => {
        game.upgradeEffects.globalFlat = Math.max(0, game.upgradeEffects.globalFlat - 40);
        return {
          label: "Retard d'assemblage",
          text: "-40 crédits / sec plats"
        };
      }
    },
    {
      id: "convoy_attack",
      run: () => {
        const loss = Math.max(100, Math.floor(cps * 4));
        game.credits = Math.max(0, game.credits - loss);
        return {
          label: "Attaque sur convoi",
          text: `-${loss} crédits`
        };
      }
    },
    {
      id: "industrial_relocation",
      run: () => {
        game.upgradeEffects.globalMult += 0.02;
        game.credits += 200;
        game.totalCredits += 200;
        return {
          label: "Relocalisation industrielle",
          text: "+2% production globale et +200 crédits"
        };
      }
    }
  ];

  const pickedEvent = events[Math.floor(Math.random() * events.length)];
  return pickedEvent.run();
}