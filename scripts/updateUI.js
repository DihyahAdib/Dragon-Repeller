import { $, $$ } from "./util.js";

export function updateUI() {
    const {
      level,
      xp,
      health,
      gold,
      currentWeaponIndex,
      currentMonsterIndex,
      currentScreen,
      currentWhiteText,
    } = state;
    if (currentScreen === "preloader") {
      $("preloader-screen").classList.add("visible");
    } else {
      $("preloader-screen").classList.remove("visible");
    }
    if (currentScreen === "whiteScreen") {
      $("white-screen").classList.add("visible");
    } else {
      $("white-screen").classList.remove("visible");
    }
    if (currentMonsterIndex === 3) {
      $("button#white-screen-restart-button").classList.add("visible");
    } else {
      $("button#white-screen-restart-button").classList.remove("visible");
    }
    $("p#Explain").innerText = currentWhiteText;
  
    $("player-stat span#levelText").innerText = level;
    $("player-stat span#xpText").innerText = xp;
    $("player-stat span#healthText").innerText = health;
    $("player-stat span#goldText").innerText = gold;
  
    $$("inventory-buttons button")[currentWeaponIndex - 1]?.classList.add("visible");
  }