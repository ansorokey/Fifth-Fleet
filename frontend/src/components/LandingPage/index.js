import './LandingPage.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function LandingPage({user}) {

    // useEffect(() => {
    //     async function init() {
    //         await useDispatch();
    //     }

    //     init();
    // }, []);

    return (<>
        <h1>Welcome to the Fifth Fleet</h1>
        <p>Your one stop destination for all things hunting</p>
        {!user && <SignupFormPage />}
        < Link to='/guilds'>Browse Guilds</Link>
        < Link to='/lobbies'>Browse Lobbies</Link>
        < Link to='/quests'>Browse Quests</Link>
        </>);
}

export default LandingPage;
