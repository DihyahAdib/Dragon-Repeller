//Inspired by FreeCodeCamp Developed by Dihyah Adib.//
let instructions = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";

let score = 0;
let level = 0;//change this back to zero later
let xp = 0;
let xpMultiplier = 1.5;
let monsterMultipier = 2.5;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;//change this back to zero later
let weaponName;
let weaponStrength;
let inventory = ["None"];
let currentMonsterIndex = 0;
let monsterStrength;
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

// NOTE TO SELF HP OF MONSTERS ARE CURRENTLY TOO HIGHER FOR THE DMG OUTPUT OF WEAPONS PLEASE MAKE THE WEAPONS STRONGER//
const weapons = [
    {name: "None", strength: 0},
    {name: "Sword", strength: 10},
    {name: "Scythe", strength: 50},
    {name: "GreatHammer", strength: 100},
    {name: "Excalibur", strength: 200}
];

const monsters = [
    {name: "Ghoul", health: 150, strength: 20, worth: 10},
    {name: "Beast", health: 250, strength: 50, worth: 15},
    {name: "WereWolf", health: 300, strength: 100, worth: 20},
    {name: "Dragon", health: 500, strength: 200, worth: 25}
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
buttonSwordText.onclick = showLore;
buttonScytheText.onclick = showLore;
buttonGreatHammerText.onclick = showLore;
buttonExcaliburText.onclick = showLore;

async function delayUpdate(textElement, message, delay) {   
    await new Promise(resolve => setTimeout(resolve, delay));
    textElement.innerText = message;
}

async function updateWeapon(newWeaponIndex) {
    currentWeaponIndex = newWeaponIndex;
    const currentWeapon = weapons[currentWeaponIndex];
    console.log("Equipped Weapon:", currentWeapon);
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
    
    monsterNameText.innerText = name;
    monsterHealthText.innerText = health;
    await new Promise(resolve => setTimeout(resolve, 1500));
    text.innerText = "";
}

function randomizedNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

function LevelCalc() {
    if (xp === 100) {
        level++;
        levelText.innerText = level
    }
}

function showLore() {
    //
}
async function goStore() {
    await delayUpdate(text, "Going To Store", 200);
    await delayUpdate(text, "Going To Store.", 200);
    await delayUpdate(text, "Going To Store..", 200);
    await delayUpdate(text, "Going To Store...", 200);
    shopText.style.visibility = "visible";
    text.innerText = "";
    buttonStore.disabled = true;
}

async function openInventory() {
    await delayUpdate(text, "Going To Inventory", 200);
    await delayUpdate(text, "Going To Inventory.", 200);
    await delayUpdate(text, "Going To Inventory..", 200);
    await delayUpdate(text, "Going To Inventory...", 200);
    inventoryText.style.visibility = "visible";
    text.innerText = " ";
    buttonInventory.disabled = true;
}

async function justBack() {
    await delayUpdate(text, "Going Back To Main Menu", 200);
    await delayUpdate(text, "Going Back To Main Menu.", 200);
    await delayUpdate(text, "Going Back To Main Menu..", 200);
    await delayUpdate(text, "Going Back To Main Menu...", 200);
    buttonStore.disabled = false;
    buttonInventory.disabled = false;
    inventoryText.style.visibility = "hidden";
    shopText.style.visibility = "hidden";
    controlsForMonsters.style.visibility = "hidden";
    text.innerText = instructions;
}

async function goCave() {
    await delayUpdate(text, "Going To Cave", 200);
    await delayUpdate(text, "Going To Cave.", 200);
    await delayUpdate(text, "Going To Cave..", 200);
    await delayUpdate(text, "Going To Cave...", 200);
    buttonStore.disabled = true;
    buttonStore.disabled = false;
    buttonInventory.disabled = false;
    controlsForMonsters.style.visibility = "visible";
    inventoryText.style.visibility = "hidden";
    buttonGhoul.style.display = "flex";
    buttonBeast.style.display = "flex";
    buttonWereWolf.style.display = "flex";
    buttonDragon.style.display = "flex";
    shopText.style.visibility = "hidden";
    text.innerText = ""
}

async function buyHealth10() {
    if (gold >= 10) {
        gold -= 10; health += 10;
        goldText.innerText = gold; healthText.innerText = health;
        text.innerText = `Health purchased, ${gold} gold left`;
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
        text.innerText = "Not Enough Gold!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = "";
}

async function buyHealth50() {
    if (gold >= 50 && level >= 20) { // soy pro let them buy
        gold -= 50; health += 50;
        goldText.innerText = gold; healthText.innerText = health;
        text.innerText = `Health purchased, ${gold} gold left`;
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else { // too noob dont let them buy
        button50HP.disabled = true;
        text.innerText = "Not Enough Gold or Levels!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = ""; 
}

async function buyHealth100() {
    if (gold >= 100 && level >= 30) {
        gold -= 100; health += 100;
        goldText.innerText = gold; healthText.innerText = health;
        text.innerText = `Health purchased, ${gold} gold left`;
        await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
        button100HP.disabled = true;
        text.innerText = "Not Enough Gold or Levels!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = "";
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
        await updateWeapon(2); // Equip "Scythe"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonScytheText.style.display = "flex";
        buttonScythe.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Scythe!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = "";
}

async function buyGreatHammer() {
    if (gold >= 100 && level >= 8) {
        gold -= 100;
        goldText.innerText = gold;
        await updateWeapon(3); // Equip "Great Hammer"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonGreatHammerText.style.display = "flex";
        buttonGreatHammer.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Great Hammer!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = "";
}

async function buyExcalibur() {
    if (gold >= 150 && level >= 15) {
        gold -= 150;
        goldText.innerText = gold;
        await updateWeapon(4); // Equip "Excalibur"
        await new Promise(resolve => setTimeout(resolve, 1000));
        buttonExcaliburText.style.display = "flex";
        buttonExcalibur.disabled = true;
    } else {
        text.innerText = "Not enough gold or levels for the Excalibur!";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    text.innerText = "";
}

async function fightGhoul() {
    currentMonsterStats(0);
    if (currentWeaponIndex === 0) { // If the player hasnt bought any weapon
        text.innerText = "You need to buy a weapon first!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        text.innerText = ""
    } else { //If everything is good output this code
        await delayUpdate(text, "You Aproach The Ghoul", 200); 
        await delayUpdate(text, "You Aproach The Ghoul.", 200); 
        await delayUpdate(text, "You Aproach The Ghoul..", 200); 
        await delayUpdate(text, "You Aproach The Ghoul...", 200);
        await updateMonster(0);
        buttonBack.disabled = true;
        buttonStore.disabled = true;

        controlsForMonsters.style.visibility = "visible";
        monsterStats.style.display = "flex";
        monsterNameText.style.display = "flex";
        monsterHealthText.style.display = "flex";
        inventoryText.style.visibility = "hidden";
        shopText.style.visibility = "hidden";
        buttonBeast.style.visibility = "hidden";
        buttonWereWolf.style.visibility = "hidden";
        buttonDragon.style.visibility = "hidden";
        buttonAttack.style.display = "block";
    }
}
async function fightBeast() {
    currentMonsterStats(1);
    if (currentWeaponIndex === 0 || level === 0) {
        text.innerText = "You need to buy a weapon or level up first!";
        await new Promise(resolve => setTimeout(resolve, 1500));
        text.innerText = "";
    } else { //If everything is good output this code
        await delayUpdate(text, "You Aproach The Beast", 200); 
        await delayUpdate(text, "You Aproach The Beast.", 200); 
        await delayUpdate(text, "You Aproach The Beast..", 200); 
        await delayUpdate(text, "You Aproach The Beast...", 200);
        await updateMonster(1);
        buttonBack.disabled = true;
        buttonStore.disabled = true;

        controlsForMonsters.style.visibility = "visible";
        monsterStats.style.display = "flex";
        monsterNameText.style.display = "flex";
        monsterHealthText.style.display = "flex";
        inventoryText.style.visibility = "hidden";
        shopText.style.visibility = "hidden";
        buttonGhoul.style.visibility = "hidden";
        buttonWereWolf.style.visibility = "hidden";
        buttonDragon.style.visibility = "hidden";
        buttonAttack.style.display = "block";
    }
    
}
async function fightWereWolf() {
    currentMonsterStats(2);
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
    currentMonsterStats(3);
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
    currentMonsterStats();
    let playerRollNum = parseInt(prompt("Guess the correct number to Attack, 1 - 3: "));
    if (isNaN(playerRollNum) || playerRollNum < 1 || playerRollNum > 3) {
        await delayUpdate(text, "Please enter a valid number between 1 and 3.", 1500);
        return;
    }

    const randomizedRollNumOutCome = randomizedNumber();  
    console.log("Game rolled:", randomizedRollNumOutCome);  
    console.log("Player guessed:", playerRollNum);
    
    if (playerRollNum === randomizedRollNumOutCome) {
        text.innerText = "You hit the monster!";
        console.log("you hit");
        playerHitMonster();

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 1) {
        text.innerText = "You over swung and missed the monster! try again...";
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("over swung");
        text.innerText = "";
        xp += 10; //additional xp given for not getitng hit.
        xpText.innerText = xp;
        return;

    } if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome - 1) {
        text.innerText = "You narrowly dodged the monster! try again...";
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("dodged");
        text.innerText = "";
        xp += 10; //additional xp given for not getitng hit.
        xpText.innerText = xp;
        return;

    } else if (playerRollNum !== randomizedRollNumOutCome && playerRollNum === randomizedRollNumOutCome + 2 ||  playerRollNum === randomizedRollNumOutCome - 2) {
        text.innerText = "The monster completely missed the monster and it has attacked you!";
        await new Promise(resolve => setTimeout(resolve, 1000));
        text.innerText = "";
        console.log("monster fights back");
        monsterHitPlayer();
    }
}

function playerHitMonster() {
    const currentMonster = monsters[currentMonsterIndex];
    const currentWeapon = weapons[currentWeaponIndex];
    const killedMonster = document.querySelector("#killedMonster");

    let reward = 2 * monsterWorth;
    xp += 20; // Example value, increase XP for hitting the monster
    gold += reward;
    goldText.innerText = gold;
    xpText.innerText = xp;

    currentMonster.health -= currentWeapon.strength;
    monsterHealthText.innerText = currentMonster.health;

    killedMonster.classList.add("fadeInAndOut");

    if (currentMonster.health <= 0) {
        text.innerText = `You defeated the ${currentMonster.name}!`;
        animateMonsterDefeat();
    }
}

function animateMonsterDefeat() {
    const currentMonster = monsters[currentMonsterIndex];
    const killedMonster = document.querySelector("#killedMonster");

    killedMonster.classList.add("fadeInAndOut");

    setTimeout(() => {
        killedMonster.classList.remove("fadeInAndOut")
    }, 2400);

}

function monsterHitPlayer() {
    const currentMonster = monsters[currentMonsterIndex];
    health -= monsterStrength;


    currentMonster.strength -= health

    if (health <= 0) {
        health = 0;
        text.innerText = "You have been defeated!";
        
    }
    healthText.innerText = health;
}

function currentMonsterStats() {
    const currentMonster = monsters[currentMonsterIndex];

    if (currentMonster) {
        // Update the monster name and health text elements
        monsterNameText.innerText = currentMonster.name;
        monsterHealthText.innerText = currentMonster.health;
    } else {
        // If no current monster is selected, clear the text
        monsterNameText.innerText = "No monster selected";
        monsterHealthText.innerText = "";
    }
}


currentMonsterStats();

LevelCalc();