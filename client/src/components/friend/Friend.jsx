import "./friend.css"

export default function Friend({friend}) {

    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <li className="sidebarFriend">
            <img src={PF+friend.profilePicture} alt="" className="sidebarFriendImg" />
            <span className="sidbarFriendName">{friend.userName}</span>
        </li>
    )
}
