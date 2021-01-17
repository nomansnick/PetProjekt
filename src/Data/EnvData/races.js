const raceBase = {

    human: {
        strength: 3,
        constitution: 0,
        dexterity: 3,
        intelligence: 0,
        charisma: 4,
        critChance: 5,
        evadeChance: 5,
        mitigation: 10,
        blockChance: 10,
        maxHealth: 15,
        baseDmg: 35
    },
    elf: {
        strength: 1,
        constitution: 2,
        dexterity: 2,
        intelligence: 2,
        charisma: 3,
        critChance: 15,
        evadeChance: 15,
        mitigation: 0,
        blockChance: 0,
        maxHealth: 30,
        baseDmg: 20
    },
    dwarf: {
        strength: 3,
        constitution: 5,
        dexterity: 0,
        intelligence: 2,
        charisma: 0,
        critChance: 0,
        evadeChance: 0,
        mitigation: 20,
        blockChance: 10,
        maxHealth: 40,
        baseDmg: 10
    },
    fay:{
        strength: 0,
        constitution: 2,
        dexterity: 4,
        intelligence: 4,
        charisma: 0,
        critChance: 10,
        evadeChance: 10,
        mitigation: 10,
        blockChance: 0,
        maxHealth: 25,
        baseDmg: 25
    }
}

export {raceBase}