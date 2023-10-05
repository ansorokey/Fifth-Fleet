import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {loadFullUser, loadMyPics} from '../../store/profiles';
import OpenModalButton from '../OpenModalButton';
import EditUserAvatarForm from '../Forms/EditUserAvatarForm';

function ProfilePage({userId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profiles[userId]);
    const pics = useSelector(state => state.profiles[userId]?.pics);

    useEffect(() => {
        dispatch(loadFullUser(userId));
        // dispatch(loadMyGuilds(userId));
        // dispatch(LoadMyLobbies(userId));
        dispatch(loadMyPics(userId));
    }, []);

    return (<div>
        <h1>{user?.username}</h1>
        <div className='profile-header'>
            <img src={user?.avatarUrl}/>
            <OpenModalButton
                buttonText='Change Avatar'
                modalComponent={<EditUserAvatarForm user={user} />}
            />
        </div>

        <div>
            <div className='about-user-sec'>
            <h2>Favorite Weapon</h2><i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div className='fav-weapon'>
                <img src={user?.Weapon?.iconUrl} />
                <h3>{user?.Weapon?.name}</h3>
            </div>
        </div>


        <h2>My Guilds</h2>
        <p>List the guilds they own or are a member of</p>

        <h2>My lobbies</h2>
        <p>List the lobbies they own</p>

        <h2>My Photos</h2>
        <div className='my-pics'>
            {pics && Object.values(pics).map(p => {
                return <img src={p.imageUrl} />
            })}
        </div>

    </div>);
}

export default ProfilePage;
