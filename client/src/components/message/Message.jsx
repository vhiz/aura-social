import './message.css'
import {format} from 'timeago.js'
export default function Message({ message,own}) {

    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={PF + '1.jpg'} alt="" className="messageImg" />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}
