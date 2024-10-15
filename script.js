//Inspired by FreeCodeCamp Developed by Dihyah Adib.//

let level = 0;
let xp = 0;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let fightingState = [0, 1, 2];
let fighting;
let monsterHealth;
let inventory = ["Sword"];

// -------------- POTION BUTTONS -----------------------//
const button10HP = document.querySelector("#button10HP"); 
const button50HP = document.querySelector("#button50HP");
const button100HP = document.querySelector("#button100HP"); 

// -------------- DIRECTIONAL BUTTONS -----------------------//
const buttonBack = document.querySelector("#buttonBack"); 
const buttonStore = document.querySelector("#buttonStore");
const buttonCave = document.querySelector("#buttonCave");

// -------------- WEAPONS BUTTONS -----------------------//
const buttonSword = document.querySelector("#buttonSword");
const buttonScythe = document.querySelector("#buttonScythe");
const buttonGreatHammer = document.querySelector("#buttonGreatHammer");
const buttonExcalibur = document.querySelector("#buttonExcalibur");

// -------------- MONSTER BUTTONS -----------------------//
const buttonGhoul = document.querySelector("#buttonGhoul");
const buttonBeast = document.querySelector("#buttonBeast");
const buttonWereWolf = document.querySelector("#buttonWereWolf");
const buttonDragon = document.querySelector("#buttonDragon"); 

// -------------- TEXT BUTTONS -----------------------//
const levelText = document.querySelector("#levelText");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const gameText = document.querySelector("#game");
const shopText = document.querySelector("#shopUI");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const controlsForMonsters = document.querySelector("#controlsForMonsters");

//initialize buttons
// ------ POTION INITIALIZATION ------//
button10HP.onclick = buyHealth10;
button50HP.onclick = buyHealth50;
button100HP.onclick = buyHealth100;

// ------ DIRECTIONAL INITIALIZATION ------//
buttonBack.onclick = justBack;
buttonStore.onclick = goStore;
buttonCave.onclick = goCave;

// ------ WEAPON INITIALIZATION ------//
buttonSword.onclick = buyWeapon;
buttonScythe.onclick = buyWeapon;
buttonGreatHammer.onclick = buyWeapon;
buttonExcalibur.onclick = buyWeapon;

// ------ MONSTER INITIALIZATION ------//
buttonGhoul.onclick = fightGhoul;
buttonBeast.onclick = fightBeast;
buttonWereWolf.onclick = fightWereWolf;
buttonDragon.onclick = fightDragon;


async function goStore() {
    console.log("Going To Store");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going To Store";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going To Store.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going To Store..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going To Store...";

    await new Promise(resolve => setTimeout(resolve, 400));
    //everything after this is what should change visually.
    shopText.style.visibility = "visible";
    gameText.style.marginLeft = "20em";
    gameText.style.marginRight = "20em";
    text.innerText = " ";
}

async function justBack() {
 
    console.log("Going back");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going Back To Main menu";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going Back To Main menu.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going Back To Main menu..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going Back To Main Menu...";

    await new Promise(resolve => setTimeout(resolve, 400));
    buttonStore.disabled = false;

    shopText.style.visibility = "hidden";
    controlsForMonsters.style.display = "none";
    //These buttons are for monster buttons//
    buttonGhoul.style.display = "none";
    buttonBeast.style.display = "none";
    buttonWereWolf.style.display = "none";
    buttonDragon.style.display = "none";
    //------------------------------------//
    gameText.style.marginLeft = "auto";
    gameText.style.marginRight = "auto";
    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above.";
}

async function buyHealth10() {
    if (gold >= 10) {
        gold -= 10;
        goldText.innerText = gold;
        health += 10; 
        healthText.innerText = health;
        console.log("Health purchased, Gold reduced to", gold);
        text.innerText = ("Health purchased, -10 Gold");
        await new Promise(resolve => setTimeout(resolve, 800));
        text.innerText = "";
    }  
    if (gold <= 0) {
        button10HP.disabled = true;
        text.innerText = ("Not Enough Gold!");
        await new Promise(resolve => setTimeout(resolve, 1800));
        text.innerText = "";
    }
}
async function buyHealth50() {
    if (gold <= 50 || level === 0) {
        button50HP.disabled = true;
        text.innerText = ("Not Enough Gold!");
        await new Promise(resolve => setTimeout(resolve, 1800));
        text.innerText = "";
        if (gold >= 50 && level === 5) {
            gold -= 50;
            goldText.innerText = gold;
            health += 50; 
            healthText.innerText = health;
            console.log("Health purchased, Gold reduced to", gold);
            text.innerText = ("Health purchased, -50 Gold");
            await new Promise(resolve => setTimeout(resolve, 800));
            text.innerText = "";
        } 
    }
}
async function buyHealth100() {
    if (gold <= 100 || level === 0) {
        button100HP.disabled = true;
        text.innerText = ("Not Enough Gold!");
        await new Promise(resolve => setTimeout(resolve, 1800));
        text.innerText = "";
        if (gold >= 100 && level === 10) {
            gold -= 100;
            goldText.innerText = gold;
            health += 100; 
            healthText.innerText = health;
            console.log("Health purchased, Gold reduced to", gold);
            text.innerText = ("Health purchased, -100 Gold");
            await new Promise(resolve => setTimeout(resolve, 800));
            text.innerText = "";
        }
    }
}
async function buyWeapon() {
    if (gold >= 30) {
        gold -= 30;
        goldText.innerText = gold;
        currentWeapon++;
        console.log("Weapon purchased, Gold reduced to", gold);
        text.innerText = (nameOfWeapon + " purchased, -30 Gold");
        await new Promise(resolve => setTimeout(resolve, 800));
        text.innerText = "";
        if (currentWeapon === 1) {
            buttonSword.disabled = true;
            await new Promise(resolve => setTimeout(resolve, 400));
        }
    } 
}
async function goCave() {
    console.log("Going To Cave");
    await new Promise(resolve => setTimeout(resolve, 400));
    text.innerText = "Going To Cave";

    await new Promise(resolve => setTimeout(resolve, 100));
    text.innerText = "Going To Cave.";

    await new Promise(resolve => setTimeout(resolve, 200));
    text.innerText = "Going To Cave..";
    
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = "Going To Cave...";

    await new Promise(resolve => setTimeout(resolve, 400));

    controlsForMonsters.style.display = "block";
    buttonGhoul.style.display = "inline-block";
    buttonBeast.style.display = "inline-block";
    buttonWereWolf.style.display = "inline-block";
    buttonDragon.style.display = "inline-block";

    buttonStore.disabled = true;
    buttonHP.style.display = "none";
    buttonSword.style.display = "none";

    if (level === 0) {
        text.innerText = "Dragon Locked: Get More Levels!";
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    text.innerText = ""

}

function fightGhoul() {
    console.log("Fighting The Dragon!")
}
function fightBeast() {
    console.log("Fighting The Dragon!")
}
function fightWereWolf() {

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