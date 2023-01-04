import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useAuth } from "../contexts/UserContext";
import './Chat.css';

const ENDPOINT = "http://localhost:8080/ws";

function Chat(){
    const [stompClient, setStompClient] = useState();
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useAuth();

    let message = "";
    
    useEffect(() => {
        // use SockJS as the websocket client
        const socket = SockJS(ENDPOINT);
        // Set stomp to use websockets
        const stompClient = Stomp.over(socket);
        // connect to the backend
        stompClient.connect({}, () => {
            // subscribe to the backend
            stompClient.subscribe('/topic/publicmessages', (data) => {
                console.log(data);
                updateChatHistory(data);
            });
        });
        // maintain the client for sending and receiving
        setStompClient(stompClient);
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        const payload = { "senderId" : user.id, "sender" : user.name, "message" : message };
        stompClient.send("/topic/publicmessages", {}, JSON.stringify(payload));
    };

    const updateChatHistory = (data) => {
        const message = JSON.parse(data.body);
        setChatHistory(chatHistory => [...chatHistory, message]);
    };

    const updateMessage = (e) => {
       message = e.target.value;
    }

    return(
        <div>
            <div className="chat-history">
                <h2>Messages:</h2>
                {chatHistory.map(chatMessage => 
                    <div>
                        <b>{chatMessage.sender}:</b> {chatMessage.message} <br/>
                    </div>
                )}
            </div>
            <form>
                <div className="input-group">
                    <input id="message"
                            className="form-control"
                            placeholder="Type your message here..."
                            onChange={updateMessage}/>
                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Chat;