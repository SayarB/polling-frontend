import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const defaultValue = {
    name:"",
    email:"",
    password:""
  }
function Register() {
    const [formState, setFormState ] = useState(defaultValue)
    const navigate = useNavigate()
    const api_url = process.env.REACT_APP_APIURL
    const handleSubmit = (e)=>{
        e.preventDefault();
        const xhr = new XMLHttpRequest()

        if(!(/^[A-Za-z]+$/.test(formState.name))){
          return alert("Name should not contain non alphabet characters")
        }else if(formState.password.length<8){
          return alert("Password should contain atleast 8 characters")
        }

        xhr.onreadystatechange = ()=>{
          if(xhr.readyState===xhr.OPENED){
            xhr.setRequestHeader('Content-type', 'application/json')
          }
          if(xhr.readyState===4){
            if(xhr.status===200) navigate('/')
            else console.log("Something went wrong")
          }
        }
        xhr.open('POST', `${api_url}/users`)
        xhr.withCredentials=true
        
        xhr.send(JSON.stringify(formState))
    }
  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 className="">Register</h1>
            <input type="text" className='input-field' required placeholder='Name' value={formState.name} onChange={(e)=>{
              setFormState(fs=>({...fs,name:e.target.value}))
            }} />
            <input required className='input-field' type="email" placeholder='Email' value={formState.email} onChange={(e)=>{
              setFormState(fs=>({...fs,email:e.target.value}))
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