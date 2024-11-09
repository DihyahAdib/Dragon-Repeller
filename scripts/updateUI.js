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
    document.body.classList.add("screen-preloader");
    document.body.classList.remove("screen-white");
  } else if (currentScreen === "whiteScreen") {
    document.body.classList.remove("screen-preloader");
    document.body.classList.add("screen-white");
  } else {
    document.body.classList.remove("screen-preloader", "screen-white");
  }

  if (currentHealth <= 0 || currentMonsterHealth[getLastIndex(monsters)] <= 0) {
    document.body.classList.add("died");
  } else {
    document.body.classList.remove("died");
  }

  $("p#Explain").innerText = currentWhiteText;

  $("player-stat span#levelText").innerText = currentLevel;
  $("player-stat span#xpText").innerText = currentXP;
  $("player-stat span#healthText").innerText = currentHealth;
  $("player-stat span#goldText").innerText = currentGold;

  $$("inventory-buttons button")[currentWeaponIndex].classList.add(
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
    document.body.classList.add("location-main");
    document.body.classList.remove("location-store", "location-cave");
    $("button.buttonBack").innerText = "Back";
    $$("controls button").forEach((button) => {
      button.disabled = false;
    });
    $("button.buttonBack").disabled = true;
  } else if (currentLocation === "store") {
    document.body.classList.add("location-store");
    document.body.classList.remove("location-main", "location-cave");
    $("button.buttonBack").disabled = false;
    $("button.buttonBack").innerText = "Leave Store";
  } else if (currentLocation === "cave"){
    document.body.classList.add("location-cave");
    document.body.classList.remove("location-main", "location-store");
    $("button.buttonBack").innerText = "Leave Cave";
    $("button.buttonBack").disabled = false;
  }

  if (currentMonsterIndex === null) {
    document.body.classList.remove("monster-fight");
    $$("buttons-for-monsters button").forEach((button) => {
      button.disabled = false;
    });
  } else {
    document.body.classList.add("monster-fight");
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
