import './App.css';
import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import { Quest } from "./QuestAndEnemy/QuestV2";
import { getHealth, getMaxHealth } from "./Data/CharData/charStatFunctions";
import inventory from "./Data/EnvData/inventory.json";
import NewVill from "./Data/PlaceData/villFresh.json";
import NewChar from "./Data/CharData/charFresh.json";
import NewEnv from "./Data/EnvData/envFresh.json";
import MenuWindow from "./MenuWindow";

function App() {

  const [numShown, setNumShown] = useState(0);
  const [passedContent, setPassedContent] = useState();
  const [charList, setCharlist] = useState(Chars);
  const [villageBuilding, setVillageBuilding] = useState(Vill);
  const [env, setEnv] = useState(Env[0]);
  const [Day, setDay] = useState(true);
  const [ForceRefresh, SetForceRefresh] = useState(true);
  const [quest, setQuest] = useState(Quest);
  const [endOfdayShown, setEndOfDayShown] = useState(false)
  const [checkedStat, setCheckedStat] = useState(" ");
  const [endDayChar, setEndDayChar] = useState(charList[0])
  const [rand, setRand] = useState();
  const [rand2, setRand2] = useState();
  const [inv, setInv] = useState(inventory);
  const [messageBox, setMessageBox] = useState([" ", " ", " ", " "])
  const [failNum, setFailNum] = useState(0);
  const [clueOne, setClueOne] = useState(" ");
  const [clueTwo, setClueTwo] = useState(" ");
  const [clueThree, setClueThree] = useState(" ");
  const [clueFour, setClueFour] = useState(" ");
  const [clueFive, setClueFive] = useState(" ");
  const [clueSix, setClueSix] = useState(" ");
  const [mainFight, setMainFight] = useState(false);
  const [foughtAlready, setFoughtAlready] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const [qmSaysApp, setQmSaysApp] = useState("Welcome!")

  const KEY = "SAVEDGAME";
  let random;

  function newGame() {
    let newCharList = JSON.parse(JSON.stringify(NewChar));
    setCharlist(newCharList);
    let newPlaceList = JSON.parse(JSON.stringify(NewVill));
    setVillageBuilding(newPlaceList);
    let newEnv = JSON.parse(JSON.stringify(NewEnv));
    setEnv(newEnv[0]);
    setDay(NewEnv[0].DayTime);
    setInv([]);
    setMenuShown(false);
    setEndDayChar(newCharList[0]);
    SetForceRefresh(!ForceRefresh);  }

  function saveGame() {
    let toSave = { chars: 0, places: 0, inv: 0, env: 0 }
    toSave.chars = charList;
    toSave.places = villageBuilding;
    toSave.inv = inv;
    toSave.env = env;
    localStorage.setItem(KEY, JSON.stringify(toSave));
    setMenuShown(false);
  };

  function loadGame() {
    let isThereASaveFile = localStorage.getItem(KEY);
    isThereASaveFile = JSON.parse(isThereASaveFile);
    if (isThereASaveFile.env == undefined) { return }
    setCharlist(isThereASaveFile.chars);
    setVillageBuilding(isThereASaveFile.places);
    setDay(isThereASaveFile.env.DayTime);
    setEnv(isThereASaveFile.env);
    setInv(isThereASaveFile.inv);
    setEndDayChar(isThereASaveFile.chars[0]);
    setMenuShown(false);
    SetForceRefresh(!ForceRefresh);
  }

  function dropDownPlaceClicked(num, type, onePlace) {
    charUpdate(num - 1, true, -1, " ");
    buildUpdate(type, onePlace.index - 1, false, -1);
    setCharlist(charList);
    setVillageBuilding(villageBuilding)
    SetForceRefresh(!ForceRefresh);
  }

  function dropDownCharClicked(oneMan, onePlace, type) {
    charUpdate(oneMan.index - 1, false, onePlace.index, type);
    buildUpdate(type, onePlace.index - 1, true, oneMan.index);
    setCharlist(charList);
    setVillageBuilding(villageBuilding);
    SetForceRefresh(!ForceRefresh);
  }

  function charUpdate(num, bool, num2, type) {
    charList[num].isFree = bool;
    charList[num].Questing = type;
    charList[num].occupies = num2;
    setCharlist(charList);
    SetForceRefresh(!ForceRefresh);
  }

  function buildUpdate(type, num1, bool, num2) {
    if (type == "Ming") {
      villageBuilding[num1].slot2 = bool;
      villageBuilding[num1].occupant2 = num2;
      setVillageBuilding(villageBuilding);
    }
    else {
      villageBuilding[num1].slot1 = bool;
      villageBuilding[num1].occupant1 = num2;
      setVillageBuilding(villageBuilding);
    }
  }

  function challengeSuccessfulStat(charToChange, usedQuest, num1, num2, num3) {
    env.Gold = env.Gold + usedQuest.rewardGold + num1;
    charList[charToChange.index - 1].xp = charToChange.xp + usedQuest.rewardXp + num2;
    charList[charToChange.index - 1].health = charList[charToChange.index - 1].health + num3;
    charList[charToChange.index - 1].occupies == 1 ? env.Villagers = env.Villagers + 5 : env.Guild = env.Guild + 5;
    setEnv(env);
  };

  function challengeFailStat(charToChange, usedQuest) {
    charList[charToChange.index - 1].health = charList[charToChange.index - 1].health - 60;
    charList[charToChange.index - 1].xp = charToChange.xp + usedQuest.rewardXp - 10;
    setCharlist(charList);
  }

  function updateStats(oneChar) {
    charList[oneChar.index - 1] = oneChar;
    setCharlist(charList);
  };

  function endDone() {
    env.Threat = env.Threat + 5;
    setEndOfDayShown(false);
    endOfDayFreeThePeople();
    endOfDayFreeThePlaces();
    threatCheck();
    SetForceRefresh(!ForceRefresh);
    setCharlist(charList);
    endofDayDayChanges();
    setEndDayChar(charList[0]);
  };

  function threatCheck() {
    if (env.Threat > 100) {
      env.Threat = env.Threat - 100;
      env.Food > 50 ? env.Food = env.Food - 50 : env.Food = 0;
      env.Gold > 1500 ? env.Gold = env.Gold - 1500 : env.Gold = 0;
      setEnv(env);
    }
  }

  function endOfDayFreeThePeople() {
    charList.forEach(element => (element.occupies = -1, element.isFree = true, (element.Questing == " " ?
      element.rested = true : element.rested = false), element.Questing = " ", levelUp(element),
      getHealth(element) < getMaxHealth(element) - 6 ? element.health = element.health + 5 : element.health = element.maxHealth));
    setCharlist(charList);
  }

  function endOfDayFreeThePlaces() {
    villageBuilding.forEach(element => (element.occupant1 = -1, element.slot1 = false,
      element.occupant2 = -1, element.slot2 = false));
    setVillageBuilding(villageBuilding);
  }

  function endofDayDayChanges() {
    if (!env.DayTime) {
      env.nrOfDay = env.nrOfDay + 1;
      setFoughtAlready(false);
      envUpgradesCheck();
      foodChanger();
    }
    setQmSaysApp("Welcome!")
    env.DayTime = !env.DayTime;
    setEnv(env);
    setDay(!Day);
  }

  function foodChanger() {
    if (env.Food < env.FoodConsumption) {
      env.Food = 0;
      charList.forEach(oneGuy => (
        oneGuy.health = oneGuy.health - 55));
    }
    env.Food = env.Food - env.FoodConsumption;
    if (env.Food < 0) { env.Food = 0; }
  }

  function envUpgradesCheck() {
    if (env.hasTraps) { env.Food = env.Food + 1; }
    if (env.hasPikes) { env.Threat = env.Threat - 1; }
    if (env.hasToolkit) {
      env.Food = env.Food + 1;
      env.Threat = env.Threat - 1;
    }
    if (env.hasGuards) {
      env.Food = env.Food - 2;
      env.Threat = env.Threat - 2;
    }
    if (env.hasGarden) { env.Food = env.Food + 4; }
    setEnv(env);
  }

  function SideCharClick(content) {
    setNumShown(content.index);
    setPassedContent(content);
  }

  function increaseStat(string, char) {
    if (char.skillpoints > 0) {
      charList[char.index - 1][string] = charList[[char.index - 1]][string] + 1;
      char.skillpoints = char.skillpoints - 1;
      setCharlist(charList);
      SetForceRefresh(!ForceRefresh);
    }
  }

  function levelUp(checkedChar) {
    switch (checkedChar.lvl) {
      case 1:
        levelUpInner(checkedChar, env.xpToLevel2);
        break;
      case 2:
        levelUpInner(checkedChar, env.xpToLevel3);
        break;
      case 3:
        levelUpInner(checkedChar, env.xpToLevel4);
        break;
      case 4:
        levelUpInner(checkedChar, env.xpToLevel5);
        break;
      case 5:
        levelUpInner(checkedChar, env.xpToLevel6);
        break;
      case 6:
        levelUpInner(checkedChar, env.xpToLevel7);
        break;
      case 7:
        levelUpInner(checkedChar, env.xpToLevel8);
        break;
      case 8:
        levelUpInner(checkedChar, env.xpToLevel9);
        break;
      case 9:
        levelUpInner(checkedChar, env.xpToLevel10);
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
    setMenuShown(!menuShown);
  }

  function nextRound(oneChar) {
    setEndDayChar(charList[oneChar.index]);
    SetForceRefresh(!ForceRefresh);
  }

  function AdvanceTime() {
    setFailNum(0);
    setMessageBox([" ", " ", " ", " "]);
    setNumShown(0);
    if (charList[0].Questing == "Quest") {
      quest.recipent = charList[0].name;
      quest.giver = villageBuilding[charList[0].occupies - 1].giver;
      quest.area = quest.areas[rand];
    }
    setEndOfDayShown(true);
  }

  function purchase(oneItem) {
    if (oneItem.item == "Food") {
      env.Food = env.Food + 1;
    }
    else if (oneItem.upgrade) {
      upgradeBuyCheck(oneItem);
    }
    else {
      inv.push(oneItem);
    }
    env.Gold = env.Gold - oneItem.price;
    setEnv(env);
    setInv(inv);
    SetForceRefresh(!ForceRefresh);
  }

  function upgradeBuyCheck(oneItem) {
    env.basePoints = env.basePoints + 1
    upgradeBuyCheckInner(oneItem.item, "Traps");
    upgradeBuyCheckInner(oneItem.item, "Garden");
    upgradeBuyCheckInner(oneItem.item, "Guards");
    upgradeBuyCheckInner(oneItem.item, "Toolkit");
    upgradeBuyCheckInner(oneItem.item, "Wooden Pikes");
  }

  function upgradeBuyCheckInner(string1, string2) {
    if (string1 == string2) {
      switch (string2) {
        case "Traps": env.hasTraps = true;
          return;
        case "Garden": env.hasGarden = true;
          return;
        case "Guards": env.hasGuards = true;
          return;
        case "Toolkit": env.hasToolkit = true;
          return;
        case "Wooden Pikes": env.hasPikes = true;
          return;
      }
    }
  }

  function gainFactionPoint(faction, point) {
    env[faction] = env[faction] + point;
    setEnv(env);
  }

  function charMessage(state, oneChar) {
    switch (state) {
      case "tired": messageBox[oneChar.index - 1] = "I'm too tired for that!";
        break;
      case "wounded": messageBox[oneChar.index - 1] = "I have to recover first!";
        break;
      case "taken": messageBox[oneChar.index - 1] = "I'll do it.";
        break;
      case "left": messageBox[oneChar.index - 1] = "I'll do something else, I guess.";
        break;
    }
    SetForceRefresh(!ForceRefresh);
    return " ";
  }

  function clearMessageBox(num) {
    messageBox[num - 1] = " ";
    SetForceRefresh(!ForceRefresh);
  }

  function gatherQuest() {
    if (env.mainQuest1Clue1 && env.mainQuest1Clue2 && env.mainQuest1Clue3) { return console.log("mindMegvan"); }
    random = Math.floor(Math.random() * Math.floor(100));
    if (random < 25) { return; }
    if (!env.mainQuest1Clue1) { return env.mainQuest1Clue1 = true; }
    if (!env.mainQuest1Clue2) { return env.mainQuest1Clue2 = true; }
    if (!env.mainQuest1Clue3) { return env.mainQuest1Clue3 = true; }
  }

  function Fail() {
    setFailNum(failNum + 1);
  }

  function Catch(quest, clue) {
    if (failNum > 3) { return; }
    if (quest == 1) {
      questSingleUpdate(clue);
      setEnv(env);
    }
  }

  function questSingleUpdate(num) {
    if (num == 1) { return setClueOne("Found"); }
    if (num == 2) { return setClueTwo("Found"); }
    if (num == 3) { return setClueThree("Found"); }
    if (num == 4) { return setClueFour("Found"); }
    if (num == 5) { return setClueFive("Found"); }
    if (num == 6) { return setClueSix("Found"); }
  }

  function win(string) {
    string === "npc" ? winInner(5, "Better luck next time, lads!")
      : winInner(25, "Good job! You showed 'em!");
    setFoughtAlready(true);
    setEnv(env);
  }

  function winInner(num, string) {
    env.Guards = env.Guards + num;
    setQmSaysApp(string);
  }

  return (
    <Router >
      {menuShown && <MenuWindow newGame={newGame} loadGame={loadGame} saveGame={saveGame} menuClick={menuClick} />}
      {endOfdayShown && <EndOfDayEvent char={endDayChar} quest={quest} gainFactionPoint={gainFactionPoint}
        forceRefresh={ForceRefresh} rand2={rand2} endDone={endDone} nextRound={nextRound} gatherQuest={gatherQuest}
        challengeSuccessfulStat={challengeSuccessfulStat} challengeFailStat={challengeFailStat}
        rand={rand} updateStats={updateStats} buildings={villageBuilding} env={env} />}
      <div>{numShown != "0" && (<CardDiv><CharCard increaseStat={increaseStat} Katt={() => setNumShown(0)} myContent={passedContent} /></CardDiv>)}</div>
      <NextDayDiv>
        <ButtonNextDay text="Advance time" Clicked={AdvanceTime} />
      </NextDayDiv>
      <Frame>
        <TopShelf>
          <TopLeft>
            <Menu menuClick={menuClick} />
          </TopLeft>
          <TopRight><Navi /></TopRight>
        </TopShelf>
        <MainBody>
          <OverLay className={env.DayTime ? "Day" : "Night"} />
          <Left>
            <LeftUpper>
              <Characters SideCharClick={SideCharClick} charlist={charList} ForceRefresh={ForceRefresh}
                messageBox={messageBox} clearMessageBox={clearMessageBox} />
            </LeftUpper>
            <LeftLower>
              <div>Days: {env.nrOfDay}</div>
              <div>{Day ? "Daytime" : "Nighttime"}</div>
              <div>Village: {env.Villagers}</div>
              <div>Guild: {env.Guild}</div>
              <div>Guards: {env.Guards}</div>
              <div>Gold: {env.Gold}</div>
            </LeftLower>
          </Left>
          <Right>
            <Switch>
              <Route path="/tournament">
                <Tournament
                  charList={charList} fightMain={mainFight}
                  foughtAlready={foughtAlready} win={win}
                  qmSaysApp={qmSaysApp}
                />
              </Route>
              <Route path="/village">
                <Village
                  charList={charList}
                  clearMessageBox={clearMessageBox}
                  buildings={villageBuilding}
                  dropDownPlaceClicked={dropDownPlaceClicked}
                  dropDownCharClicked={dropDownCharClicked}
                  Day={Day}
                  ForceRefresh={ForceRefresh}
                  onClick={() => SetForceRefresh(!ForceRefresh)}
                  env={env}
                  inv={inv}
                  purchase={purchase}
                  charMessage={charMessage}
                />
              </Route>*/
                  <Route path="/">
                <Camp
                  env={env}
                  dropDownPlaceClicked={dropDownPlaceClicked}
                  dropDownCharClicked={dropDownCharClicked}
                  Fail={Fail}
                  Catch={Catch}
                  clueOne={clueOne} clueTwo={clueTwo}
                  clueThree={clueThree} clueFour={clueFour}
                  clueFive={clueFive} clueSix={clueSix}
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