import { monsters } from "./constants.js";
import { $, $$, getLastIndex } from "./util.js";

export function updateUI() { 
  const {
    currentLevel,
    currentXP,
    currentHealth,
    currentGold,
    currentWeaponIndex,
    currentMonsterIndex,
    currentMonsterHealth,
    currentScreen,
    currentWhiteText,
    currentLocation
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

  if (currentScreen === "hurtScreen") {
    $("hurt-screen").classList.add("visible");
  } else {
    $("hurt-screen").classList.remove("visible");
  }
  
  if (currentHealth <= 0 || currentMonsterHealth[getLastIndex(monsters)] <= 0) {
    $("button#white-screen-restart-button").classList.add("visible");
  } else {
    $("button#white-screen-restart-button").classList.remove("visible");
  }

  $("p#Explain").innerText = currentWhiteText;

  $("player-stat span#levelText").innerText = currentLevel;
  $("player-stat span#xpText").innerText = currentXP;
  $("player-stat span#healthText").innerText = currentHealth;
  $("player-stat span#goldText").innerText = currentGold;

  $$("inventory-buttons button")[currentWeaponIndex - 1]?.classList.add(
    "visible"
  );

  if (monsters[currentMonsterIndex]) {
    $("span#monsterName").innerText = monsters[currentMonsterIndex].name;
    $("span#monsterHealth").innerText =
      currentMonsterHealth[currentMonsterIndex];
  } else {
    $("span#monsterName").innerText = "No monster selected";
    $("span#monsterHealth").innerText = "";
  }
  
  if (currentLocation === "main") {
    $("main#mainGame").style.transform = "translateX(25%)";
    $("shop-ui").classList.remove("visible");
    $("controls-for-monsters").classList.remove("visible");
    $("button.buttonBack").innerText = "Back";
    $$("controls button").forEach((button) => {
      button.disabled = false;
    });
    $("button.buttonBack").disabled = true;
  } else if (currentLocation === "store") {
    $("controls-for-monsters").classList.remove("visible");
    $("monster-stats").classList.remove("visible");
    $("main#mainGame").style.transform = "translateX(0)";
    $("button.buttonBack").disabled = false;
    $("button.buttonBack").innerText = "Leave Store";
    $("shop-ui").classList.add("visible");

  } else if (currentLocation === "cave") {
    $("main#mainGame").style.transform = "translateX(25%)";
    $("shop-ui").classList.remove("visible");
    $("button.buttonBack").innerText = "Leave Cave";
    $("button.buttonBack").disabled = false;
    $("controls-for-monsters").classList.add("visible");
  }

  if (currentMonsterIndex === null) {
    $("button#buttonAttack").classList.remove("visible");
    $("monster-stats").classList.remove("visible");
    $$("buttons-for-monsters button").forEach((button) => {
      button.disabled = false;
    });
  } else {
    $("button#buttonAttack").classList.add("visible");
    $("monster-stats").classList.add("visible");
    $$("buttons-for-monsters button").forEach((button , i) => {
      if (i !== currentMonsterIndex){
        button.disabled = true;
      }
    });

    $$(".buttonStore,.buttonCave").forEach((button) => {
      button.disabled = true;
    });

  }

}
