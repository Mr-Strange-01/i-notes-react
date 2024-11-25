import NoteContext from "./context";
import { useState } from "react";

const NoteState = (props) => {
    const [state, setState] = useState({
        name: "Rahul",
        age: 23
    });
    const update = () => {
        setTimeout(() => {
            setState({
                name: "Adam",   
                age: 24
            });
        }, 1500);
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;