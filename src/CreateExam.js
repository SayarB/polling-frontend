import React,{useState} from 'react'
import PageLayout from './PageLayout'
import QuestionInput from './QuestionInput'
import "./exam.css"
function CreateExam() {

    const [questions,setQuestions] = useState([{text:"",options:[{text:"",isCorrect:false},{text:"",isCorrect:false}]},{text:"",options:[{text:"",isCorrect:false},{text:"",isCorrect:false}]}])
    const [nameOfQuiz, setNameOfQuiz] = useState("")
    const [marksTotal, setMarksTotal] = useState(10)
    const [submitted, setSubmitted] = useState(false)
    const [submitID, setSubmitID] = useState("")
    const [copied, setCopied] = useState(false)
    const api_url = process.env.REACT_APP_APIURL
    const domain  = process.env.REACT_APP_DOMAIN
    const onSubmit = (e)=>{
        e.preventDefault()
        
        for(let i in questions){
            i=parseInt(i)
            console.log(i)
            const question = questions[i]
            if(question.text===""){
                return alert( `Question ${i+1} is empty`)
            } else if(question.options.filter(opt=>opt.text==="").length!==0){
                return alert(`One of the options of Question ${i+1} is empty`)
            }else if(question.options.filter(opt=>opt.isCorrect).length===0){
                return alert(`You have to mark a correct answer for Question ${i+1}`)
            }
        }
        
        const body = {questions, name:nameOfQuiz, marksTotal}

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = ()=>{
            if(xhr.readyState===4){
                if(xhr.status===200) {
                    setSubmitted(true)
                    const data = JSON.parse(xhr.responseText)
                    setSubmitID(data._id)
                }else console.log(JSON.parse(xhr.responseText).message)
            }
        }
        xhr.open('POST', `${api_url}/exams`,true)
        xhr.withCredentials=true
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send(JSON.stringify(body))
    }


    const updateQuestionText = (i,obj)=>{
        setQuestions(questions=>{
            var arr=[...questions]
            arr.splice(i,1,obj)
            return arr
        })
    }

    const onOptionAdd=(i)=>{
        setQuestions(questions=>{
            var arr = [...questions];
            var options = [...arr[i].options,{text:"",isCorrect:false}]
            arr.splice(i,1, {...arr[i], options})
            console.log(arr[i])
            return arr
        })
    }

    const changeOption =(i,j, text)=>{
        setQuestions(questions=>{
            var arr = [...questions]
            arr[i].options[j].text=text
            return arr
        })
    }

    const addQuestion = ()=>{
        setQuestions(questions=>([...questions,{text:"",options:[{text:"",isCorrect:false},{text:"",isCorrect:false}]}]))
    }

    const markCorrect =(i,j,val)=>{
        console.log(i,j)
        setQuestions(questions=>{
            var arr = [...questions]
            arr[i].options[j].isCorrect = val
            return arr
        })
    }

  return (
    <PageLayout>
        {submitted?
        <div className='card' style={{display:'flex', justifyContent:'space-between'}}>
            <h3 style={{textAlign:'center'}}>Created Exam</h3>
            <button onClick={()=>{
                navigator.clipboard.writeText(`${domain}/exam/respond/${submitID}`)
                setCopied(true)
                setTimeout(()=>{
                    setCopied(false)
                },5000)
            }} 
            disabled={copied} className="add-opt-btn">{copied?"Copied":"Click to Copy Link"} </button>
        </div>
        :
        <div className='exam-container'>
        <form className='exam-form' onSubmit={onSubmit}>

            <input type="text" className='input-field' placeholder='Title of Quiz' value={nameOfQuiz} onChange={(e)=>{setNameOfQuiz(e.target.value)}}/>
            <input type="number" className='input-field' placeholder='Total Marks' value={marksTotal} onChange={(e)=>{
                if(e.target.value<=0) return alert("Total Marks should be positive")
                setMarksTotal(e.target.value)}}/>
        {
            questions.map((question, i)=>
                    <div>
                        <div className='header'>
                        <h1>Question {i+1}</h1>
                        <button type="button" className="cross-button">
                            <img src="/cross.png" alt="X" onClick={()=>{
                                if(questions.length>1)
                                {
                                    setQuestions(questions=>{
                                        var arr = [...questions]
                                        arr.splice(i,1)
                                        return arr
                                    })
                                }
                            }}/>
                        </button>
                        </div>
                        <QuestionInput question={question} handleChange={(obj)=>{updateQuestionText(i,obj)}}
                        changeOption={(j,text)=>changeOption(i,j,text)} 
                        markCorrect={(j, val)=>markCorrect(i,j, val)}
                        onOptionAdd={()=>onOptionAdd(i)} removeOption={(option_index)=>{
                        setQuestions(questions=>{
                            var arr = [...questions]
                            if(arr[i].options.length>2)
                            arr[i].options.splice(option_index,1)
                            return arr
                        })
                        }}/>
                    </div>
            )
        }
        <button type='button' onClick={addQuestion} className='add-opt-btn'>Add Question</button>
        <button type='submit' className='btn'>Submit</button>
        
        </form>
        </div>}
        
    </PageLayout>        
  )
}

export default CreateExam