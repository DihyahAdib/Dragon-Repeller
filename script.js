//Inspired by FreeCodeCamp Developed by Dihyah Adib.//
let instructions = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";

let score = 0;
let level = 0;
let xp = 0;
let xpMultiplier = 1.5;
let monsterMultipier = 2.5;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let inventory = ["None"];
let fightingState = [0, 1, 2];
let fighting;
let monsterHealth;
let monsterWorth;

const button10HP = document.querySelector("#button10HP"); 
const button50HP = document.querySelector("#button50HP");
const button100HP = document.querySelector("#button100HP"); 
const buttonBack = document.querySelector("#buttonBack"); 
const buttonStore = document.querySelector("#buttonStore");
const buttonCave = document.querySelector("#buttonCave");
const buttonInventory = document.querySelector("#buttonInventory");
const buttonSword = document.querySelector("#buttonSword");
const buttonScythe = document.querySelector("#buttonScythe");
const buttonGreatHammer = document.querySelector("#buttonGreatHammer");
const buttonExcalibur = document.querySelector("#buttonExcalibur");
const buttonGhoul = document.querySelector("#buttonGhoul");
const buttonBeast = document.querySelector("#buttonBeast");
const buttonWereWolf = document.querySelector("#buttonWereWolf");
const buttonDragon = document.querySelector("#buttonDragon"); 
const levelText = document.querySelector("#levelText");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const buttonSwordText = document.querySelector("#buttonSwordText");
const buttonScytheText = document.querySelector("#buttonScytheText");
const buttonGreatHammerText = document.querySelector("#buttonGreatHammerText");
const buttonExcaliburText = document.querySelector("#buttonExcaliburText");
const gameText = document.querySelector("#game");
const shopText = document.querySelector("#shopUI");
const inventoryText = document.querySelector("#inventoryUI");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const controlsForMonsters = document.querySelector("#controlsForMonsters");

const buttonAttack = document.querySelector("#buttonAttack");

const weapons = [
    {name: "None", strength: 0},
    {name: "Sword", strength: 10},
    {name: "Scythe", strength: 50},
    {name: "GreatHammer", strength: 100},
    {name: "Excalibur", strength: 200}
];

const monsters = [
    {name: "Ghoul", health: 150, strength: 20, worth: 10},
    {name: "Beast", health: 250, strength: 20, worth: 15},
    {name: "WereWolf", health: 300, strength: 20, worth: 20},
    {name: "Dragon", health: 500, strength: 20, worth: 25}
];

button10HP.onclick = buyHealth10;
button50HP.onclick = buyHealth50;
button100HP.onclick = buyHealth100;
buttonInventory.onclick = openInventory;
buttonBack.onclick = justBack;
buttonStore.onclick = goStore;
buttonCave.onclick = goCave;
buttonSword.onclick = buySword;
buttonScythe.onclick = buyScythe;
buttonGreatHammer.onclick = buyGreatHammer;
buttonExcalibur.onclick = buyExcalibur;
buttonGhoul.onclick = fightGhoul;
buttonBeast.onclick = fightBeast;
buttonWereWolf.onclick = fightWereWolf;
buttonDragon.onclick = fightDragon;
buttonAttack.onclick = playerGuess;

async function delayUpdate(textElement, message, delay) {   
    await new Promise(resolve => setTimeout(resolve, delay));
    textElement.innerText = message;
}

async function updateWeapon(newWeaponIndex) {
    currentWeaponIndex = newWeaponIndex;
    currentWeapon = weapons[currentWeaponIndex];
    console.log("Equipped Weapon:", currentWeapon);
    const { name, strength } = currentWeapon; // Destructure the currentWeapon properties
    await delayUpdate(text,`Equipped: ${name} with a strength of: ${strength}`, 500);
    await new Promise(resolve => setTimeout(resolve, 2500));
    text.innerText = "";
}

async function updateMonster(newMonsterIndex) {
    currentMonsterIndex = newMonsterIndex;
    currentMonster = weapons[currentMonsterIndex];
    console.log("Equipped Weapon:", currentMonster);
    const { name, health } = currentMonster; // Destructure the currentMonster properties
    await delayUpdate(text,`Equipped: ${name} with a strength of: ${health}`, 500);
    await new Promise(resolve => setTimeout(resolve, 2500));
    text.innerText = "";
}


function randomizedNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function LevelCalc() {
    xp *= xpMultiplier;
    level = Math.floor(xp / 100); // Example: 100 XP per level
}

async function goStore() {
    await delayUpdate(text, "Going To Store", 100);
    await delayUpdate(text, "Going To Store.", 200);
    await delayUpdate(text, "Going To Store..", 200);
    await delayUpdate(text, "Going To Store...", 300);
    await new Promise(resolve => setTimeout(resolve, 200));
    shopText.style.visibility = "visible";
    text.innerText = "";
}

async function openInventory() {
    await delayUpdate(text, "Going To Inventory", 100);
    await delayUpdate(text, "Going To Inventory.", 200);
    await delayUpdate(text, "Going To Inventory..", 200);
    await delayUpdate(text, "Going To Inventory...", 300);
    await new Promise(resolve => setTimeout(resolve, 200));
    inventoryText.style.visibility = "visible";
    text.innerText = " ";
}

async function justBack() {
    await delayUpdate(text, "Going Back To Main Menu", 100);
    await delayUpdate(text, "Going Back To Main Menu.", 200);
    await delayUpdate(text, "Going Back To Main Menu..", 200);
    await delayUpdate(text, "Going Back To Main Menu...", 300);
    await new Promise(resolve => setTimeout(resolve, 200));
    buttonStore.disabled = false;
    inventoryText.style.visibility = "hidden";
    shopText.style.visibility = "hidden";
    controlsForMonsters.style.visibility = "hidden";
    text.innerText = instructions;
}

async function goCave() {
    await delayUpdate(text, "Going To Cave", 100);
    await delayUpdate(text, "Going To Cave.", 200);
    await delayUpdate(text, "Going To Cave..", 200);
    await delayUpdate(text, "Going To Cave...", 300);
    await new Promise(resolve => setTimeout(resolve, 200));
    buttonStore.disabled = true;
    controlsForMonsters.style.visibility = "visible";
    inventoryText.style.visibility = "hidden";
    buttonGhoul.style.display = "flex";
    buttonBeast.style.display = "flex";
    buttonWereWolf.style.display = "flex";
    buttonDragon.style.display = "flex";
    shopText.style.visibility = "hidden";
    if (level === 0) {
        text.innerText = "Dragon Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    text.innerText = ""
}

async function buyHealth10() {
    if (gold >= 10) {
        gold -= 10; health += 10;
        goldText.innerText = gold; healthText.innerText = health;
        await delayUpdate(text, "Health purchased, -10 Gold", 1800);
    } else {
        await delayUpdate(text, "Not Enough Gold!", 1800);
    }
    text.innerText = "";
}

async function buyHealth50() {
    if (gold >= 50 && level >= 20) { // soy pro let them buy
        gold -= 50; health += 50;
        goldText.innerText = gold; healthText.innerText = health;
        await delayUpdate(text, "Health purchased, -50 Gold", 1800);
    } 
    if (gold <= 50 || level === 0) { // too noob dont let them buy
        button50HP.disabled = true;
        await delayUpdate(text, "Not Enough Gold or Levels!", 1800);
    }
    text.innerText = ""; 
}

async function buyHealth100() {
    if (gold >= 100 && level >= 30) {
        gold -= 100; health += 100;
        goldText.innerText = gold;
        healthText.innerText = health;
        console.log("Health purchased, Gold reduced to", gold);
        text.innerText = ("Health purchased, -100 Gold");
        await new Promise(resolve => setTimeout(resolve, 800));
        text.innerText = "";
    }
    if (gold <= 100 || level === 0) {
        button100HP.disabled = true;
        await delayUpdate(text, "Not Enough Levels Or Gold!", 800);
        text.innerText = "";

    }
}

async function buySword() {
    if (gold >= 30) {
        gold -= 30;
        goldText.innerText = gold;
        await updateWeapon(1); // Equip "Sword"
        buttonSwordText.style.display = "flex";
        buttonSword.disabled = true;
    }
}

async function buyScythe() {
    if (gold >= 100 && level >= 3) {
        gold -= 100;
        goldText.innerText = gold;
        updateWeapon(2); // Equip "Scythe"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonScytheText.style.display = "flex";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
        buttonScythe.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Scythe!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
    }
}

async function buyGreatHammer() {
    if (gold >= 100 && level >= 8) {
        gold -= 100;
        goldText.innerText = gold;
        updateWeapon(3); // Equip "Great Hammer"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonGreatHammerText.style.display = "flex";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
        buttonGreatHammer.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Great Hammer!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
    }
}

async function buyExcalibur() {
    if (gold >= 150 && level >= 15) {
        gold -= 150;
        goldText.innerText = gold;
        updateWeapon(4); // Equip "Excalibur"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonExcaliburText.style.display = "flex";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
        buttonExcalibur.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Excalibur!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
    }
}

async function fightGhoul() {
    ghoulWorth = monsterWorth;

    if (currentWeaponIndex === 0) { // If the player hasnt bought any weapon
        await delayUpdate(text, "You need to buy a weapon first!", 2800);

    } else { //If everything is good output this code
        await delayUpdate(text, "You Aproach The Ghoul", 100); 
        await delayUpdate(text, "You Aproach The Ghoul.", 200); 
        await delayUpdate(text, "You Aproach The Ghoul..", 200); 
        await delayUpdate(text, "You Aproach The Ghoul...", 300);
        buttonBeast.style.visibility = "hidden";
        buttonWereWolf.style.visibility = "hidden";
        buttonDragon.style.visibility = "hidden";
        buttonAttack.style.display = "block";
        await delayUpdate(text, "", 1500);
    }
}

async function fightBeast() {
    console.log("Fighting The Beast!")
    if (level === 0) {
        text.innerText = "Beast Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        buttonDragon.disabled = true;
        text.innerText = ""
    } else {
        text.innerText = "Something will happen idk yet lol"
    }
    
}
async function fightWereWolf() {
    console.log("Fighting The WereWolf!")
    if (level === 0) {
        text.innerText = "WereWolf Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        buttonDragon.disabled = true;
        text.innerText = ""
    } else {
        text.innerText = "Something will happen idk yet lol"
    }
}
async function fightDragon() {
    console.log("Fighting The Dragon!")
    if (level === 0) {
        text.innerText = "Dragon Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        buttonDragon.disabled = true;
        text.innerText = ""
    } else {
        text.innerText = "Something will happen idk yet lol"
    }
}

async function playerGuess() {
    let playerRollNum = parseInt(prompt("Guess the correct number to Attack, 1 - 3: "));
    if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
        await delayUpdate(text, "Please enter a valid number between 1 and 3.", 2000);
        return;
    }

    const randomizedRollNumOutCome = randomizedNumber();  console.log("Game rolled:", randomizedRollNumOutCome);  console.log("Player guessed:", playerRollNum);
    
    if (playerRollNum === randomizedRollNumOutCome) {
        await delayUpdate(text, "You hit the monster!", 2000);
        playerHitMonster();
    } else {
        await delayUpdate(text, "You missed! The monster landed a hit. Try again!", 2000);
        monsterHit();
    }
    healthText.innerText = health;
    
}

function monsterHit() {
    health -= currentMonsterIndex[strength];
    if (health <= 0) {
        health = 0;
        text.innerText = "You have been defeated!";
    }
}

function playerHitMonster() {
    let reward = 10 * monsterWorth;
    gold += reward;
    goldText.innerText = gold;
    console.log(monsterWorth);
}

function overSwung() {
    text.innerText = "You over swung and narrowly dodged the monster!";
}

function dodgedAttack() {
    text.innerText = "You narrowly dodged the monster!";
}
