import { fireEvent } from "@testing-library/react";
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonGeneric from "./ButtonGeneric"
import { getDmgIncoming, getDmgOutGoing, getHealth, getMagicOutGoing, getMaxHealth, racialBonus } from "./Data/CharData/charStatFunctions";

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

const ActionButtons = styled.div`
display: flex;
flex-direction: column;
`;

const TargetButtons = styled.div`
flex-wrap: wrap;
`;

function CombatModule(props) {
    const { fighterNum, fighterList, fighterIndex, indexSetter, playerChar, playerSetter, fightSetter,
        foeList, setAllies, setEnemies, foeCount, foeCountSetter, allyCount, allyCountSetter, win } = props
    const [allyList, setAllyList] = useState(fighterList);
    const [enemyList, setEnemyList] = useState(foeList);
    const [combat, setCombat] = useState(false)
    const [fightingLog, setFightingLog] = useState([]);
    const [allyCounter, setAllyCounter] = useState(allyCount);
    const [foeCounter, setFoeCounter] = useState(foeCount);
    const [refresherLocal, setRefresherLocal] = useState(false);
    const [playerTurn, setPlayerTurn] = useState(false)
    const [fighterIndexLocal, setFighterIndexLocal] = useState(fighterIndex)
    const [npcTurn, setNpcTurn] = useState(false)
    const [playerAction, setPlayerAction] = useState(" ");
    const [playerTarget, setPlayerTarget] = useState(" ");
    const [hasAction, setHasAction] = useState(false);
    const [hasTarget, setHasTarget] = useState(false);

    let combatList = [...fighterList];
    combatList = combatList.concat(enemyList);
    combatList = combatList.sort((a, b) => (a.dexterity + racialBonus(a.race, "dexterity") < b.dexterity + racialBonus(b.race, "dexterity") ? 1 : -1))

    let fightLog = ["Combat begins"];

    let allies = fighterList;
    let enemies = foeList;
    let mockIndex = fighterIndexLocal;

    let playerCharLocal = playerChar;

    useEffect(() => { setFighterIndexLocal(fighterIndex) }, [refresherLocal])

    useEffect(() => { setAllyCounter(allyCount) }, [refresherLocal])
    useEffect(() => { setFoeCounter(foeCount) }, [refresherLocal])

    useEffect(() => { setAllyList(allies) }, [refresherLocal])
    useEffect(() => { setEnemyList(enemies) }, [refresherLocal])

    function woundedAction(currentFighter) {
        currentFighter.health = currentFighter.health + 25;
        fightLog = [combatLog("" + currentFighter.name + " drinks a health potion.")].concat(fightLog);
    }

    function woundedCheck(currentFighter) {
        return Math.floor((getMaxHealth(currentFighter) - getHealth(currentFighter)) / getMaxHealth(currentFighter)) * 100;
    }

    function faintCheck(fighter) {
        if (getHealth(fighter) < getMaxHealth(fighter) / 5) {
            fighter.pc == true ? allyCountSetter(allyCount - 1) : foeCountSetter(foeCount - 1);
            fightLog = [combatLog("" + fighter.name + " faints.")].concat(fightLog);
        }
    }

    function combatLog(message) {
        console.log("message" + message)
        return message;
    }

    function combatOneFighter() {
        winChecker();
        setCombat(true);
        console.log("Mock: " + mockIndex);
        if (getHealth(combatList[mockIndex]) < getMaxHealth(combatList[mockIndex]) / 5) {
            return Done() }
        let currentFighter = combatList[mockIndex];
        console.log("currentFighter: " + currentFighter.name)
        playerSetter(currentFighter)
        currentFighter.pc ? playerTurnFn(currentFighter) : npcTurnFn(currentFighter);
    }

    function playerTurnFn() {
        setPlayerAction(" ");
        setPlayerTarget(" ")
        setPlayerTurn(true);
        setNpcTurn(false);
    }

    function playerDone() {
        if (!hasTarget) {
            return;
        }
        if (!hasAction) {
            return;
        }
        doPlayerAction()
        Done();
    }

    function doPlayerAction() {
        console.log("jatekos: " + playerChar.name)
        playerAction == "Heal" ? heal(playerChar, playerTarget) : attack(playerChar, playerTarget);
    }

    function playerActionSelect(string) {
        setPlayerAction(string)
        setPlayerTarget(" ")
        setHasTarget(false)
        setHasAction(true)
    }

    function playerTargetSelect(target) {
        if (getHealth(target) < getMaxHealth(target) / 5) {
            return}
        setPlayerTarget(target)
        setHasTarget(true)
    }

    function Done() {
        nextOne();
        let check = winChecker()
        if (check.win == false) {return combatOneFighter();}
        check.side == "npc" ? win("npc") : win("pc");
        fightSetter(false);
    }

    function nextOne() {
        if (mockIndex == combatList.length - 1) {
            mockIndex = 0;
            indexSetter(0)
        }
        else {
            indexSetter(mockIndex + 1)
            mockindex = mockIndex + 1;
        }
        setAllies(allies);
        setEnemies(enemies);
        setRefresherLocal(!refresherLocal)
    }

    function winChecker() {
        let check = {win: false, side: "none"}
        if (allyCounter === 0) {
            check.win = true;
            check.side = "npc"
            return  check
        }
        if (foeCounter === 0) {
            check.win = true;
            check.side = "pc"
            return check
        }
        return check
    }

    function npcTurnFn(currentFighter) {
        setPlayerTurn(false)
        setNpcTurn(true);
        if (woundedCheck(currentFighter) > 70) {
            woundedAction(currentFighter)
        }
        else {
            npcNotWoundedBranch(currentFighter)
        }
    }

    function npcNotWoundedBranch(currentFighter) {
        let decisionWeighter = whatToDo(currentFighter);
        let targetAttack = combatList.filter(element => element.index == decisionWeighter.attack.id)
        targetAttack = targetAttack[0];
        let targetHeal = combatList.filter(element => element.index == decisionWeighter.heal.id)
        targetHeal = targetHeal[0];
        decisionWeighter.attack.weight > decisionWeighter.heal.weight ? attack(currentFighter, targetAttack, combatList) : heal(currentFighter, targetHeal);
    }

    function heal(currentFighter, targetHeal) {
        let healDone = getMagicOutGoing(currentFighter);
        console.log(healDone)
        targetHeal.health < targetHeal.maxHealth - healDone ?
            targetHeal.health = targetHeal.health + healDone : targetHeal.health = targetHeal.maxHealth;
        fightLog = [combatLog("" + currentFighter.name + " heals " + targetHeal.name + ".")].concat(fightLog);
    }

    function attack(attacker, victim) {
        let dmg = getDmgOutGoing(attacker)
        let inc = getDmgIncoming(victim, dmg);
        victim.health = victim.health - inc;
        setRefresherLocal(!refresherLocal)
        fightLog = [combatLog("" + attacker.name + " attacks " + victim.name + ", dealing " + inc + " dmg.")].concat(fightLog);
        faintCheck(victim);
    }

    function whatToDo(fighter) {
        let answer = { attack: { id: 0, weight: 65 }, heal: { id: 0, weight: 0, } }
        let enemies = livingAvailableSideCheckAttack(true)
        answer.attack.id = enemies[0].index;
        let allies = livingAvailableSideCheckHeal(false);
        answer.heal.id = allies[0].index;
        let healWeight = Math.floor((getMaxHealth(allies[0]) - getHealth(allies[0])) / getMaxHealth(allies[0])) * 100;
        answer.heal.weight = parseInt(healWeight);
        answer.heal.weight = answer.heal.weight + ((fighter.intelligence - fighter.strength) * 10);
        return answer
    }

    function livingAvailableSideCheckAttack(bool) {
        return combatList.filter(enemyFighter => enemyFighter.pc === bool).
            filter(livingEnemyFighter => getHealth(livingEnemyFighter) > getMaxHealth(livingEnemyFighter) / 5).
            sort((a, b) => (getHealth(a) > getHealth(b) ? 1 : -1));
    }

    function livingAvailableSideCheckHeal(bool) {
        return combatList.filter(friendlyFighter => friendlyFighter.pc === bool).
            filter(livingEnemyFighter => getHealth(livingEnemyFighter) > getMaxHealth(livingEnemyFighter) / 5).
            sort((a, b) => ((getHealth(a) / getMaxHealth(a)) * 100 > (getHealth(b) / getMaxHealth(b)) * 100 ? 1 : -1));
    }

    return (
        <FightFrame>
            <FightTitle>{fighterNum} vs {fighterNum}</FightTitle>
            <FightBody>
                <SideList>{allyList.map(element => (<div key={element.index}><div>{element.name}</div><div>{getHealth(element)}/{getMaxHealth(element)}</div></div>))}</SideList>
                <SideList>{enemyList.map(enemy => (<div key={enemy.index}><div>{enemy.name}</div><div>{getHealth(enemy)}/{getMaxHealth(enemy)}</div></div>))}</SideList>
            </FightBody>
            {!combat && <FightFooter>
                <ButtonResizer><ButtonGeneric text="Prove Your Worth!" Clicked={() => combatOneFighter()} /></ButtonResizer>
            </FightFooter>}
            {combat && <FightFooter>
                {playerTurn && <div>
                    <ActionButtons>
                        <ButtonResizer><ButtonGeneric text = "Attack" Clicked = {() => playerActionSelect("Attack")}/></ButtonResizer>
                        <ButtonResizer><ButtonGeneric text = "Heal" Clicked = {() => playerActionSelect("Heal")}/></ButtonResizer>
                    </ActionButtons>
                    <TargetButtons>
                        {playerAction == "Heal" &&
                            allies.map(element => (<ButtonResizer key = {element.index+21}><ButtonGeneric text={element.name} Clicked={() => playerTargetSelect(element)} /></ButtonResizer>))}
                        {playerAction == "Attack" &&
                            enemies.map(element => (<ButtonResizer key = {element.index+34}><ButtonGeneric text={element.name} Clicked={() => playerTargetSelect(element)} /></ButtonResizer>))}
                    </TargetButtons>
                    <ButtonGeneric text="PlayerDone" Clicked={() => playerDone()} />
                </div>}
                {npcTurn && <div><ButtonGeneric text="NpcDone" Clicked={() => Done()} /></div>}
                <ButtonResizer>{fightingLog.slice(0, 5).map(log => <div key={log + 7}>{log}</div>)}</ButtonResizer>
            </FightFooter>}
        </FightFrame>
    )
}

export default CombatModule;