import { useEffect } from 'react';
import './Lobbies.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadLobbies } from '../../store/lobbies';
import OpenModalButton from '../OpenModalButton';
import CreateLobbyForm from '../Forms/CreateLobbyForm';

function Lobbies() {
    const dispatch = useDispatch();
    const lobbies = useSelector(state => state.lobbies);
    const lobbiesArr = Object.values(lobbies);

    useEffect(() => {
        dispatch(loadLobbies())
    }, []);

    return (<>
        <h1>Return a list of lobbies</h1>
        {lobbiesArr.map( l => {
            return (<div key={l.id}>
                <p>{l?.Host?.username}</p>
                <p>{l?.Monster?.name}</p>
                <p>{l?.QuestType?.type}</p>
                <p>{l?.Greeting?.message}</p>
            </div>);
        })}
        <h2> And a button to browse lobbies </h2>
        <h2> And a button to create a lobby </h2>
        <OpenModalButton
            buttonText='Open a Lobby'
            modalComponent={<CreateLobbyForm />}
        />
    </>);
};

export default Lobbies;
