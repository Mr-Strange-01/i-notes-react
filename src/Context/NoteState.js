import NoteContext from "./context";
import { useState } from "react";

const NoteState = (props) => {   
    const data = [
        {
            _id: "1",
            title: "First Note",
            description: "This is my first note",
            tag: "general"
        },
        {
            _id: "2",
            title: "Second Note",
            description: "This is my second note",
            tag: "general"
        }
    ] 

    const [notes, setNotes] = useState(data);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;