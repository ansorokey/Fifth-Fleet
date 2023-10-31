import Message from "../Message";
import { useSelector } from 'react-redux';
import './Chat.css';
import { useEffect } from "react";
import { useRef } from "react";

function ChatLog({messages, user}) {

    useEffect(() => {
        const log = document.querySelector('#chat-log-ctn');
        log.scrollTop = log.scrollHeight;
    }, [messages]);

    return <div id='chat-log-ctn'>
        {messages && messages.map(m => {
            return <Message key={uuidv4()} curUser={user} username={m.username} content={m.content} avatarUrl={m.avatarUrl} weaponUrl={m.weaponUrl}/>
        })}
    </div>;
}

export default ChatLog;
