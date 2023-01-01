import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './chatonline.css'

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`http://localhost:3001/user/friend/${currentId}`)
            setFriends(res.data)
        }

        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers])

    const handelClick = async(user)=>{
        try {
            const res = await axios.get(`http://localhost:3001/conversation/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <div className="chatOnline">
            {onlineFriends.map((o)=>(
            <div className="chatOnlineFriend" onClick={()=>handelClick(o)}>
                <div className="chatOnlineImgContanier">
                    <img src={o?.profilePicture ?PF + o.profilePicture : PF+'cover.png'} alt="" className='chatOnlineImg' />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineUsername">{o?.username}</span>
            </div>
                ))}
        </div>
    )
}
