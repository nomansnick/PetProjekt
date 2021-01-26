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
    const [fighterIndex, setFighterIndex] = useState(0);
    const [allyCount, setAllyCount] = useState(0);
    const [foeCount, setFoeCount] = useState(0);
    const [playerChar, setPlayerChar] = useState();

    useEffect(() => { setFighting(false) }, [fightMain])

    function fightSetter(bool) {
        setFighting(bool)
    }

    function playerSetter(player) {
        setPlayerChar(player)
    }

    function indexSetter(num) {
        console.log("ndexSetterKapott :" +  num)
        setFighterIndex(num)
        console.log(fighterIndex);
    }

    function foeCountSetter(num) {
        setFoeCount(num)
    }

    function allyCountSetter(num) {
        setAllyCount(num);
    }

    function setEnemies(enemies) {
        setFoeList(enemies);
    }

    function setAllies(allies) {
        setFighterList(allies);
    }

    function fight() {
        let counter = 4;
        charList.forEach(oneMan => (oneMan.isFree
            ? fighterList[fighterList.length] = oneMan : counter = counter-1))
        if (counter > 0) {
            for (let i = 0; i < fighterList.length; i ++) {
                foeList[i] = Enemies[fighterList[i].index-1]
            }
            setFighterNum(counter)
            setAllyCount(counter);
            setFoeCount(counter);
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
                    <CombatModule fighterNum={fighterNum} fighterList={fighterList}
                    foeList = {foeList} fighterIndex = {fighterIndex} indexSetter = {indexSetter}
                    setAllies = {setAllies} setEnemies = {setEnemies} foeCount = {foeCount} allyCount = {allyCount}
                    allyCountSetter = {allyCountSetter} foeCountSetter = {foeCountSetter} playerChar = {playerChar}
                    playerSetter = {playerSetter} fightSetter = {fightSetter}/>
                </CombatScreen>}
            </RightSide>

        </FrameTg>
    )
}

export default Tournament;