// Inspired by FreeCodeCamp, Developed by Dihyah Adib.

import { startingState } from "./constants.js";
import { updateUI } from "./updateUI.js";

window.state = JSON.parse(localStorage.getItem("state")) || startingState;
updateUI();

state.save = function () {
  localStorage.setItem(
    "state",
    JSON.stringify({
      currentLevel: this.currentLevel,
      currentXP: this.currentXP,
      currentHealth: this.currentHealth,
      currentGold: this.currentGold,
      currentWeaponIndex: this.currentWeaponIndex,
      currentMonsterIndex: this.currentMonsterIndex,
      currentInventoryArray: this.currentInventoryArray,
      currentMonsterHealth: this.currentMonsterHealth,
      currentLocation: this.currentLocation,
    })
  );
};

state.levelUpIfRequired = function () {
  if (this.currentXP >= 100) {
    this.set({
      currentXP: this.currentXP - 100,
      currentLevel: this.currentLevel + 1,
    });
  }
};

state.set = function (changedValues) {
  const changedKeys = Object.keys(changedValues);
  for (let i = 0; i < changedKeys.length; i++) {
    const key = changedKeys[i];
    this[key] = changedValues[key];
  }

  this.levelUpIfRequired();

  this.save();
  updateUI();
};
