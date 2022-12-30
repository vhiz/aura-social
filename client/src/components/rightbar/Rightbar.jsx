import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import { Users } from "../../fake"
import Online from '../online/Online';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contex/AuthContex';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FILE

  const id = useParams().id
  const HomeRightBar = () => {


    return (
      <>
        <div className="birthdayContanier">
          <CakeIcon htmlColor='red' className='birthdayImg' />
          <span className="birthdayText">
            <b>Odegard</b> and <b>3 other people birthday na today. </b>
          </span>
        </div>
        <img src={PF+"ad.jpg"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {


    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [friends, setFriends] = useState([])
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))
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

    return (
      <>
        {user._id !== currentUser._id && (
          <button className='rightBarFollow' onClick={follow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
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
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link to={'/profile/' + friend._id} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF+friend.profilePicture : PF + 'cover.png'} alt="" className="rightbarFollowingImg" />
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
