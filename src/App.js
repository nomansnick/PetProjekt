import './App.css';
import React, {useState} from "react"
import CharCard from "./CharCard";
import Menu from "./Menu";
import Navi from "./Navi";
import Camp from "./Camp";
import Fields from "./Fields";
import Village from "./Village";
import Characters from "./Characters";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Chars from "./ListOfChars";

const KartyaDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 25%;
  height: 60%;
  background-color: rgba(170,170,170,80%);
  border: solid black 5px;
  position: fixed;
  margin-top: 5%;
  margin-left: 40%;
  z-index: 1;
  
`;

const Frame = styled.div`
display: flex;
flex-direction: column;
justify-content: stretch;
height: 100vh;
`;

const TopShelf = styled.div`
flex: 1;
display: flex;
flex-direction: row;
background-color: rgb(30, 30, 30);
`;

const TopLeft = styled.div`
flex: 1;
display:flex;
justify-content: center;
align-items: center;
background-color: rgba(100, 30, 100, 50%);
align-items: center;
`;

const TopRight = styled.div`
flex: 9;
background-color: rgba(30, 150, 30, 50%);
`;

const MainBody = styled.div`
flex: 9;
display: flex;
flex-direction: row;
background-color: rgb(170, 170, 170);
`

const Left = styled.div`
display: flex;
flex: 1;
background-color: rgba(100, 30, 100, 50%);
`;

const Right = styled.div`
display: flex;
flex: 9; 
background-color: rgba(30, 150, 30, 50%)
`;

function App() {
  const [numShown, setNumShown] = useState(0);
  const [passedContent, setPassedContent] = useState();
  const [isfree, setIsfree] = useState([true, true])

  let list = Chars;

  function menuClick() {
    console.log("Klikk")
  }

  function klikkelt (vmi1, vmi2) {
    console.log(vmi1)
    setNumShown(vmi1);
    console.log(vmi2)
    setPassedContent(vmi2);
  }

  function klikked(type, humanoid) {
    let answer = [];
    for (let i = 0; i < isfree.length; i++) {
      i == humanoid.index-1 ? answer.push(false) : answer.push(isfree[i]);
    }
    setIsfree(answer);
    type == "Mingling" ? console.log("Mingling") : console.log("Questing")
    }

  function emptyIt(num) {
    let answer = [];
    for (let i = 0; i < isfree.length; i++) {
      i == num-1 ? answer.push(true) : answer.push(isfree[i]);
    }
    setIsfree(answer);
  }
  

  return (
      <Router>
         <div>{numShown !=  "0" && (<KartyaDiv><CharCard Katt = {() => setNumShown(0)} myContent = {passedContent} /></KartyaDiv>)}</div>
              <Frame>
                <TopShelf>
                <TopLeft><Menu onclick={menuClick}/></TopLeft>
                <TopRight><Navi /></TopRight>
                </TopShelf>
                <MainBody>
                <Left><Characters list = {list} klikkelt = {klikkelt} /></Left>
                <Right>
                <Switch>
                    <Route path="/village">
                      <Village klikked = {klikked} emptyIt = {emptyIt} isfree = {isfree}/>
                    </Route>
                    <Route path="/fields">
                      <Fields />
                    </Route>
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
