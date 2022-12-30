import './chatonline.css'

export default function ChatOnline() {

    const PF = process.env.REACT_APP_PUBLIC_FILE
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContanier">
                    <img src={PF + '1.jpg'} alt="" className='chatOnlineImg'/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineUsername">Vhiz</span>
            </div>
        </div>
    )
}
