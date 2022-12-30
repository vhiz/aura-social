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



export default function Messenger() {

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const { user } = useContext(AuthContext)
  const scrollReff = useRef()

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


  const handleMessage = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    try {
      const res = await axios.post(`http://localhost:3001/message`, message)
      setMessages([...messages, res.data])
      setNewMessage('')
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
                    {messages.map(m=>(
                      <div ref={scrollReff}>
                      <Message message={m} own={m.sender === user._id}/>
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea placeholder='Chat with Aura....' className="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <button className="chatSubmitButton" onClick={handleMessage}>Send</button>
                  </div>
                </>) : (<span className='noConversation'>Chat With Someone</span>
              )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}
