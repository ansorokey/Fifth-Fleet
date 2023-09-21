import './Message.css';

function Message({curUser, username, content}) {
    const myMsg = curUser.username === username;

    return (<div className={`msg ${myMsg ? 'myMsg' : 'otherMsg'}`}>
        <div className={`msg-prof-pic`}></div>
        <div className='username-and-content'>
            <div>{username}</div>
            <p>{content}</p>
        </div>
    </div>);
}

export default Message;
