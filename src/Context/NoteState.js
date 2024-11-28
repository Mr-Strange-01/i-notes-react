import NoteContext from "./context";
import { useState } from "react";

const NoteState = (props) => {   
    const host = "http://localhost:3001/api/notes";
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

    const getNotes = async () => {
        const url = `${host}/addnote`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }
    }
    const addNote = (id, title, description, tag) => {        
        const newNote = {
            _id: id,
            title: title,
            description: description,
            tag: tag
        }

        setNotes(notes.concat(newNote));
    }

    const deleteNote = (id) => {        
        setNotes(notes.filter((note) => note._id !== id));
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, setNotes, addNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;