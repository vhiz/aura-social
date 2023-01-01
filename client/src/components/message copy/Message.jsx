import './message.css'
export default function Message({ own }) {

    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img src={PF + '1.jpg'} alt="" className="messageImg" />
                <p className='messageText'>Toda date</p>

            </div>
            <div className="messageBottom">1 hr ago</div>
        </div>
    )
}
