import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './conversation.css'

export default function Conversation({conversation, currentUser}) {

  const [user, setUser] = useState(null)

  useEffect(()=>{
    const friendId = conversation.members.find((m)=> m !== currentUser._id)
    
    const getUser = async()=>{
      try {
        const res = await axios.get(`http://localhost:3001/user/${friendId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getUser()
  },[currentUser, conversation])


    const PF = process.env.REACT_APP_PUBLIC_FILE
  return (
    <div className='conversation'>
        <img src={user?.profilePicture ? PF+user.profilePicture : PF+"cover.png"} alt="" className="conversationImg" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
