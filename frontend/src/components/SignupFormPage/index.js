import './SignupFormPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signup } from '../../store/session';
import { useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';

function SignupFormPage() {
    const currentUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valErrors, setValErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const errs = {};

        if (password !== confirmPassword) {
            errs.password = 'Passwords must match';
            errs.confirmPassword = 'Passwords must match';
        }

        if (username.length < 4 || username.length > 30){
            valErrors.username = 'Please provide a username betweeb 4 and 30 characters in length';
        }

        if (password.length < 6) {
            valErrors.password = 'Password must be at least 6 characters in length';
            valErrors.confirmPassword = 'Password must be at least 6 characters in length';
        }

        if (Object.keys(errs).length) {
            return setValErrors(errs);
        }

        const signupInfo = {
            username,
            email,
            password
        }

        const response = await dispatch(signup(signupInfo));

        if (response && response.errors) {
            return setValErrors(response.errors);
        }

        history.push('/');
    }

    return (<div className='signup-page-ctn'>
        <h1>Make an account</h1>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Username'
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
            />
            <p>{valErrors.username}</p>

            <input
                type='email'
                placeholder='Email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
            />
            <p>{valErrors.email}</p>

            <input
                type='password'
                placeholder='Password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
            />
            <p>{valErrors.confirmPassword}</p>

            <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                required
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <p>{valErrors.password}</p>

            <button className='su-btn'> Sign Up </button>
        </form>

        <div>
            <h2 className='already'>Already have an account?</h2>
            <OpenModalButton
                buttonText="Sign In"
                buttonClassName='su-btn'
                modalComponent={<LoginFormModal />}
            />
        </div>
    </div>);
}

export default SignupFormPage;
