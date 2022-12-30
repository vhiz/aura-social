import { useContext, useEffect, useState } from 'react'
import Post from '../posts/Post'
import Share from '../share/Share'
import './feed.css'
import axios from 'axios'
import { AuthContext } from '../../contex/AuthContex'

export default function Feed({ _id}) {

    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const res = _id ? await axios.get(`http://localhost:3001/post/${_id}/mine`)
                : await axios.get(`http://localhost:3001/post/timeline/${user._id}`)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPosts()
    }, [_id, user._id])

    return (
        <div className='feed'>
            <div className="feedWarpper">
                {(!_id || _id === user._id )&& <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
