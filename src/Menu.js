import React from "react";
import Button from "./Button";

function Menu (props) {
    const {onclick} = props
    return (
        <Button onClick = {onclick} text = "MENU"/>
    )
}

export default Menu;