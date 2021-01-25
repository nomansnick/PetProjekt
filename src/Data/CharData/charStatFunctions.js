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
    return char.health + char.lvl * 10 + char.constitution * 5 + racialBonus(char.race, "maxHealth");   
}

function getCritChance(char) {
    return char.dexterity * 3 + racialBonus(char.race, "critChance");
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
    let random = 0;
    random = Math.floor(Math.random() * Math.floor(100))
    let dmg = racialBonus(char.race, "baseDmg") + char.strength * 2 + char.dexterity * 1
    let critDmg = dmg * 3;

    return random < getCritChance(char) ? critDmg : dmg;
}

function getMagicOutGoing(char) {
    return racialBonus(char.race, "intelligence") + char.intelligence * 5
}

function getDmgIncoming(char, dmg) {
    let random = 0;
    random = Math.floor(Math.random() * Math.floor(100))
    let dmgTaken = dmg * (100 - getMitigation(char) - racialBonus(char.race, "mitigation")) / 100;

    return random < getBlockChance ? 0 : dmgTaken;
}

export {racialBonus, getBlockChance, getCritChance,
    getDmgIncoming, getDmgOutGoing, getEvadeChance,
    getMaxHealth, getMitigation, getHealth, getMagicOutGoing}