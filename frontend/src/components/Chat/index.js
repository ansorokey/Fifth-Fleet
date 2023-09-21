import { useState, useEffect, useRef } from "react";
import Message from "../Message";
import ChatLog from "./ChatLog";

function Chat({user}) {
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
        }

        // ws.onmessage = function(e){
        //     const incomingMsg = JSON.parse(e.data).data;
        //     console.log(incomingMsg);

        //     setMessages([...messages, incomingMsg]);
        //     console.log(messages);
        // }

        ws.onclose = function(e) {
            console.log('Connection closed');
            webSocket.current = null;
            setMessages([]);
        }

        ws.onerror = function(e) {
            console.error(e);
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
                const incomingMsg = JSON.parse(e.data).data;
                console.log(incomingMsg);

                setMessages([...messages, incomingMsg]);
                console.log(messages);
            }
        }
    }, [messages]);

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            username: user.username,
            msg
        }

        const jsonMsg = JSON.stringify({
            type: 'send-chat-message',
            data
        });

        console.log('sending message', jsonMsg);

        webSocket.current.send(jsonMsg);

        setMsg('');
    }

    return (<>

        <ChatLog user={user} messages={messages} />

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
            />
            <button>send</button>
        </form>
    </>);
};

export default Chat;
