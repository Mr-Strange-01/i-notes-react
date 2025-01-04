import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/context'
import { useSelector } from 'react-redux'
import Shop from './Shop';

export default function About() {  
  const amount = useSelector((state) => state.amount);
  return (
    <div>
      <h1>About Us page</h1>

      <button class="btn btn-primary">Your balance is {amount}</button>
      
      <Shop />
    </div>
  )
}
