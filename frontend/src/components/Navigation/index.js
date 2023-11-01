import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from './ProfileButton';

function Navigation({isLoaded}) {
    const currentUser = useSelector(state => state.session.user);

    // if user logged in, return a profile button and a logout button
    // let links = ;

    return <nav id="nav-bar">

                <NavLink exact to="/" className="nav-bar-link">Home</NavLink>

                <NavLink to='/lobbies' className="nav-bar-link">Lobbies</NavLink>

                <NavLink to='/guilds' className="nav-bar-link">Guilds</NavLink>

                {/* <NavLink to='/quests' className="nav-bar-link">Quests</NavLink> */}
            {isLoaded && <ProfileButton user={currentUser} />}
    </nav>;
}

export default Navigation;
