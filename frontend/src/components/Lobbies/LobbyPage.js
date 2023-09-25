import './Lobbies.css';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadLobby } from "../../store/lobbies";
import { useDispatch } from "react-redux";
import Chat from '../Chat';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    }, []);

    return (<>
        {curLobby && <div className="lobby-page-ctn">
            <div className="lobby-page-content">
                <h1>This is the lobby page</h1>

                <p>{lobbyId}</p>
                <h2>Hosted by {curLobby?.Host?.username}</h2>
                <p>{curLobby?.Greeting?.message}</p>
                <h3>Quest Type</h3>
                <p>{curLobby?.QuestType?.type || 'None'}</p>
                <h3>Target Monster</h3>
                <p>{curLobby?.Monster?.name || 'None'}</p>
                <h3>Rank Preference</h3>
                <p>{curLobby?.rankPreference || 'None'}</p>
                <h3>Members</h3>

            </div>
            <Chat user={user} sessionType={'lobby'} session={curLobby}/>
        </div>}
    </>);
}

export default LobbyPage;
