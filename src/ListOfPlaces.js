let CityPlaces = [
    {   name: "Tavern",
        desc: "''Tis but a den of thieves and liars. Much like his Majesty's court, I tell you!'",
        desc2: "Enke Seraj, Court Wizard",
        desc3: "Closed until sunset!",
        isQuestGiver: true,
        isShop: true,
        isDayTime: false,
        isNightTime: true,
        eventList: "none",
        index: 1,
    },
    {   name: "Guild",
        desc: "'Ah, yes, the Guild... A place where the old and cowardly send the young and foolish to die!'",
        desc2: "Dobruk Rhug, Dwarven Ranger",
        desc3: "You are welcome to join anytime!",
        isQuestGiver: true,
        isShop: false,
        isDayTime: true,
        isNightTime: true,
        eventList: "none",
        index: 2,
    },
    {   name: "Store",
        desc: "'Don't be cheap when it comes to protection. You'll regret buying that lousy helmet when an axe splits your head!'",
        desc2: "Mugas Ruktar, Orcish Berserker",
        desc3: "Open from dawn to dusk!",
        isQuestGiver: false,
        isShop: true,
        isDayTime: true,
        isNightTime: false,
        eventList: "none",
        index: 3,
    },
];

let FieldPlaces = [
    {
        name : "Caves",
        desc : "You can descend into the very belly of the Earth. Mind you, it is a foul place."
    },
    {},
]

export default CityPlaces;