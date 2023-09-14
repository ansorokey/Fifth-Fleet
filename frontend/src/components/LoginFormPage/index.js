import { useState } from "react";
import { logIn } from '../../store/session';

function LoginFormPage() {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
            <input
                type="text"
                placeholder="Username or Email"
                onChange={e => setCredential(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
        </form>
    );
}

export default LoginFormPage;
