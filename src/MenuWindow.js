import React from "react";
import styled from "styled-components";
import ButtonGeneric from "./ButtonGeneric";

const MenuFrame = styled.div`
margin-top: 15%;
position: absolute;
display: flex;
flex-direction: column;
margin-left: 50%;
width: 15%;
height: 15%;
z-index: 12;
background-color: white;
`;

const CloseButton = styled.div`
display: flex;
justify-content: flex-end;
`;

const MenuBlocker = styled.div`
position: absolute;
display: flex;
width: 100%;
height: 100%;
z-index: 11;
`;

const RestOfButtons = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`;

function MenuWindow(props) {
    const { menuClick, newGame, loadGame, saveGame } = props;

    return (
        <div>
            <MenuBlocker />
            <MenuFrame>
                <CloseButton><ButtonGeneric text="X" Clicked={() => menuClick()} /></CloseButton>
                <RestOfButtons>
                <div><ButtonGeneric text="New Game" Clicked={() => newGame()} /></div>
                <div><ButtonGeneric text="Load Game" Clicked={() => loadGame()} /></div>
                <div><ButtonGeneric text="Save Game" Clicked={() => saveGame()} /></div>
                </RestOfButtons>
            </MenuFrame>
        </div>
    )
}

export default MenuWindow;