import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import { Users } from "../../fake"
import Online from '../online/Online';
export default function Rightbar({ profile }) {

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContanier">
          <CakeIcon htmlColor='red' className='birthdayImg' />
          <span className="birthdayText">
            <b>Odegard</b> and <b>3 other people birthday na today. </b>
          </span>
        </div>
        <img src="/asset/ad.jpg" alt="" className="rightbarAd" />
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
    return (
      <>
        <h4 className="rightbarTitle">User infromation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Abuja</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Abuja</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="asset/1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
          <div className="rightbarFollowing">
            <img src="asset/2.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
          <div className="rightbarFollowing">
            <img src="asset/3.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
          <div className="rightbarFollowing">
            <img src="asset/4.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
          <div className="rightbarFollowing">
            <img src="asset/5.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
          <div className="rightbarFollowing">
            <img src="asset/2.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Vhiz</span>
          </div>
        </div>
        <img src="/asset/ad2.jpg" alt="" className="rightbarAd" />
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
