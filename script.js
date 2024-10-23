// Inspired by FreeCodeCamp, Developed by Dihyah Adib.
let instructions = "Use the buttons to navigate, buy weapons and potions to up your game and defeat the dragon!";
let loreSword = "Wait you thought this weapon had importance? hahaha your crazy!";
let loreScythe = "They say the grim reaper his weapon from the sight of the mightiest hero.";
let loreGreatHammer = "They say that they said, only when they say what they said they'd say.";
let loreExcalibur = "Legend has it, only the mightest hero could pull the sword from the stone.";

let score = 0;
let level = 106;
let xp = 0;
let health = 100;
let gold = 550; 
let currentWeaponIndex = 0;
let currentMonsterIndex = 0;

const xpMultiplier = 1.5;
const monsterMultipier = 2.5;

const inventory = ["None"];

const weapons = [
    {name: "None", strength: 0},         //0
    {name: "Sword", strength: 25},       //1
    {name: "Scythe", strength: 50},      //2
    {name: "GreatHammer", strength: 75}, //3
    {name: "Excalibur", strength: 200}   //4
];

const monsters = [
    {name: "Ghoul", health: 50, strength: 25, worth: 10 },
    {name: "Beast", health: 100, strength: 50, worth: 15 },
    {name: "WereWolf", health: 200, strength: 100, worth: 20 },
    {name: "Dragon", health: 500, strength: 200, worth: 25 }
];

const elements = {
    levelText: document.querySelector("#levelText"),
    text: document.querySelector("#text"),
    xpText: document.querySelector("#xpText"),
    healthText: document.querySelector("#healthText"),
    goldText: document.querySelector("#goldText"),
    shopUI: document.querySelector("#shopUI"),
    inventoryUI: document.querySelector("#inventoryUI"),
    monsterStats: document.querySelector("#monsterStats"),
    monsterName: document.querySelector("#monsterName"),
    monsterHealth: document.querySelector("#monsterHealth"),
    controlsForMonsters: document.querySelector("#controlsForMonsters"),
    lore: document.querySelector("#lore"),
    buttonAttack: document.querySelector("#buttonAttack"),
    preloaderScreen: document.querySelector(".preloaderScreen"),
    loserScreen: document.querySelector(".loserScreen"),
    beatBossScreen: document.querySelector(".beatBossScreen"),
    bossExplain: document.querySelector("#bossExplain")
};

const buttons = {
    buyHealth: [
        document.querySelector("#button10HP"),       //0
        document.querySelector("#button50HP"),       //1
        document.querySelector("#button100HP")       //2
    ],
    navigation: [
        document.querySelector("#buttonBack"),       //0
        document.querySelector("#buttonStore"),      //1
        document.querySelector("#buttonCave"),       //2
        document.querySelector("#buttonInventory")   //3
    ],
    weaponPurchase: [
        document.querySelector("#buttonSword"),
        document.querySelector("#buttonScythe"),
        document.querySelector("#buttonGreatHammer"),
        document.querySelector("#buttonExcalibur")
    ],
    monsterSelection: [
        document.querySelector("#buttonGhoul"),
        document.querySelector("#buttonBeast"),
        document.querySelector("#buttonWereWolf"),
        document.querySelector("#buttonDragon"),
    ],
    loreSelection: [
        document.querySelector("#buttonSwordText"),
        document.querySelector("#buttonScytheText"),
        document.querySelector("#buttonGreatHammerText"),
        document.querySelector("#buttonExcaliburText")
    ],
    screenEndings: [
        document.querySelector("#continueButton"),
    ]
};
//amount, and required level.
buttons.buyHealth[0].onclick = () => buyHealth(10, 0); 
buttons.buyHealth[1].onclick = () => buyHealth(50, 10);
buttons.buyHealth[2].onclick = () => buyHealth(100, 15);

buttons.navigation[0].onclick = () => justBack();
buttons.navigation[1].onclick = () => goStore();
buttons.navigation[2].onclick = () => goCave();
buttons.navigation[3].onclick = () => openInventory();

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

//current lore panels.
buttons.loreSelection[0].onclick = () => showLore1();
buttons.loreSelection[1].onclick = () => showLore2();
buttons.loreSelection[2].onclick = () => showLore3();
buttons.loreSelection[3].onclick = () => showLore4();
elements.buttonAttack.onclick = playerGuess;


async function delayUpdate(element, message, delay) {   
    await new Promise(resolve => setTimeout(resolve, delay));
    element.innerText = message;
}

function updateStats() {
    elements.levelText.innerText = level;
    elements.xpText.innerText = xp;
    elements.healthText.innerText = health;
    elements.goldText.innerText = gold;
}

async function updateWeapon(newWeaponIndex) {
    currentWeaponIndex = newWeaponIndex;
    const currentWeapon = weapons[currentWeaponIndex];
    const { name, strength } = currentWeapon; // Destructure the currentWeapon properties
    weaponName = name;
    weaponStrength = strength;
    await delayUpdate(text,`Equipped: ${name} with a strength of: ${strength}`, 500);
    await new Promise(resolve => setTimeout(resolve, 1500));
    text.innerText = "";
}

async function updateMonster(newMonsterIndex) {
    currentMonsterIndex = newMonsterIndex;
    const currentMonster = monsters[currentMonsterIndex];
    console.log("Fighting Monster:", currentMonster);
    const { name, health, strength, worth } = currentMonster; // Destructure the currentMonster properties
    monsterHealth = health;
    monsterStrength = strength;
    monsterWorth = worth;
    
    monsterName.innerText = name;
    monsterHealth.innerText = health;
    await new Promise(resolve => setTimeout(resolve, 1500));
    text.innerText = "";
}

function checkLevelUp() {
    if (xp >= 100) {
        xp -= 100;
        level++;
        updateStats();
    }
}

async function buyHealth(amount, requiredLevel) {
    if (gold >= amount && level >= requiredLevel) {
        gold -= amount;
        health += amount;
        updateStats();
        elements.text.innerText = `Health purchased, ${gold} gold left`;
    } else {
        elements.text.innerText = "Not enough gold or levels!";
    }
    await delayUpdate(elements.text, "", 1500);
}

async function buyWeapon(index, cost, requiredLevel = 0) {
    if (gold >= cost && level >= requiredLevel) {
        if (!inventory.includes(weapons[index].name)) {
            inventory.push(weapons[index].name);
            currentWeaponIndex = index;
            gold -= cost;
            updateStats();
            elements.text.innerText = `Equipped: ${weapons[index].name}`;
            buttons.loreSelection[index - 1].style.display = "flex";
        } else {
            elements.text.innerText = `You already own the ${weapons[index].name}!`;
        }
    } else {
        elements.text.innerText = "Not enough gold or levels!";
    }
    await delayUpdate(elements.text, "", 1000);
}

function showLore1() { elements.lore.style.visibility = "visible";
    elements.lore.innerText = loreSword;
} 
function showLore2() { elements.lore.style.visibility = "visible";
    elements.lore.innerText = loreScythe;
} 
function showLore3() { elements.lore.style.visibility = "visible";
    elements.lore.innerText = loreGreatHammer;
} 
function showLore4() { elements.lore.style.visibility = "visible";
    elements.lore.innerText = loreExcalibur;
}

async function justBack() {
    await delayUpdate(elements.text, "Going Back To Main Menu", 100);
    await delayUpdate(elements.text, "Going Back To Main Menu.", 100);
    await delayUpdate(elements.text, "Going Back To Main Menu..", 100);
    await delayUpdate(elements.text, "Going Back To Main Menu...", 100);
    await delayUpdate(elements.text, "", 100);
    elements.shopUI.style.visibility = "hidden";
    elements.inventoryUI.style.visibility = "hidden";
    elements.controlsForMonsters.style.visibility = "hidden";
    buttons.navigation[0].disabled = false; buttons.navigation[1].disabled = false; buttons.navigation[2].disabled = false; buttons.navigation[3].disabled = false;
    elements.text.innerText = instructions;
    elements.lore.style.visibility = "hidden";
}

async function goStore() {
    await delayUpdate(elements.text, "Going To Store", 100);
    await delayUpdate(elements.text, "Going To Store.", 100);
    await delayUpdate(elements.text, "Going To Store..", 100);
    await delayUpdate(elements.text, "Going To Store...", 100);
    await delayUpdate(elements.text, "", 100);
    elements.shopUI.style.visibility = "visible";
    elements.text.innerText = "";
    buttons.navigation[1].disabled = true;
}

async function goCave() {
    await delayUpdate(elements.text, "Going To Cave", 100);
    await delayUpdate(elements.text, "Going To Cave.", 100);
    await delayUpdate(elements.text, "Going To Cave..", 100);
    await delayUpdate(elements.text, "Going To Cave...", 100);
    await delayUpdate(elements.text, "", 100);
    elements.controlsForMonsters.style.visibility = "visible";

    buttons.monsterSelection[0].style.display = "flex"; 
    buttons.monsterSelection[1].style.display = "flex"; 
    buttons.monsterSelection[2].style.display = "flex"; 
    buttons.monsterSelection[3].style.display = "flex";

    text.innerText = ""
}

async function openInventory() {
    await delayUpdate(elements.text, "Going To Inventory", 100);
    await delayUpdate(elements.text, "Going To Inventory.", 100);
    await delayUpdate(elements.text, "Going To Inventory..", 100);
    await delayUpdate(elements.text, "Going To Inventory...", 100);
    await delayUpdate(elements.text, "", 100);
    elements.inventoryUI.style.visibility = "visible";
    elements.text.innerText = "";
    buttons.navigation[3].disabled = true;
}

async function fightMonster(index) {
    currentMonsterIndex = index;
    const monster = monsters[index];

    const requirements = {
        0: { requiredWeaponIndex: 1, requiredLevel: 0 },  // Ghoul: Sword, no level requirement
        1: { requiredWeaponIndex: 2, requiredLevel: 5 },  // Beast: Scythe, level 5
        2: { requiredWeaponIndex: 3, requiredLevel: 10 }, // Werewolf: GreatHammer, level 10
        3: { requiredWeaponIndex: 4, requiredLevel: 15 }  // Dragon: Excalibur, level 15
    }

    const { requiredWeaponIndex, requiredLevel } = requirements[index];

    if (currentWeaponIndex < requiredWeaponIndex) {
        elements.text.innerText = `Your weapon is too weak to fight the ${monster.name}! You need ${weapons[requiredWeaponIndex].name}.`;
        await delayUpdate(elements.text, "", 2500);
        return;
    }
    
    if (level < requiredLevel) {
        elements.text.innerText = `You need to be at least level ${requiredLevel} to fight the ${monster.name}.`;
        await delayUpdate(elements.text, "", 2500);
        return;
    }

    buttons.monsterSelection.forEach((button, i) => {
        if (i !== index) {
            button.disabled = true;
            buttons.navigation[0].disabled = true;
        }
    });

    elements.buttonAttack.style.display = "block"; 
    elements.text.innerText = `You approach the ${monster.name}...`;
    await delayUpdate(elements.text," ", 800);

    elements.monsterStats.style.display = "flex";
    elements.monsterName.innerText = monster.name;
    elements.monsterHealth.innerText = monster.health;

    elements.shopUI.style.visibility = "hidden";
    elements.inventoryUI.style.visibility = "hidden";
    elements.lore.style.visibility = "hidden";
}

async function playerGuess() {
    const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1;
    const playerRollNum = parseInt(prompt("Guess the correct number to Attack, 1 - 3: "));

    if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
        await delayUpdate(text, "Please enter a valid number between 1 and 3.", 1500);
        return;
    } 
    if (playerRollNum === randomizedRollNumOutCome) {
        playerHitMonster();
        elements.text.innerText = "You hit the monster!";

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 1) {
        text.innerText = "You over swung and missed the monster! try again...";
        await delayUpdate(elements.text, "", 1000);
        xp += 10;
        updateStats();

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome - 1) {
        text.innerText = "You narrowly dodged the monster! try again...";
        await delayUpdate(elements.text, "", 1000);
        xp += 10;
        updateStats();

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 2 ||  playerRollNum === randomizedRollNumOutCome - 2) {
        text.innerText = "You completely missed the monster and it has attacked you!";
        await delayUpdate(elements.text, "", 1000);
        monsterHitPlayer();
    }
    console.log("player number: ",playerRollNum)
    console.log("random number: ",randomizedRollNumOutCome)
}

function playerHitMonster() {
    const currentMonster = monsters[currentMonsterIndex];
    const currentWeapon = weapons[currentWeaponIndex];
    const monsterWorth = currentMonster.worth;
    let reward = 2 * monsterWorth;
    xp += 20;
    gold += reward;

    checkLevelUp();
    updateStats();
    currentMonster.health -= currentWeapon.strength;
    monsterHealth.innerText = currentMonster.health;

    if (currentMonster.health <= 0) {
        currentMonster.health = 0;

        elements.beatBossScreen.classList.add("visible");
        elements.bossExplain.innerText = `You defeated the ${currentMonster.name}!`;
        currentMonsterStats();

        setTimeout(() => {
            elements.beatBossScreen.classList.remove("visible");
        }, 15000);
    }
}

async function monsterHitPlayer() {
    const currentMonster = monsters[currentMonsterIndex];
    const monsterStrength = currentMonster.strength;

    health -= monsterStrength;

    
    if (health <= 0) {
        health = 0;
        elements.loserScreen.classList.add("visible");
        elements.loserScreen.innerText = `You have been bested by ${currentMonster.name}!`;
        updateStats();
    }
    elements.healthText.innerText = health;
}

function currentMonsterStats() {
    const currentMonster = monsters[currentMonsterIndex];

    if (currentMonster) {
        monsterName.innerText = currentMonster.name;
        monsterHealth.innerText = currentMonster.health;
    } else {
        monsterName.innerText = "No monster selected";
        monsterHealth.innerText = "";
    }
}

document.getElementById('restartButton').addEventListener('click', function() {
    location.reload(); // Reloads the current page
});

elements.text.innerText = instructions;
currentMonsterStats();

updateStats();