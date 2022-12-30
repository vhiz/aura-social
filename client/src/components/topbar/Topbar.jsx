import "./topbar.css"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Person4Icon from '@mui/icons-material/Person4';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../contex/AuthContex";

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FILE

    const {user} = useContext(AuthContext)
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to= '/' style={{textDecoration: 'none'}}>
                <span className="Logo">Aura</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchTwoToneIcon className="searchIcon" />
                    <input placeholder="Posts, Friends, Videos" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person4Icon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsActiveIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`}>
                <img src={!user.profilePicture ?PF+"cover.png" :PF + user.profilePicture} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}
