import React, { useState, useEffect } from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ENDPOINT = "http://localhost:8080/ws";

function Chat(){
    const [stompClient, setStompClient] = useState(null);
    const [msgToSend, setMsgToSend] = useState("Enter your message here");
    const [chatHistory, setChatHistory] = useState("");
    
    useEffect(() => {
        const socket = SockJS(ENDPOINT);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe("/app/chat", (data) => {
                console.log(data);
            })
        });
        setStompClient(stompClient);
    }, []);

    function sendMessage() {
        stompClient.send("/api/chat", {}, JSON.stringify({"name": msgToSend}));
    }

    return(
        <div>

        </div>
    )
}

export default Chat;