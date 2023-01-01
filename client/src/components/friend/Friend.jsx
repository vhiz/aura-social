import { Link } from "react-router-dom"
import "./friend.css"

export default function Friend({ friends }) {


    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        friends.map((friend) => (

                <Link to={`/profile/${friend._id}`} style={{ textDecoration: 'none' }}>
            <li className="sidebarFriend">
                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'cover.png'} alt="" className="sidebarFriendImg" />
                <span className="sidbarFriendName">{friend?.username}</span>
            </li>
                </Link>
        ))
    )
}
