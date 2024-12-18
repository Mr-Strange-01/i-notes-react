import NoteContext from "./context";
import { useState } from "react";
import { showNotification } from "../utils/notify";
import Swal from "sweetalert2";

const NoteState = (props) => {   
    const host = "http://localhost:3001/api/notes";
    const data = [] 
    const [notes, setNotes] = useState(data);
    const [swalProps, setSwalProps] = useState({});

    const getNotes = async () => {
        const url = `${host}/notes`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
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
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({title, description, tag}),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            setNotes(notes.concat(json));
            showNotification("Note added successfully", "success");
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
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({title, description, tag}),
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                showNotification("Note not updated", "error");
            }

            const json = await response.json();
            const newNotes = JSON.parse(JSON.stringify(notes));

            for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
                }
            }
            setNotes(newNotes);
            showNotification("Note updated successfully", "success");
        } catch (error) {
            console.error(error.message);
        }
    }
    const deleteNote = async (id) => {      
        const url = `${host}/deletenote/${id}`;
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });    
                
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    showNotification("Note not deleted", "error");
                }
                
                const json = await response.json();
                
                setNotes(notes.filter((note) => note._id !== id));
                showNotification("Note deleted successfully", "success");
            }        
        } catch (error) {
            console.error(error.message);
        }  
    }

    return (
        <NoteContext.Provider value={{notes, getNotes, setNotes, addNote, updateNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;