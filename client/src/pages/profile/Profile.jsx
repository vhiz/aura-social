import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'

export default function Profile() {
  return (
    <>

      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="asset/post/1.jpeg" alt="" className="profileCoverImg" />
              <img src="asset/1.jpg" alt="" className="profilePersonImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Vhiz</h4>
              <span className="profileInfoDesc">Hello World</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  )
}
