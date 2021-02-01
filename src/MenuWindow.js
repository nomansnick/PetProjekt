import React from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";

const MenuFrame = styled.div`
position: absolute;
display: flex;
flex-direction: column;
margin-left: 50%;
width: 33%;
height: 33%;
z-index: 4;
pointer-events: none;
`;

const CloseButton = styled.div`
display: flex;
flex-justification: flex-end;
`;

function MenuWindow(props) {
    const {closeTheMenu, newGame, loadGame, saveGame} = props;

    return (
        <MenuFrame>
            <CloseButton><ButtonGeneric text = "X" Clicked = {() => closeTheMenu()}/></CloseButton>
            <div><ButtonGeneric text = "New Game" Clicked = {() => newGame()}/></div>
            <div><ButtonGeneric text = "Load Game" Clicked = {() => loadGame()}/></div>
            <div><ButtonGeneric text = "Save Game" Clicked = {() => saveGame()}/></div>
        </MenuFrame>
    )
}