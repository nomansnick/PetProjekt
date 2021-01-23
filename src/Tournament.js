import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";
import CombatModule from "./CombatModule";
import Enemies from "./QuestAndEnemy/Enemies.json"

const FrameTg = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`;
const LeftSide = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 2;
`;

const RightSide = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 3;
align-content: center;
`;

const TitleTg = styled.div`
text-align: center;
font-size: 3vh;
font-weight: bold;
`;

const CombatScreen = styled.div`
position: absolute;
display: flex;
margin-left: -35%;
width: 80%;
height: 80%;
z-index: 9;
background-color: white;
`;

const FightBlocker = styled.div`
margin-left: -46%;
margin-top: -7%;
position: absolute;
width: 100%;
height: 100%;
z-index: 8;
background-color: black;
`;

function Tournament(props) {
    const { charList, fightMain } = props;
    const [fighterNum, setFighterNum] = useState();
    const [fighting, setFighting] = useState()
    const [fighterList, setFighterList] = useState([]);
    const [foeList, setFoeList] = useState([]);

    useEffect(() => { setFighting(false) }, [fightMain])

    function fight() {
        let counter = 4;
        charList.forEach(oneMan => (oneMan.isFree
            ? fighterList[fighterList.length] = oneMan : counter = counter-1))
        if (counter > 0) {
            for (let i = 0; i < fighterList.length; i ++) {
                foeList[i] = Enemies[fighterList[i].index-1]
            }
            setFighterNum(counter)
            setFighting(true)
        }
    }

    return (
        <FrameTg>
            <LeftSide>
                <TitleTg>Tournament Grounds</TitleTg>
                <ButtonGeneric text="Sign up" Clicked={() => fight()} />
            </LeftSide>
            <RightSide>
                {fighting && <FightBlocker />}
                {fighting && <CombatScreen>
                    <CombatModule fighterNum={fighterNum} fighterList={fighterList} foeList = {foeList} />
                </CombatScreen>}
            </RightSide>

        </FrameTg>
    )
}

export default Tournament;

/*
        <div>egy gomb ami minden 50hp feletti épp szabad host groupba pakol, ugyanannyi ellenséget kijelöl</div>
        <div>otletek: guard faction a nyeresekert, fame a nyeresekért, gyakorlas - tierek fame szerint, statot novel,
            minden karakternek tier1: 1 stat, tier2 2 stat, tier 3 3 stat, osszesen 1x lehet mindet
        </div>
        <div>kombat: kor szamlalo, a kor dex alapjan szetszorja a sorrendet, attak, def, abilityOffensiv, abilityDefensiv</div>
        <div>kombat in-depth: gomb utan selectTargetOffensive v selectTargetDefensive stat, cancel gombbal ezt falsera teszed, de a korod megmarad,
            selectTarget alatt az ellenseges es saját divek gombnak megfeleloen kattinthatoak,
            ha hp 40 alá esik, akkor yieldel az illeto
        </div>
        <div>vmi goofi leiras</div>
*/

/* left side todo
        <EnrollDiv></EnrollDiv>
*/

/* CombatScreenInner -TODO
                    <CombatTitle></CombatTitle>
                    <CombatView></CombatView>
                    <CombatActions></CombatActions>
                    <CombatLog></CombatLog>
                    */