function saveGame(){

  localStorage.setItem(
    "echoSave",
    JSON.stringify(game)
  );

  log("Sauvegarde effectuée.");

}

function loadGame(){

  const save =
  localStorage.getItem("echoSave");

  if(save){

    game =
    JSON.parse(save);

    log("Sauvegarde chargée.");

  }else{

    log("Nouvelle colonie créée.");

  }

  updateUI();

}

function resetGame(){

  if(
    !confirm(
      "Supprimer la sauvegarde ?"
    )
  ){
    return;
  }

  localStorage.removeItem(
    "echoSave"
  );

  location.reload();

}

setInterval(saveGame,10000);

loadGame();