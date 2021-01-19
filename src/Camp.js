import React from "react";
import styled from "styled-components";

const Shelf = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
font-size: 4vh;
font-weight: bold;
`;

const CampDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`;

const BodyCamp = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 100%;
height: 100%;
`;

const TaskDiv = styled.div`
display: flex;
flex-direction: column;
flex: 2;
`;

const UpgradesDiv = styled.div`
display: flex;
flex-direction: column;
background-color: rgb(80, 80, 80);
flex: 3;
`;

function Camp(props) {
    const {env, inv} = props
    return (
        <CampDiv>
        <Shelf>
            <div>Threat: {env.Threat}</div>
            <div>Food: {env.Food}</div>
        </Shelf>
        <BodyCamp>
            <TaskDiv>taszkok</TaskDiv>
            <UpgradesDiv>{inv.filter(item => item.upgrade == true).map(item => item.item)}</UpgradesDiv>
        </BodyCamp>
        </CampDiv>
    )
}

export default Camp;

/*
        <div>a kempet lehet fejleszteni. egyes fejlesztesek faction/event lockoltak(5 fejlesztesi pont utan lep szintet)</div>
        <div>a kempet orizni kell (threat miatt), vagy fortify vagy camo, amelyik erosebb arra fejlodik -pl fortress vagy hidden cave</div>
        <div>a kempbe kaja kell, kesobb fejlesztheto gazdasag is</div>
        */