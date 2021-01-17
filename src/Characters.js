import React, {useState} from "react";
import styled from "styled-components";
import {getHealth, getMaxHealth} from "./Data/CharData/charStatFunctions"

const FrameCharList = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

function Characters(props) {
    const { charlist, SideCharClick } = props

    return (
        <>
        <FrameCharList>
                {charlist.map(iterated =>
                (<div key={iterated.index} onClick={() => SideCharClick(iterated)}>
                    <div>{iterated.name}</div>
                    <div>{getHealth(iterated)}/{getMaxHealth(iterated)}</div>
                </div>
                ))}
        </FrameCharList>
        </>
    )
}

export default Characters;