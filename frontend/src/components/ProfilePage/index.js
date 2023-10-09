import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {loadFullUser, loadMyPics, editUser} from '../../store/profiles';
import OpenModalButton from '../OpenModalButton';
import EditUserAvatarForm from '../Forms/EditUserAvatarForm';
import { useState } from 'react';

function ProfilePage({userId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profiles[userId]);
    const pics = useSelector(state => state.profiles[userId]?.pics);
    const [editWeapon, setEditWeapon] = useState(false);
    const [newWeaponId, setNewWeaponId] = useState(1);

    useEffect(() => {
        dispatch(loadFullUser(userId));
        // dispatch(loadMyGuilds(userId));
        // dispatch(LoadMyLobbies(userId));
        dispatch(loadMyPics(userId));
    }, []);

    function changeWeapon(e) {
        e.preventDefault();

        dispatch(editUser({weaponId: newWeaponId}, userId));
    }

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
                <h2>Favorite Weapon</h2><i onClick={() => setEditWeapon(true)} className="fa-solid fa-pen-to-square"></i>
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
                <img src={user?.Weapon?.iconUrl} />
                {user?.Weapon?.id ? <h3>{user?.Weapon?.name}</h3> : <h3>No weapon chosen</h3>}
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
