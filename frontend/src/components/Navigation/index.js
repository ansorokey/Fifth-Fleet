import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

function Navigation({isLoaded}) {
    const currentUser = useSelector(state => state.session.user);

    // if user logged in, return a profile button and a logout button
    // let links = ;

    return <nav id="nav-bar">

                <Link to="/">Home</Link>

                <Link to='/lobbies'>Lobbies</Link>

                <Link to='/guilds'>Guilds</Link>

                <Link to='/quests'>Quests</Link>
            {isLoaded && <ProfileButton user={currentUser} />}
    </nav>;
}

export default Navigation;
