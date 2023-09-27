import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {loadFullUser} from '../../store/profiles';

function ProfilePage({userId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profiles[userId]);

    useEffect(() => {
        dispatch(loadFullUser(userId));
    }, []);

    return (<div>
        <h1>{user?.username}</h1>
        <div className='profile-header'>
            <img src='' />
            <img src={user?.avatarUrl}/>
            <button>Edit Avatar</button>
        </div>

        <div>
            <h2>Favorite Weapon</h2>
            <p>{user?.Weapon?.name}</p>
        </div>

        <h2>My Photos</h2>
        <p>Display their photos here</p>

        <h2>My Guilds</h2>
        <p>List the guilds they own or are a member of</p>

        <h2>My lobbies</h2>
        <p>List the lobbies they own</p>

    </div>);
}

export default ProfilePage;
