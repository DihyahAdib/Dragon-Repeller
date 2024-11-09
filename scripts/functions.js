import { weapons, monsters, startingState } from "./constants.js";

export async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function textEffect({
  waitBefore = 0,
  clearAfterMilliseconds = 0,
  isLoadingText = false,
  text,
}) {
  if (typeof text === "undefined")
    throw new Error("Error: You did not pass any text to textEffect");

  await wait(waitBefore);

  if (isLoadingText) {
    await displayLoadingText(text);
  } else {
    $("text").innerText = text;
  }

  await wait(clearAfterMilliseconds);

  $("text").innerText = "";
}

export async function delayUpdate(element, message, delay) {
  await wait(delay);
  element.innerText = message;
}

export async function displayLoadingText(text) {
  for (let i = 0; i < 5; i++) {
    await delayUpdate($("text"), text + ".".repeat(i), 100);
  }
}

export const $ = (selector) => {
  return document.querySelector(selector);
};

export const $$ = (selector) => {
  return document.querySelectorAll(selector);
};

export function updateUi() {
  const {
    level,
    xp,
    health,
    gold,
    currentWeaponIndex,
    currentMonsterIndex,
    currentScreen,
    currentWhiteText,
  } = state;
  if (currentScreen === "preloader") {
    $("preloader-screen").classList.add("visible");
  } else {
    $("preloader-screen").classList.remove("visible");
  }
  if (currentScreen === "whiteScreen") {
    $("white-screen").classList.add("visible");
  } else {
    $("white-screen").classList.remove("visible");
  }
  if (currentMonsterIndex === 3) {
    $("button#white-screen-restart-button").classList.add("visible");
  } else {
    $("button#white-screen-restart-button").classList.remove("visible");
  }
  $("p#Explain").innerText = currentWhiteText;

  $("player-stat span#levelText").innerText = level;
  $("player-stat span#xpText").innerText = xp;
  $("player-stat span#healthText").innerText = health;
  $("player-stat span#goldText").innerText = gold;

  $$("inventory-buttons button")[currentWeaponIndex - 1]?.classList.add("visible");
}

export function levelUpIfRequired() {
  if (state.xp >= 100) {
    state.set({ xp: state.xp - 100, level: state.level + 1 });
  }
}

export async function buyHealth(amount, requiredLevel) {
  if (state.gold >= amount && state.level >= requiredLevel) {
    state.set({ gold: state.gold - amount, health: state.health + amount });
    await textEffect({
      text: `Health purchased, ${state.gold} gold left`,
      clearAfterMilliseconds: 1500,
    });
  } else {
    await textEffect({
      text: `Not enough gold or levels!`,
      clearAfterMilliseconds: 1500,
    });
  }
}

export async function buyWeapon(index, cost, requiredLevel = 0) {
  if (state.gold >= cost && state.level >= requiredLevel) {
    if (!state.inventory.includes(weapons[index].name)) {
      state.set({
        gold: state.gold - cost,
        currentWeaponIndex: (state.currentWeaponIndex = index),
        inventory: [...state.inventory, weapons[index].name],
      });
      await textEffect({
        text: `Equipped: ${weapons[index].name}`,
        clearAfterMilliseconds: 1000,
      });
    } else {
      await textEffect({
        text: `You already own the ${weapons[index].name}!`,
        clearAfterMilliseconds: 1000,
      });
    }
  } else {
    await textEffect({
      text: `Not enough gold or levels!`,
      clearAfterMilliseconds: 1000,
    });
  }
}

export async function justBack() {
  await textEffect({
    text: "Going Back To Main",
    isLoadingText: true,
    clearAfterMilliseconds: 100,
  });
  $("controls-for-monsters").classList.remove("visible");
  $("shop-ui").classList.remove("visible");
  $("main#mainGame").style.transform = "translateX(25%)";
  $$("controls button").forEach((button) => {
    button.disabled = false;
  });
}

export async function goStore() {
  await textEffect({
    text: "Going To Store",
    isLoadingText: true,
    clearAfterMilliseconds: 100,
  });
  toggleStoreVisibility();
  $("controls-for-monsters").classList.remove("visible");
  $("monster-stats").classList.remove("visible");
}

export async function goCave() {
  await textEffect({
    text: "Going to Cave",
    isLoadingText: true,
    clearAfterMilliseconds: 100,
  });
  $("controls-for-monsters").classList.add("visible");
}

export async function toggleStoreVisibility() {
  if ($("shop-ui").classList.contains("visible")) {
    $("main#mainGame").style.transform = "translateX(25%)";
    $("shop-ui").classList.remove("visible");
  } else {
    $("main#mainGame").style.transform = "translateX(0)";
    $("shop-ui").classList.add("visible");
  }
}

export async function fightMonster(index) {
  state.set({ currentMonsterIndex: index });
  const monster = monsters[index];

  const { requiredWeaponIndex, requiredLevel } = monster;

  if (state.currentWeaponIndex < requiredWeaponIndex) {
    await textEffect({
      text: `Your weapon is too weak to fight the ${monster.name}! You need ${weapons[requiredWeaponIndex].name}.`,
      clearAfterMilliseconds: 2500,
    });
    return;
  }

  if (state.level < requiredLevel) {
    await textEffect({
      text: `You need to be at least level ${requiredLevel} to fight the ${monster.name}.`,
      clearAfterMilliseconds: 2500,
    });
    return;
  }

  $$("buttons-for-monsters button").forEach((button, i) => {
    if (i !== index) {
      button.disabled = true;
      $$("controls button").forEach((button) => {
        button.disabled = true;
      });
    }
  });

  $("main#mainGame").style.transform = "translateX(25%)";
  $("shop-ui").classList.remove("visible");

  $("button#buttonAttack").classList.add("visible");

  await textEffect({
    text: `You approach the ${monster.name}...`,
    clearAfterMilliseconds: 800,
  });

  $("monster-stats").classList.add("visible");
  $("span#monsterName").innerText = monster.name;
  $("span#monsterHealth").innerText = monster.health;
}

export async function playerGuess() {
  const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1;
  const playerRollNum = parseInt(
    prompt("Guess the correct number to Attack, 1 - 3: ")
  );

  if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
    await textEffect({
      text: "Please enter a valid number between 1 and 3.",
      clearAfterMilliseconds: 1500,
    });
    return;
  }

  currentMonsterStats();
  if (playerRollNum === randomizedRollNumOutCome) {
    playerHitMonster();
    await textEffect({
      text: "You hit the monster!",
      clearAfterMilliseconds: 1500,
    });
  }
  if (
    playerRollNum !== randomizedRollNumOutCome &&
    playerRollNum === randomizedRollNumOutCome + 1
  ) {
    state.set({ xp: state.xp + 10 });
    levelUpIfRequired();
    await textEffect({
      text: "You over swung and missed the monster! try again...",
      clearAfterMilliseconds: 1500,
    });
  }
  if (
    playerRollNum !== randomizedRollNumOutCome &&
    playerRollNum === randomizedRollNumOutCome - 1
  ) {
    state.set({ xp: state.xp + 10 });
    levelUpIfRequired();
    await textEffect({
      text: "You narrowly dodged the monster! try again...",
      clearAfterMilliseconds: 1500,
    });
  }
  if (
    (playerRollNum !== randomizedRollNumOutCome &&
      playerRollNum === randomizedRollNumOutCome + 2) ||
    playerRollNum === randomizedRollNumOutCome - 2
  ) {
    monsterHitPlayer();

    await textEffect({
      text: "You completely missed the monster and it has attacked you!",
      clearAfterMilliseconds: 1500,
    });
  }
  console.log("player number: ", playerRollNum);
  console.log("random number: ", randomizedRollNumOutCome);
  currentMonsterStats();
}

export function playerHitMonster() {
  const currentMonster = monsters[state.currentMonsterIndex];
  const currentWeapon = weapons[state.currentWeaponIndex];
  const monsterWorth = currentMonster.worth;

  let reward = 2 * monsterWorth;
  state.set({ xp: state.xp + 90 });

  levelUpIfRequired();

  state.set({ gold: state.gold + reward });
  currentMonster.health -= currentWeapon.strength;
  $("span#monsterHealth").innerText = currentMonster.health;

  if (currentMonster.health <= 0) {
    state.set({
      currentScreen: "whiteScreen",
      currentWhiteText: `You defeated the ${currentMonster.name}!`,
    });

    $("button#buttonAttack").classList.remove("visible");
    $("monster-stats").classList.remove("visible");

    setTimeout(() => {
      if (state.currentMonsterIndex !== 3) {
        $("button#buttonAttack").classList.add("visible");

        resetMonsterHealth(state.currentMonsterIndex);

        $$("buttons-for-monsters button").forEach((button) => {
          button.disabled = false;
        });

        $$("controls button").forEach((button) => {
          button.disabled = false;
        });

        $("controls-for-monsters").classList.add("visible");
        $("shop-ui").classList.remove("visible");
        state.set({ currentScreen: "main" });
      }
    }, 4000);
  }
  if (currentMonster.name === "Dragon" && currentMonster.health <= 0) {
    state.set({
      currentScreen: "whiteScreen",
      currentWhiteText: `You defeated the ${currentMonster.name}! \n Press reset to play again`,
    });
  }
}

export async function monsterHitPlayer() {
  const currentMonster = monsters[state.currentMonsterIndex];
  const monsterStrength = currentMonster.strength;

  state.set({ health: state.health - monsterStrength });

  if (state.health <= 0) {
    state.set({
      currentScreen: "loser",
      health: 0,
      currentWhiteText: `${currentMonster.name} has bested you...`,
    });

    $("button#buttonAttack").classList.remove("visible");
    $("monster-stats").classList.remove("visible");

    $$("controls button").forEach((button) => {
      button.disabled = false;
    });
    state.set(startingState);
  }
}

export function resetMonsterHealth(monsterIndex) {
  const initialHealth = {
    0: 50, // Ghoul
    1: 100, // Beast
    2: 200, // WereWolf
    3: 500, // Dragon
  };

  monsters[monsterIndex].health = initialHealth[monsterIndex];

  $("span#monsterName").innerText = monsters[monsterIndex].name;
  $("span#monsterHealth").innerText = monsters[monsterIndex].health;
}

export function currentMonsterStats() {
  const currentMonster = monsters[state.currentMonsterIndex];

  if (currentMonster) {
    $("span#monsterName").innerText = currentMonster.name;
    $("span#monsterHealth").innerText = currentMonster.health;
  } else {
    monsterName.innerText = "No monster selected";
    $("span#monsterHealth").innerText = "";
  }
}
