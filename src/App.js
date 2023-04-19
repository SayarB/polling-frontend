import { useState,useEffect } from "react"
import { Link , useNavigate} from "react-router-dom"
import './app.css'
import PageLayout from "./PageLayout"
function App() {
  const [polls, setPolls] = useState([])
  const [pollID, setPollID] = useState("")
  const [examID, setExamID] = useState("")
  const navigate = useNavigate()
  const [active, setActive] = useState('polls')
  const api_url = process.env.REACT_APP_APIURL
  useEffect(()=>{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState===4){
        var firstThreePolls = {}
        try{
         firstThreePolls = JSON.parse(xhr.response).filter((poll,i)=>i<3)
        }catch(e){
          console.log(e)
        }
        console.log(firstThreePolls)
        setPolls(firstThreePolls)
      }
    }

    xhr.open("GET",`${api_url}/polls`,true)
    xhr.send()
  },[])

  const handleAnswerButtonClick = ()=>{
    if(active==="polls" && pollID.length>0){
      navigate('/poll/respond/'+pollID)
    }else if(active==="exams" && examID.length>0){
      navigate("/exam/respond/"+examID)
    }else{
      alert(`${active==='polls'?"Poll":"Exam"} ID not provided`)
    }
  }

    return (
      <PageLayout>
        <div className="nav"><button className={`default-btn ${active==='exams'&&'active'}`} style={{textAlign:'right'}} onClick={()=>{
          setActive('exams')
        }} >Exams</button>
        <button className={`default-btn ${active==='polls'&& 'active'}`} onClick={()=>setActive('polls')} style={{textAlign:'left'}}>Polls</button></div>
        
        
        {
            active==="polls"?
            
            <div><Link to={"/poll/create"}><button className="create-btn">Create Your Poll</button></Link>
            <h2>Or</h2>
            <input type="text" className="input-field" placeholder="Enter a Poll ID" value={pollID} onChange={(e)=>{
              setPollID(e.target.value)
            }}/>
            <button onClick={handleAnswerButtonClick} className="answer-btn">Answer</button>
            <h2>Or answer one of these</h2>
          
            {polls?.length>0 && <div className="polls">
              {
                polls?.map((poll,i)=>{
                  return (
                  <Link key={"poll-"+poll._id} className='poll-link' to={'/poll/respond/'+poll._id}>
                    <div className="poll-item">
                        <p>{poll.question}</p>
                    </div>
                  </Link>
                  )
                })
              }
            </div>}

            </div>
            :
            <div><Link to={"/exam/create"}><button className="create-btn">Create Your Exam</button></Link>
            <h2>Or</h2>
            <input type="text" className="input-field" placeholder="Enter a Exam ID" value={examID} onChange={(e)=>{
              setExamID(e.target.value)
            }}/>
            <button onClick={handleAnswerButtonClick} className="answer-btn">Answer</button>

            </div>

        }
      </PageLayout>
    );
  
}

export default App;
