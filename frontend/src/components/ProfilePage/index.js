import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function ProfilePage({userId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userProfile);

    useEffect(() => {
        dispatch(loadFullUser(userId));
    }, []);

    return (<div>
        <h1>This is user {userId}'s profile page</h1>
        <div className='profile-header'>
            <img src='' />
            <img src={user?.avatarUrl}/>
        </div>
    </div>);
}

export default ProfilePage;
