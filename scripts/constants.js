export const xpMultiplier = 1.5;
export const monsterMultipier = 2.5;

export const NARROW_DODGE_MONSTER_XP_REWARD = 10;
export const OVER_SWUNG_MONSTER_XP_REWARD = 10;
export const PLAYER_HIT_MONSTER_XP_REWARD = 90;

export const weapons = [
  { name: "Sword", strength: 25 },
  { name: "Scythe", strength: 50 },
  { name: "GreatHammer", strength: 75 },
  { name: "Excalibur", strength: 500 },
];

export const monsters = [
  {
    name: "Ghoul",
    strength: 25,
    worth: 10,
    requiredWeaponIndex: 0,
    requiredLevel: 0,
    startingHealth: 50
  },
  {
    name: "Beast",
    strength: 50,
    worth: 15,
    requiredWeaponIndex: 1,
    requiredLevel: 5,
    startingHealth: 100
  },
  {
    name: "WereWolf",
    strength: 100,
    worth: 20,
    requiredWeaponIndex: 2,
    requiredLevel: 10,
    startingHealth: 200
  },
  {
    name: "Dragon",
    strength: 200,
    worth: 25,
    requiredWeaponIndex: 3,
    requiredLevel: 15,
    startingHealth: 500
  },
];

export const startingState = {
  currentLevel: 0,
  currentXP: 0,
  currentHealth: 100,
  currentGold: 50,
  currentScreen: "preloader",
  currentWeaponIndex: null,
  currentMonsterIndex: null,
  currentInventoryArray: [],
  currentMonsterHealth: null,
  currentLocation: "main"
};
