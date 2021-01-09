import React from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";

const KartyaDiv = styled.div`
display: flex;
flex-direction: column;
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
`;

const Inventory = styled.div`
background-color: rgba(50, 50, 50, 60%)
`;

const Statistics = styled.div`
background-color: rgba(50, 50, 50, 60%)
`;

function CharCard({myContent, Katt}) {

    return (
        <KartyaDiv>
        <TitleDiv>
        <div/>
        <TitleText>{myContent.title}</TitleText>
        <div><ButtonGeneric text = "X" Clicked = {Katt}/></div>
        </TitleDiv>
        <Statistics>
        <div>Stats: </div>  
        <div>Name: {myContent.name}</div>
        <div>Strength: {myContent.strength}</div>
        <div>Dexterity: {myContent.dexterity}</div>
        <div>Intelligence: {myContent.intelligence}</div>
        <div>Charisma: {myContent.charisma}</div>
        </Statistics>
        <Inventory>
        <div>Equipped Items:</div>
        <div>Main Hand: {myContent.inventory.mainhand.name}</div>
        <div>Off-hand: {myContent.inventory.offhand.name}</div>
        <div>Headwear: {myContent.inventory.head.name}</div>
        <div>Armor: {myContent.inventory.body.name}</div>
        <div>Legwear: {myContent.inventory.legs.name}</div>
        </Inventory>
        <div>{myContent.desc}</div>
        <div>{myContent.race}</div>
        </KartyaDiv>
    )
}

export default CharCard;