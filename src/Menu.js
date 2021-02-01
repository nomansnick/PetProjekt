import React from "react";
import Button from "./Button";

function Menu (props) {
    const {menuClick} = props

    return (
        <Button onClick = {() => menuClick()} text = "MENU"/>
    )
}

export default Menu;