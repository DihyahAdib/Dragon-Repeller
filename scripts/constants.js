export const xpMultiplier = 1.5;
export const monsterMultipier = 2.5;

export const weapons = [
  { name: "None", strength: 0 },
  { name: "Sword", strength: 25 },
  { name: "Scythe", strength: 50 },
  { name: "GreatHammer", strength: 75 },
  { name: "Excalibur", strength: 500 },
];

export const monsters = [
  {
    name: "Ghoul",
    health: 50,
    strength: 25,
    worth: 10,
    requiredWeaponIndex: 1,
    requiredLevel: 0,
  },
  {
    name: "Beast",
    health: 100,
    strength: 50,
    worth: 15,
    requiredWeaponIndex: 2,
    requiredLevel: 5,
  },
  {
    name: "WereWolf",
    health: 200,
    strength: 100,
    worth: 20,
    requiredWeaponIndex: 3,
    requiredLevel: 10,
  },
  {
    name: "Dragon",
    health: 500,
    strength: 200,
    worth: 25,
    requiredWeaponIndex: 4,
    requiredLevel: 15,
  },
];

export const startingState = {
  level: 0,
  xp: 0,
  health: 100,
  gold: 50,
  currentScreen: "preloader",
  currentWeaponIndex: 0,
  currentMonsterIndex: 0,
  inventory: ["None"],
};
