import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";
import { questStarted, questDoneText, found, challenges, challengesSuccess, challengeFail, success, fail } from "./QuestAndEnemy/QuestV2";

const Blocker = styled.div`
position: absolute;
background-color: rgba(100,100,100,0.4);
height: 100%;
width: 99%;
z-index: 4;
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
    const { char, quest, forceRefresh, updateStats, buildings, endDone, nextRound, env } = props
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

    useEffect(() => { setUsedQuest(quest) }, [forceRefresh])
    useEffect(() => { setOneChar(char) }, [forceRefresh])

    let random;

    function challangeSetter(oneCharSetter) {
        setRecipent(oneCharSetter.name);
        random = Math.floor(Math.random() * Math.floor(3))
        setEnemy(usedQuest.enemies[random]);
        random = Math.floor(Math.random() * Math.floor(3))
        setArea(usedQuest.areas[random]);
        random = Math.floor(Math.random() * Math.floor(3))
        setUsedRand(random)
        setGiver(buildings[oneCharSetter.occupies - 1].giver)
    }

    function challengeAccepted(oneCharAcc) {
        challangeSetter(oneCharAcc)
        CheckedStatChecker();
        setChallenge(true);
        racialBonus(oneCharAcc.race, 1, 2)
        oneCharAcc[checkedStat] > quest.checkedStat ? setSuccess(true) : setSuccess(false);
        racialBonus(oneCharAcc.race, -1, -2)
        challengeEffect()
        IsShown(true);
    }

    function CheckedStatChecker() {
        enemy == "hermit" ? setCheckedStat("intelligence") : enemy == "thief"
            ? setCheckedStat("dexterity") : setCheckedStat("strength")
    }

    function challengeEffect() {
        if (chalSuccess) {
            usedEnv.gold = usedEnv.gold + usedQuest.rewardGold + 75;
            oneChar.xp = oneChar.xp + usedQuest.rewardXp + 25;
            oneChar.hp > 20 ? oneChar.hp = oneChar.hp - 20 : oneChar.hp = 1;
        } else {
            oneChar.hp > 60 ? oneChar.hp = oneChar.hp - 60 : oneChar.hp = 1;
            oneChar.xp = oneChar.xp + usedQuest.rewardXp - 10;
        }
    }

    function racialBonus(string, num1, num2) {
        switch (string) {
            case "elf":
                oneChar.dexterity = oneChar.dexterity + num1;
                oneChar.intelligence = oneChar.intelligence + num2;
                oneChar.charisma = oneChar.charisma + num1;
                break;
            case "dwarf":
                oneChar.intelligence = oneChar.intelligence + num1;
                oneChar.constitution = oneChar.constitution + num2;
                oneChar.strength = oneChar.strength + num1;
                break;
            case "human":
                oneChar.dexterity = oneChar.intelligence + num1;
                oneChar.strength = oneChar.constitution + num2;
                oneChar.charisma = oneChar.strength + num1;
                break;
            case "fay":
                oneChar.intelligence = oneChar.intelligence + num1;
                oneChar.constitution = oneChar.constitution + num2;
                oneChar.dexterity = oneChar.dexterity + num1;
                break;
        }
    }

    function challengeSkipped(oneCharSk) {
        challangeSetter(oneCharSk)
        console.log("SKIPPED")
        usedEnv.gold = usedEnv.gold + usedQuest.rewardGold;
        oneCharSk.xp = oneCharSk.xp + usedQuest.rewardXp;
        oneCharSk.hp > 20 ? oneCharSk.hp = oneCharSk.hp - 20 : oneCharSk.hp = 1;
        setChallenge(false);
        IsShown(true);
    }

    function nextOne(oneChar) {
        setUpdating(true);
        setChallenge(false);
        if (oneChar.index != 4) {
            updateStats(oneChar)
            nextRound(oneChar)
            IsShown(false)
            setUpdating(false);
        }
        else {
            setUpdating(false);
            updateStats(oneChar);
            IsShown(false)
            endDone();
        }
    }

    return (
        <div>
            <FrameEndDay>
                <PicHolderDiv />
                <FrameQuest>
                    {updating && <BlockerMini />}
                    {oneChar.Questing != "Quest" && !updating
                        && (<RestDiv>
                            <div>{oneChar.name} rests now.</div>
                            <ButtonGeneric text="I see." Clicked={() => nextOne(oneChar)} />
                        </RestDiv>

                        )}
                    {oneChar.Questing == "Quest" && !shown && !updating &&
                        <RestDiv>
                            <div> {questStarted(oneChar.name, quest.areas[Math.floor(Math.random() * Math.floor(3))])} </div>
                            <div><ButtonGeneric text="Attempt challenge" Clicked={() => challengeAccepted(oneChar)} /></div>
                            <div><ButtonGeneric text="Avoid challenge" Clicked={() => challengeSkipped(oneChar)} /></div>
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
                        {shown ? <QuestItem>
                            <div>
                                {questDoneText(recipent, giver)}
                            </div>
                            <div>
                                <ButtonGeneric text="I see." Clicked={() => nextOne(oneChar)} />
                            </div>
                        </QuestItem> : <div />}
                    </QuestDiv>
                </FrameQuest>
            </FrameEndDay>
            <Blocker />
        </div>
    )
}

export default EndOfDayEvent;