import React from "react";
import styled from "styled-components";

const FrameQuest = styled.div`
border: 1vh black solid;
position: absolute;
margin-top: 10%;
margin-left: 30%;
width: 50%;
height: 50%;
background-color: grey;
`;

const Blocker = styled.div`
position: absolute;
background-color: rgba(100,100,100,0.4);
height: 100%;
width: 99%
`;

function EndOfDayQuest(props) {
    const {charList, placeList, quests} = props
    return (
        <div>
            {charList.map(OneChar =>
        <FrameQuest>
            {OneChar.Questing == "Quest"}
        </FrameQuest>
        )}
        <Blocker/>
        </div>
    )
}

export default EndOfDayQuest;