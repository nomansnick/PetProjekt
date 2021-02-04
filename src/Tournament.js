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

const QuarterMaster = styled.div`
flex: 3;
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;

const CombatScreen = styled.div`
display: flex;
margin-top: 10%;
width: 100%;
height: 100%;
z-index: 9;
`;

const Speech = styled.div`
font-size: 2vh;
`;

const QMText = styled.div`
display: flex;
flex-direction: column;
height: 40vh;
align-items: center;
`;

const PgDesc = styled.div`
font-size: 2vh;
text-align: center;
margin-top: 22%;
`;

const FightBlocker = styled.div`
margin-left: -46%;
margin-top: -7%;
position: absolute;
width: 100%;
height: 100%;
z-index: 8;;
`;

function Tournament(props) {
    const { charList, fightMain, win, foughtAlready, qmSaysApp } = props;
    const [fighterNum, setFighterNum] = useState();
    const [fighting, setFighting] = useState()
    const [fighterList, setFighterList] = useState([]);
    const [foeList, setFoeList] = useState([]);
    const [fighterIndex, setFighterIndex] = useState(0);
    const [allyCount, setAllyCount] = useState(0);
    const [foeCount, setFoeCount] = useState(0);
    const [playerChar, setPlayerChar] = useState();
    const [fightLog, setFightLog] = useState("Combat Begins!")
    const [qmSays, setQMSays] = useState(qmSaysApp); 

    useEffect(() => { setFighting(false) }, [fightMain])

    function fightSetter(bool) {
        setFighting(bool)
    }

    function playerSetter(player) {
        setPlayerChar(player)
    }

    function logSetter(cucc) {
        setFightLog(cucc)
    }

    function indexSetter(num) {
        setFighterIndex(num)
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
        if (foughtAlready) {
            setQMSays("You've already fought today. Get some rest!")
            return}
        let counter = 4;
        charList.forEach(oneMan => (oneMan.isFree
            ? fighterList[fighterList.length] = oneMan : counter = counter-1))
        if (counter > 0) {
            for (let i = 0; i < fighterList.length; i ++) {
                foeList[i] = Enemies[fighterList[i].index-1]
            }
            setFightLog(["Combat begins!"]);
            setFighterNum(counter);
            setAllyCount(counter);
            setFoeCount(counter);
            setFighting(true)
        }
    }

    return (
        <FrameTg className = "Tournament">
            <LeftSide>
                <TitleTg>Tournament Grounds</TitleTg>
                <QuarterMaster>
                    <QMText>
                    <Speech>Quartermaster Bollen: {qmSays}</Speech>
                    <ButtonGeneric text="Sign up" Clicked={() => fight()} />
                    </QMText>
                    <div/>
                </QuarterMaster>
            </LeftSide>
            <RightSide>
                {!fighting && <PgDesc> You see armed men and women sparring all over the proving grounds. </PgDesc>}
                {fighting && <FightBlocker />}
                {fighting && <CombatScreen>
                    <CombatModule fighterNum={fighterNum} fighterList={fighterList} logSetter = {logSetter}
                    foeList = {foeList} fighterIndex = {fighterIndex} indexSetter = {indexSetter}
                    setAllies = {setAllies} setEnemies = {setEnemies} foeCount = {foeCount} allyCount = {allyCount}
                    allyCountSetter = {allyCountSetter} foeCountSetter = {foeCountSetter} playerChar = {playerChar}
                    playerSetter = {playerSetter} fightSetter = {fightSetter} fightLog = {fightLog} win = {win}/>
                </CombatScreen>}
            </RightSide>

        </FrameTg>
    )
}

export default Tournament;