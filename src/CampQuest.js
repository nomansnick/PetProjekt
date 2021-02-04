import React, { useState, useEffect } from "react";
import { MQ1 } from "./QuestAndEnemy/MainQuest1";
import styled from "styled-components";

const TextDiv = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
font-size: 2vh;
`;

const WidthSetter = styled.div`
width: 60%;
`;

function CampQuest(props) {
    const { quest, env, Catch, Fail, clueOne, clueTwo, clueThree,
        clueFour, clueFive, clueSix } = props

    function questSetter(quest) {
        switch (quest) {
            case 1: return clueSetter()
        }
    }

    function clueSetter() {
        if (env.mainQuest1Clue1 && env.mainQuest1Clue2 && env.mainQuest1Clue3) {
            return (clueToUse(MQ1.Clue1.BadText1, MQ1.Clue1.GoodText1, MQ1.Clue1.BadText2, MQ1.Clue1.GoodText2, MQ1.Clue1.BadText3,
                MQ1.Clue2.BadText1, MQ1.Clue2.GoodText1, MQ1.Clue2.BadText2, MQ1.Clue2.GoodText2, MQ1.Clue2.BadText3,
                MQ1.Clue3.BadText1, MQ1.Clue3.GoodText1, MQ1.Clue3.BadText2, MQ1.Clue3.GoodText2, MQ1.Clue3.BadText3)
            )
        }
    }

    function clueToUse(var1, var2, var3, var4, var5,
        var6, var7, var8, var9, var10,
        var11, var12, var13, var14, var15) {
        return (<TextDiv>
            <WidthSetter>
                <span onClick = {() => Fail()}>{var1}</span>
                <span className = {clueOne} onClick = {() => Catch(quest, 1)}>{var2}</span>
                <span onClick = {() => Fail()}>{var3}</span>
                <span className = {clueTwo} onClick = {() => Catch(quest, 2)}>{var4}</span>
                <span onClick = {() => Fail()}>{var5}</span>
            </WidthSetter>
            <WidthSetter>
                <span onClick = {() => Fail()}>{var6}</span>
                <span className = {clueThree} onClick = {() => Catch(quest, 3)}>{var7}</span>
                <span onClick = {() => Fail()}>{var8}</span>
                <span className = {clueFour} onClick = {() => Catch(quest, 4)}>{var9}</span>
                <span onClick = {() => Fail()}>{var10}</span>
            </WidthSetter>
            <WidthSetter>
                <span onClick = {() => Fail()}>{var11}</span>
                <span className = {clueFive} onClick = {() => Catch(quest, 5)}>{var12}</span>
                <span onClick = {() => Fail()}>{var13}</span>
                <span className = {clueSix} onClick = {() => Catch(quest, 6)}>{var14}</span>
                <span onClick = {() => Fail()}>{var15}</span>
            </WidthSetter>
        </TextDiv>

        )
    }

    return (
        <div>{questSetter(quest)}</div>
    )
}

export default CampQuest;