import './online.css'

export default function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContanier">
                <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.userName}</span>
        </li>
    )
}
