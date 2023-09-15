import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';
import { useState } from 'react';

function Navigation({isLoaded}) {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let links = (currentUser ?
        <li>
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout())
                }}>
                    Logout
                </button>
        </li>
        :
        <li>
            <Link to='/login'>Sign in</Link>
            <Link to='/signup'>Sign up</Link>
        </li>
    );

    return <nav>
        <i className="fa-solid fa-user">
            <ul>
                <Link to="/">Home</Link>
                {isLoaded && links}
            </ul>
        </i>
    </nav>;
}

export default Navigation;
