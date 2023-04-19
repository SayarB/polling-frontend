import React,{useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getPollById } from './mock/getPolls'
import PageLayout from './PageLayout'
import './Poll.css'
function Poll() {
  const [poll, setPoll] = useState()
  const [copied, setCopied] = useState(false)
  const {id} = useParams()
  const [response, setResponse] = useState(-1)
  const location = useLocation()
  const domain = process.env.REACT_APP_DOMAIN

  const api_url = process.env.REACT_APP_APIURL
  useEffect(()=>{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState===4 && xhr.status===200){
        setPoll(JSON.parse(xhr.response))
      }
    }
    xhr.open('GET',`${api_url}/polls/${id}`,true)
    xhr.send()
  },[])

  const handleResponse = async (i)=>{
    if(response!==-1) return
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState===4){
        if(xhr.status===200) 
        {
          setPoll(JSON.parse(xhr.response).poll)
          setResponse(i)
        }
      }
    }
    xhr.open('POST',`${api_url}/polls/answer/${id}`,true)
    xhr.setRequestHeader('Content-type','application/json')
    xhr.send(JSON.stringify({option:poll.options[i].text}))
    
  }


  return (
    <PageLayout>
      <div className='card'>
          
          {poll?
          <>
          <p style={{fontSize:"15px", margin:0}}>ID: {poll._id}</p>
          <div className='header'>
            
            <h2>{poll.question}</h2>
            <button className='copy-btn' onClick={()=>{
              if(copied) return
              navigator.clipboard.writeText(`${domain}/poll/respond/${id}`)
              setCopied(true)

              }}>{copied?'Copied': 'Copy URL'}</button>
          </div>
          <div className='options-div'>
            {poll.options?.map((opt,i)=>
              <button onClick={()=>{handleResponse(i)}} key={'opt-'+i} className={'option-btn '+(response===i?"response":"") }>
                <p>{opt.text}</p>
                <p className={response===-1?"hidden":""}>{(opt.numOfRes*100/poll.totalResponses).toFixed()}%</p>
              </button>
            )}
          </div></>:<h2>Can not find this Poll</h2>}
      </div>
    </PageLayout>
  )
}

export default Poll