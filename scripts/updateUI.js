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
    currentLocation
  } = state;

  if (currentHealth <= 0) {
    document.body.classList.add("died");
  } else {
    document.body.classList.remove("died");
  }

  $("player-stat span#levelText").innerText = currentLevel;
  $("player-stat span#xpText").innerText = currentXP;
  $("player-stat span#healthText").innerText = currentHealth;
  $("player-stat span#goldText").innerText = currentGold;

  $$("inventory-buttons button")[currentWeaponIndex]?.classList.add(
    "visible"
  );

  if (monsters[currentMonsterIndex]) {
    $("span#monsterName").innerText = monsters[currentMonsterIndex].name;
    $("span#monsterHealth").innerText =
      currentMonsterHealth;
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
      // if (state.currentHealth <= state.currentHealth / 2) {
      //   $("hurt-screen").style.opacity = "0.2";
    
      // } else if (state.currentHealth < state.currentHealth / 3) {
      //   $("hurt-screen").style.opacity = "0.8";
      // }
    });

    $$(".buttonStore,.buttonCave").forEach((button) => {
      button.disabled = true;
    });

  }

}
