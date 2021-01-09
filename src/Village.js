import React from "react";
import CityPlaces from "./ListOfPlaces";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";
import DropDown from "./DropDown";

const VillageDiv = styled.div`
display: flex;
justify-content: space-around;
`;

const OneBuilding = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1vh rgba(100, 100, 100, 50%) solid;
flex:1;
`;

const Title = styled.div`
font-size: 5vh;
font-weight: bold;
`;

const Center = styled.div`
text-align: center;
`;
const Righty = styled.div`
margin-top: 5%;
text-align: right;
`;

const ButtonDiv = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`;

const BottomDv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 10vh;
`;

function Village(props) {
    const {klikked, isfree, emptyIt} = props;

    return (
        <VillageDiv>
            {CityPlaces.map(OnePlace =>
            (<OneBuilding className={OnePlace.name} key={OnePlace.index}>
                <Center><Title>{OnePlace.name}</Title>
                {OnePlace.desc3}</Center>
                <div>ide jön az image</div>
                <ButtonDiv>
                {OnePlace.isQuestGiver && <DropDown text = "Take a Quest" isfree = {isfree} klikked = {klikked} emptyIt = {emptyIt}/>}
                <DropDown text = "Mingle" isfree = {isfree} klikked = {klikked} emptyIt = {emptyIt}/>
                </ButtonDiv>
                <BottomDv>
                <Center>{OnePlace.desc}</Center>
                <Righty>{OnePlace.desc2}</Righty>
                </BottomDv>
            </OneBuilding>
            ))}
        </VillageDiv>
    )
}

export default Village;