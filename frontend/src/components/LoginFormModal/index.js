import { useState } from "react";
import { logIn } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import './LoginFormModal.css';
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from '../../context/Modal';

function LoginFormModal() {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [valErrors, setValErrors] = useState({});


    async function handleSubmit(e) {
        e.preventDefault();

        // a returned error is parsed into json already
        // only needs to be awaited to be read
        const response = await dispatch(logIn({
            credential, password
        }));

        // only an error returns
        // if the return has errors, set and display them
        if (response && response.errors) {
            setValErrors(response.errors);
            return;
        } else {
            return closeModal();
        }

    }

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <>
            <h1> Sign in </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    required
                    />
                <p>{valErrors?.credential}</p>

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
                <p>{valErrors?.password}</p>

                <button> Log In </button>

            </form>

            <button onClick={(e) => {
                // e.preventDefault();
                // setCredential('demouser');
                // setPassword('password');
                // handleSubmit(e);
                dispatch(logIn({credential: 'demouser', password: 'password'}));
                closeModal();
            }}> Sign In As Demo User</button>

        </>
    );
}

export default LoginFormModal;
