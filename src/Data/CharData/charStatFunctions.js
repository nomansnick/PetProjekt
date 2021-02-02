import {raceBase} from "../EnvData/races"

function racialBonus(Race, Stat) {
    switch(Race) {
        case "Human": return raceBase.human[Stat]
        case "Elf": return raceBase.elf[Stat];
        case "Dwarf": return raceBase.dwarf[Stat];
        case "Fay": return raceBase.fay[Stat];
    }
}

function getMaxHealth(char) {
    let answer = char.maxHealth + char.lvl * 10 + char.constitution * 5 + racialBonus(char.race, "maxHealth")
    return answer;
}

function getHealth(char) {
    return Math.floor(char.health + char.lvl * 10 + char.constitution * 5 + racialBonus(char.race, "maxHealth"));   
}

function getCritChance(char) {
    return char.classname !== "Mage" ? char.dexterity * 3 + racialBonus(char.race, "critChance") : 0;
}

function getEvadeChance(char) {
    return char.dexterity * 3 + racialBonus(char.race, "evadeChance")
}

function getMitigation(char) {
    return char.constitution * 3 + racialBonus(char.race, "mitigation")
}

function getBlockChance(char) {
    return char.constitution * 1 + char.strength * 2 + racialBonus(char.race, "blockChance");
}

function getDmgOutGoing(char) {
    let random = Math.floor(Math.random() * 100);
    let random2 = Math.floor(Math.random() * 15)
    let dmg = char.classname !== "Mage"
    ? racialBonus(char.race, "baseDmg") + char.strength * 2 + char.dexterity * 1
    : racialBonus(char.race, "baseDmg") + char.intelligence * 3 + char.charisma * 2;
    let critDmg = dmg * 3;

    return random < getCritChance(char) ? critDmg + random2 : dmg + random2;
}

function getMagicOutGoing(char) {
    return racialBonus(char.race, "intelligence") + char.intelligence * 5
}

function getDmgIncoming(char, dmg) {
    let random = Math.floor(Math.random() * 100)
    let random2 = Math.floor(Math.random() * 15)
    let dmgTaken = dmg * (100 - getMitigation(char) - racialBonus(char.race, "mitigation")) / 100;

    return random < getBlockChance(char) ? 0 : dmgTaken - random2;
}

export {racialBonus, getBlockChance, getCritChance,
    getDmgIncoming, getDmgOutGoing, getEvadeChance,
    getMaxHealth, getMitigation, getHealth, getMagicOutGoing}