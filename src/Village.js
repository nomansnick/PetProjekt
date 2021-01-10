import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import {BottomDv, ButtonDiv, Righty, Center, Title, OneBuilding, VillageDiv} from "./styledCollection"

function Village(props) {
    const { buildings, charList, dropDownCharClicked, emptyIt,
        dropDownPlaceClicked, isFreeArray, Day, leavesPost } = props

    return (
        <VillageDiv>
            {buildings.map(OnePlace =>
                <OneBuilding className={OnePlace.name} key={OnePlace.index}>
                    <Center><Title>{OnePlace.name}</Title>
                        {OnePlace.desc3}</Center>
                    <div>{OnePlace.name}</div>
                    <ButtonDiv>
                        {OnePlace.isQuestGiver &&
                        <DropDown text="Questing" OnePlace={OnePlace} charList={charList}
                        dropDownPlaceClicked = {dropDownPlaceClicked}
                        dropDownCharClicked = {dropDownCharClicked}
                        isFreeArray = {isFreeArray}
                        emptyIt = {emptyIt}
                        leavesPost = {leavesPost}
                        Day = {Day}
                        />}
                        <DropDown text="Mingle" OnePlace={OnePlace} charList={charList}
                        dropDownPlaceClicked = {dropDownPlaceClicked}
                        dropDownCharClicked = {dropDownCharClicked}
                        isFreeArray = {isFreeArray}
                        emptyIt = {emptyIt}
                        leavesPost = {leavesPost}
                        Day = {Day}
                        />
                    </ButtonDiv>
                    <BottomDv>
                        <Center>{OnePlace.desc}</Center>
                        <Righty>{OnePlace.desc2}</Righty>
                    </BottomDv>
                </OneBuilding>
            )}
        </VillageDiv>
    )
}

export default Village;
/*


*/