import React,{useState} from 'react'
import PageLayout from './PageLayout'
import './create.css'
function Create() {

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["",""])

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log({question, options})
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
                <div className={"option-input"}>
                    <input className='input-field' type='text' value={opt} onChange={(e)=>{
                    setOptions(opts=>{
                        var arr = [...opts]
                        arr[i] = e.target.value
                        return arr
                    })
                }}/>
                <button className="cross-button"><img src="/cross.png" alt="X" onClick={()=>{
                    if(i!==0){
                        setOptions(opts=>{
                            return opts.slice(0,-1)
                        })
                        
                    }
                }}/></button>
                </div>)}
                <button onClick={(e)=>{
                    setOptions(opts=>[...opts,""])
                }} className='add-opt-btn'>Add +</button>
                <button className='btn' type="submit">Submit</button>
            </form>
            
        </PageLayout>
    )
}

export default Create