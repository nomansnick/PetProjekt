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

function CharCard({myContent, Katt, increaseStat}) {

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
        {myContent.skillpoints > 0 ? <div>Level up! {myContent.skillpoints} </div> : <div> Level: {myContent.lvl}</div>}
        <div>Experience: {myContent.xp}</div>
        <div onClick = {() => increaseStat("strength", myContent)}>STR: {myContent.strength}</div>
        <div onClick = {() => increaseStat("constitution", myContent)}>CON: {myContent.constitution}</div>
        <div onClick = {() => increaseStat("dexterity", myContent)}>DXT: {myContent.dexterity}</div>
        <div onClick = {() => increaseStat("intelligence", myContent)}>INT: {myContent.intelligence}</div>
        <div onClick = {() => increaseStat("charisma", myContent)}>CHR: {myContent.charisma}</div>
        </StatInner>
        </Statistics>
        <div>
        <DescBottom>{myContent.desc}</DescBottom>
        </div>
        </KartyaDiv>
    )
}

export default CharCard;