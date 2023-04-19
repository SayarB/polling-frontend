import React,{useState, useEffect} from 'react'
import {Navigate, useNavigate, useLocation, Link} from 'react-router-dom'
import Loading from './Loading'
function PageLayout({children}) {
  const [auth, setAuth] = useState("unauthed")
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const api_url = process.env.REACT_APP_APIURL

  useEffect(()=>{
     const xhr = new XMLHttpRequest()
     xhr.onreadystatechange = ()=>{
      if (xhr.readyState===4 && xhr.responseText.length>0){
        var body={}
        try{
          body = JSON.parse(xhr.responseText)
        }catch(e){
          console.log(e)
        }
        if(body?.verified){
          setAuth('authed')
        }else{
          setAuth('unauthed')
        }
        setLoading(false)
      }
      
     }
     xhr.open('GET', `${api_url}/users/verify` , true)
     xhr.withCredentials = true
     xhr.send()
      
  },[])


    const handleLogout = ()=>{
      const xhr = new XMLHttpRequest()

      xhr.onreadystatechange = ()=>{
        
        if(xhr.readyState===4 && xhr.status===200){
          navigate('/login')  
        }
      }
      xhr.open('POST', `${api_url}/users/logout`)
      xhr.withCredentials =true
      xhr.send()
    }



    if(loading===false && auth==='authed'){
        return(<>
        <div className='navbar'>
        <Link style={{textDecoration:'none', color:'black'}} to="/">Home</Link>
          <Link style={{textDecoration:'none', color:'black'}} to="/account">Account</Link>
          <button className='default-btn logout-btn' onClick={handleLogout}>Log out</button></div>
          <div className="app">
            {children}
          </div>
        </> )
    }else if(loading){
        return <Loading/>
    }
    else{
        return <Navigate state={{last:location.pathname}} to={'/login'}/>
    }

}

export default PageLayout