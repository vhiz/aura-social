import "./topbar.css"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Person4Icon from '@mui/icons-material/Person4';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="Logo">Aura</span>
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
                <img src="/asset/1.jpg" alt="img 1" className="topbarImg" />
            </div>
        </div>
    )
}
