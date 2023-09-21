import './Guilds.css';
import { useEffect } from 'react';
import { loadGuilds } from '../../store/guilds';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateGuildForm from '../Forms/CreateGuildForm';

function Guilds() {

   const dispatch = useDispatch();
   const guildsState = useSelector(state => state.guilds);
   const guildsArray = Object.values(guildsState);

   useEffect(() => {
      dispatch(loadGuilds());
   }, []);

     return (<>
        <h1> Return a list of guilds here </h1>
        {guildsArray && guildsArray.map(g => {
         return (<div key={'guildItem#' + g.id}>
            <p>{g?.name}</p>
            <p>{g?.Host?.username}</p>
            <p>{g?.Greeting?.message}</p>
            {/* <p>{g?.about}</p> */}
         </div>)
        })}
        <h2> And a link to create a guild </h2>
        <OpenModalButton
            buttonText='Start a new guild'
            modalComponent={<CreateGuildForm />}
        />
        <h2> And a link to browse guilds </h2>
     </>);
};

export default Guilds;
