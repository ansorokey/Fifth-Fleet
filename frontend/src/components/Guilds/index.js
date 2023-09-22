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
      async function init(){
         dispatch(loadGuilds());
      }

      init();
   }, []);

     return (<>
        {guildsArray && guildsArray.map(g => {
         return (<div key={'guildItem#' + g?.id}>
            <p>{g?.name}</p>
            <p>{g?.Host?.username}</p>
            <p>{g?.Greeting?.message}</p>
            {/* <p>{g?.about}</p> */}
         </div>)
        })}
        <OpenModalButton
            buttonText='Start a new guild'
            modalComponent={<CreateGuildForm />}
        />
        <h2> And a link to browse guilds </h2>
     </>);
};

export default Guilds;
