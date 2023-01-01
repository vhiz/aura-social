import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../contex/AuthContex'
import './mesenger.css'
import axios from 'axios'
import { useRef } from 'react'
import { io } from 'socket.io-client'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CancleIcon from '@mui/icons-material/Cancel'


export default function Messenger() {

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [file, setFile] = useState(null)
  const socket = useRef()
  const { user } = useContext(AuthContext)
  const scrollReff = useRef()


  useEffect(() => {
    socket.current = io("ws://localhost:3002")
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        img: data.img
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])


  useEffect(() => {
    socket.current.emit('addUser', user._id)
    socket.current.on('getUsers', users => {
      setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)))
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/conversation/${user._id}`)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getConversations()
  }, [user._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/message/${currentChat?._id}`)
        setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getMessages()
  }, [currentChat])


  const receiverId = currentChat?.members.find(member => member !== user._id)
  const handleMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    if (file) {
      const fileName = Date.now() + file.name
      const data = new FormData()
      data.append("name", fileName)
      data.append("file", file)
      message.img = fileName

      socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId,
        text: newMessage,
        img: fileName
      })
      try {
        await axios.post('http://localhost:3001/upload', data)
      } catch (error) {
        console.log(error)
      }
    }else if(!file){
 
      socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId,
        text: newMessage,
      })
    }



    try {
      const res = await axios.post(`http://localhost:3001/message`, message)
      setMessages([...messages, res.data])
      setNewMessage('')
      setFile(null)
    } catch (error) {
      console.log(error)
    }

  }



  useEffect(() => {
    scrollReff.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className="mensenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" className="chatMenuInput" placeholder=' Search for friends' />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map(m => (
                      <div ref={scrollReff}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea placeholder='Chat with Aura....' className="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <label htmlFor='file' className="shareOption">
                      < AnalyticsIcon htmlColor='wheat' className="shareIcon" />
                      {file && (
                        <div className="shareImgContanier">
                          <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                          <CancleIcon className='shareCancle' onClick={() => setFile(null)} />
                        </div>
                      )}
                      <input style={{ display: "none" }} type="file" id="file" accept='.png,.jpg,.jpeg' onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <button className="chatSubmitButton" onClick={handleMessage}>Send</button>
                  </div>
                </>) : (<span className='noConversation'>Chat With Someone</span>
              )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}
