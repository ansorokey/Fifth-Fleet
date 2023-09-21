import './Message.css';

function Message({curUser, username, content}) {
    const myMsg = curUser.username === username;

    return (<div className={`${myMsg ? 'myMsg' : 'otherMsg'}`}>
        <div className={`msg-prof-pic`}></div>
        <p>{content}</p>
    </div>);
}

export default Message;
