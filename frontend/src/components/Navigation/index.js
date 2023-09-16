import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({isLoaded}) {
    const currentUser = useSelector(state => state.session.user);

    // if user logged in, return a profile button and a logout button
    // let links = ;

    return <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoaded && (currentUser ?
        <li>
                <ProfileButton user={currentUser} />
        </li>
        :
        // if user not logged in, return log in / sign up
        <li>
            <OpenModalButton
                buttonText="Sign In"
                modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
            />
        </li>
    )}
            </ul>
    </nav>;
}

export default Navigation;
