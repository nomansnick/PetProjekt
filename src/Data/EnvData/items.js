const ItemList = [
    {
        item: "Health Potion",
        type: "consumable",
        upgrade: false,
        faction: false,
        effect: 50,
        price: 50,
    },
    {
        item: "Wooden Pikes",
        type: "fortification",
        upgrade: true,
        faction: false,
        tier: 1,
        price: 500,
    },
    {
        item: "Traps",
        type: "concealment",
        upgrade: true,
        faction: false,
        tier: 1,
        price: 500,
    },
    {
        item: "Food",
        type: "essential",
        upgrade: false,
        faction: false,
        price: 25,
    },
    {
        item: "Guards",
        type: "fortification",
        upgrade: true,
        faction: true,
        factionGiver: "Guards",
        factionPoints: 50,
        tier: 1,
        price: 1000,
    },
    {
        item: "Garden",
        type: "either",
        upgrade: true,
        faction: true,
        factionGiver: "Villagers",
        factionPoints: 50,
        tier: 1,
        price: 1000,
    },
    {
        item: "Toolkit",
        type: "either",
        upgrade: true,
        faction: true,
        factionGiver: "Guild",
        factionPoints: 50,
        tier: 1,
        price: 1000,
    }

]

export default ItemList;