const Quest = {
    rewardGold: 200,
    rewardXp: 25,
    hpLoss: 40,
    checkedStat: 5,
    areas: ["the hills", "the woods", "the fields",],
    enemies: ["hermit", "thief", "wolf",],
}

function questStarted(recipent, area) { return "" + recipent + " has left for " + area + "." }
function questDoneText(recipent, giver) { return "" + recipent + " has returned from the quest given by " + giver + "." }

function found(enemy, recipent, giver) {
    switch (enemy) {
        case "hermit": return recipent + " has come across a hermit playing with the trinkets the " +
            giver + " needs. The hermit values wits and wisdom above all. He waves at " +
            recipent + " and asks,";
        case "wolf": return "" + recipent + " has come across an angry-looking wolf near the marked tree stump.";
        case "thief": return "" + recipent + " has found a young man sitting by the chest the " + giver + " needs. The young man waves at " + recipent
            + " to come closer."
    }
}

function challenges(enemy, recipent, num) {
    switch (enemy) {
        case "hermit": switch (num) {
            case 1: return "'What breaks yet never falls, and what falls yet never breaks?' asks the hermit.";
            case 2: return "'What goes through cities and fields, but never moves?' asks the hermit.";
            case 3: return "'I have lakes with no water, mountains with no stone and cities with no buildings. What am I?' asks the hermit.";
        }
        case "wolf": switch (num) {
            case 1: return "The wolf snarls as it circles around " + recipent + ". There is hunger in its golden-eyes. All of a sudden, it leaps!";
            case 2: return "" + recipent + " notices how full the wolf's belly is. Also, there is a red, hooded cape not so far from them. It must have belonged to the wolf's previous prey."    
            case 3: return "As " + recipent + " takes a second, closer look, it becomes evident the wolf is protecting its litter of pups. Knowing it's better to end them while they are small, "
            + recipent + " tries to end the wolf and the pups."
        }
        case "thief": switch (num) {
            case 1: return "The man invites " + recipent + " to a game of cards with an innocent smile."
            case 2: return "Just as " + recipent + "steps closer, the man gets to his feet, and reaches for a handbow."
            case 3: return "The man, grateful to finally have a companion, offers " + recipent + " a drink."
        }
    }
}

function challengesSuccess(enemy, recipent, num) {
    switch (enemy) {
        case "hermit": switch (num) {
            case 1: return "'The day, and the night,' says " + recipent + ". \n The hermit nods his head in approval, and hands " + recipent + " the trinkets sought."
            case 2: return "'A road,' says " + recipent + ". \n The hermit nods his head in approval, and hands " + recipent + " the trinkets sought."
            case 3: return "'A map,' says " + recipent + ". \n The hermit nods his head in approval, and hands " + recipent + " the trinkets sought."
        }
        case "wolf": switch (num) {
            case 1: return "" + recipent + " manages not only to avoid the vicious wolf, but also to end its miserable life."
            case 2: return "" + recipent + " slays the wolf, and cuts open its belly. Behold! A young girl and her grandmother emerge!"
            case 3: return "" + recipent + " kills the wolf quickly, and then takes care of the wolflings. They try to fight back, alas, to no avail."
        }
        case "thief": switch (num) {
            case 1: return "" + recipent + " catches the man cheating, and quickly chases him away."
            case 2: return "" + recipent + " dodges the shot, and knocks out the man."
            case 3: return "" + recipent + " is quick to change mugs when the man glances aside. Soon, the vagabound is put to sleep by his own poison."
        }
    }
}

function challengeFail(enemy, recipent, num) {
    switch (enemy) {
        case "hermit": switch (num) {
            case 1: return "'I haven't the slightest clue,' admits " + recipent + ". \n The hermit shrieks and hexes " + recipent + ". Then, he vanishes into thin air."
            case 2: return "'Give me a break, old man!' " + recipent + "exclaims. \n The hermit shrieks and hexes " + recipent + ". Then, he vanishes into thin air."
            case 3: return "'A delusional hermit?'" + recipent + " asks. \n The hermit shrieks and hexes " + recipent + ". Then, he vanishes into thin air."
        }
        case "wolf": switch (num) {
            case 1: return "The wolf's teeth leave a bloody mark, and " + recipent + " decides to flee. It's pointless to linger around for another!"
            case 2: return "The wolf, despite its enormous belly slowing it down, manages to chase " + recipent + " away."
            case 3: return "Driven by instinct to protect the little ones, the wolf bites and scratches relentlessly, chasing " + recipent + " away."
        }
        case "thief": switch (num) {
            case 1: return "" + recipent + " loses the game, but has no coin to pay, and is chased away by the enraged man."
            case 2: return "The shot hits, but " + recipent + " manages to get away, albeit with a nasty wound."
            case 3: return "" + recipent + " takes a swig of the drink, and feels ill. Seeing the smug smirk on the man's lips, " + recipent + " chases him away, but soon falls unconscious."
        }
    }

}

function success(enemy, recipent, giver){
    switch(enemy) {
        case "hermit": return "" + recipent + " returns with the trinkets sought."
        case "thief": return  "" + recipent + "takes the chest back to the " + giver + ".";
        case "wolf": return  "" + recipent + " takes the dead-drop hidden in the stump back to the " + giver + ".";
    }
}

function fail(enemy, recipent){
    switch(enemy) {
        case "hermit": return "" + recipent + " fails to find the trinkets."
        case "thief": return  "" + recipent + " finds the chest, but it has been forced open, its treasures gone.";
        case "wolf": return  "" + recipent + " fails to find the dead-drop.";
    }
}

export {Quest, questDoneText, questStarted, found, challenges, challengesSuccess, challengeFail, success, fail};