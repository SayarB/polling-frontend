const data = {
    polls:[
        {
            id:1,
            question:"Question?",
            options:[
                {
                    text:"Option1",
                    numOfResponses:4
                },
                {
                    text:"Option2",
                    numOfResponses:3
                },
                {
                    text:"Option3",
                    numOfResponses:3
                }
            ],
            totalResponses:10,

        },
        {
            id:4,
            question:"Question?",
            options:[
                {
                    text:"Option1",
                    numOfResponses:4
                },
                {
                    text:"Option2",
                    numOfResponses:3
                },
                {
                    text:"Option3",
                    numOfResponses:3
                }
            ],
            totalResponses:10,

        },{
            id:6,
            question:"Question?",
            options:[
                {
                    text:"Option1",
                    numOfResponses:4
                },
                {
                    text:"Option2",
                    numOfResponses:3
                },
                {
                    text:"Option3",
                    numOfResponses:3
                }
            ],
            totalResponses:10,

        }
    ]
}

export const getPolls = ()=>{
    return new Promise((resolve,_)=>{
        setTimeout(()=>{resolve(data.polls)},1000)
    })
}
export const getPollById = (id)=>{
    return new Promise((resolve,_)=>{
        setTimeout(()=>{
            resolve(data.polls.filter(poll=>poll.id==id))
        },1000)
    })
}