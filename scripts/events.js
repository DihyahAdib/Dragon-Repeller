import { stat } from "fs";
import { buttons, elements } from "./constants.js";
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
buttons.buyHealth[0].onclick = () => buyHealth(10, 0);
buttons.buyHealth[1].onclick = () => buyHealth(50, 10);
buttons.buyHealth[2].onclick = () => buyHealth(100, 15);

buttons.navigation[0].onclick = () => justBack();
buttons.navigation[1].onclick = () => goStore();
buttons.navigation[2].onclick = () => goCave();
buttons.navigation[3].onclick = () => {
  debugger
    localStorage.removeItem("state");
    window.location.href = "/";
}

//currentWeaponIndex, cost, required Level.
buttons.weaponPurchase[0].onclick = () => buyWeapon(1, 30);
buttons.weaponPurchase[1].onclick = () => buyWeapon(2, 50, 5);
buttons.weaponPurchase[2].onclick = () => buyWeapon(3, 150, 10);
buttons.weaponPurchase[3].onclick = () => buyWeapon(4, 250, 15);

//currentMonsterIndex.
buttons.monsterSelection[0].onclick = () => fightMonster(0);
buttons.monsterSelection[1].onclick = () => fightMonster(1);
buttons.monsterSelection[2].onclick = () => fightMonster(2);
buttons.monsterSelection[3].onclick = () => fightMonster(3);

elements.buttonAttack.onclick = playerGuess;

buttons.buyHealth.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

buttons.weaponPurchase.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

buttons.loreSelection.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.querySelector("abbr").classList.add("show");
  });
  button.addEventListener("mouseout", () => {
    button.querySelector("abbr").classList.remove("show");
  });
});

document
  .getElementById("restartButton")
  ?.addEventListener("click", function () {
    location.reload(); // Reloads the current page
  });

document.addEventListener("keydown", () => {
  if (state.currentScreen === "preloader") {
    state.set({currentScreen: "main"})
  }
});

document.addEventListener("click", () => {
  if (state.currentScreen === "preloader") {
    state.set({currentScreen: "main"})
  }
});
