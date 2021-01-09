import React from "react"
import styled from "styled-components";

const ButtonCust = styled.button`
width: 100%;
height: 100%;
border-radius: 2vh;
font-size: 5vh;
`;

function Button(props) {
    const {onClick, text} = props
return (
    <ButtonCust onClick = {onClick}>{text}</ButtonCust>
)
}

export default Button;