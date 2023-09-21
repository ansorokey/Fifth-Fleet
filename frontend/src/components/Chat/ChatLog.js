import Message from "../Message";
import { useSelector } from 'react-redux';

function ChatLog({messages, user}) {
    return <div id='chat-log-ctn'>
        {messages && messages.map(m => {
            return <Message curUser={user} username={m.username} content={m.msg} />
        })}
    </div>;
}

export default ChatLog;
