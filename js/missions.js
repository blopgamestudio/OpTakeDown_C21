function missionAsteroids(){

  if(game.fuel < 20){

    log("Pas assez de carburant.");
    return;

  }

  game.fuel -= 20;

  const gain =
  Math.floor(
    20 + Math.random() * 80
  );

  game.cristal += gain;

  log(
    "Astéroïdes scannés : +" +
    gain +
    " cristal."
  );

  updateUI();

}

function missionPirates(){

  if(getPower() < 10){

    log("Flotte trop faible.");
    return;

  }

  const chance =
  Math.random();

  if(chance > 0.4){

    const gain =
    Math.floor(
      80 + Math.random() * 120
    );

    game.credits += gain;

    log(
      "Pirates vaincus : +" +
      gain +
      " crédits."
    );

  }else{

    if(game.fighters > 0){

      game.fighters--;

      log(
        "Défaite. Un chasseur perdu."
      );

    }else{

      log("Défaite.");

    }

  }

  updateUI();

}