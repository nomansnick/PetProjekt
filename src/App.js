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
import Tournament from "./Tournament";
import Village from "./Village";
import Characters from "./Characters";
import { OverLay, CardDiv, Frame, TopShelf, LeftLower, TopLeft, LeftUpper, TopRight, MainBody, Left, Right, NextDayDiv } from "./styledCollection";
import Vill from "./Data/PlaceData/vill.json";
import Chars from "./Data/CharData/char.json";
import Env from "./Data/EnvData/env.json";
import ButtonNextDay from "./ButtonNextDay";
import EndOfDayEvent from "./EndOfDayEvent";
import {Quest} from "./QuestAndEnemy/QuestV2";
import {getHealth, getMaxHealth} from "./Data/CharData/charStatFunctions"


function App() {

  const [numShown, setNumShown] = useState(0);
  const [passedContent, setPassedContent] = useState();
  const [charList, setCharlist] = useState(Chars);
  const [villageBuilding, setVillageBuilding] = useState(Vill);
  const [allData, setAllData] = useState(charList.concat(villageBuilding));
  const [env, setEnv] = useState(Env[0]);
  const [Day, setDay] = useState(env.DayTime);
  const [ForceRefresh, SetForceRefresh] = useState(true);
  const [quest, setQuest] = useState(Quest);
  const [endOfdayShown, setEndOfDayShown] = useState(false)
  const [checkedStat, setCheckedStat] = useState("");
  const [endDayChar, setEndDayChar] = useState(charList[0])
  const [rand, setRand] = useState();
  const [rand2, setRand2] = useState();

  let random;

  function dropDownPlaceClicked(num, type, onePlace) {
    charUpdate(num - 1, true, -1, "")
    buildUpdate(type, onePlace.index - 1, false, -1)
    setCharlist(charList)
    SetForceRefresh(!ForceRefresh)
    console.log("Place: ", charList)
  }

  function dropDownCharClicked(oneMan, onePlace, type) {
    charUpdate(oneMan.index - 1, false, onePlace.index, type)
    buildUpdate(type, onePlace.index - 1, true, oneMan.index)
    setCharlist(charList)
    SetForceRefresh(!ForceRefresh);
    console.log("Char: ", charList)
  }

  function charUpdate(num, bool, num2, type) {
    charList[num].isFree = bool;
    charList[num].Questing = type;
    charList[num].occupies = num2;
  }

  function buildUpdate(type, num1, bool, num2) {
    if (type == "Ming") {
      villageBuilding[num1].slot2 = bool;
      villageBuilding[num1].occupant2 = num2
    }
    else {
      villageBuilding[num1].slot1 = bool;
      villageBuilding[num1].occupant1 = num2;
    }
  }

  function challengeSuccessfulStat(charToChange, usedQuest, num1, num2, num3) {
  env.gold = env.gold + usedQuest.rewardGold + num1;
  charList[charToChange.index-1].xp = charToChange.xp + usedQuest.rewardXp + num2;
  charList[charToChange.index-1].health = charList[charToChange.index-1].health + num3
  charList[charToChange.index-1].occupies == 1 ? env.Villagers = env.Villagers + 5 : env.Guild = env.Guild + 5;
  setEnv(env);
};

  function challengeFailStat(charToChange, usedQuest) {
  charList[charToChange.index-1].health = charList[charToChange.index-1].health - 60;
  charList[charToChange.index-1].xp = charToChange.xp + usedQuest.rewardXp - 10;}

  function updateStats(oneChar) {
    console.log("ebből: " , oneChar)
    charList[oneChar.index - 1] = oneChar;
    console.log("ez: " , charList[oneChar.index - 1])
    setCharlist(charList);
  };

  function endDone() {
    setEndOfDayShown(false);
    endOfDayFreeThePeople();
    endOfDayFreeThePlaces();
    SetForceRefresh(!ForceRefresh);
    setCharlist(charList);
    endofDayDayChanges();
    setEndDayChar(charList[0]);
  };

  function endOfDayFreeThePeople() {
    charList.forEach(element => (element.occupies = -1, element.isFree = true, element.Questing = "", levelUp(element),
    getHealth(element) < getMaxHealth(element) - 26 ? element.health = element.health + 25 : element.health = element.maxHealth) );
  }

  function endOfDayFreeThePlaces() {
    villageBuilding.forEach(element => (element.occupant1 = -1, element.slot1 = false,
      element.occupant2 = -1, element.slot2 = false));
  }

  function endofDayDayChanges() {
    !env.DayTime ? env.nrOfDay = env.nrOfDay + 1 : env.nrOfDay = env.nrOfDay;
    env.DayTime = !env.DayTime;
    setDay(!Day)
  }

  function SideCharClick(content) {
    setNumShown(content.index);
    setPassedContent(content);
  }

  function increaseStat(string, char) {
    if (char.skillpoints > 0) {
    charList[char.index-1][string] = charList[[char.index-1]][string] + 1;
    char.skillpoints = char.skillpoints-1;
    setCharlist(charList);
    SetForceRefresh(!ForceRefresh);}
  }

  function levelUp(checkedChar) {
    switch (checkedChar.lvl) {
      case 1:
        levelUpInner(checkedChar, env.xpToLevel2)
        break;
      case 2:
        levelUpInner(checkedChar, env.xpToLevel3)
        break;
      case 3:
        levelUpInner(checkedChar, env.xpToLevel4)
        break;
      case 4:
        levelUpInner(checkedChar, env.xpToLevel5)
        break;
      case 5:
        levelUpInner(checkedChar, env.xpToLevel6)
        break;
      case 6:
        levelUpInner(checkedChar, env.xpToLevel7)
        break;
      case 7:
        levelUpInner(checkedChar, env.xpToLevel8)
        break;
      case 8:
        levelUpInner(checkedChar, env.xpToLevel9)
        break;
      case 9:
        levelUpInner(checkedChar, env.xpToLevel10)
        break;
    }
  }

  function levelUpInner(checkedChar, num) {
    if (checkedChar.xp > num) {
      checkedChar.lvl = checkedChar.lvl + 1;
      checkedChar.xp = checkedChar.xp - num;
      checkedChar.skillpoints = checkedChar.skillpoints + 2;
    }
  }

  function menuClick() {
    console.log("KATT")
  }

  function nextRound(oneChar) {
    setEndDayChar(charList[oneChar.index]);
    SetForceRefresh(!ForceRefresh);
  }

  function AdvanceTime() {
    setNumShown(0);
    console.log(charList)
    if (charList[0].Questing == "Quest") {
      quest.recipent = charList[0].name;
      quest.giver = villageBuilding[charList[0].occupies - 1].giver;
      quest.area = quest.areas[rand];
    }
    setEndOfDayShown(true);
  }

  return (
    <Router >
      {endOfdayShown && <EndOfDayEvent char={endDayChar} quest={quest}
        forceRefresh={ForceRefresh} rand2={rand2} endDone={endDone} nextRound={nextRound}
        challengeSuccessfulStat={challengeSuccessfulStat} challengeFailStat= {challengeFailStat}
        rand={rand} updateStats={updateStats} buildings = {villageBuilding} env={env} />}
      <div>{numShown != "0" && (<CardDiv><CharCard increaseStat = {increaseStat} Katt={() => setNumShown(0)} myContent={passedContent} /></CardDiv>)}</div>
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
              <div>Standing with Villagers: {env.Villagers}</div>
              <div>Standing with Guild: {env.Guild}</div>
            </LeftLower>
          </Left>
          <Right>
            <Switch>
              <Route path="/tournament">
                <Tournament
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
