import './LandingPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';
import { Link } from 'react-router-dom';
import { loadGuilds } from '../../store/guilds';
import { loadLobbies } from '../../store/lobbies';
import GuildListing from '../Guilds/GuildListing';
import { useState } from 'react';
import { csrfFetch } from '../../store/csrf';
import PhotoViewModal from '../PhotoViewModal';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalButton from '../OpenModalButton';
import CreateGuildForm from '../Forms/CreateGuildForm';
import CreateLobbyForm from '../Forms/CreateLobbyForm';

function LandingPage({user}) {
    const history = useHistory();
    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    const guildState = useSelector(state => state.guilds);
    const guildsArr = guildState?.arr;
    const lobbyState = useSelector(state => state.lobbies);
    const lobbiesArr = lobbyState.arr;
    const [loaded, setLoaded] = useState(false);
    const [pics, setPics] = useState([]);

    async function getPhotos() {
        const response = await csrfFetch('/api/guildphotos/all?limit=10');

        if (response.ok) {
            const res = await response.json();
            setPics(res.photos);
            return;
        }
    }

    useEffect(() => {
        dispatch(loadGuilds({limit:3}));
        dispatch(loadLobbies({limit:3}));
        getPhotos();
        setLoaded(true);
    }, []);

    return <>{loaded && <div className='landing-ctn'>
        <div className='landing-content'>
            <h1>Welcome to the Fifth Fleet</h1>
            <h2>Your one stop destination for all things hunting</h2>

            <h3>Latest Lobbies</h3>
            <div>
                {lobbiesArr.map( l => {
                    return (<Link to={`/lobbies/${l.id}`} className="link">
                        <div className='lobby-listing'>
                            <p className='lby-list-host'>{l?.Host?.username}</p>
                            <p className='lby-list-monster'>{l?.Monster?.name || '-----'}</p>
                            <p className='lby-list-type'>{l?.QuestType?.type || '-----'}</p>
                            <p>{l?.Greeting?.message}</p>
                        </div>
                    </Link>)})}
            </div>

                <h3>Latest Guilds</h3>
            <div className='latest-guilds'>

                {guildsArr?.map(g => {
                    return (<Link to={`/guilds/${g?.id}`}>
                    <GuildListing guild={g} />
                 </Link>)
                })}
            </div>

            <h3>Latest Photos</h3>
            <div className='latest-pics'>
                {pics.map(p => {
                    return <img onClick={() => {
                        setModalContent(<PhotoViewModal photo={p}/>)
                        console.log(p);
                    }} src={p.imageUrl} />
                })}
            </div>
        </div>


        {user ? <div className='signed-in-options'>
            <div>
                <button
                    onClick={() => history.push('/lobbies')}
                >Browse Lobbies</button>
                <OpenModalButton
                    buttonText='Start a Lobby'
                    modalComponent={<CreateLobbyForm />}
                />
            </div>

            <div>
                <button
                    onClick={() => history.push('/guilds')}
                >Browse Guilds</button>
                <OpenModalButton
                    buttonText='Start a Guild'
                    modalComponent={<CreateGuildForm />}
                />
            </div>
        </div>
            :
        <SignupFormPage />
        }
            {/* {!user && } */}
            {/* <h2>Sign up here I guess</h2> */}
    </div>}</>;
}

export default LandingPage;
