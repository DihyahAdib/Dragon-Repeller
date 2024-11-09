import {
  weapons,
  monsters,
  INITIAL_GOUL_HEALTH,
  INITIAL_BEAST_HEALTH,
  INITIAL_WEREWOLF_HEALTH,
  INITIAL_DRAGON_HEALTH,
  OVER_SWUNG_MONSTER_XP_REWARD,
  NARROW_DODGE_MONSTER_XP_REWARD,
  PLAYER_HIT_MONSTER_XP_REWARD
} from "./constants.js";
import { textEffect, $, $$, getLastIndex, replaceAtIndex, isWithinTwo, wait } from "./util.js";


export async function buyHealth(amount, requiredLevel) {
  if (state.currentGold >= amount && state.currentLevel >= requiredLevel) {
    state.set({
      currentGold: state.currentGold - amount,
      currentHealth: state.currentHealth + amount,
    });
    await textEffect({
      text: `Health purchased, ${state.currentGold} gold left`,
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
  if (state.currentGold >= cost && state.currentLevel >= requiredLevel) {
    if (!state.currentInventoryArray.includes(weapons[index].name)) {
      state.set({
        currentGold: state.currentGold - cost,
        currentWeaponIndex: (state.currentWeaponIndex = index),
        currentInventoryArray: [
          ...state.currentInventoryArray,
          weapons[index].name,
        ],
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
  state.set({ currentLocation: "main" , currentMonsterIndex: null });
}

export async function goStore() {
  await textEffect({
    text: "Going To Store",
    isLoadingText: true,
    clearAfterMilliseconds: 100,
  });
  state.set({ currentLocation: "store" });
}

export async function goCave() {
  await textEffect({
    text: "Going to Cave",
    isLoadingText: true,
    clearAfterMilliseconds: 100,
  });
  state.set({ currentLocation: "cave" });
}

export async function fightMonster(currentMonsterIndex) {
  const {
    requiredWeaponIndex,
    requiredLevel, 
    name: monsterName,
  } = monsters[currentMonsterIndex];
  const { name: weaponName } = weapons[requiredWeaponIndex];

  if (state.currentWeaponIndex === null || state.currentWeaponIndex < requiredWeaponIndex) {
    await textEffect({
      text: `Your weapon is too weak to fight the ${monsterName}! You need ${weaponName}.`,
      clearAfterMilliseconds: 2500,
    });
    return;
  }

  if (state.currentLevel < requiredLevel) {
    await textEffect({
      text: `You need to be at least level ${requiredLevel} to fight the ${monsterName}.`,
      clearAfterMilliseconds: 2500,
    });
    return;
  }

  state.set({ currentMonsterIndex });


  await textEffect({
    text: `You approach the ${monsterName}...`,
    clearAfterMilliseconds: 800,
  });

}

export async function playerGuess() {
  const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1;
  const playerRollNum = parseInt(
    prompt("Guess the correct number to Attack, 1 - 3: ")
  );
  console.log("player number: ", playerRollNum);
  console.log("random number: ", randomizedRollNumOutCome);

  if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
    await textEffect({
      text: "Please enter a valid number between 1 and 3.",
      clearAfterMilliseconds: 1500,
    });
    return;
  }

  if (playerRollNum === randomizedRollNumOutCome) {
    await playerHitMonster();
  }
  else if (playerRollNum === randomizedRollNumOutCome + 1) {
    await overSwungMonster();
  }
  else if (playerRollNum === randomizedRollNumOutCome - 1) {
    await narrowlyDodgedMonster();
  }
  else if (isWithinTwo(playerRollNum, randomizedRollNumOutCome)) {
    await monsterHitPlayer();
  }
}

export async function narrowlyDodgedMonster() {
  state.set({ currentXP: state.currentXP + NARROW_DODGE_MONSTER_XP_REWARD });
  await textEffect({
    text: "You narrowly dodged the monster! try again...",
    clearAfterMilliseconds: 1500,
  });
}

export async function overSwungMonster() {
  state.set({ currentXP: state.currentXP + OVER_SWUNG_MONSTER_XP_REWARD });
  await textEffect({
    text: "You over swung and missed the monster! try again...",
    clearAfterMilliseconds: 1500,
  });
}

export async function playerHitMonster() {
  const { strength: weaponStrength } = weapons[state.currentWeaponIndex];
  const { worth: monsterWorth, name: monsterName } =
    monsters[state.currentMonsterIndex];

  const currentMonsterHealth =
    state.currentMonsterHealth[state.currentMonsterIndex];

  state.set({ currentXP: state.currentXP + PLAYER_HIT_MONSTER_XP_REWARD });


  const newMonsterHealth = currentMonsterHealth - weaponStrength;
  const reward = 2 * monsterWorth;
  state.set({
    currentGold: state.currentGold + reward,
    currentMonsterHealth: replaceAtIndex(
      state.currentMonsterHealth,
      state.currentMonsterIndex,
      newMonsterHealth
    ),
  });

  if (newMonsterHealth <= 0) {
    state.set({
      currentScreen: "whiteScreen",
      currentWhiteText: `You defeated the ${monsterName}!`
    });

    if (state.currentMonsterIndex === getLastIndex(monsters)) { //checkin for dragon
      state.set({
        currentScreen: "whiteScreen",
        currentWhiteText: `You defeated the ${monsterName}! \n Press reset to play again`,
      });
    } else {
      await wait(4000);
      state.set({
        currentMonsterIndex: null,
        currentMonsterHealth: replaceAtIndex(
          state.currentMonsterHealth,
          state.currentMonsterIndex,
          [
            INITIAL_GOUL_HEALTH,
            INITIAL_BEAST_HEALTH,
            INITIAL_WEREWOLF_HEALTH,
            INITIAL_DRAGON_HEALTH,
          ][state.currentMonsterIndex]
        ),
      });
      state.set({ currentScreen: "game", currentLocation: "main" });
    } 
  } else {
    await textEffect({
      text: "You hit the monster!",
      clearAfterMilliseconds: 1500,
    });
  }
}

export async function monsterHitPlayer() {

  const currentMonster = monsters[state.currentMonsterIndex];
  const monsterStrength = currentMonster.strength;

  state.set({currentScreen: "hurtScreen", currentHealth: state.currentHealth - monsterStrength });
  
  setTimeout(() => {
    state.set({currentScreen: "game"});
  }, 1000);

  await flashDeathPulse();
  
  if (state.currentHealth <= 0) {
    state.set({
      currentScreen: "whiteScreen",
      currentHealth: 0,
      currentWhiteText: `${currentMonster.name} has bested you...`,
    });
  } else {
    await textEffect({
      text: "You completely missed the monster and it has attacked you!",
      clearAfterMilliseconds: 1500,
    });
  }
}

async function flashDeathPulse() {
  state.set({currentScreen: "hurtScreen"})
  await wait(1000);
  state.set({currentScreen: "main"});
}