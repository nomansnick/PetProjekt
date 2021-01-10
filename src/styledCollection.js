import styled from "styled-components"

const CardDiv = styled.div`
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
  z-index: 3;
`;

const NextDayDiv = styled.div`
position: fixed;
margin-top: 5%;
margin-left: 91%;
z-index: 5;
`;

const DayButton = styled.button`
border-radius: 10vh;
height: 10vh;
background-color: grey;
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
border: solid 1vh black;
`

const Left = styled.div`
display: flex;
flex-direction: column;
flex: 1;
background-color: rgba(100, 30, 100, 50%);
`;

const LeftUpper = styled.div`
display: flex;
flex: 4;
`;

const LeftLower = styled.div`
display: flex;
flex: 1;
`;

const Right = styled.div`
display: flex;
flex: 9; 
background-color: rgba(30, 150, 30, 50%)
`;

const VillageDiv = styled.div`
display: flex;
justify-content: space-around;
`;

const OneBuilding = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1vh rgba(100, 100, 100, 50%) solid;
flex:1;
`;

const Title = styled.div`
font-size: 5vh;
font-weight: bold;
`;

const Center = styled.div`
text-align: center;
`;
const Righty = styled.div`
margin-top: 5%;
text-align: right;
`;

const ButtonDiv = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
`;

const BottomDv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
height: 10vh;
`;

const OverLay = styled.div`
  position: fixed;
  display: flex;
  margin-left: 10%;
  width: 100%;
  height: 100vh;
  z-index: 2;
  pointer-events: none;
`;

export {Right, DayButton, Left, MainBody, TopLeft, TopShelf, TopRight, Frame, CardDiv, LeftLower, LeftUpper,
  BottomDv, ButtonDiv, Righty, Center, Title, OneBuilding, VillageDiv, NextDayDiv, OverLay}