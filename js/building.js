function upgradeMine(){

  const cost =
  game.mineLvl * 80;

  if(game.credits >= cost){
    game.credits -= cost;
    game.mineLvl++;
    log("Mine améliorée.");
  }else{
    log("Pas assez de crédits.");
  }
  updateUI();
}
function upgradeRefinery(){
  const cost =
  game.refineryLvl * 70;
  if(game.metal >= cost){
    game.metal -= cost;
    game.refineryLvl++;

    log("Raffinerie améliorée.");

  }else{

    log("Pas assez de métal.");
  }
  updateUI();
}
function upgradeMarket(){

  const cost =
  game.marketLvl * 60;
  if(game.cristal >= cost){
    game.cristal -= cost;
    game.marketLvl++;

    log("Centre commercial amélioré.");

  }else{

    log("Pas assez de cristal.");

  }

  updateUI();

}