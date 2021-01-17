import React from "react";
import styled from "styled-components";

const FrameTg = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`;
const LeftSide = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 2;
`;

const RightSide = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 3;
align-content: center;
`;

const TitleTg = styled.div`
text-align: center;
font-size: 3vh;
font-weight: bold;
`;

const CombatScreen = styled.div`
width: 100%;
background-color: rgba (50,50,50,0.3)
`;

function Tournament() {
    return (
        <FrameTg>
            <LeftSide>
        <TitleTg>Tournament Grounds</TitleTg>
            </LeftSide>
            <RightSide>
                <CombatScreen>
                    it lesz a combat
                </CombatScreen>
            </RightSide>

        </FrameTg>
    )
}

export default Tournament;

/*
        <div>egy gomb ami minden 50hp feletti épp szabad host groupba pakol, ugyanannyi ellenséget kijelöl</div>
        <div>otletek: guard faction a nyeresekert, fame a nyeresekért, gyakorlas - tierek fame szerint, statot novel,
            minden karakternek tier1: 1 stat, tier2 2 stat, tier 3 3 stat, osszesen 1x lehet mindet
        </div>
        <div>kombat: kor szamlalo, a kor dex alapjan szetszorja a sorrendet, attak, def, abilityOffensiv, abilityDefensiv</div>
        <div>kombat in-depth: gomb utan selectTargetOffensive v selectTargetDefensive stat, cancel gombbal ezt falsera teszed, de a korod megmarad,
            selectTarget alatt az ellenseges es saját divek gombnak megfeleloen kattinthatoak,
            ha hp 40 alá esik, akkor yieldel az illeto
        </div>
        <div>vmi goofi leiras</div>
*/

/* left side todo
        <EnrollDiv></EnrollDiv>
*/

/* CombatScreenInner -TODO
                    <CombatTitle></CombatTitle>
                    <CombatView></CombatView>
                    <CombatActions></CombatActions>
                    <CombatLog></CombatLog>
                    */