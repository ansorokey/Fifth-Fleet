import { useDispatch } from 'react-redux';
import './SignupFormPage.css';
import { useState } from 'react';
// import { } import signup thunk here

function SignupFormPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valErrors, setValErrors] = useState({});
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const errs = {};

        if (password !== confirmPassword) {
            errs.password = 'Passwords must match';
            errs.confirmPassword = 'Passwords must match';
        }

        if (Object.keys(errs)) {
            return setValErrors(errs);
        }

        //
        // const response = await dispatch();


    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Username'
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type='email'
                placeholder='Email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
            />

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

            <button> Sign Up </button>
        </form>
    );
}

export default SignupFormPage;
