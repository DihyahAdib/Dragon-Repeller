class Weapon {
    constructor(name, strength) {
        // console.log("anything"); 
        this.name = name;
        this.strength = strength;
        
    }
    strengthen() {
        this.strength += 10;
    }
}


const weapon1 = new Weapon("none", 0);
const weapon2 = new Weapon("sword", 25);
weapon2.strengthen();
const weapon3 = new Weapon("scythe", 50);
const weapon4 = new Weapon("GreatHammer", 75);
const weapon5 = new Weapon("Excalibur", 200);
console.log(weapon1, weapon2, weapon3, weapon4, weapon5);
