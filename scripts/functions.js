import { weapons, monsters, elements, buttons, startingState } from "./constants.js";

export async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function delayUpdate(element, message, delay) {
  await wait(delay);
  element.innerText = message;
}

export async function displayLoadingText(text) {
  for (let i = 0; i < 5; i++) {
    await delayUpdate(elements.text, text + ".".repeat(i), 100);
  }
  await delayUpdate(elements.text, "", 100);
}

export function updateUi() {
  elements.levelText.innerText = state.level;
  elements.xpText.innerText = state.xp;
  elements.healthText.innerText = state.health;
  elements.goldText.innerText = state.gold;
  buttons.loreSelection[state.currentWeaponIndex - 1]?.classList.add(
    "buttonsForWeaponsText-visible"
  );
}

export function levelUpIfRequired() {
  if (state.xp >= 100) {
    state.set({ xp: state.xp - 100, level: state.level + 1 });
  }
}

export async function buyHealth(amount, requiredLevel) {
  if (state.gold >= amount && state.level >= requiredLevel) {
    state.set({ gold: state.gold - amount, health: state.health + amount });
    elements.text.innerText = `Health purchased, ${state.gold} gold left`;
  } else {
    elements.text.innerText = "Not enough gold or levels!";
  }
  await delayUpdate(elements.text, "", 1500);
}

export async function buyWeapon(index, cost, requiredLevel = 0) {
  if (state.gold >= cost && state.level >= requiredLevel) {
    if (!state.inventory.includes(weapons[index].name)) {
      state.set({
        gold: state.gold - cost,
        currentWeaponIndex: state.currentWeaponIndex = index,
        inventory: [...state.inventory, weapons[index].name]
      });
      elements.text.innerText = `Equipped: ${weapons[index].name}`;
    } else {
      elements.text.innerText = `You already own the ${weapons[index].name}!`;
    }
  } else {
    elements.text.innerText = "Not enough gold or levels!";
  }
  await delayUpdate(elements.text, "", 1000);
}

export async function justBack() {
  displayLoadingText("Going Back To Main");
  await delayUpdate(elements.text, "", 500);
  elements.controlsForMonsters.classList.remove("controlsForMonsters-visible");
  elements.shopUI.classList.remove("shopUI-visible");
  buttons.navigation.forEach((button) => {
    button.disabled = false;
  });
}

export async function goStore() {
  displayLoadingText("Going To Store");
  toggleStoreVisibility();
  await delayUpdate(elements.text, "", 500);
  elements.controlsForMonsters.classList.remove("controlsForMonsters-visible");
  elements.monsterStats.classList.remove("monsterStats-visible");
}

export async function goCave() {
  displayLoadingText("Going To Cave");
  await delayUpdate(elements.text, "", 500);
  elements.controlsForMonsters.classList.add("controlsForMonsters-visible");
}

export async function toggleStoreVisibility() {
  if (elements.shopUI.classList.contains("shopUI-visible")) {
    elements.mainGame.style.transform = "translateX(25%)";
    await delayUpdate(elements.text, "", 300);
    elements.shopUI.classList.remove("shopUI-visible");
  } else {
    elements.mainGame.style.transform = "translateX(0)";
    await delayUpdate(elements.text, "", 250);
    elements.shopUI.classList.add("shopUI-visible");
  }
}

export async function fightMonster(index) {
  state.set({currentMonsterIndex: index});
  const monster = monsters[index];

  const { requiredWeaponIndex, requiredLevel } = monster;

  if (state.currentWeaponIndex < requiredWeaponIndex) {
    elements.text.innerText = `Your weapon is too weak to fight the ${monster.name}! You need ${weapons[requiredWeaponIndex].name}.`;
    await delayUpdate(elements.text, "", 2500);
    return;
  }

  if (state.level < requiredLevel) {
    elements.text.innerText = `You need to be at least level ${requiredLevel} to fight the ${monster.name}.`;
    await delayUpdate(elements.text, "", 2500);
    return;
  }

  buttons.monsterSelection.forEach((button, i) => {
    if (i !== index) {
      button.disabled = true;
      buttons.navigation.forEach((button) => {
        button.disabled = true;
      });
    }
  });

  elements.mainGame.style.transform = "translateX(25%)";
  await delayUpdate(elements.text, "", 300);
  elements.shopUI.classList.remove("shopUI-visible");

  elements.buttonAttack.classList.add("buttonAttack-visible");

  elements.text.innerText = `You approach the ${monster.name}...`;
  await delayUpdate(elements.text, " ", 800);

  elements.monsterStats.classList.add("monsterStats-visible");
  elements.monsterName.innerText = monster.name;
  elements.monsterHealth.innerText = monster.health;
}

export async function playerGuess() {
  const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1;
  const playerRollNum = parseInt(
    prompt("Guess the correct number to Attack, 1 - 3: ")
  );

  if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
    await delayUpdate(
      text,
      "Please enter a valid number between 1 and 3.",
      1500
    );
    return;
  }

  currentMonsterStats();
  if (playerRollNum === randomizedRollNumOutCome) {
    playerHitMonster();
    elements.text.innerText = "You hit the monster!";
    await delayUpdate(elements.text, "", 1500);
  }
  if (
    playerRollNum !== randomizedRollNumOutCome &&
    playerRollNum === randomizedRollNumOutCome + 1
  ) {
    state.set({xp: state.xp + 10})
    levelUpIfRequired();
    text.innerText = "You over swung and missed the monster! try again...";
    await delayUpdate(elements.text, "", 1500);
  }
  if (
    playerRollNum !== randomizedRollNumOutCome &&
    playerRollNum === randomizedRollNumOutCome - 1
  ) {
    state.set({xp: state.xp + 10})
    levelUpIfRequired();
    text.innerText = "You narrowly dodged the monster! try again...";
    await delayUpdate(elements.text, "", 1500);
  }
  if (
    (playerRollNum !== randomizedRollNumOutCome &&
      playerRollNum === randomizedRollNumOutCome + 2) ||
    playerRollNum === randomizedRollNumOutCome - 2
  ) {
    monsterHitPlayer();
    text.innerText =
      "You completely missed the monster and it has attacked you!";
    await delayUpdate(elements.text, "", 1500);
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
  state.set({xp: state.xp + 90})
  levelUpIfRequired();
  state.set({gold: state.gold + reward})
  currentMonster.health -= currentWeapon.strength;
  elements.monsterHealth.innerText = currentMonster.health;

  if (currentMonster.health <= 0) {
    elements.beatBossScreen.classList.add("visible");
    elements.bossExplain.innerText = `You defeated the ${currentMonster.name}!`;
    elements.buttonAttack.classList.remove("buttonAttack-visible");
    elements.monsterStats.classList.remove("monsterStats-visible");

    currentMonsterDeath++;
    console.log(`current total of monster deaths ${currentMonsterDeath}`);
    setTimeout(() => {
      elements.beatBossScreen.classList.remove("visible");
      elements.buttonAttack.classList.add("buttonAttack-visible");
      resetMonsterHealth(state.currentMonsterIndex);
      buttons.monsterSelection.forEach((button) => {
        button.disabled = false;
      });
      buttons.navigation.forEach((button) => {
        button.disabled = false;
      });
      elements.controlsForMonsters.classList.add("controlsForMonsters-visible");
      elements.shopUI.classList.remove("shopUI-visible");
    }, 4000);
  }
  if (
    currentMonster.name === "Dragon" &&
    currentMonster.health <= 0 &&
    currentMonsterDeath > 0
  ) {
    elements.beatBossScreen.classList.add("visible");
    elements.bossExplain.innerText = `You defeated the ${currentMonster.name}! \n Press reset to play again`;
  }
}

export async function monsterHitPlayer() {
  const currentMonster = monsters[state.currentMonsterIndex];
  const monsterStrength = currentMonster.strength;

  health -= monsterStrength;

  if (health <= 0) {
    health = 0;
    elements.loserScreen.classList.add("visible");
    elements.loserExplain.innerText = `${currentMonster.name} has bested you...`;
    elements.buttonAttack.classList.remove("buttonAttack-visible");
    elements.monsterStats.classList.remove("monsterStats-visible");

    buttons.navigation.forEach((button) => {
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

  elements.monsterName.innerText = monsters[monsterIndex].name;
  elements.monsterHealth.innerText = monsters[monsterIndex].health;
  console.log(
    "Reset monster health for:",
    monsters[monsterIndex].name,
    "to",
    monsters[monsterIndex].health
  );
}

export function currentMonsterStats() {
  const currentMonster = monsters[state.currentMonsterIndex];

  if (currentMonster) {
    elements.monsterName.innerText = currentMonster.name;
    elements.monsterHealth.innerText = currentMonster.health;
  } else {
    monsterName.innerText = "No monster selected";
    elements.monsterHealth.innerText = "";
  }
}
