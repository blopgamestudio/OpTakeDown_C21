function updateUI(){

  document.getElementById("metal").textContent =
  Math.floor(game.metal);

  document.getElementById("cristal").textContent =
  Math.floor(game.cristal);

  document.getElementById("fuel").textContent =
  Math.floor(game.fuel);

  document.getElementById("credits").textContent =
  Math.floor(game.credits);

  document.getElementById("mineLvl").textContent =
  game.mineLvl;

  document.getElementById("refineryLvl").textContent =
  game.refineryLvl;

  document.getElementById("marketLvl").textContent =
  game.marketLvl;

  document.getElementById("fighters").textContent =
  game.fighters;

  document.getElementById("frigates").textContent =
  game.frigates;

  document.getElementById("power").textContent =
  getPower();

}

function log(text){

  const logBox =
  document.getElementById("log");

  const p =
  document.createElement("p");

  p.textContent =
  "➜ " + text;

  logBox.prepend(p);

}