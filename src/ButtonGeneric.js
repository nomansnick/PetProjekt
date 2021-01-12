import React from "react"
import styled from "styled-components";

const ButtonGenericDiv = styled.button`
max-width: 20vh;
`;

function ButtonGeneric(props) {
    const {Clicked, text} = props
return (
    <ButtonGenericDiv onClick = {Clicked}>{text}</ButtonGenericDiv>
)
}

export default ButtonGeneric;