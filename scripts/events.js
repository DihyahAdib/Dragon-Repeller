import {
  playerGuess,
  buyHealth,
  justBack,
  goStore,
  goCave,
  buyWeapon,
  fightMonster,
  $,
  $$
} from "./functions.js";

//amount, and required level.
$("button#button10HP").onclick = () => buyHealth(10, 0);
$("button#button50HP").onclick = () => buyHealth(50, 10);
$("button#button100HP").onclick = () => buyHealth(100, 15);

$("button.buttonBack").onclick = () => justBack();
$("button.buttonStore").onclick = () => goStore();
$("button.buttonCave").onclick = () => goCave();
$("button.buttonRestart").onclick = () => {
  localStorage.removeItem("state");
  window.location.href = "/";
};

//currentWeaponIndex, cost, required Level.
$("button#buttonSword").onclick = () => buyWeapon(1, 30);
$("button#buttonScythe").onclick = () => buyWeapon(2, 50, 5);
$("button#buttonGreatHammer").onclick = () => buyWeapon(3, 150, 10);
$("button#buttonExcalibur").onclick = () => buyWeapon(4, 250, 15);

$("button#buttonGhoul").onclick = () => fightMonster(0);
$("button#buttonBeast").onclick = () => fightMonster(1);
$("button#buttonWereWolf").onclick = () => fightMonster(2);
$("button#buttonDragon").onclick = () => fightMonster(3);

$("button#buttonAttack").onclick = playerGuess;

$$("hp-buttons button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

$$("weapon-buttons button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

$$("inventory-buttons button").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

$("#white-screen-restart-button")?.addEventListener("click", function () {
  localStorage.removeItem("state");
  window.location.href = "/";
});

document.addEventListener("keydown", () => {
  if (state.currentScreen === "preloader") {
    state.set({ currentScreen: "main" });
  }
});

document.addEventListener("click", () => {
  if (state.currentScreen === "preloader") {
    state.set({ currentScreen: "main" });
  }
});
