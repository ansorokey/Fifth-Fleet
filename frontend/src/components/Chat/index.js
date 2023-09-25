import { useState, useEffect, useRef } from "react";
import ChatLog from "./ChatLog";
import './Chat.css';

function Chat({user, sessionType, session}) {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        if (!user) return;

        const ws = new WebSocket(process.env.REACT_APP_WS_URL);
        webSocket.current = ws;

        // websocket actions
        ws.onopen = function(e) {
            setMessages([]);
            const jsonMsg = JSON.stringify({
                type: 'connect',
                session: sessionType,
                id: session.id,
                content: msg,
                username: user.username
            });
            ws.send(jsonMsg)
        }

        ws.onclose = function(e) {
            webSocket.current = null;
            setMessages([]);
        }

        ws.onerror = function(e) {
            // ...
        }

        // cleanup function runs before useEffect runs
        return function cleanUp() {
            if (webSocket.current !== null) {
                webSocket.current.close();
            }
        }
    }, [user]);

    useEffect(() => {
        if (webSocket.current !== null) {
            webSocket.current.onmessage = function(e){
                const incomingMsg = JSON.parse(e.data);
                setMessages([...messages, incomingMsg]);
            }
        }
    }, [messages]);

    function handleSubmit(e) {
        e.preventDefault();

        const jsonMsg = JSON.stringify({
            type: 'chat',
            session: sessionType,
            id: session.id,
            content: msg,
            username: user.username
        });

        webSocket.current.send(jsonMsg);

        setMsg('');
    }

    return (<div className="chat-ctn">

        <ChatLog user={user} messages={messages} />

        <form className='chat-input' onSubmit={handleSubmit}>
            <input
                type="text"
                value={msg}
                maxLength={255}
                onChange={e => setMsg(e.target.value)}
                className="chat-send-field"
            />
            <button>send</button>
        </form>
    </div>);
};

export default Chat;
