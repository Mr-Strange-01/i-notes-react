import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/context'

export default function About() {
  const context = useContext(NoteContext);
  useEffect(() => {
    context.update();
  }, []);
  
  return (
    <div>
      <h1>Hello World My Name is {context.state.name} and My age is {context.state.age}</h1>
    </div>
  )
}
