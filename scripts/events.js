import {
  hideScreens
} from './util.js';

import {
  playerGuess,
  buyHealth,
  justBack,
  goStore,
  goCave,
  buyWeapon,
  fightMonster,
} from "./functions.js";


//amount, and required level.
$("button#button10HP").on("click", () => buyHealth(10, 0));
$("button#button50HP").on("click", () => buyHealth(50, 10));
$("button#button100HP").on("click", () => buyHealth(100, 15));

$("button.buttonBack").on("click", justBack);
$("button.buttonStore").on("click", goStore);
$("button.buttonCave").on("click", goCave);
$("button.buttonRestart").on("click", () => {
  $("button.buttonRestart").addClass("spin");
  localStorage.removeItem("state");
  window.location.href = "/";
});

//currentWeaponIndex, cost, required Level.
$("button#buttonSword").on("click", () => buyWeapon(0, 30))
$("button#buttonScythe").on("click", () => buyWeapon(1, 50, 5))
$("button#buttonGreatHammer").on("click", () => buyWeapon(2, 150, 10))
$("button#buttonExcalibur").on("click", () => buyWeapon(3, 250, 15))

$("button#buttonGhoul").on("click", () => fightMonster(0))
$("button#buttonBeast").on("click", () => fightMonster(1))
$("button#buttonWereWolf").on("click", () => fightMonster(2))
$("button#buttonDragon").on("click", () => fightMonster(3))

$("button#buttonAttack").on("click", playerGuess)

$("hp-buttons button, weapon-buttons button, inventory-buttons button").each(function() {
  $(this).on("mouseover", () => {
    $(this).find("abbr").addClass("show");
  });
  $(this).on("mouseout", () => {
    $(this).find("abbr").removeClass("show");
  });
});

$("#white-screen-restart-button").on("click", function () {
  localStorage.removeItem("state");
  window.location.href = "/";
});

$("white-screen").on("keydown", hideScreens);
$("white-screen").on("click", hideScreens);

$("preloader-screen").on("keydown", hideScreens);
$("preloader-screen").on("click", hideScreens);