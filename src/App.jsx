import { useEffect } from 'react'
import List from './components/list/List'
import Chat from './components/chat/Chat'
import Detail from './components/detail/Detail'
import Login from './components/login/Login'
import Notification from './components/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'

function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()
  // const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)

    })

    return () =>{
      unSub()
    }
  },[fetchUserInfo])

  // console.log(currentUser, isLoading)

  if(isLoading) return <div className='loading'>Loading...</div>

  return (
    <div className='container'>
      {
        currentUser? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>) : (
          <Login />
        )}
      
      <Notification />
    </div>
  )
}

export default App
