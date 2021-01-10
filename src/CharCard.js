import React from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";

const KartyaDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 175vh;
`;

const TitleDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 10%;
`;

const TitleText = styled.div`
display: flex;
font-size: 4vh;
justify-content: center;
font-weight: bold;
`;

const Statistics = styled.div`
display: flex;
flex-direction: column;
height: 40vh;
justify-content: space-around;
`;

const NameDiv = styled.div`
font-weight: bold;
display: flex;
flex: 1;
margin-top: 10%;
font-size: 3vh;

`;

const DescBottom = styled.div`
text-align: center;
font-size: 2vh;
font-weight: bold;
`;

const StatInner = styled.div`
font-size: 3vh;
display: flex;
flex-direction: column;
flex: 4;
justify-content: space-around;
`;

const RaceDiv = styled.div`
text-align: center;
margin-top: -10vh;
`;

function CharCard({myContent, Katt}) {

    return (
        <KartyaDiv className = {myContent.classname}>
        <TitleDiv>
        <div className = "Hidden">"    "</div>
        <TitleText>{myContent.classname}</TitleText>
        <div><ButtonGeneric text = "X" Clicked = {Katt}/></div>
        </TitleDiv>
        <RaceDiv>{myContent.race}</RaceDiv>
        <Statistics>
        <NameDiv>
            {myContent.name}
        </NameDiv>
        <StatInner>
        <div>STR: {myContent.strength}</div>
        <div>CON: {myContent.constitution}</div>
        <div>DXT: {myContent.dexterity}</div>
        <div>INT: {myContent.intelligence}</div>
        <div>CHR: {myContent.charisma}</div>
        </StatInner>
        </Statistics>
        <div>
        <DescBottom>{myContent.desc}</DescBottom>
        </div>
        </KartyaDiv>
    )
}

export default CharCard;