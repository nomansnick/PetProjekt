import React, {useEffect, useState} from "react";
import ButtonGeneric from "./ButtonGeneric";
import styled from "styled-components";
import "./App.css";
import {getHealth } from "./Data/CharData/charStatFunctions"

const DropDownDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Sides = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: space-around;
width: 20vh;
height: 20vh;
flex-wrap: wrap;
margin-top: 10%;
`;

function DropDown (props) {
    const {text, OnePlace, charList,
        dropDownCharClicked, dropDownPlaceClicked,
        Day, ForceRefresh, typ, PassedOccupant, PassedUsed, buildings} = props
    const [isShown, setIsShown] = useState(false)
    const [usedList, setUsedList] = useState(charList)
    const [Place, setPlace] = useState(OnePlace)
    const [isUsed, setIsUsed] = useState(PassedUsed)
    const [num, setNum] = useState(PassedOccupant)

    useEffect (() => {setIsShown(false)}, [Day])
    useEffect (() =>{setUsedList(charList)}, [ForceRefresh])
    useEffect (() =>{setPlace(OnePlace)}, [ForceRefresh])
    useEffect (() =>{typ == "Ming" ? setIsUsed(buildings[OnePlace.index-1].slot2)
    : setIsUsed(buildings[OnePlace.index-1].slot1)}, [ForceRefresh])

    useEffect (() =>{typ == "Ming" ? setNum(buildings[OnePlace.index-1].occupant2)
    : setNum(buildings[OnePlace.index-1].occupant1)}, [ForceRefresh])

    function DropDownClick() {
        if (!isUsed) {
        setIsShown(!isShown)
    }
        else {
            console.log(OnePlace)
            dropDownPlaceClicked(num, typ, OnePlace);
        }
    }
    
    function CharClicked(iterated, Place) {
        if (getHealth(iterated) < 60 || !iterated.rested) {
            return;
        }
            dropDownCharClicked(iterated, Place, typ);
            setIsShown(false);
    }

    return (
        <DropDownDiv>
        <ButtonGeneric text={isUsed ? usedList[num-1]?.classname
        : text} Clicked={() => DropDownClick()} />
        <Sides>{usedList.map(iterated =>
                (<button className={iterated.occupies == -1
                && isShown ? iterated.classnameSmall : "Hidden"} key={iterated.index}
                onClick={() => CharClicked(iterated, Place)}>
                    {iterated.classname}
                </button>
                ))}
        </Sides>
        </DropDownDiv>
    )
}

export default DropDown

/*


*/