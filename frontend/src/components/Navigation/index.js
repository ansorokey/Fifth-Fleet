import './Navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/session';

function Navigation() {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const isUser = <ul>
            <button
                onClick={() => dispatch(logout())}
            >Logout</button>
    </ul>
    const isNoUser = <ul>
        <Link to='/login'>Sign in</Link>
        <Link to='/signup'>Sign up</Link>
    </ul>

    return <nav>
        {currentUser ? isUser : isNoUser}
    </nav>;
}

export default Navigation;
