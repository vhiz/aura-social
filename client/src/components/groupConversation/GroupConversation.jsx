import './groupConversation.css'

export default function GroupConversation() {

    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <div>
            <div className='groupconversation'>
                <img src={PF + "cover.png"} alt="" className="groupconversationImg" />
                <span className="groupconversationName">username</span>
            </div>
        </div>
    )
}
