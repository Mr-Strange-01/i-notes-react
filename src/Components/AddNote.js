import { useState, useContext } from 'react'
import NoteContext from '../Context/context'

export default function AddNote() {
    const context = useContext(NoteContext);
    const {notes, addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag); 
        setNote({title: "", description: "", tag: ""});        
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
  return (
    <div className="form">
          <form>
            <div className="mb-3">                
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>              
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
            </div>            
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
            </div>            
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
  )
}
