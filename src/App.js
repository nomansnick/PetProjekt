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


function App() {

  const [numShown, setNumShown] = useState(0);
  const [passedContent, setPassedContent] = useState();
  const [charList, setCharlist] = useState(Chars);
  const [villageBuilding, setVillageBuilding] = useState(Vill);
  const [allData, setAllData] = useState(charList.concat(villageBuilding));
  const [isFreeArray, setIsFreeArray] = useState([true, true, true, true]);
  const [env, setEnv] = useState(Env[0]);
  const [Day, setDay] = useState(env.DayTime)


  function dropDownPlaceClicked(num) {
    console.log("PLACECLICKED")
    charList[num].isFree = true;
    charList[num].Questing = "";
    charList[num].occupies = -1;
    setCharlist(charList)
  }

  function leavesPost(num) {
  let answer = [];
  for (let i = 0; i < isFreeArray.length; i++) {
    i == num ? answer.push(true) : answer.push(isFreeArray[i]);
  }
  setIsFreeArray(answer);}

  function dropDownCharClicked(oneMan, text, onePlace) {
    console.log("CHARCLICKED")
    charList[oneMan.index - 1].isFree = false;
    charList[oneMan.index - 1].Questing = text;
    charList[oneMan.index - 1].occupies = onePlace.index;   
    console.log(charList[oneMan.index - 1]);
    setCharlist(charList)
  }
  function emptyIt(num) {
    let answer = [];
  for (let i = 0; i < isFreeArray.length; i++) {
    i == num - 1 ? answer.push(false) : answer.push(isFreeArray[i]);
  }
  setIsFreeArray(answer);}

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
    setIsFreeArray([true, true, true, true])
    charList.forEach(element => (element.occupies = -1, element.isFree = true, element.Questing = ""));
    setCharlist(charList);
    console.log(charList);
  }

  return (
    <Router >
      <div>{numShown != "0" && (<CardDiv><CharCard Katt={() => setNumShown(0)} myContent={passedContent} /></CardDiv>)}</div>
      <NextDayDiv>
        <ButtonNextDay text = "Advance time" Clicked = {AdvanceTime}/>
        </NextDayDiv>
      <Frame>
        <TopShelf>
          <TopLeft>
            <Menu onclick={menuClick} />
          </TopLeft>
          <TopRight><Navi /></TopRight>
        </TopShelf>
        <MainBody>
        <OverLay className = {env.DayTime ? "Day" :"Night"}/>
          <Left>
            <LeftUpper>
            <Characters SideCharClick={SideCharClick} charlist={charList} />
            </LeftUpper>
            <LeftLower>
              <div>{env.nrOfDay}</div>
              <div>{Day ? "The sun is high on the sky" : "The moon shines palely"}</div>
            </LeftLower>
            </Left>
          <Right>
            <Switch>
              <Route path="/fields">
                <Fields />
              </Route>
              <Route path="/village">
                <Village
                  charList={charList}
                  buildings={villageBuilding}
                  dropDownPlaceClicked={dropDownPlaceClicked}
                  dropDownCharClicked={dropDownCharClicked}
                  isFreeArray={isFreeArray}
                  emptyIt = {emptyIt}
                  leavesPost = {leavesPost}
                  Day = {Day}
                />
              </Route>*/
                  <Route path="/">
                <Camp />
              </Route>
            </Switch>
          </Right>
        </MainBody>
      </Frame>
    </Router>
  );
}

export default App;