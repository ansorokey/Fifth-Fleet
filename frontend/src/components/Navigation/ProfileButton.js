import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({user}) {
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    const refEl = useRef();

    useEffect(() => {

        // only add event listener when the menu is open
        if(!showMenu) return;

        function closeMenu(e) {
            // Only close the menu if the ref element (drop down menu)
            // is not a part of the clicked element
            if (!refEl.current.contains(e.target)){
                setShowMenu(false);
            }
        };

        // add an event listener to the entire document that closes the menu
        document.addEventListener('click', closeMenu);

        // runs a function that removes the event listener on dismount
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    function openMenu() {
        if(showMenu) return;
        setShowMenu(true);
    }

    // a differently scoped function for the
    // openModalButton components to reference
    function closeMenu2() {
        setShowMenu(false);
    }

    function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
    }

    const validUser = (<>
            <li>{user?.username}</li>
            <li>{user?.email}</li>
            <button onClick={handleLogout}>Logout</button>
    </>);

    const nullUser = (<>
            <li>
                <OpenModalButton
                    buttonText="Sign In"
                    modalComponent={<LoginFormModal />}
                    onButtonClick={closeMenu2}
                />
            </li>

            <li>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    onButtonClick={closeMenu2}
                />
            </li>
    </>);

    return (<>
        <button onClick={openMenu}>
            <i className="fa-solid fa-user"></i>
        </button>
        <ul hidden={!showMenu} ref={refEl}>
            {user ? validUser : nullUser}
        </ul>
    </>);
}

export default ProfileButton;
