import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import Online from '../online/Online';
import axios from 'axios';
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContex';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { io } from 'socket.io-client';
import ChatIcon from '@mui/icons-material/Chat';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';



export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FILE
  const socket = useRef()
  const id = useParams().id

  const HomeRightBar = () => {
    const { user: currentUser } = useContext(AuthContext)


    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
      socket.current = io("ws://localhost:3002")
    }, [])

    useEffect(() => {
      socket.current.emit('addUser', currentUser._id)
      socket.current.on('getUsers', users => {
        setOnlineUsers(currentUser.followings.filter((f) => users.some((u) => u.userId === f)))
      })
    }, [user])
    return (
      <>
        <div className="birthdayContanier">
          <CakeIcon htmlColor='red' className='birthdayImg' />
          <span className="birthdayText">
            <b>Odegard</b> and <b>3 other people birthday na today. </b>
          </span>
        </div>
        <img src={PF + "ad.jpg"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <Online onlineUsers={onlineUsers} currentId={currentUser._id} />
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {

    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))
    const navigate = useNavigate()
    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get('http://localhost:3001/user/friend/' + id)
          setFriends(friendList.data)
        } catch (error) {
          console.log(error)
        }
      }
      getFriends()
    }, [id])

    useEffect(() => {
      setFollowed(currentUser.followings.includes(user?.id))
    }, [currentUser, user.id])
    const follow = async () => {
      try {
        if (!followed) {
          await axios.put('http://localhost:3001/user/' + id + "/follow", { userId: currentUser._id })
          dispatch({ type: "FOLLOW", payload: id })
        } else {
          await axios.put('http://localhost:3001/user/' + id + "/unfollow", { userId: currentUser._id })
          dispatch({ type: "UNFOLLOW", payload: id })
        }
      } catch (error) {
        console.log(error);
      }
      setFollowed(!followed)
    }

    const handelMessage = async (e) => {
      e.preventDefault()
      const newConversation = {
        senderId: currentUser._id,
        receiverId: id
      }

      const hadConversation = await axios.get(`http://localhost:3001/conversation/find/${currentUser._id}/${id}`)
      if (hadConversation.data) {
        navigate('/mensenger')
      } else {
        try {
          await axios.post('http://localhost:3001/conversation', newConversation)
          navigate('/mensenger')
        } catch (error) {
          console.log(error);
        }
      }
    }

    const toedit = async (e)=>{
      e.preventDefault()
      navigate('/edit')
    }

    return (
      <>
        {user._id !== currentUser._id && (
          <><button className='rightBarFollow' onClick={follow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
            <div className='messageIconDiv' onClick={handelMessage}>
              <ChatIcon htmlColor='wheat' className='messageIcon' /> <span className='messageIconText'>message</span>
            </div>
          </>
        )}
        <h4 className="rightbarTitle">User infromation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        {user._id === currentUser._id &&(
          <div className="editDiv" onClick={toedit}>
          <AutoFixHighIcon htmlColor='wheat' className='editIcon' /><span className='editIconText'>Edit</span>
        </div>
          )}
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={'/profile/' + friend._id} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'cover.png'} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        <img src={PF + "ad2.jpg"} alt="" className="rightbarAd" />
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
