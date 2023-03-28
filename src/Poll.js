import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getPollById } from './mock/getPolls'
import PageLayout from './PageLayout'
import './Poll.css'
function Poll() {
  const [poll, setPoll] = useState({})
  const {id} = useParams()
  const [response, setResponse] = useState(-1)
  useEffect(()=>{
    (async ()=>{
      getPollById(id).then((res)=>{
        console.log(poll)
        setPoll(res[0])
      })
    })()
  },[id])

  const handleResponse = async (i)=>{
    if(response===-1) setResponse(i)
  }


  return (
    <PageLayout>
      <div className='card'>
          <h2>{poll.question}</h2>
          <div className='options-div'>
            {poll.options?.map((opt,i)=>
              <button onClick={()=>{handleResponse(i)}} key={'opt-'+i} className={'option-btn '+(response===i?"response":"") }>
                <p>{opt.text}</p>
                <p className={response===-1?"hidden":""}>{opt.numOfResponses*100/poll.totalResponses}%</p>
              </button>
            )}
          </div>
      </div>
    </PageLayout>
  )
}

export default Poll