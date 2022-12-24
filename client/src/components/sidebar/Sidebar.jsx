import './sidebar.css'
import AodIcon from '@mui/icons-material/Aod';
import AirplayIcon from '@mui/icons-material/Airplay';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Groups2Icon from '@mui/icons-material/Groups2';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ChatIcon from '@mui/icons-material/Chat';
import Friend from '../friend/Friend';
import { Users } from '../../fake';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <AodIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Groups2Icon className='sidebarIcon' />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BeenhereIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <QuestionMarkIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Question</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <AirplayIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map(u=>(
          <Friend key={u.id} friend={u} />
          ))}
        </ul>
      </div>
    </div>
  )
}
