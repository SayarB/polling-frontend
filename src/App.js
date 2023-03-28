import { useState,useEffect } from "react"
import { Navigate,Link } from "react-router-dom"
import Loading from "./Loading"
import { getPolls } from "./mock/getPolls"

import './app.css'
import PageLayout from "./PageLayout"
function App() {
  const [polls, setPolls] = useState([])
  const [pollID, setPollID] = useState("")
  useEffect(()=>{
    (async ()=>{
      getPolls().then((res)=>{
        setPolls(res)
      })
    })()
  },[])

  const handleAnswerButtonClick = ()=>{
    if(pollID.length>0){
      console.log("Answer: ", pollID)
    }else{
      alert("Enter Poll ID")
    }
  }

    return (
      <PageLayout>
        <Link to={"/poll/create"}><button className="create-btn">Create Your Poll</button></Link>
        <h2>Or</h2>
        <input type="text" className="input-field" placeholder="Enter a Poll ID" value={pollID} onChange={(e)=>{
          setPollID(e.target.value)
        }}/>
        <button onClick={handleAnswerButtonClick} className="answer-btn">Answer</button>
        <h2>Or answer one of these</h2>
      
        {polls.length>0 && <div className="polls">
          {
            polls.map((poll,i)=>{
              return (
              <Link key={"poll-"+poll.id} className='poll-link' to={'/poll/'+poll.id}>
                <div className="poll-item">
                    <p>{poll.question}</p>
                </div>
              </Link>
              )
            })
          }
        </div>
        }
      </PageLayout>
    );
  
}

export default App;
