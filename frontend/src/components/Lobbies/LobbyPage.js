import './Lobbies.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { loadLobby, deleteLobby } from "../../store/lobbies";
import Chat from '../Chat';
import OpenModalButton from '../OpenModalButton';
import EditLobbyForm from '../Forms/EditLobbyForm';

function LobbyPage() {
    const {lobbyId} = useParams();
    const curLobby = useSelector(state => state.lobbies[lobbyId]);
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        async function initialLoad() {
            const response = await dispatch(loadLobby(lobbyId));
            if (response && response.errors) {
                history.push('/lost');
            }
        }

        initialLoad();
    }, [dispatch, history, lobbyId]);

    return (<>
        {curLobby && <div className="lobby-page-ctn">
            <div className="lobby-page-content">
                <h1>SESSION CODE:</h1>
                <p>{curLobby?.sessionCode}</p>
                <h2>Hosted by {curLobby?.Host?.username}</h2>
                <p>{curLobby?.Greeting?.message}</p>
                <h3>Quest Type</h3>
                <p>{curLobby?.QuestType?.type || 'None'}</p>
                <h3>Target Monster</h3>
                {curLobby?.Monster && <img className='lby-target-monster' src={curLobby.Monster.imageUrl} alt="" />}
                <p>{curLobby?.Monster?.name || 'None'}</p>
                <h3>Rank Preference</h3>
                <p>{curLobby?.rankPreference || 'None'}</p>

                <div className='owner-lby-btns'>
                    {user && user?.id === curLobby?.hostId && <OpenModalButton
                        buttonClassName='mng-lby-btn'
                        buttonText={'Edit Lobby'}
                        modalComponent={<EditLobbyForm lobby={curLobby} />}
                    />}
                    {user && user?.id === curLobby?.hostId && <button
                        className='mng-lby-btn'
                        onClick={() => {
                            let choice = window.confirm('Are you sure you want to close this lobby?');
                            if (choice) {
                                dispatch(deleteLobby(lobbyId));
                                history.push('/lobbies');
                            }
                        }}
                    >End Lobby</button>}
                </div>

            </div>

            <div></div>

            <Chat user={user} sessionType={'lobby'} session={curLobby}/>
        </div>}
    </>);
}

export default LobbyPage;
