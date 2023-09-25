import './Guilds.css';
import { useEffect } from 'react';
import { loadGuilds } from '../../store/guilds';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateGuildForm from '../Forms/CreateGuildForm';
import GuildListing from './GuildListing';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

function Guilds() {
   const guildsState = useSelector(state => state.guilds);
   const user = useSelector(state => state.session.user);
   const [guildsArray, setGuildsArray] = useState([]);
   const [loaded, setLoaded] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      async function init() {
         await dispatch(loadGuilds());
         setGuildsArray(guildsState.arr);
         setLoaded(true);
      }
      init();
   }, []);

   useEffect(() => {
      setGuildsArray(guildsState.arr);
   }, [guildsState]);

   return (<>
         {loaded && <div id="gld-ctn">

            <div className='gld-left-menu'>
               {user &&
               <OpenModalButton
                  buttonText='Start a new guild'
                  modalComponent={<CreateGuildForm />}
               />}

               <button>Filter Guilds</button>
               <h2> And a link to browse guilds </h2>
            </div>

            <div className='gld-right-menu'>
               {guildsArray.map(g => {
                  return (<Link to={`/guilds/${g?.id}`} key={'guildItem#' + g?.id} className='guild-listing'>
                     <GuildListing guild={g} />
                  </Link>);
               })}
            </div>

         </div>}
   </>);
};

export default Guilds;
