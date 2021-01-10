import React, {useState} from "react";
import styled from "styled-components";

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
                    {iterated.classname}
                </div>
                ))}
        </FrameCharList>
        </>
    )
}

export default Characters;