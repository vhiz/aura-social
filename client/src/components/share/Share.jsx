import './share.css'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LabelIcon from '@mui/icons-material/Label';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

export default function Share() {
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src="/asset/1.jpg" alt="" className="shareProfileImg" />
                <input placeholder='No type nonsense' className="shareInput" />
            </div>
            <hr  className='shareHr'/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        < AnalyticsIcon htmlColor='red' className="shareIcon"/>
                        <span className='shareOptionText'>Media</span>
                    </div>
                    <div className="shareOption">
                        < LabelIcon htmlColor='blue' className="shareIcon"/>
                        <span className='shareOptionText'>Tag</span>
                    </div>
                    <div className="shareOption">
                        < EditLocationIcon htmlColor='green' className="shareIcon"/>
                        <span className='shareOptionText'>Location</span>
                    </div>
                    <div className="shareOption">
                        < PsychologyAltIcon htmlColor='orange' className="shareIcon"/>
                        <span className='shareOptionText'>Fellings</span>
                    </div>
                </div>
                <button className="shareButton">Post</button>
            </div>
        </div>
    </div>
  )
}
