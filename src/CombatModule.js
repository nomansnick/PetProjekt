import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonGeneric from "./ButtonGeneric"
import { getDmgIncoming, getDmgOutGoing, getHealth, getMaxHealth, racialBonus } from "./Data/CharData/charStatFunctions";

const FightFrame = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-item: center;
justify-content: space-between;
`;

const FightTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
font-size: 4vh;
flex: 2;
`;

const FightBody = styled.div`
display: flex;
flex: 6;
flex-direction: row;
justify-content: space-between;
`;

const SideList = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const FightFooter = styled.div`
display: flex;
justify-content: center;
flex:2;
`;

const ButtonResizer = styled.div`
height: 60%;
`;

function CombatModule(props) {
    const { fighterNum, fighterList, foeList } = props
    const [allyList, setAllyList] = useState(fighterList);
    const [enemyList, setEnemyList] = useState(foeList);
    const [combat, setCombat] = useState(false)
    const [fightLog, setFightLog] = useState([])
    const [allyCounter, setAllyCounter] = useState(); 
    const [foeCounter, setFoeCounter] = useState();
    const [refresherLocal, setRefresherLocal] = useState(false);

    let countAlly = 0;
    let countEnemy = 0;

    let allies = fighterList;
    let enemies = foeList;

    let combatList = [...fighterList];
    combatList = combatList.concat(enemyList);

    useEffect(() => { setAllyCounter(countAlly) }, [refresherLocal])
    useEffect(() => { setFoeCounter(countEnemy) }, [refresherLocal])

    useEffect(() => { setAllyList(allies) }, [refresherLocal])
    useEffect(() => { setEnemyList(enemies) }, [refresherLocal])


    function woundedAction(currentFighter) {
        currentFighter.health = currentFighter.health + 25;
        const tempLog = [combatLog("" + currentFighter.name + " drinks a health potion.")].concat(fightLog);
        setFightLog(tempLog);
    }

    function woundedCheck(currentFighter) {
        return Math.floor((getMaxHealth(currentFighter) - getHealth(currentFighter)) / getMaxHealth(currentFighter)) * 100;
    }

    function faintCheck(fighter, fight) {
        console.log("faintCchekelek")
        console.log(fighter)
        console.log(getHealth(fighter))
        if (getHealth(fighter) < getMaxHealth(fighter) / 5) {
            console.log("KevesHp")
            combatList = fight.filter(item => item !== fighter);
            fighter.pc == true ? countAlly = countAlly -1 : countEnemy = countEnemy - 1;
            console.log(countAlly);
            groupUpdater(fight)
            const tempLog = [combatLog("" + fighter.name + " faints.")].concat(fightLog);
            setFightLog(tempLog);
        }
    }

    function combatLog(currentFighter, message) {
        return "" + currentFighter.name + message;
    }

    function groupUpdater(fight) {
        allies = selectTeam(fight, true);
        enemies = selectTeam(fight, false);
        console.log("AllyNew: " + allies)
        setAllyList(allies);
        console.log("AllyOld: " + allyList);
        setEnemyList(enemies);
        setRefresherLocal(!refresherLocal);
    }

    function selectTeam(fight, bool) {
        return fight.filter(item => item.pc == bool);
    }

    //VEGTELEN  CIKLUS  VALAMIERT
    function beginCombat() {
        countEnemy = combatList.filter(element => element.pc == false).length;
        countAlly = combatList.filter(element => element.pc == true).length;
        combatList.sort((a, b) => (a.dexterity + racialBonus(a.race, "dexterity") < b.dexterity + racialBonus(b.race, "dexterity") ? 1 : -1))
        while (countAlly > 0 && countEnemy > 0) {
            console.log("while")
            for (let i = 0; i < combatList.length; i++) {
                if (countAlly == 0) {return} 
                if (countEnemy == 0) {return} 
                let currentFighter = combatList[i]
                if (!currentFighter.pc) {
                    console.log("NPC")
                    if (woundedCheck(currentFighter) > 70) {
                        woundedAction(currentFighter)
                    }
                    else {
                        let decisionWeighter = whatToDo(combatList);
                        console.log(decisionWeighter)
                        console.log("fighting")
                        let targetAttack = combatList.filter(element => element.index == decisionWeighter.attack.id)
                        console.log(combatList);
                        console.log(combatList.filter(element => element.index == decisionWeighter.attack.id))
                        targetAttack = targetAttack[0];
                        let targetHeal = combatList.filter(element => element.index == decisionWeighter.heal.id)
                        targetHeal = targetHeal[0];
                        decisionWeighter.attack.weight > decisionWeighter.heal.weight ? attack(currentFighter, targetAttack, combatList) : heal(currentFighter, targetHeal);
                    }

                }
            }
        }
        console.log("end of while")
    }

    function heal() {
        console.log("not implemented yet")
    }

    function attack(attacker, victim, fight) {
        console.log("ATTACK")
        let dmg = getDmgOutGoing(attacker)
        let inc = getDmgIncoming(victim, dmg);
        victim.health = victim.health - inc;
        const tempLog = [combatLog("" + attacker.name + " attacks " + victim.name + ", dealing " + inc + " dmg.")].concat(fightLog);
        setFightLog(tempLog);
        faintCheck(victim, fight);
    }

    function whatToDo(fight) {
        let npcs = fight.filter(item => item.pc == false);
        let pcs = fight.filter(item => item.pc == true);
        console.log(pcs)
        let answer = { attack : { id: 0, weight: 65 }, heal : { id: 0, weight: 0, }}
        pcs.sort((a, b) => (getHealth(a) > getHealth(b) ? 1 : -1));
        answer.attack.id = pcs[0].index;
        npcs.sort((a, b) => (getHealth(a) / getMaxHealth(0) > getHealth(b) / getMaxHealth(b) ? 1 : -1));
        answer.heal.id = npcs[0].index;
        answer.heal.weight = Math.floor((getMaxHealth(npcs[0]) - getHealth(npcs[0])) / getMaxHealth(npcs[0])) * 100;
        return answer
    }

    return (
        <FightFrame>
            <FightTitle>{fighterNum} vs {fighterNum}</FightTitle>
            <FightBody>
                <SideList>{allyList.map(element => (<div key={element.index}><div>{element.name}</div><div>{getHealth(element)}/{getMaxHealth(element)}</div></div>))}</SideList>
                <SideList>{enemyList.map(enemy => (<div key={enemy.index}><div>{enemy.name}</div><div>{getHealth(enemy)}/{getMaxHealth(enemy)}</div></div>))}</SideList>
            </FightBody>
            {!combat && <FightFooter> <ButtonResizer><ButtonGeneric text="Prove Your Worth!" Clicked={() => beginCombat()} /></ButtonResizer></FightFooter>}
            {combat && fightLog.slice(0, 5).map(i => {
                <div>{i}</div>
            })}
        </FightFrame>
    )
}

    export default CombatModule;