import React from "react"

function ButtonGeneric(props) {
    const {Clicked, text} = props
return (
    <button onClick = {Clicked}>{text}</button>
)
}

export default ButtonGeneric;