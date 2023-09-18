import './LandingPage.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function LandingPage() {

    // useEffect(() => {
    //     async function init() {
    //         await useDispatch();
    //     }

    //     init();
    // }, []);

    return (<>
        <h1>Welcome to the Fifth Fleet</h1>
        <p>Your one stop destination for all things hunting</p>
        <SignupFormPage />
        </>);
}

export default LandingPage;
