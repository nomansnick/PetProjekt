import React, {useState} from "react";
import styled from "styled-components";

const FrameCharList = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

function Characters(props) {
    const { list, klikkelt } = props

    return (
        <>
        <FrameCharList>
                {list.map(iterated =>
                (<div className={iterated.classname} key={iterated.index} onClick={() => klikkelt(iterated.index, iterated)}>
                    {iterated.title}
                </div>
                ))}
        </FrameCharList>
        </>
    )
}

export default Characters;