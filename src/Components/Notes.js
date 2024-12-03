import React ,{ useContext, useEffect } from 'react'
import NoteContext from '../Context/context'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes, getNotes} = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);
    
  return (
    <>  
      <AddNote />
      <div className="notes">
        <div className="row my-3">
            {notes.map((note, index) => {
                return (
                    <NoteItem key={index} note={note} />
                )
            })}
        </div>
      </div>
    </>
  )
}
