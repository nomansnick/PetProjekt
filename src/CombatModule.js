import React, { useState } from "react"
import styled from "styled-components"
import ButtonGeneric from "./ButtonGeneric"
import { getHealth, getMaxHealth, racialBonus } from "./Data/CharData/charStatFunctions";

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

    function woundedAction(currentFighter) {
        currentFighter.health = currentFighter.health + 25;
        const tempLog = [combatLog(currentFighter, " drinks a health potion.")].concat(fightLog);
        setFightLog(tempLog);
    }

    function woundedCheck(currentFighter) {
        return Math.floor((getMaxHealth(currentFighter) - getHealth(currentFighter)) / getMaxHealth(currentFighter)) * 100;
    }

    function faintCheck(fighter, fight) {
        if (getHealth(fighter) < getMaxHealth(fighter) / 5) {
            fight = fight.filter(item => item !== fighter);
            groupUpdater(fight)
        }
    }

    function combatLog(currentFighter, message) {
        return "" + currentFighter.name + message;
    }

    function groupUpdater(fight) {
        let pcCamp = selectTeam(fight, true);
        let npcCamp = selectTeam(fight, false);
        setAllyList(pcCamp);
        setEnemyList(npcCamp);
    }

    function selectTeam(fight, bool) {
        return fight.filter(item => item.pc == bool);
    }

    function beginCombat() {
        let combatList = [...fighterList];
        combatList = combatList.concat(enemyList);
        let foeCounter = 0;
        let allyCounter = 0;
        let attempts = 0
        combatList.sort((a, b) => (a.dexterity + racialBonus(a.race, "dexterity") < b.dexterity + racialBonus(b.race, "dexterity") ? 1 : -1))
        combatList.forEach(oneFighter => (oneFighter.pc ? allyCounter = allyCounter + 1 : foeCounter = foeCounter - 1));
        console.log(combatList)
        //       while (foeCounter > 0 && allyCounter > 0) {
        while (attempts == 0) {
            for (let i = 0; i < combatList.length; i++) {
                let currentFighter = combatList[i]
                if (!currentFighter.pc) {
                    if (woundedCheck(currentFighter) > 70) {
                        woundedAction(currentFighter)
                    }
                    else {
                        let decisionWeighter = whatToDo(combatList)
                        console.log(decisionWeighter)
                        console.log("fighting")
                        decisionWeighter[0].weight > decisionWeighter[1].weight ? attempts = attempts + 1 : attempts = attempts + 1;
                    }

                }
            }
        }
    }

    function whatToDo(fight) {
        let npcs = fight.filter(item => item.pc == false);
        let pcs = fight.filter(item => item.pc == true);
        console.log(pcs)
        let answer = [{ targetId: 0, targetWeight: 65 }, { healId: 0, healWeight: 0, }]
        pcs.sort((a, b) => (getHealth(a) < getHealth(b) ? 1 : -1));
        answer[0].targetId = pcs[0].index;
        npcs.sort((a, b) => (getHealth(a) / getMaxHealth(0) > getHealth(b) / getMaxHealth(b) ? 1 : -1));
        answer[1].healId = npcs[0].index;
        answer[1].healWeight = Math.floor((getMaxHealth(npcs[0]) - getHealth(npcs[0])) / getMaxHealth(npcs[0])) * 100;
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