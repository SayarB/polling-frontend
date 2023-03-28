import React,{useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import Loading from './Loading'
function PageLayout({children}) {
  const [auth, setAuth] = useState("unauthed")
  const [loading, setLoading] = useState(true)

  const getAuth = async (token)=>{
    const res =  new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(token==='correctToken')
          resolve({user:{id:1}})
        else
          reject("bad token")
      },2000)
    })
    return res
  }
 
console.log(username)


  useEffect(()=>{
     (async ()=>{
      getAuth('correctToken').then((val)=>{
        setAuth('authed')
      }).catch(e=>{
        setAuth("unauthed")
      }).finally(()=>{
        setLoading(false)
      })
     })()
  },[])


    if(loading===false && auth==='authed')
        return <div className="app">{children}</div>
    else if(loading){
        return <Loading/>
    }
    else{
        return <Navigate to={'/login'}/>
    }

}

export default PageLayout