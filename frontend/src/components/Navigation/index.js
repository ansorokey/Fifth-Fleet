import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';
import { useState } from 'react';

function Navigation({isLoaded, currentUser}) {
    // const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [showDropDown, setShowDropDown] = useState(false);

    const isUser = <>
        <li>
                <button onClick={() => dispatch(logout())}>
                    Logout
                </button>
        </li>
    </>
    const isNoUser = <>
        <li>
            <Link to='/login'>Sign in</Link>
        </li>

        <li>
            <Link to='/signup'>Sign up</Link>
        </li>
    </>

    return <nav>
        <i className="fa-solid fa-user" onClick={() => setShowDropDown(!showDropDown)}>
            {showDropDown && <ul>
                <Link to="/">Home</Link>
                {isLoaded && (currentUser ? isUser : isNoUser)}
            </ul>}
        </i>
    </nav>;
}

export default Navigation;
