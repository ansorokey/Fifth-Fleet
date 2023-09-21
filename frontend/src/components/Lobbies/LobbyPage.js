import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LobbyPage() {
    const {lobbyId} = useParams();
    const curLobby = useSelector(state => state.lobbies[lobbyId]);

    useEffect(() => {
        // add the current lobby by lobby id to state

    }, []);

    return (<>
        {curLobby && <>
            <h1>This is the lobby page</h1>
            <p>{lobbyId}</p>
        </>}

    </>);
}

export default LobbyPage;
