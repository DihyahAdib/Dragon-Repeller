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

export const elements = {
  //Text & UI elements.
  levelText: document.querySelector("player-stat span#levelText"),
  text: document.querySelector("text"),
  xpText: document.querySelector("player-stat span#xpText"),
  healthText: document.querySelector("player-stat span#healthText"),
  goldText: document.querySelector("player-stat span#goldText"),
  shopUI: document.querySelector("shop-ui"),
  mainGame: document.querySelector("main#mainGame"),
  //tooltip
  tooltip: document.querySelector("abbr.tooltip"),

  //Monster Controls.
  monsterStats: document.querySelector("monster-stats"),
  monsterName: document.querySelector("span#monsterName"),
  monsterHealth: document.querySelector("span#monsterHealth"),
  controlsForMonsters: document.querySelector("controls-for-monsters"),
  buttonAttack: document.querySelector("button#buttonAttack"),

  //Screens and Scenes.
  preloaderScreen: document.querySelector("preloader-screen"),
  whiteScreen: document.querySelector("white-screen"),
  Explain: document.querySelector("p#Explain"),
};

export const buttons = {
  buyHealth: [
    document.querySelector("button#button10HP"),
    document.querySelector("button#button50HP"),
    document.querySelector("button#button100HP"),
  ],
  navigation: [
    document.querySelector("button.buttonBack"),
    document.querySelector("button.buttonStore"),
    document.querySelector("button.buttonCave"),
    document.querySelector("button.buttonRestart"),
  ],
  weaponPurchase: [
    document.querySelector("button#buttonSword"),
    document.querySelector("button#buttonScythe"),
    document.querySelector("button#buttonGreatHammer"),
    document.querySelector("button#buttonExcalibur"),
  ],
  monsterSelection: [
    document.querySelector("button#buttonGhoul"),
    document.querySelector("button#buttonBeast"),
    document.querySelector("button#buttonWereWolf"),
    document.querySelector("button#buttonDragon"),
  ],
  loreSelection: [
    document.querySelector("button#buttonSwordText"),
    document.querySelector("button#buttonScytheText"),
    document.querySelector("button#buttonGreatHammerText"),
    document.querySelector("button#buttonExcaliburText"),
  ],
  whiteScreen: {
    restart: document.querySelector("button#restartButton")
  }
};



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