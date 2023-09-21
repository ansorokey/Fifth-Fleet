import { useState, useEffect, useRef } from "react";
import Message from "../Message";

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

        }

        ws.onmessage = function(e){
            const incomingMsg = JSON.parse(e.data).data;
            console.log(incomingMsg);

            setMessages(prev => [...prev, incomingMsg]);
            console.log(messages);
        }

        ws.onclose = function(e) {

        }

        ws.onerror = function(e) {

        }

        // cleanup function runs before useEffect runs
        return function cleanUp() {
            if (webSocket.current !== null) {
                webSocket.current.close();
            }
        }
    }, [user]);

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

        webSocket.current.send(jsonMsg)
    }

    return (<>
        <h1> I am a chat room</h1>
        {messages && messages.map(m => {
            return <Message curUser={user} username={m.username} content={m.msg} />
        })}

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
