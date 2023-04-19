import React from 'react'

function QuestionInput({question, handleChange, removeOption, onOptionAdd, changeOption, markCorrect}) {

    const handleTextChange = (e)=>{
        handleChange({...question,text:e.target.value})
    }

  return (
    <div>
        <input type="text" className='input-field' value={question.text} onChange={handleTextChange} placeholder={`Enter Question`}/>
        {question.options.map((opt,i)=>
        <div className={"option-input"} key={"option-input-"+i}>
                    <input className='input-field' type='text' value={opt.text} onChange={(e)=>changeOption(i, e.target.value)} placeholder={`Option ${i+1}`}/>
                    <input type="checkbox" className='checkbox' value={opt.isCorrect} onChange={(e)=>{markCorrect(i, e.target.checked)}} />
                <button type="button" className="cross-button"><img src="/cross.png" alt="X" onClick={()=>removeOption(i)}/></button>
                </div>)}
                <button type='button' onClick={onOptionAdd} className='add-opt-btn'>Add +</button>
        
    </div>
  )
}

export default QuestionInput