import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpSharpIcon from '@mui/icons-material/ThumbUpSharp';
import { Users } from '../../fake';
import { useState } from 'react';

export default function Post({post}) {
    const [like, setLike] = useState(post.like)
    const [isliked, setisLiked] = useState(false)

    const likeHandeler = ()=>{
        setLike(isliked ? like - 1 : like + 1)
        setisLiked(!isliked)
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter(u=>u.id === post.userId)[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{Users.filter(u=>u.id === post.userId)[0].userName}</span>
                        <span className="postDate">{post.date} </span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post?.photo} alt="" className="postImg" />
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
