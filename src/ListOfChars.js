let Chars = [
    {index: "1",
     classname: "Knight",
     title: "Knight",
     desc: "He will bash your head in, he swears on his mum.",
     name: "Knighty McKnight",
     strength: 10,
     dexterity: 2,
     intelligence: 7,
     charisma: 6,
     race: "Human",
     inventory :{
       mainhand :
      { name: "Longsword",
        type: "OneHanded",
        damage: 15,
        parryChance: 15,
      },
      offhand :
      { name: "Towershield",
        type: "OffHand",
        armor: 15,
        blockChance: 15,
      },
      body :
      { name: "Hauberk",
        type: "Body",
        armor: 25,
      },
      head :
      { name: "Winged Helm",
        type: "Head",
        armor: 25,
      },
      legs :
      { name: "Plate Boots",
        type: "Legs",
        armor: 5,
      },
    }
    },
    {index: "2",
     classname: "Ranger",
     title: "Ranger",
     desc: "Sneakiest git you will ever meet.",
     name: "The Git",
     strength: 3,
     dexterity: 8,
     intelligence: 7,
     charisma: 7,
     race: "Elf",
     inventory :{
       mainhand :
      { name: "Dagger",
        type: "Small",
        damage: 10,
        parryChance: 10,
      },
      offhand :
      { name: "Dagger",
        type: "Small",
        damage: 10,
        parryChance: 10,
      },
      body :
      { name: "Jerkin",
        type: "Body",
        armor: 15,
        dodge: 10,
      },
      head :
      { name: "Green Hood",
        type: "Head",
        armor: 5,
      },
      legs :
      { name: "Leather Boots",
        type: "Legs",
        armor: 0,
        dodge: 5,
      },
    }
    },
  ];

export default Chars;