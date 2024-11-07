let armor = {
  helmet: true,
  chestplate: false,
  leggings: false,
  boots: true,
  showMissingArmor: function () {
    const missingArmor = [];
    if (!this.helmet) missingArmor.push("helmet");
    if (!this.chestplate) missingArmor.push("chestplate");
    if (!this.leggings) missingArmor.push("leggings");
    if (!this.boots) missingArmor.push("boots");
    return missingArmor.join(", ");
  },
};

console.log(armor.showMissingArmor()); // Output: helmet, chestplate, leggings, boots

class Armor {
  constructor(helmet, chestplate, leggings, boots) {
    this.helmet = helmet;
    this.chestplate = chestplate;
    this.leggings = leggings;
    this.boots = boots;
  }
  showMissingArmor() {
    const missingArmor = [];
    if (!this.helmet) missingArmor.push("helmet");
    if (!this.chestplate) missingArmor.push("chestplate");
    if (!this.leggings) missingArmor.push("leggings");
    if (!this.boots) missingArmor.push("boots");
    return missingArmor.join(", ");
  }
};

const armor1 = new Armor(true, false, false, true);
const armor2 = new Armor(false, false, false, true);
const armor3 = new Armor(true, false, false, false);
const armor4 = new Armor(true, true, false, true);
console.log(armor4.showMissingArmor()); 