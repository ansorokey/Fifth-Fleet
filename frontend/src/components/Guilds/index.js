import './Guilds.css';
import { useEffect } from 'react';
import { loadGuilds } from '../../store/guilds';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateGuildForm from '../Forms/CreateGuildForm';
import GuildListing from './GuildListing';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

function Guilds() {
   const guildsState = useSelector(state => state.guilds);
   const guilds = guildsState.arr;
   const user = useSelector(state => state.session.user);
   const greetings = Object.values(useSelector(state => state.utils.greetings));
   const [greetingCat, setGreetingCat] = useState('Playstyle');
   const [filteredGreetings, setFilteredGreetings] = useState([]);
   const [loaded, setLoaded] = useState(false);
   const [showFilterGuilds, setShowFilterGuilds] = useState(false);
   const [greetingId, setGreetingId] = useState(60);
   const [showGreetingFilter, setShowGreetingFilter] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      async function init() {
         await dispatch(loadGuilds());
         setLoaded(true);
      }
      init();
   }, []);

   useEffect(() => {
      setFilteredGreetings(greetings.filter(g => g.category === greetingCat));
  }, [greetingCat]);

  useEffect(() => {
   if (loaded) dispatch(loadGuilds({greetingId}));
  }, [greetingId]);


   return (<>
         {loaded && <div id="gld-ctn">

            <div className='gld-left-menu'>

               <button className='left-menu-button' onClick={() => setShowFilterGuilds(!showFilterGuilds)}>Filter Guilds</button>
               {showFilterGuilds && <div className='guild-filter'>
                  <button className='guild-filter-choice' onClick={() => setShowGreetingFilter(!showGreetingFilter)}>Guild Message</button>
                  {showGreetingFilter && <div>
                     <select className='guild-category-select' value={greetingCat} onChange={(e) => setGreetingCat(e.target.value)}>
                        <option value='Quests and Expeditions'>
                              Quests and Expeditions
                           </option>
                           <option value='Locale'>Locale</option>
                           <option value='Weapons and Armor'>Weapons and Armor</option>
                           <option value='Rank'>Rank</option>
                           <option value='Playstyle'>Playstyle</option>
                     </select>

                     <select className='guild-category-select' value={greetingId} onChange={(e) => setGreetingId(e.target.value)}>
                        <option value={0}>Select...</option>
                        {filteredGreetings.map(g => {
                           return <option key={uuidv4()} value={g.id}>{g.message}</option>
                        })}
                     </select>
                  </div>}

                  <button className='guild-filter-btn' onClick={() => {setGreetingId(0); dispatch(loadGuilds())}}>CLEAR FILTERS</button>
               </div>}

               {user &&
               <OpenModalButton
               buttonClassName='left-menu-button'                  buttonText='Start a new guild'
                  modalComponent={<CreateGuildForm />}
               />}
            </div>

            <div className='gld-right-menu'>
               {guilds.length ? guilds.map(g => {
                  return (<Link to={`/guilds/${g?.id}`} key={uuidv4()}>
                     <GuildListing guild={g} />
                  </Link>);
               }) : <h1>No matches found</h1>}
            </div>

         </div>}
   </>);
};

export default Guilds;
