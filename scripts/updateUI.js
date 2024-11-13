import { monsters } from "./constants.js";

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

  $("player-stat span#levelText").text(currentLevel);
  $("player-stat span#xpText").text(currentXP);
  $("player-stat span#healthText").text(currentHealth);
  $("player-stat span#goldText").text(currentGold);

  $(".inventory-buttons button").eq(currentWeaponIndex).addClass("visible");


  if (monsters[currentMonsterIndex]) {
    $("span#monsterName").text(monsters[currentMonsterIndex].name)
    $("span#monsterHealth").text(currentMonsterHealth)
  } else {
    $("span#monsterName").text("No monster selected");
    $("span#monsterHealth").empty();
  }

  if (currentLocation === "main") {
    $(document.body).addClass("location-main").removeClass("location-store location-cave");
    $("button.buttonBack").text("Back").prop("disabled", true);;
    $("controls button").prop("disabled", false);
  } else if (currentLocation === "store") {
    $(document.body).addClass("location-store").removeClass("location-main", "location-cave");;
    $("button.buttonBack").prop("disabled", false).text("Leave Store");
  } else if (currentLocation === "cave"){
    $(document.body).addClass("location-cave").removeClass("location-main location-store");
    $("button.buttonBack").text("Leave Cave").prop("disabled", false);
  }

  if (currentMonsterIndex === null) {
    $(document.body).removeClass("monster-fight");
    $("buttons-for-monsters button").prop("disabled", false);
  } else {
    $(document.body).addClass("monster-fight");

    $("buttons-for-monsters button").each(function(i){
      if (i !== currentMonsterIndex){
        $(this).prop("disabled",true);
      }
      // if (state.currentHealth <= state.currentHealth / 2) {
      //   $("hurt-screen").style.opacity = "0.2";
    
      // } else if (state.currentHealth < state.currentHealth / 3) {
      //   $("hurt-screen").style.opacity = "0.8";
      // }
    });

    $(".buttonStore,.buttonCave").prop("disabled", true);

  }

}
