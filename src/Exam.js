import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import PageLayout from './PageLayout'
import "./exam.css"
function Exam() {

    const {id} = useParams()
    const [exam, setExam] = useState();
    const [submitted, setSubmitted] = useState(false)
    const [selected, setSelected] = useState([]);
    const api_url = process.env.REACT_APP_APIURL
  const [marksObtained, setMarksObtained]=useState(-1)

    const handleSubmit = ()=>{
        // `http://localhost:8000/exams/respond/${id}`

        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
        if(xhr.readyState===4){
            if(xhr.status===200) 
            {
                setSubmitted(true)
                const obj= JSON.parse(xhr.response)
                setMarksObtained(obj.marks)
            }
        }
        }
        xhr.open('POST',`${api_url}/exams/respond/${id}`,true)
        xhr.withCredentials =true
        xhr.setRequestHeader('Content-type','application/json')
        xhr.send(JSON.stringify({responses:selected}))



    }




    useEffect(()=>{
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = ()=>{
          if(xhr.readyState===4 && xhr.status===200){
            const examObj = JSON.parse(xhr.response)
            setExam(examObj)
            if(examObj.responded) {
              setSubmitted(true)
              setMarksObtained(examObj.marksObtained)
            }
          }
        }
        xhr.open('GET',`${api_url}/exams/${id}`,true)
        xhr.withCredentials = true
        xhr.send()
      },[])

      useEffect(()=>{
        if(exam && exam.questions){
            var arr = new Array(exam.questions.length).fill([])
            
            setSelected(arr)


        }
      },[exam])


      if(submitted)
        return <PageLayout>
            <div className='card'>
                <h2>Submitted</h2>
                <h3>Marks: {marksObtained}</h3>
            </div>
        </PageLayout>
  return (
    <PageLayout>
        {exam?
        
        (<div>
         
        {exam.questions.map((ques, ques_no)=>
        <div>
          <p>Marks : {exam.marksTotal}</p>
            <h2>{ques.text}</h2>
            <div className='options-div'>
            {ques.options?.map((opt,i)=>
              <button onClick={()=>{
                console.log(ques_no,i)
                setSelected(sel=>{
                    var arr = [...sel]
                    if(arr[ques_no].includes(i)) {
                        console.log("removing "+i)
                        arr[ques_no] = arr[ques_no].filter(o=>o!==i)
                    }
                    else {
                        arr[ques_no] = [...arr[ques_no],i]
                    }
                    return arr
                })
              }} key={'opt-'+i} className={`option-btn ${selected[ques_no]?.includes(i)&&'selected'}`}>
                <p>{opt}</p>
              </button>
            )}
          </div>
          
        </div>
        )}
        <button onClick={handleSubmit} className="btn">Submit</button>
        </div>

        ):<div className='card'>
            <h2>Cannot find quiz</h2>
        </div>
        }
    </PageLayout>
  )
}

export default Exam