import React from "react"
import {DayButton} from "./styledCollection";

function ButtonNextDay(props) {
    const {Clicked, text} = props
return (
    <DayButton onClick = {Clicked}>{text}</DayButton>
)
}

export default ButtonNextDay;