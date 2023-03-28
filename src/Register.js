import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const defaultValue = {
    name:"",
    username:"",
    password:""
  }
function Register() {
    const [formState, setFormState ] = useState(defaultValue)
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(formState.username==="" || formState.password===""){
            alert("Fill all the required fields")
            return
        }
        console.log(formState)
    }
  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="">Register</h1>
            <input type="text" className='input-field' placeholder='Name' value={formState.name} onChange={(e)=>{
              setFormState(fs=>({...fs,name:e.target.value}))
            }} />
            <input required className='input-field' type="text" placeholder='Username' value={formState.username} onChange={(e)=>{
              setFormState(fs=>({...fs,username:e.target.value}))
            }} />
            <input required type="password" className="input-field" placeholder='Password' value={formState.password} onChange={(e)=>{
              setFormState(fs=>({...fs,password:e.target.value}))
            }} />
            <button className='btn' type="submit">Submit</button>
            <p>Already have an Account? <Link to={"/login"}>Login</Link></p>
        </form>
    </div>
  )
}

export default Register