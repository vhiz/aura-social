import './share.css'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LabelIcon from '@mui/icons-material/Label';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../contex/AuthContex';
import { useState } from 'react';
import axios from 'axios';
import CancleIcon from '@mui/icons-material/Cancel'

export default function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FILE

    const { user } = useContext(AuthContext)

    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async(e)=>{
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,

        }

        if(file){
            const fileName =Date.now()+file.name
            const data =new FormData()
            data.append("name", fileName)
            data.append("file", file)
            newPost.img = fileName
            try {
                await axios.post('http://localhost:3001/upload', data)
            } catch (error) {
                console.log(error)
            }
        }

        try {
            await axios.post('http://localhost:3001/post', newPost)
            window.location.reload()
        } catch (error) {
            
        }
    }
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={!user.profilePicture ? PF + "cover.png" : PF + user.profilePicture} alt="" className="shareProfileImg" />
                    <input placeholder={user.username + ' No type nonsense !!'} className="shareInput" ref={desc} />
                </div>
                <hr className='shareHr' />
                {file && (
                    <div className="shareImgContanier">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <CancleIcon className='shareCancle' onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            < AnalyticsIcon htmlColor='red' className="shareIcon" />
                            <span className='shareOptionText'>Media</span>
                            <input style={{display:"none"}} type="file" id="file" accept='.png,.jpg,.jpeg' onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            < LabelIcon htmlColor='blue' className="shareIcon" />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            < EditLocationIcon htmlColor='green' className="shareIcon" />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            < PsychologyAltIcon htmlColor='orange' className="shareIcon" />
                            <span className='shareOptionText'>Fellings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}
