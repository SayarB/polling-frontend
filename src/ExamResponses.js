import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from './PageLayout'

function ExamResponses() {

    const {id} = useParams()

    const api_url = process.env.REACT_APP_APIURL

    const [responses, setResponses] = useState()

    useEffect(()=>{
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
          if(xhr.readyState===4 && xhr.status===200){
            setResponses(JSON.parse(xhr.response))
            
          }
        }
        xhr.open('GET',`${api_url}/exams/responses/${id}`,true)
        xhr.send()
    })
  return (
    <PageLayout>
        {responses?
        <div>
            <h1>Responses</h1>
            <div className='row'>
                <h3>Name</h3>
                <h3>Marks</h3>
            </div>
            {
                responses.map(res=>(
                    <div className='row'>
                        <p>{res.userId.name}</p>
                        <p>{res.marks}</p>
                    </div>
                ))
            }
        </div>
        :
        <div className='card'><h2>Could not find Quiz</h2></div>}
    </PageLayout>
  )
}

export default ExamResponses