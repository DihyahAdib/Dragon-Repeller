// Inspired by FreeCodeCamp, Developed by Dihyah Adib.

import {
  startingState
} from "./constants.js";
import {
    updateUi, 
} from './functions.js'

window.state = JSON.parse(localStorage.getItem("state")) || startingState;
updateUi();

state.save = function() {
  localStorage.setItem("state", JSON.stringify({
    level: this.level,
    xp: this.xp,
    health: this.health,
    gold: this.gold,
    currentWeaponIndex: this.currentWeaponIndex,
    currentMonsterIndex: this.currentMonsterIndex,
    currentMonsterDeath: this.currentMonsterDeath,
    inventory: this.inventory,
    
  }));
};

state.set = function(changedValues) {
  const changedKeys = Object.keys(changedValues)
  for (let i = 0; i < changedKeys.length; i++) {
    const key = changedKeys[i];
    this[key] = changedValues[key];
  }
  this.save();
  updateUi();
};