import React from "react";
import DropDown from "./DropDown";
import { ItsClosed, BottomDv, ButtonDiv, Righty, Center, Title, OneBuilding, VillageDiv } from "./styledCollection"
import Shop from "./Shop"
import styled from "styled-components";

const PicStore = styled.div`
height: 33%;
`;

function Village(props) {
    const { buildings, charList, dropDownCharClicked,
        dropDownPlaceClicked, Day, ForceRefresh, env, inv, purchase } = props

    return (
        <VillageDiv>
            {buildings.slice(0, 3).map(OnePlace =>
                <OneBuilding className={OnePlace.name} key={OnePlace.index}>
                    <Center><Title>{OnePlace.name}</Title></Center>
                    {OnePlace.name == "Store"
                        ? <PicStore><Shop env={env} inv={inv} purchase={purchase} /></PicStore>
                        : <PicStore>IdeJonAKep</PicStore>
                    }
                    {Day && OnePlace.name == "Tavern"
                        || !Day && OnePlace.name == "Store"
                        ? <ItsClosed> {OnePlace.desc3} </ItsClosed>
                        : <ButtonDiv>
                            {OnePlace.isQuestGiver &&
                                <DropDown text="Questing" OnePlace={OnePlace} charList={charList}
                                    dropDownPlaceClicked={dropDownPlaceClicked}
                                    dropDownCharClicked={dropDownCharClicked}
                                    ForceRefresh={ForceRefresh}
                                    Day={Day}
                                    passedOccupant={OnePlace.occupant1}
                                    passedUsed={OnePlace.slot1}
                                    buildings={buildings}
                                    typ="Quest"
                                />}
                            <DropDown text="Mingle" OnePlace={OnePlace} charList={charList}
                                dropDownPlaceClicked={dropDownPlaceClicked}
                                dropDownCharClicked={dropDownCharClicked}
                                ForceRefresh={ForceRefresh}
                                Day={Day}
                                passedOccupant={OnePlace.occupant2}
                                passedUsed={OnePlace.slot2}
                                buildings={buildings}
                                typ="Ming"
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