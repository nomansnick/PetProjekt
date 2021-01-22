import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";
import { questStarted, questDoneText, found, challenges, challengesSuccess, challengeFail, success, fail } from "./QuestAndEnemy/QuestV2";
import { racialBonus, getHealth, getMaxHealth } from "./Data/CharData/charStatFunctions";

const Blocker = styled.div`
position: absolute;
background-color: rgba(100,100,100,0.4);
height: 100%;
width: 99%;
z-index: 6;
`;

const BlockerMini = styled.div`
position: absolute;
background-color: grey;
height: 100%;
width: 100%
`;

const RestDiv = styled.div`
display: flex;
height: 55%;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

const QuestDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const QuestItem = styled.div`
text-align: center;`

const FrameEndDay = styled.div`
border: 1vh black solid;
position: absolute;
margin-top: 10%;
margin-left: 35%;
width: 40%;
height: 50%;
background-color: grey;
z-index: 7;
display: flex;
flex-direction: column;
`;

const FrameQuest = styled.div`
display: flex;
flex-direction: column;
flex: 2;
`;

const PicHolderDiv = styled.div`
display: flex;
flex: 4;
background-color: grey;
`;

function EndOfDayEvent(props) {
    const { char, gatherQuest, quest, gainFactionPoint, forceRefresh,
        updateStats, challengeSuccessfulStat, challengeFailStat, buildings, endDone, nextRound, env } = props
    const [challenge, setChallenge] = useState(false)
    const [shown, IsShown] = useState(false)
    const [chalSuccess, setSuccess] = useState(false)
    const [usedQuest, setUsedQuest] = useState(quest);
    const [oneChar, setOneChar] = useState(char);
    const [usedRand, setUsedRand] = useState()
    const [updating, setUpdating] = useState(false)
    const [checkedStat, setCheckedStat] = useState();
    const [usedEnv, setUsedEnv] = useState(env)
    const [enemy, setEnemy] = useState();
    const [giver, setGiver] = useState();
    const [recipent, setRecipent] = useState();
    const [area, setArea] = useState();
    const [challengeDone, setChallengeDone] = useState(false)

    useEffect(() => { setUsedQuest(quest) }, [forceRefresh])
    useEffect(() => { setOneChar(char) }, [forceRefresh])

    let random;

    function challengeAccepted(oneCharAcc, usedQuest) {
        random = Math.floor(Math.random() * Math.floor(3))
        setUsedRand(random + 1)
        setChallenge(true);
        IsShown(true);
        questSetter(oneCharAcc, usedQuest, true);
    }


    function CheckedStatChecker(string, oneCharAcc, usedQuest) {
        if (string == "hermit") {
            statCheckerToSuccessChecker("intelligence", oneCharAcc, usedQuest);
            return;
        }
        if (string == "thief") {
            statCheckerToSuccessChecker("dexterity", oneCharAcc, usedQuest);
            return;
        }
        statCheckerToSuccessChecker("strength", oneCharAcc, usedQuest);

    }

    function statCheckerToSuccessChecker(statType, oneCharAcc, usedQuest) {
        setCheckedStat(statType);
        SuccessChecker(oneCharAcc, statType, usedQuest)
    }

    function SuccessChecker(oneCharCheck, stat, usedQuest) {
        if (oneCharCheck[stat] + racialBonus(oneCharCheck.race, stat) > usedQuest.checkedStat) {
            setSuccess(true);
            setChallengeDone(true);
            challengeSuccessfulStat(oneCharCheck, usedQuest, 75, 25, -20);
            return;
        }
        else {
        setSuccess(false);
        setChallengeDone(true);
        challengeFailStat(oneCharCheck, usedQuest)}
    }

    function challengeSkipped(oneCharSk, usedQuest) {
        questSetter(oneCharSk, usedQuest, false);
    }

    function questSetter(oneChar, usedQuest, bool) {
        setRecipent(oneChar.name);
        random = Math.floor(Math.random() * Math.floor(3))
        setArea(usedQuest.areas[random]);
        random = Math.floor(Math.random() * Math.floor(3))
        setGiver(buildings[oneChar.occupies - 1].giver);
        random = Math.floor(Math.random() * Math.floor(3))
        setEnemy(usedQuest.enemies[random]);
        if (bool == true) {
            CheckedStatChecker(usedQuest.enemies[random], oneChar, usedQuest)
            return;
        }
        else {
            console.log(bool)
            IsShown(true);
            setChallenge(false);
            challengeSuccessfulStat(oneChar, usedQuest, 0, 0, -20);
        }
    }

    function nextOne(oneChar) {
        setUpdating(true);
        setChallenge(false);
        setChallengeDone(false);
        IsShown(false)
        if (oneChar.index != 4) {
            updateStats(oneChar)
            nextRound(oneChar)
            setUpdating(false);
        }
        else {
            setUpdating(false);
            updateStats(oneChar);
            endDone();
        }
    }

    function resting(oneChar) {
        getHealth(oneChar) < getMaxHealth(oneChar) - 31
            ? oneChar.health = oneChar.health + 30
            : oneChar.health = oneChar.maxHealth;
        console.log("resting");
        nextOne(oneChar)
    }

    function mingling(oneChar) {
        if (oneChar.occupies != 2) {
            if (oneChar.charisma + racialBonus(oneChar.race, "charisma") > 7) {
                gainFactionPoint("Villagers", 20)
            } else {
                gainFactionPoint("Villagers", 5)
            }
        }
        else {
            if (oneChar.charisma + racialBonus(oneChar.race, "charisma") > 7) {
                gainFactionPoint("Guild", 20)
            } else {
                gainFactionPoint("Guild", 5)
            }
        }
        gatherQuest()
        nextOne(oneChar)
    }

    return (
        <div>
            <FrameEndDay>
                <PicHolderDiv />
                <FrameQuest>
                    {updating && <BlockerMini />}
                    {oneChar.Questing == "Ming" && !updating
                        && (<RestDiv>
                            <div>{oneChar.name} mingles with the locals.</div>
                            <ButtonGeneric text="I see." Clicked={() => mingling(oneChar)} />
                        </RestDiv>
                        )}
                    {oneChar.Questing == " " && !updating
                        && (<RestDiv>
                            <div>{oneChar.name} rests now.</div>
                            <ButtonGeneric text="I see." Clicked={() => resting(oneChar)} />
                        </RestDiv>
                        )}
                    {oneChar.Questing == "Quest" && !shown && !updating &&
                        <RestDiv>
                            <div> {questStarted(oneChar.name, quest.areas[Math.floor(Math.random() * Math.floor(3))])} </div>
                            <div><ButtonGeneric text="Attempt challenge" Clicked={() => challengeAccepted(oneChar, usedQuest)} /></div>
                            <div><ButtonGeneric text="Avoid challenge" Clicked={() => challengeSkipped(oneChar, usedQuest)} /></div>
                        </RestDiv>}
                    <QuestDiv>
                        {shown && challenge &&
                            <QuestItem>
                                <div> {found(enemy, recipent, giver)} </div>
                                <div> {challenges(enemy, recipent, usedRand)} </div>
                                <div>
                                    {chalSuccess
                                        ? <div>
                                            <div> {challengesSuccess(enemy, recipent, usedRand)} </div>
                                            <div> {success(enemy, recipent, giver)} </div>
                                        </div>
                                        : <div>
                                            <div> {challengeFail(enemy, recipent, usedRand)} </div>
                                            <div> {fail(enemy, recipent)} </div>
                                        </div>
                                    }
                                </div>
                            </QuestItem>
                        }
                        {shown && (!challenge || challengeDone) && <QuestItem>
                            <div>
                                {questDoneText(recipent, giver)}
                            </div>
                            <div>
                                <ButtonGeneric text="I see." Clicked={() => nextOne(oneChar)} />
                            </div>
                        </QuestItem>}
                    </QuestDiv>
                </FrameQuest>
            </FrameEndDay>
            <Blocker />
        </div>
    )
}

export default EndOfDayEvent;