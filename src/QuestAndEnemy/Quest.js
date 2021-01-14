const Quest =
{
    recipent: "",
    giver: "",
    area: "",
    rewardGold: 200,
    rewardXp: 25,
    hpLoss: 40,
    checkedStat: 5,
    areas: ["the hills", "the woods", "the fields"],
    events: ["hermit", "thief", "wolf"],
    get questStarted() { return "" + this.recipent + " has left for " + this.area + "." },
    get questDoneText() { return "" + this.recipent + " has returned from the quest given by " + this.giver + "." },
    get foundHermit() {
        return this.recipent + " has come across a hermit playing with the trinkets the " +
            this.giver + " needs. The hermit values wits and wisdom above all. He waves at " +
            this.recipent + " and asks,"
    },
    challengesHermit: ["'What breaks yet never falls, and what falls yet never breaks?' asks the hermit.",
        "'What goes through cities and fields, but never moves?' asks the hermit.",
        "'I have lakes with no water, mountains with no stone and cities with no buildings. What am I?' asks the hermit."]
    ,
    get challengeSuccessHermit() {
        return ["'The day, and the night,' says " + this.recipent + ". \n The hermit nods his head in approval, and hands " + Quest.recipent + " the trinkets sought.",
        "'A road,' says " + this.recipent + ". \n The hermit nods his head in approval, and hands " + this.recipent + " the trinkets sought.",
        "'A map.,' said " + this.recipent + ". \n The hermit nods his head in approval, and hands " + this.recipent + " the trinkets sought."]
    },
    get challengeFailHermit() {
        return ["'I haven't the slightest clue,' admitted " + this.recipent + ". \n The hermit shrieks and hexes " + this.recipent + ". Then, he vanishes into thin air.",
        "'Give me a break, old man!' " + this.recipent + ". \n The hermit shrieks and hexes " + this.recipent + ". Then, he vanishes into thin air.",
        "'A delusional hermit?'" + this.recipent + " asked. \n The hermit shrieks and hexes " + this.recipent + ". Then, he vanishes into thin air."]
    },
    get SuccessHermit() { return "" + this.recipent + " returns with the trinkets sought." },
    get FailureHermit() { return "" + this.recipent + " fails to find the trinkets." },
    get foundThief() {
        return this.recipent + " has found a young man sitting by the chest the " + this.giver + " needs. The young man waves at " + this.recipent
            + " to come closer."
    },
    get challengesThief() {
        return ["The man invites " + this.recipent + " to a game of cards with an innocent smile.",
        "Just as " + this.recipent + "steps closer, the man gets to his feet, and reaches for a handbow.",
        "The man, grateful to finally have a companion, offers " + this.recipent + " a drink."]
    },
    get challengeSuccessThief() {
        return [this.recipent + " catches the man cheating, and quickly chases him away.",
        this.recipent + " dodges the shot, and knocks out the man.",
        this.recipent + " is quick to change mugs when the man glances aside. Soon, the vagabound is put to sleep by his own poison."
        ]
    },
    get challengeFailThief() {
        return [this.recipent + " loses the game, but has no coin to pay, and is chased away by the enraged man.",
        "The shot hits, but " + this.recipent + " manages to get away, albeit with a nasty wound.",
        this.recipent + " takes a swig of the drink, and feels ill. Seeing the smug smirk on the man's lips, " + this.recipent + " chases him away, but soon falls unconscious."]
    },
    get SuccessThief() { return "" + this.recipent + "takes the chest back to the " + this.giver + "." },
    get FailureThief() {
        return "" + this.recipent + " finds the chest, but it has been forced open, its treasures gone. "
    },
    get foundWolf() {return "" + this.recipent + " has come across an angry-looking wolf near the marked tree stump."},
    get challengesWolf() {return ["The wolf snarls as it circles around " + this.recipent + ". There is hunger in its golden-eyes. All of a sudden, it leaps!",
    "" + this.recipent + " notices how full the wolf's belly is. Also, there is a red, hooded cape not so far from them. It must have belonged to the wolf's previous prey.",
    "As " + this.recipent + " takes a second, closer look, it becomes evident the wolf is protecting its litter of pups. Knowing it's better to end them while they are small, "
    + this.recipent + " tries to end the wolf and the pups."]},
    get challengeSuccessWolf() {return ["" + this.recipent + " manages not only to avoid the vicious wolf, but also to end its miserable life.",
    "" + this.recipent + " slays the wolf, and cuts open its belly. Behold! A young girl and her grandmother emerge!",
    "" + this.recipent + " kills the wolf quickly, and then takes care of the wolflings. They try to fight back, alas, to no avail."]},
    get challengeFailWolf() { return ["The wolf's teeth leave a bloody mark, and " + this.recipent + " decides to flee. It's pointless to linger around for another!",
    "The wolf, despite its enormous belly slowing it down, manages to chase " + this.recipent + " away.",
    "Driven by instinct to protect the little ones, the wolf bites and scratches relentlessly, chasing " + this.recipent + " away."]},
    get SuccessWolf() { return "" + this.recipent + " takes the dead-drop hidden in the stump back to the " + this.giver + "."},
    get FailureWolf() { return "" + this.recipent + " fails to find the dead-drop."
}
}

export default Quest;