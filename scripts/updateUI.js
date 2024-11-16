import { monsters } from "./constants.js";

function getBackButtonText(currentLocation) {
  switch(currentLocation){
    case "main":
      return "Back";
    case "store":
      return "Leave Store";
    case "cave":
      return "Leave Cave";
    default:
      throw new Error("Unkonwn location " + currentLocation);
  }
}

function getMonsterName(currentMonsterIndex) {
  return monsters[currentMonsterIndex]
  ? monsters[currentMonsterIndex].name
  : "No monster selected";
}

export function updateUI() {
  const {
    currentLevel,
    currentXP,
    currentHealth,
    currentGold,
    currentWeaponIndex,
    currentMonsterIndex,
    currentMonsterHealth,
    currentLocation,
  } = state;

  $(document.body)
    .toggleClass("died", currentHealth <= 0)
    .toggleClass("location-main", currentLocation === "main")
    .toggleClass("location-store", currentLocation === "store")
    .toggleClass("location-cave", currentLocation === "cave")
    .toggleClass("monster-fight", currentMonsterIndex !== null);

  $("player-stat span#levelText").text(currentLevel);
  $("player-stat span#xpText").text(currentXP);
  $("player-stat span#healthText").text(currentHealth);
  $("player-stat span#goldText").text(currentGold);

  $(".inventory-buttons button").eq(currentWeaponIndex).addClass("visible");

  $("span#monsterName").text(getMonsterName(currentMonsterIndex));

  $("span#monsterHealth").text(
    monsters[currentMonsterIndex] ? currentMonsterHealth : ""
  );

  $("button.buttonBack")
    .text(getBackButtonText(currentLocation))
    .prop("disabled", currentLocation === "main");
  $("controls button").prop("disabled", currentLocation !== "main");

  $("buttons-for-monsters button")
    .prop("disabled", true)
    .eq(currentWeaponIndex)
    .prop("disabled", false);

  $(".buttonStore,.buttonCave").prop("disabled", currentMonsterIndex !== null);
}
