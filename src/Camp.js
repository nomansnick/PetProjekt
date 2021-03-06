import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CampQuest from "./CampQuest";

const Shelf = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
font-size: 4vh;
font-weight: bold;
width: 50%;
flex: 1;
`;

const CampDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const BodyCamp = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 100%;
height: 100%;
flex: 8;
`;

const TaskDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
flex: 2;
height: 100%;
text-align: center;
`;

const QuestBodyDiv = styled.div`
display: flex;
height: 100%
`;

const UpgradesDiv = styled.div`
display: flex;
flex-direction: column;
flex: 2;
align-items: center;
`;

const CampDesc = styled.div`
display: flex;
flex-direction: column;
font-size: 3vh;
height: 10%;
`;

const TextUpgrades = styled.div`
display: flex;
height: 10%;
font-size 3vh;
justify-content: center;
`;

const UpgradesList = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 3vh;
height: 100%;
justify-content: flex-end;
`;

function Camp(props) {
    const { env, Catch, Fail, clueOne, clueTwo, clueThree, clueFour, clueFive, clueSix } = props
    const [num, setNum] = useState(1);
    const [bool, setBool] = useState(env.mainQuest1Done);

    return (
        <CampDiv>
            <BodyCamp>
                <TaskDiv className="Notes">
                    <CampDesc> <div> Threat: {env.Threat} Food: {env.Food} </div></CampDesc>
                    {!bool && <QuestBodyDiv><CampQuest quest={num} env={env} Catch={Catch} Fail={Fail}
                        clueOne={clueOne} clueTwo={clueTwo} clueThree={clueThree} clueFour={clueFour} clueFive={clueFive}
                        clueSix={clueSix}
                    /></QuestBodyDiv>}
                      <div>You can piece together whatever clues you have found! You can make only 2 mistakes in every cylce!</div>
                </TaskDiv>
                <UpgradesDiv className="Camp">
                    <div></div>
                    <TextUpgrades>Installed upgrades</TextUpgrades>
                    <UpgradesList>
                        <div>{env.hasGuards && "Guards: -2 threat, -2 food"}</div>
                        <div>{env.hasGarden && "Garden: +4 food"}</div>
                        <div>{env.hasToolkit && "Toolkit: +1 food, -1 threat"}</div>
                        <div>{env.hasTraps && "Traps: +1 food"}</div>
                        <div>{env.hasPikes && "Wooden Pikes: -1 threat"}</div>
                    </UpgradesList>
                </UpgradesDiv>
            </BodyCamp>
        </CampDiv>
    )
}

export default Camp;