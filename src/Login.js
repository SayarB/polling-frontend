import React, { useEffect, useState } from 'react'
import './login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
const defaultValue = {
  email:"",
  password:""
}
function Login() {
  const [formState, setFormState ] = useState(defaultValue)
  const navigate = useNavigate()
  const location = useLocation()
  const api_url = process.env.REACT_APP_APIURL
  const handleSubmit = (e)=>{
    e.preventDefault();
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = ()=>{
      if(xhr.readyState===xhr.OPENED){
        xhr.setRequestHeader('Content-type', 'application/json')
      }
      if(xhr.readyState===4){
        if(xhr.status===200) navigate(location.state?.last|| "/")
        else if(xhr.status===400){
          alert(JSON.parse(xhr.response).error)
        }
      }
    }
    xhr.open('POST', `${api_url}/users/login`)
    xhr.withCredentials =true
    xhr.send(JSON.stringify(formState))
  }


  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="">Login</h1>
            <input required className='input-field' type="text" placeholder='Email' value={formState.email} onChange={(e)=>{
              setFormState(fs=>({...fs,email:e.target.value}))
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