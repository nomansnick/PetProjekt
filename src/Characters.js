import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getHealth, getMaxHealth} from "./Data/CharData/charStatFunctions"

const FrameCharList = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

function Characters(props) {
    const { charlist, SideCharClick, messageBox, clearMessageBox, ForceRefresh } = props
    const [usedMessage, setUsedMessage] = useState(messageBox)

    useEffect (() => {setUsedMessage(messageBox)}, [ForceRefresh])

    return (
        <>
        <FrameCharList>
                {charlist.map(iterated =>
                (<div key={iterated.index}>
                    <div onClick = {() => clearMessageBox(iterated.index)}> {usedMessage[iterated.index-1]} </div>
                    <div onClick = {() => SideCharClick(iterated)}> {iterated.name} </div>
                    <div>{getHealth(iterated)}/{getMaxHealth(iterated)}</div>
                </div>
                ))}
        </FrameCharList>
        </>
    )
}

export default Characters;