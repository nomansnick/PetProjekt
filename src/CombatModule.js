import React, { useState } from "react"
import styled from "styled-components"
import ButtonGeneric from "./ButtonGeneric"
import Enemies from "./QuestAndEnemy/Enemies.json"
import {getHealth, getMaxHealth} from "./Data/CharData/charStatFunctions";

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



function CombatModule(props) {
    const { fighterNum, fighterList } = props
    const [enemList, setEnemyList] = useState(Enemies)
    const [combat, setCombat] = useState(false)

    function fightLog() {
        return "HARC"
    }
    return (
        <FightFrame>
            <FightTitle>{fighterNum} vs {fighterNum}</FightTitle>
            <FightBody>
                <SideList>{fighterList.map(element => (<div key = {element.index}><div>{element.name}</div><div>{getHealth(element)}/{getMaxHealth(element)}</div></div>))}</SideList>
                <SideList>{fighterList.map(element => (<div key = {element.index}><div>{enemList[element.index - 1].name}</div><div>{getHealth(enemList[element.index - 1])}/{getMaxHealth(enemList[element.index - 1])}</div></div>))}</SideList>
            </FightBody>
            {!combat && <FightFooter> <ButtonGeneric text="Prove Your Worth!" Clicked={() => console.log(fighterList)} /></FightFooter>}
            {combat && fightLog()}
        </FightFrame>
    )
}

export default CombatModule;