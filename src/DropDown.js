import React, {useState} from "react";
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
    const {text, isfree, klikked, emptyIt} = props
    const [isShown, setIsShown] = useState(false)
    const [list, setList] = useState(Chars)
    const [isOccupied, setIsOccupied] = useState(false)
    const [activity, setActivity] = useState(text)
    const [occupant, setOccupant] = useState("")


    function stuff() {
        (!isOccupied) ?
        setIsShown(!isShown) : setIsShown(false); setIsOccupied(false); setActivity(text); emptyIt(occupant); setOccupant("");
    }
    
    function klikkelve(vmi1, vmi2) {
        stuff();
        setIsOccupied(true)
        setOccupant(vmi2.index)
        klikked(vmi1, vmi2);
        setActivity(vmi2.title);
    }

    return (
        <DropDownDiv>
        <ButtonGeneric text = {activity} Clicked = {stuff}/>
        <Sides>{list.map(iterated =>
                (<button className={isfree[iterated.index-1]
                && isShown ? iterated.classname : "Hidden"} key={iterated.index}
                onClick={()=>klikkelve(text, iterated)}>
                    {iterated.title}
                </button>
                ))}
        </Sides>
        </DropDownDiv>
    )
}

export default DropDown