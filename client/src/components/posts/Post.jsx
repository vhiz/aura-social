import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpSharpIcon from '@mui/icons-material/ThumbUpSharp';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../contex/AuthContex';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isliked, setisLiked] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FILE

    const likeHandeler = () => {
        try {
            axios.put(`http://localhost:3001/post/${post._id}/like`, { userId: currentUser._id })
        } catch (error) {

        }
        setLike(isliked ? like - 1 : like + 1)
        setisLiked(!isliked)
    }

    useEffect(()=>{
        setisLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:3001/user/${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])


    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user._id}`}>
                            <img src={!user.profilePicture ? PF + "cover.png" : PF + user.profilePicture} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)} </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post?.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <FavoriteIcon htmlColor='white' className='likeIcon' onClick={likeHandeler} />
                        <ThumbUpSharpIcon htmlColor='white' className='likeIcon' onClick={likeHandeler} />
                        <span className="postlikeCounter">{like} likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
