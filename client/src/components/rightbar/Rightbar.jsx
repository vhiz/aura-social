import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake';
import { Users } from "../../fake"
import Online from '../online/Online';
export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
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
      </div>
    </div>
  )
}
