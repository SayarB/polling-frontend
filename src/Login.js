import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
const defaultValue = {
  username:"",
  password:""
}
function Login() {
  const [formState, setFormState ] = useState(defaultValue)

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(formState.username==="" || formState.password==="")
    {
      alert("Fill the required Fields")
      return
    }
    console.log(formState)
  }


  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="">Login</h1>
            <input required className='input-field' type="text" placeholder='Username' value={formState.username} onChange={(e)=>{
              setFormState(fs=>({...fs,username:e.target.value}))
            }} />
            <input required type="password" className="input-field" placeholder='Password' value={formState.password} onChange={(e)=>{
              setFormState(fs=>({...fs,password:e.target.value}))
            }} />
            <button className='btn' type="submit">Submit</button>

            <p>Do not have an Account? <Link to={"/register"}>Sign Up</Link></p>
        </form>
    </div>
  )
}

export default Login