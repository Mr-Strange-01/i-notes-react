import React from 'react'
import { useContext } from 'react'
import NoteContext from '../Context/context'
import NoteItem from './NoteItem';

export default function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
  return (
    <div className="row my-3">
        {notes.map((note, index) => {
            return (
                <NoteItem key={index} note={note} />
            )
        })}
    </div>
  )
}
