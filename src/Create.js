import React,{useState} from 'react'
import PageLayout from './PageLayout'
import './create.css'
import { useNavigate } from 'react-router-dom';
function Create() {

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["",""])
    const navigate = useNavigate()
    const api_url = process.env.REACT_APP_APIURL
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('submit',{title:question, options})
        const body = {title:question, options}

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===4){
                if(xhr.status===200) navigate('/poll/respond/'+JSON.parse(xhr.responseText)._id)
            }
        }
        xhr.open('POST', `${api_url}/polls`,true)
        xhr.withCredentials=true
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send(JSON.stringify(body))
    }


    return (
        <PageLayout>
            <form onSubmit={handleSubmit}>
                <h2>Question : </h2>
                <div><input className='input-field' type="text" value={question} onChange={(e)=>{
                    setQuestion(e.target.value)
                }}/></div>
                <h2>Options :</h2>
                {options.map((opt,i)=>
                <div className={"option-input"} key={"option-input-"+i}>
                    <input className='input-field' type='text' value={opt} onChange={(e)=>{
                    setOptions(opts=>{
                        var arr = [...opts]
                        arr[i] = e.target.value
                        return arr
                    })
                }}/>
                
                </div>)}
                <button type='button' onClick={(e)=>{
                    setOptions(opts=>[...opts,""])
                }} className='add-opt-btn'>Add +</button>
                <button className='btn' type="submit">Submit</button>
            </form>
            
        </PageLayout>
    )
}

export default Create