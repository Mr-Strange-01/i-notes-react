import React, {useContext} from 'react'
import NoteContext from '../Context/context'
export default function NoteItem(props) {

  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
    <>    
      <div className="col-md-4">
          <div className="card my-3">
              <div className="card-body">
                  <h5 className="card-title">{props.note.title}</h5>
                  <p className="card-text">{props.note.description}</p>
                  <p className="card-text">{props.note.tag}</p>
                  <span className="text-primary"><i className="fa-solid fa-pen-to-square mx-2 fa-xl" onClick={() => {props.updateNote(props.note)}}></i></span>  
                  <span className="text-danger"><i className="fa-solid fa-trash mx-2 fa-xl" onClick={() => {deleteNote(props.note._id)}}></i></span>  
              </div>
          </div>
      </div>
    </>
  )
}
