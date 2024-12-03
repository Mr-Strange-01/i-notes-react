import NoteContext from "./context";
import { useState } from "react";

const NoteState = (props) => {   
    const host = "http://localhost:3001/api/notes";
    const data = [] 
    const [notes, setNotes] = useState(data);

    const getNotes = async () => {
        const url = `${host}/notes`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczODYxOWE5Nzc3ODIyOGVlNTRjYzFiIn0sImlhdCI6MTczMzIwNjQ1Nn0.pdsgwrK-lKpwhH6dfhTnKIqa1EvNdV8oVCgejmoZU3g",
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error(error.message);
        }
    }
    const addNote = async (title, description, tag) => {        
        const url = `${host}/addnote`;
        // console.log(title, description, tag);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczODYxOWE5Nzc3ODIyOGVlNTRjYzFiIn0sImlhdCI6MTczMzIwNjQ1Nn0.pdsgwrK-lKpwhH6dfhTnKIqa1EvNdV8oVCgejmoZU3g",
                },
                body: JSON.stringify({title, description, tag}),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(notes.concat(json));
        } catch (error) {
            console.error(error.message);
        }
    }

    const updateNote = async (title, description, tag, id) => {
        const url = `${host}/updatenote/${id}`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczODYxOWE5Nzc3ODIyOGVlNTRjYzFiIn0sImlhdCI6MTczMzIwNjQ1Nn0.pdsgwrK-lKpwhH6dfhTnKIqa1EvNdV8oVCgejmoZU3g",
                },
                body: JSON.stringify({title, description, tag}),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            const newNotes = JSON.parse(JSON.stringify(notes));

            setNotes(newNotes);
        } catch (error) {
            console.error(error.message);
        }
    }
    const deleteNote = async (id) => {      
        const url = `${host}/deletenote/${id}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczODYxOWE5Nzc3ODIyOGVlNTRjYzFiIn0sImlhdCI6MTczMzIwNjQ1Nn0.pdsgwrK-lKpwhH6dfhTnKIqa1EvNdV8oVCgejmoZU3g",
                },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error(error.message);
        }  
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, setNotes, addNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;