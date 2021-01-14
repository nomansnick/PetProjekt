import React from "react";
import DropDown from "./DropDown";
import {ItsClosed, BottomDv, ButtonDiv, Righty, Center, Title, OneBuilding, VillageDiv} from "./styledCollection"

function Village(props) {
    const { buildings, charList, dropDownCharClicked,
        dropDownPlaceClicked, Day, ForceRefresh} = props

    return (
        <VillageDiv>
            {buildings.slice(0, 3).map(OnePlace =>
                    <OneBuilding className={OnePlace.name} key={OnePlace.index}>
                    <Center><Title>{OnePlace.name}</Title></Center>
                    <div>IdeJonAKep</div>
                    {   Day && OnePlace.name == "Tavern"
                        || !Day && OnePlace.name == "Store"
                        ? <ItsClosed> {OnePlace.desc3} </ItsClosed>
                        : <ButtonDiv>
                        {OnePlace.isQuestGiver &&
                        <DropDown text="Questing" OnePlace={OnePlace} charList={charList}
                        dropDownPlaceClicked = {dropDownPlaceClicked}
                        dropDownCharClicked = {dropDownCharClicked}
                        ForceRefresh = {ForceRefresh}
                        Day = {Day}
                        passedOccupant = {OnePlace.occupant1}
                        passedUsed = {OnePlace.slot1}
                        buildings = {buildings}
                        typ = "Quest"
                        />}
                        <DropDown text="Mingle" OnePlace={OnePlace} charList={charList}
                        dropDownPlaceClicked = {dropDownPlaceClicked}
                        dropDownCharClicked = {dropDownCharClicked}
                        ForceRefresh = {ForceRefresh}
                        Day = {Day}
                        passedOccupant = {OnePlace.occupant2}
                        passedUsed = {OnePlace.slot2}
                        buildings = {buildings}
                        typ = "Ming"
                        />
                    </ButtonDiv>}
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