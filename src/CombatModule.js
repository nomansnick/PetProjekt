import { fireEvent } from "@testing-library/react";
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
flex-direction: column;
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
    const [fightingLog, setFightingLog] = useState([]);
    const [allyCounter, setAllyCounter] = useState();
    const [foeCounter, setFoeCounter] = useState();
    const [refresherLocal, setRefresherLocal] = useState(false);

    let countAlly = 0;
    let countEnemy = 0;

    let fightLog = ["Combat begins"];

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
        fightLog= [combatLog("" + currentFighter.name + " drinks a health potion.")].concat(fightLog);
    }

    function woundedCheck(currentFighter) {
        return Math.floor((getMaxHealth(currentFighter) - getHealth(currentFighter)) / getMaxHealth(currentFighter)) * 100;
    }

    function faintCheck(fighter, fight) {
        console.log(fighter)
        console.log(getHealth(fighter))
        if (getHealth(fighter) < getMaxHealth(fighter) / 5) {

            combatList = fight.filter(item => item !== fighter);
            fighter.pc == true ? countAlly = countAlly - 1 : countEnemy = countEnemy - 1;
            console.log(countAlly);
            groupUpdater(fight)
            fightLog = [combatLog("" + fighter.name + " faints.")].concat(fightLog);
        }
    }

    function combatLog(message) {
        console.log(message)
        return message;
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

    function beginCombat() {
        setCombat(true);
        countEnemy = combatList.filter(element => element.pc == false).length;
        countAlly = combatList.filter(element => element.pc == true).length;
        combatList.sort((a, b) => (a.dexterity + racialBonus(a.race, "dexterity") < b.dexterity + racialBonus(b.race, "dexterity") ? 1 : -1))
        while (countAlly > 0 && countEnemy > 0) {
            for (let i = 0; i < combatList.length; i++) {
                if (countAlly == 0) { return }
                if (countEnemy == 0) { return }
                let currentFighter = combatList[i]
                npcTurn(currentFighter);
            }
        }
        console.log(combatLog);
        setFightingLog(combatLog);
        return;
    }

    function npcTurn(currentFighter) {
        if (woundedCheck(currentFighter) > 70) {
            woundedAction(currentFighter)
        }
        else {
            npcNotWoundedBranch(currentFighter)
        }
    }

    function npcNotWoundedBranch(currentFighter) {
        let decisionWeighter = whatToDo(combatList, currentFighter);
        let targetAttack = combatList.filter(element => element.index == decisionWeighter.attack.id)
        targetAttack = targetAttack[0];
        let targetHeal = combatList.filter(element => element.index == decisionWeighter.heal.id)
        targetHeal = targetHeal[0];
        decisionWeighter.attack.weight > decisionWeighter.heal.weight ? attack(currentFighter, targetAttack, combatList) : heal(currentFighter, targetHeal);
    }

    function heal(currentFighter, targetHeal) {
        targetHeal.health < targetHeal.getMaxHealth - 25 ?
            targetHeal.health = targetHeal.health + 25 : targetHeal.health = targetHeal.maxHealth;
        fightLog = [combatLog("" + currentFighter.name + " heals " + targetHeal.name + ".")].concat(fightLog);
    }

    function attack(attacker, victim, fight) {
        let dmg = getDmgOutGoing(attacker)
        let inc = getDmgIncoming(victim, dmg);
        victim.health = victim.health - inc;
        victim.pc ? countAlly = combatList.filter(element => element.pc == true).length : countEnemy = combatList.filter(element => element.pc == false).length;
        setRefresherLocal(!refresherLocal)
        fightLog = [combatLog("" + attacker.name + " attacks " + victim.name + ", dealing " + inc + " dmg.")].concat(fightLog);
        faintCheck(victim, fight);
    }

    function whatToDo(fight, fighter) {
        let answer = { attack: { id: 0, weight: 65 }, heal: { id: 0, weight: 0, } }
        let foesNallies = foesAndAllies(fight, fighter);
        foesNallies.foes.sort((a, b) => (getHealth(a) > getHealth(b) ? 1 : -1));
        answer.attack.id = foesNallies.foes[0].index;
        foesNallies.allies.sort((a, b) => (getHealth(a) / getMaxHealth(0) > getHealth(b) / getMaxHealth(b) ? 1 : -1));
        answer.heal.id = foesNallies.allies[0].index;
        answer.heal.weight = Math.floor((getMaxHealth(foesNallies.allies[0]) - getHealth(foesNallies.allies[0])) / getMaxHealth(foesNallies.allies[0])) * 100;
        answer.heal.weight = answer.heal.weight + ((fighter.intelligence - fighter.strength) * 10)
        return answer
    }

    function foesAndAllies(fight, fighter) {
        let npcs = fight.filter(item => item.pc == false);
        let pcs = fight.filter(item => item.pc == true);
        let holder = {foes : "", allies : ""};
        if (fighter.pc) {
            holder.foes = npcs;
            holder.allies = pcs}
        else {holder.foes = pcs;
            holder.allies = npcs;}
        return holder;
    }

    return (
        <FightFrame>
            <FightTitle>{fighterNum} vs {fighterNum}</FightTitle>
            <FightBody>
                <SideList>{allies.map(element => (<div key={element.index}><div>{element.name}</div><div>{getHealth(element)}/{getMaxHealth(element)}</div></div>))}</SideList>
                <SideList>{enemies.map(enemy => (<div key={enemy.index}><div>{enemy.name}</div><div>{getHealth(enemy)}/{getMaxHealth(enemy)}</div></div>))}</SideList>
            </FightBody>
            {!combat && <FightFooter>
                <ButtonResizer><ButtonGeneric text="Prove Your Worth!" Clicked={() => beginCombat()} /></ButtonResizer>
            </FightFooter>}
            {combat && <FightFooter>
                <ButtonResizer>{fightingLog.slice(0, 5).map(log => <div key = {log}>{log}</div>)}</ButtonResizer>
            </FightFooter>}
        </FightFrame>
    )
}

export default CombatModule;