import './Message.css';
const defaultAvatar = 'https://res.cloudinary.com/dzntryr5a/image/upload/v1695852525/4al31h1ehd431_bdfdvr.png';

function Message({curUser, username='Guest', content, weaponUrl=null, avatarUrl=defaultAvatar}) {
    let msgType = 'otherMsg';
    if (curUser?.username === username) {
        msgType = 'myMsg';
    } else if (username === null) {
        msgType = 'system';
    };


    return (<div className={`msg ${msgType}`}>
        {msgType !== 'system' && <div className='msg-pics'>
            <img className='msg-prof-pic' src={avatarUrl} />
            <img className='msg-weapon' src={weaponUrl}/>
        </div>
            }
        <div className='username-and-content'>
            <div className='msg-username'>{username}</div>
            <p className='msg-content'>{content}</p>
        </div>
    </div>);
}

export default Message;
