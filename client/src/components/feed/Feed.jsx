import Post from '../posts/Post'
import Share from '../share/Share'
import './feed.css'
import { Posts } from "../../fake"

export default function Feed() {
    return (
        <div className='feed'>
            <div className="feedWarpper">
                <Share />

                {Posts.map(p => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}
