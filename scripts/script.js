// Inspired by FreeCodeCamp, Developed by Dihyah Adib.

import {
  startingState
} from "./constants.js";
import {
    updateStats
} from './functions.js'


setInterval(() => {
    localStorage.setItem("state", JSON.stringify(state))
}, 1000);
window.state = JSON.parse(localStorage.getItem("state")) || startingState;
updateStats(state);