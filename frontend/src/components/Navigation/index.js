import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';

function Navigation({isLoaded}) {
    const currentUser = useSelector(state => state.session.user);

    // if user logged in, return a profile button and a logout button
    // let links = ;

    return <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            {isLoaded && <li>
                <ProfileButton user={currentUser} />
            </li>}
        </ul>
    </nav>;
}

export default Navigation;
