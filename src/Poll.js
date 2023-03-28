import React from 'react'
import { useParams } from 'react-router-dom'
function Poll() {
  const [poll, setPoll] = useState(null)
  const {id} = useParams()
  useEffect(()=>{
    (async ()=>{
      getPollById(id).then((res)=>{
        setPoll(res)
      })
    })()
  },[id])
  return (
    <div></div>
  )
}

export default Poll