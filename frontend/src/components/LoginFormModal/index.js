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
        <div className="login-modal-ctn">
            <h1 className="login-modal-h1"> Sign in </h1>
            <form onSubmit={handleSubmit}>
                <div className="login-modal-input-ctn">
                    <i className="fa-solid fa-at"></i>
                    <input
                        className="login-modal-cred"
                        type="text"
                        placeholder="Username or Email"
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required
                    />

                </div>
                <p>{valErrors?.credential}</p>

                <div className="login-modal-input-ctn">
                    <i className="fa-solid fa-key"></i>
                    <input
                        className="login-modal-pass"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                </div>
                <p>{valErrors?.password}</p>

                <button className="login-modal-btn"> Log In </button>

            </form>

                <button
                    className='login-modal-btn'
                    onClick={(e) => {

                    e.preventDefault();
                    dispatch(logIn({credential: 'demouser', password: 'password'}));
                    closeModal();
                }}> Sign In As Demo User</button>

        </div>
    );
}

export default LoginFormModal;
