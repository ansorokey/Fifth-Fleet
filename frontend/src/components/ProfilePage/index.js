import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {loadUser, loadUserPhotos, editUser} from '../../store/profiles';
import OpenModalButton from '../OpenModalButton';
import EditUserAvatarForm from '../Forms/EditUserAvatarForm';
import { useState } from 'react';
import PhotoViewModal from '../PhotoViewModal';
import { useModal } from '../../context/Modal';
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { loadLobbies } from '../../store/lobbies';
import { loadMyGuilds } from '../../store/guilds';
import {v4 as uuidv4} from 'uuid';


function ProfilePage({myUserId=null}) {
    // slices of state
    let {userId} = useParams();
    if(myUserId) userId = myUserId
    const user = useSelector(state => state.profiles);
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);
    const myLobbies = useSelector(state => state.lobbies.arr);
    const myOwnedGuilds = useSelector(state => state.guilds.owned);
    const myJoinedGuilds = useSelector(state => state.guilds.joined);

    // state varaibles
    const [editWeapon, setEditWeapon] = useState(false);
    const [newWeaponId, setNewWeaponId] = useState(1);
    let myPage = +user?.id === userId;

    // hooks
    const dispatch = useDispatch();
    const {setModalContent} = useModal();

    useEffect(() => {
        dispatch(loadUser(userId));
        dispatch(loadUserPhotos(userId));
        dispatch(loadLobbies({hostId:userId}))
        dispatch(loadMyGuilds(userId));
    }, [dispatch, userId]);

    function changeWeapon(e) {
        e.preventDefault();

        dispatch(editUser({weaponId: newWeaponId}, userId));
        setEditWeapon(false);
    }

    return (<div>
        <h1>{user?.username}</h1>
        <div className='profile-header'>
            <img src={user?.avatarUrl} alt="" />
            {myPage && <OpenModalButton
                buttonText='Change Avatar'
                modalComponent={<EditUserAvatarForm user={user} />}
            />}
        </div>

        <div>
            <div className='about-user-sec'>
                <h2>Favorite Weapon</h2>{myPage && <i onClick={() => setEditWeapon(true)} className="fa-solid fa-pen-to-square"></i>}
            </div>
                {editWeapon && <div>
                    <select value={newWeaponId} onChange={(e) => setNewWeaponId(+e.target.value)}>
                        <option value='1'>Great Sword</option>
                        <option value='2'>Sword & Shield</option>
                        <option value='3'>Dual Blades</option>
                        <option value='4'>Long Sword</option>
                        <option value='5'>Hammer</option>
                        <option value='6'>Hunting Horn</option>
                        <option value='7'>Lance</option>
                        <option value='8'>Gunlance</option>
                        <option value='9'>Switch Axe</option>
                        <option value='10'>Charge Blade</option>
                        <option value='11'>Insect Glaive</option>
                        <option value='12'>Bow</option>
                        <option value='13'>Light Bowgun</option>
                        <option value='14'>Heavy Bowgun</option>
                    </select>
                    <button onClick={changeWeapon}>Save</button>
                    <button onClick={() => setEditWeapon(false)}>Cancel</button>
                </div>}
            <div className='fav-weapon'>
                <img src={user?.Weapon?.iconUrl} alt="" />
                {user?.Weapon?.id ? <h3>{user?.Weapon?.name}</h3> : <h3>No weapon chosen</h3>}
            </div>
        </div>


        <h2>My Guilds</h2>
        <h3>Hosted</h3>
        {myOwnedGuilds?.length ? myOwnedGuilds?.map(g => {
            return <Link to={`/guilds/${g.id}`} key={uuidv4()} className="profile-guild-link">
                <div>
                    <img className='prof-mini-guild-avatar' src={g.avatarUrl} alt="" />
                    <p>{g.name}</p>
                </div>
            </Link>
        }) : <h3>You are not hosting any guilds</h3>}
        <h3>Member</h3>
        {myJoinedGuilds?.length ? myJoinedGuilds?.map(g => {
            return <Link to={`/guilds/${g.id}`} key={uuidv4()} className="profile-guild-link">
                <div>
                    <img className='prof-mini-guild-avatar' src={g.avatarUrl} alt="" />
                    <p>{g.name}</p>
                </div>
            </Link>
        }) : <h3>You are not a member of any guilds</h3>}

        <h2>My lobbies</h2>
        {myLobbies.length ? myLobbies.map(l => {
            return (<Link to={`/lobbies/${l.id}`} key={uuidv4()} className="link">
                <div className='lobby-listing'>
                    <p className='lby-list-host'>{l?.Host?.username}</p>
                    <p className='lby-list-monster'>{l?.Monster?.name || '-----'}</p>
                    <p className='lby-list-type'>{l?.QuestType?.type || '-----'}</p>
                    <p>{l?.Greeting?.message}</p>
                </div>
            </Link>);
        }) : <h3>You are not running any lobbies</h3>}

        <h2>My Photos</h2>
        <div className='my-pics'>
            {photos.map(p => {
                return <img key={uuidv4()} src={p.imageUrl} alt="" onClick={() => setModalContent(<PhotoViewModal photoId={p.id} />)}/>
            })}
        </div>

    </div>);
}

export default ProfilePage;
