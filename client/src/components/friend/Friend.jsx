import "./friend.css"

export default function Friend({friend}) {
    return (
        <li className="sidebarFriend">
            <img src={friend.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidbarFriendName">{friend.userName}</span>
        </li>
    )
}
