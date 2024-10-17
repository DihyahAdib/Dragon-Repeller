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
]

buttonInventory.onclick = openInventory;
// ------ POTION INITIALIZATION ------//
button10HP.onclick = buyHealth10;
button50HP.onclick = buyHealth50;
button100HP.onclick = buyHealth100;

// ------ DIRECTIONAL INITIALIZATION ------//
buttonBack.onclick = justBack;
buttonStore.onclick = goStore;
buttonCave.onclick = goCave;

// ------ WEAPON INITIALIZATION ------//
buttonSword.onclick = buySword;
buttonScythe.onclick = buyScythe;
buttonGreatHammer.onclick = buyGreatHammer;
buttonExcalibur.onclick = buyExcalibur;

// ------ MONSTER INITIALIZATION ------//
buttonGhoul.onclick = fightGhoul;
buttonBeast.onclick = fightBeast;
buttonWereWolf.onclick = fightWereWolf;
buttonDragon.onclick = fightDragon;

buttonAttack.onclick = randomizedNumber;

async function delayUpdate(textElement, message, delay) {   
    console.log("Delay started");
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log("Updating text");
    textElement.innerText = message;
}

async function updateWeapon(newWeaponIndex) {
    currentWeaponIndex = newWeaponIndex;
    currentWeapon = weapons[currentWeaponIndex];
    console.log("Equipped Weapon:", currentWeapon);
    const { name, strength } = currentWeapon; // Destructure the currentWeapon properties
    await delayUpdate(text,`Equipped: ${name} with a strength of: ${strength}`, 500);
    await new Promise(resolve => setTimeout(resolve, 4500));
    text.innerText = "";
}

function randomizedNumber(min, max) { //this is the number the game rolls i still need to let the player pick a number.
    return Math.floor(Math.random() * (min - max + 1) + min);
}
const randomizedRollNumOutCome = Math.floor(Math.random() * 3) + 1
console.log(randomizedRollNumOutCome);

function LevelCalc() {
    xp *= xpMultiplier;
    level = Math.floor(xp / 100); // Example: 100 XP per level
    console.log("Current XP:", xp);
    console.log("Current Level:", level);
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
    gameText.style.marginLeft = "auto"; gameText.style.marginRight = "auto"; //re-align
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
    gameText.style.marginLeft = "auto"; gameText.style.marginRight = "auto";
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
        goldText.innerText = gold;
        healthText.innerText = health;
        console.log("Health purchased, Gold reduced to", gold);
        text.innerText = ("Health purchased, -10 Gold");
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
    }  
    if (gold <= 0) {
        button10HP.disabled = true;
        await delayUpdate(text, "Not Enough Gold!", 1800);
        text.innerText = "";
    }
}

async function buyHealth50() {
    if (gold >= 50 && level >= 20) { // soy pro let them buy
        gold -= 50; health += 50;
        goldText.innerText = gold;
        healthText.innerText = health;
        console.log("Health purchased, Gold reduced to", gold);
        text.innerText = ("Health purchased, -50 Gold");
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
    } 
    if (gold <= 50 || level === 0) { // too noob dont let them buy
        button50HP.disabled = true;
        text.innerText = ("Not Enough Levels Or Gold!");
        await new Promise(resolve => setTimeout(resolve, 1800));
        text.innerText = "";
    }

    
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
    if (gold >= 30 && level >= 0) {
        gold -= 30;
        goldText.innerText = gold;
        updateWeapon(1); // Equip "Sword"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonSwordText.style.display = "flex";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
        buttonSword.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Sword!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
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
    let ghoulWorth = 10;
    ghoulWorth = monsterWorth;
    console.log("Fighting The Ghoul!")

    if (currentWeaponIndex === 0) { // If the player hasnt bought any weapon

        text.innerText = "You need to buy a weapon first!"
        await new Promise(resolve => setTimeout(resolve, 2800));
        text.innerText = "";
        return;

    } else if (level === 0 && currentWeaponIndex === 1) { //If everything is good output this code
        await delayUpdate(text, "You Aproach The Ghoul", 100);
        await delayUpdate(text, "You Aproach The Ghoul.", 200);
        await delayUpdate(text, "You Aproach The Ghoul..", 200);
        await delayUpdate(text, "You Aproach The Ghoul...", 300);
        buttonBeast.style.visibility = "hidden";
        buttonWereWolf.style.visibility = "hidden";
        buttonDragon.style.visibility = "hidden";
        await new Promise(resolve => setTimeout(resolve, 1500));
        text.innerText = ""
        playerHitMonster();
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



function playerHitMonster() {
    if (playerRollNum === randomizedRollNumOutCome) {
        let reward = monsterWorth * monsterMultipier;
        gold += reward;
        goldText.innerText = gold;
    }
}

function overSwung() {
    if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === dodgeDodge) {
        dodgeDodge = randomizedRollNum + 1;
        text.innerText = "You over swung and narrowly dodged the monster!";
    }
}

function dodgedAttack() {
    if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === dodge) {
        dodge = randomizedRollNum - 1;
        text.innerText = "You narrowly dodged the monster!";
    }
    
}