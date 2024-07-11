import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {

    const {
        chatId,
        user,
        isCurrentUserBlocked,
        isReceiverUserBlocked,
        changeBlock,
        resetChat
    } = useChatStore();

    const {currentUser} = useUserStore();

    const handleBlock =async () => {
        console.log("Blocking a user", user);
        if(!user) return;

        // console.log("Hn bhai mujhme kuch ho raha bau")
        const userDocRef = doc(db, "users", currentUser.id)
        try{
            const res = await updateDoc(userDocRef, {
                blocked: isReceiverUserBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            })

            console.log("user block res", res);

            changeBlock()
        } catch(error){
            console.log(error);
        }

    }

    const handleLogout = () => {
        auth.signOut();
        resetChat();
    };


    return (
        <div className="detail">


            <div className="user">
                <img src={user?.avatar || './avatar.png'} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="info">
                <div className="options">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg" 
                                    alt="" 
                                />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" className="icon" alt="" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg" 
                                    alt="" 
                                />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" className="icon" alt="" />
                        </div> 
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg" 
                                    alt="" 
                                />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" className="icon" alt="" />
                        </div> 
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img 
                                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg" 
                                    alt="" 
                                />
                                <span>Photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" className="icon" alt="" />
                        </div>                        
                    </div>
                </div>
                <div className="options">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>

                <button onClick={handleBlock}>
                    {
                        isCurrentUserBlocked ? "You are Blocked" : isReceiverUserBlocked ? "User Blocked" : "Block User"
                    }
                </button>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Detail;