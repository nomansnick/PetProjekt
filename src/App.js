import './App.css';
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CharCard from "./CharCard";
import Menu from "./Menu";
import Navi from "./Navi";
import Camp from "./Camp";
import Fields from "./Fields";
import Village from "./Village";
import Characters from "./Characters";
import { OverLay, CardDiv, Frame, TopShelf, LeftLower, TopLeft, LeftUpper, TopRight, MainBody, Left, Right, NextDayDiv } from "./styledCollection";
import Vill from "./Data/PlaceData/vill.json";
import Chars from "./Data/CharData/char.json";
import Env from "./Data/EnvData/env.json";
import ButtonNextDay from "./ButtonNextDay";
import EndOfDayQuest from "./EndOfDayQuest";


function App() {

  const [numShown, setNumShown] = useState(0);
  const [passedContent, setPassedContent] = useState();
  const [charList, setCharlist] = useState(Chars);
  const [villageBuilding, setVillageBuilding] = useState(Vill);
  const [allData, setAllData] = useState(charList.concat(villageBuilding));
  const [env, setEnv] = useState(Env[0]);
  const [Day, setDay] = useState(env.DayTime);
  const [ForceRefresh, SetForceRefresh] = useState(true);


  function dropDownPlaceClicked(num, type, onePlace) {
    console.log("PLACECLICKED")
    charList[num - 1].isFree = true;
    charList[num - 1].Questing = "";
    charList[num - 1].occupies = -1;
    type == "Ming" ?
      villageBuilding[onePlace.index - 1].slot2 = false :
      villageBuilding[onePlace.index - 1].slot1 = false;
    type == "Ming" ?
      villageBuilding[onePlace.index - 1].occupant2 = -1 :
      villageBuilding[onePlace.index - 1].occupant1 = -1;
    setCharlist(charList)
    SetForceRefresh(!ForceRefresh)

  }

  function dropDownCharClicked(oneMan, text, onePlace, type) {
    let result;
    console.log("CHARCLICKED")
    charList[oneMan.index - 1].isFree = false;
    charList[oneMan.index - 1].Questing = text;
    charList[oneMan.index - 1].occupies = onePlace.index;
    console.log(charList[oneMan.index - 1]);
    result = charList;

    type == "Ming" ?
      villageBuilding[onePlace.index - 1].slot2 = true :
      villageBuilding[onePlace.index - 1].slot1 = true;
    type == "Ming" ?
      villageBuilding[onePlace.index - 1].occupant2 = oneMan.index :
      villageBuilding[onePlace.index - 1].occupant1 = oneMan.index;

    setCharlist(result)
    SetForceRefresh(!ForceRefresh);

  }

  function SideCharClick(content) {
    setNumShown(content.index);
    setPassedContent(content);
  }

  function menuClick() {
    console.log("KATT")
  }

  function AdvanceTime() {
    setNumShown(0);
    if (env.DayTime == false) {
      env.nrOfDay = env.nrOfDay + 1
    }
    env.DayTime = !env.DayTime
    setDay(!Day)
    charList.forEach(element => (element.occupies = -1, element.isFree = true, element.Questing = ""));
    villageBuilding.forEach(element => (element.occupant1 = -1, element.slot1 = false,
      element.occupant2 = -1, element.slot2 = false));
    SetForceRefresh(!ForceRefresh)
    setCharlist(charList);
    console.log(charList);
  }

  return (
    <Router >
      <div>{numShown != "0" && (<CardDiv><CharCard Katt={() => setNumShown(0)} myContent={passedContent} /></CardDiv>)}</div>
      <NextDayDiv>
        <ButtonNextDay text="Advance time" Clicked={AdvanceTime} />
      </NextDayDiv>
      <Frame>
        <TopShelf>
          <TopLeft>
            <Menu onclick={menuClick} />
          </TopLeft>
          <TopRight><Navi /></TopRight>
        </TopShelf>
        <MainBody>
          <OverLay className={env.DayTime ? "Day" : "Night"} />
          <Left>
            <LeftUpper>
              <Characters SideCharClick={SideCharClick} charlist={charList} />
            </LeftUpper>
            <LeftLower>
              <div>Number of Days: {env.nrOfDay}</div>
              <div>{Day ? "The sun is high on the sky" : "The moon shines palely"}</div>
            </LeftLower>
          </Left>
          <Right>
            <Switch>
              <Route path="/fields">
                <Fields
                />
              </Route>
              <Route path="/village">
                <Village
                  charList={charList}
                  buildings={villageBuilding}
                  dropDownPlaceClicked={dropDownPlaceClicked}
                  dropDownCharClicked={dropDownCharClicked}
                  Day={Day}
                  ForceRefresh={ForceRefresh}
                  onClick={() => SetForceRefresh(!ForceRefresh)}
                />
              </Route>*/
                  <Route path="/">
                <Camp
                />
              </Route>
            </Switch>
          </Right>
        </MainBody>
      </Frame>
    </Router>
  );
}

export default App;

/*

  function leavesPost(num) {
  let answer = [];
  for (let i = 0; i < isFreeArray.length; i++) {
    i == num ? answer.push(true) : answer.push(isFreeArray[i]);
  }
  setIsFreeArray(answer);}

  function emptyIt(num) {
    let answer = [];
  for (let i = 0; i < isFreeArray.length; i++) {
    i == num - 1 ? answer.push(false) : answer.push(isFreeArray[i]);
  }
  setIsFreeArray(answer);}

  emptyIt = {emptyIt}
  leavesPost = {leavesPost}
*/