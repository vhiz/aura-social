import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FILE
  const [user ,setUser] = useState({})
  const id = useParams().id
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:3001/user/${id}`)
      setUser(res.data)
    }
    fetchUser()
  }, [id])

  return (
    <>

      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={!user.coverPicture ?PF+"cover.png" :PF + user.coverPicture} alt="" className="profileCoverImg" />
              <img src={!user.profilePicture ?PF+"cover.png" :PF + user.profilePicture} alt="" className="profilePersonImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed _id={id}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
