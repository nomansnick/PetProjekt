import React, {useEffect, useState} from "react";
import ButtonGeneric from "./ButtonGeneric";
import styled from "styled-components";
import Chars from "./ListOfChars";
import "./App.css";

const DropDownDiv = styled.div`
display: flex;
flex-direction: column;
`;

const Sides = styled.div`
display: flex;
flex-direction: row;
`;

function DropDown (props) {
    const {text, OnePlace, charList,
        dropDownCharClicked, dropDownPlaceClicked,
        isFreeArray, emptyIt, leavesPost, Day} = props
    const [isShown, setIsShown] = useState(false)
    const [isUsed, setIsUsed] = useState(false)
    const [num, setNum] = useState(-1)

    useEffect (() => {setIsUsed(false)}, [Day])

    function DropDownClick() {
        if (!isUsed) {
        setIsShown(!isShown)
        console.log(isFreeArray)
    }
        else {
            console.log(OnePlace)
            leavesPost(num);
            dropDownPlaceClicked(num);
            setIsUsed(false);
            setNum(-1);
        }
    }
    
    function CharClicked(iterated, text, onePlace) {
        if (isUsed) {
            console.log("NoMoreRoomInHell")
        }
        else {
            dropDownCharClicked(iterated, text, onePlace);
            setNum(iterated.index-1);
            setIsUsed(true);
            setIsShown(false);
            emptyIt(iterated.index);
        }
    }

    return (
        <DropDownDiv>
        <ButtonGeneric text={isUsed ? charList[num]?.classname
        : text} Clicked={() => DropDownClick()} />
        <Sides>{charList.map(iterated =>
                (<button className={isFreeArray[iterated.index-1]
                && isShown ? iterated.classname : "Hidden"} key={iterated.index}
                onClick={() => CharClicked(iterated, text, OnePlace)}>
                    {iterated.classname}
                </button>
                ))}
        </Sides>
        </DropDownDiv>
    )
}

export default DropDown

