function getPower(){

  return (
    game.fighters * 5 +
    game.frigates * 20
  );

}

function buyFighter(){

  if(
    game.metal >= 35 &&
    game.credits >= 25
  ){

    game.metal -= 35;
    game.credits -= 25;

    game.fighters++;

    log("Chasseur construit.");

  }else{

    log("Ressources insuffisantes.");

  }

  updateUI();

}

function buyFrigate(){

  if(
    game.metal >= 120 &&
    game.cristal >= 50 &&
    game.credits >= 90
  ){

    game.metal -= 120;
    game.cristal -= 50;
    game.credits -= 90;

    game.frigates++;

    log("Frégate construite.");

  }else{

    log("Ressources insuffisantes.");

  }

  updateUI();

}