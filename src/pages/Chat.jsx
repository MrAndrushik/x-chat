import React from "react";
import { auth, db } from "../firebase-config";
import "../scss/chat.scss";
import { addDoc, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../components/Loader";

const Chat = () => {
    const userMail = auth.currentUser?.email;
    const userID = auth.currentUser?.uid;
    const [value, setValue] = React.useState("");
    const [messages, loading] = useCollectionData(collection(db, "messages"));

    // React.useEffect(() => {
    //     getMessages();
    // }, []);

    // const getMessages = async () => {
    //     const querySnapshot = await getDocs(collection(db, "messages"));
    //     const arr = [];
    //     querySnapshot.forEach((doc) => {
    //         arr.push(doc.data());
    //     });
    //     console.log(arr);
    //     setMessages(arr);
    // };

    const sendMessage = async () => {
        // console.log(1);
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                message: value,
                createdAt: Date.now(),
            });
            setValue("");
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="chat">
            <div className="chat__container container">
                <p className="chat__first">
                    Welcome back <strong>{userMail}</strong>
                </p>
                <div className="chat__wrapper">
                    {messages &&
                        messages
                            .sort((current, next) => {
                                return current.createdAt - next.createdAt;
                            })
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className={
                                        item.uid === userID
                                            ? "user__item"
                                            : "chat__item"
                                    }
                                >
                                    <p
                                        className={
                                            item.uid === userID
                                                ? "user__message"
                                                : "chat__message"
                                        }
                                    >
                                        {item.message}
                                    </p>
                                </div>
                            ))}
                </div>
                <div className="chat__input-block">
                    <textarea
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder="Type text"
                        type="text"
                        className="chat__input"
                        rows={1}
                    />
                    <button onClick={sendMessage} className="chat__send">
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
