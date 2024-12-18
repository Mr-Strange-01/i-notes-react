import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, cpassword: credentials.cpassword}),
    });

    const json = await response.json();
    if(json.success)
    {
      localStorage.setItem('token', json.authToken);
      navigate("/");
    }
  }
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  return (
    <div className="container my-5">
      <h2>Create an account to iNotes</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div> */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
