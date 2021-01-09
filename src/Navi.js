import React from "react";
import {
  Link
} from "react-router-dom";
import styled from "styled-components";

const LinkDiv = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
font-size: 10vh;
font-weight: bold;
color: rgb(40, 40, 40);
`;

const OneItem = styled.div`
display: flex;
justfiy-content: center;
border: 1vh solid black;
width: 100%;
`;

let setting = {
  textAlign: 'center',
  textDecoration: 'none',
  color: 'inherit',
  width: 'inherit'
}

function Navi() {
  return (
    <LinkDiv>
    <OneItem><Link to="/" style={setting}>Your Camp</Link></OneItem>
    <OneItem><Link to="/village" style={setting}>The Village</Link></OneItem>
    <OneItem><Link to="/fields" style={setting}>The Fields</Link></OneItem>
  </LinkDiv>)
}

export default Navi;