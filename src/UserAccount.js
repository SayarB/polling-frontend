import React, { useEffect, useState } from 'react'
import PageLayout from './PageLayout'
import { Link } from 'react-router-dom'
import Loading from './Loading'
function UserAccount() {

    const api_url = process.env.REACT_APP_APIURL


    const [account, setAccount]= useState({})


    useEffect(()=>{
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4&& xhr.status===200)
            {
                setAccount(JSON.parse(xhr.response))
            }
        }

        xhr.open('GET',`${api_url}/users/details`,true)
        xhr.withCredentials=true
        xhr.send()

    },[])

  return (
    <PageLayout>
        <div className='account-container'>

        {account.user?
        <div>
            <h1>User Account</h1>
            <p>Name : {account.user.name}</p>
            <p>Email : {account.user.email}</p>
            {account.pollsCreated?.length>0 && 
            <>
                <h2>Polls Created</h2>
                <div className="polls"> 
                    
                    {
                        account.pollsCreated?.map((poll,i)=>{
                        return (
                        <Link key={"poll-"+poll._id} className='poll-link' to={'/poll/respond/'+poll._id}>
                            <div className="poll-item">
                                <p>{poll.question}</p>
                            </div>
                        </Link>
                        )
                        })
                    }
                </div>
            </>
            }

            {account.examsCreated?.length>0 && <>
            <h2>Exams Created</h2>
            <div className="polls"> 
                
                {
                    account.examsCreated?.map((exam,i)=>{
                    return (
                    <Link key={"poll-"+exam._id} className='poll-link' to={'/exam/responses/'+exam._id}>
                        <div className="poll-item">
                            <p>{exam.name||exam._id}</p>
                        </div>
                    </Link>
                    )
                    })
                }
            </div>
            </>
            }
            {account.examsResponded?.length>0 && <>
            <h2>Exams Submitted</h2>
            <div className="polls"> 
                
                {
                    account.examsResponded?.map((exam,i)=>{
                    return (
                    <div key={"poll-"+exam._id} className='poll-link'>
                        <div className="poll-item">
                            <p>{exam.quizId?.name||exam._id}</p>
                            <p>Marks : {exam.marks}</p>
                        </div>
                    </div>
                    )
                    })
                }
            </div>
            </>
            }
            
        </div>:<Loading/>}

        </div>
    </PageLayout>
  )
}

export default UserAccount