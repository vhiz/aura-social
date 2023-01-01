import axios from 'axios'
import { useEffect, useState } from 'react'
import './online.css'

export default function Online({ onlineUsers, currentId }) {
    const PF = process.env.REACT_APP_PUBLIC_FILE
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

    return (

        onlineFriends.map((o) => (
            <li className="rightbarFriend">

                <div className="rightbarProfileImgContanier">
                    <img src={o?.profilePicture ?PF + o.profilePicture : PF+'cover.png'} alt="" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{o?.username}</span>
            </li>
        ))

    )
}
