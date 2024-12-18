import React ,{ useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/context'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(NoteContext);
    const {notes, getNotes, updateNote} = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

    let navigage = useNavigate();

    useEffect(() => {
      if(localStorage.getItem('token'))
        {
          getNotes();
        }
        else {
          navigage('/login');
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();     
      updateNote(note.etitle, note.edescription, note.etag, note.id);  
      refClose.current.click();  
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});
  }
    const updateNotePage = (current) => {
        ref.current.click();
        setNote({etitle: current.title, edescription: current.description, etag: current.tag, id: current._id});
    }
    
  return (
    <>  
      <button style={{display: 'none'}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">                
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onChange}/>              
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange}/>
                </div>            
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange}/>
                </div>            
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />
      <div className="notes">
        <div className="row my-3">
            {notes.length === 0 ? <h3>No notes to display</h3> : notes.map((note, index) => {
                return (
                    <NoteItem key={index} note={note} updateNote={updateNotePage} />
                )
            })}
        </div>
      </div>
    </>
  )
}
