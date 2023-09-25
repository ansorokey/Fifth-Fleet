import { useEffect, useState } from 'react';
import './Lobbies.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadLobbies } from '../../store/lobbies';
import OpenModalButton from '../OpenModalButton';
import CreateLobbyForm from '../Forms/CreateLobbyForm';
import {Link} from 'react-router-dom';

function Lobbies() {
    const user = useSelector(state => state.session.user);
    const lobbies = useSelector(state => state.lobbies);
    const [lobbiesArr, setLobbiesArr] = useState(lobbies.arr);
    const monsters = Object.values(useSelector(state => state.utils.monsters));
    const questTypes = Object.values(useSelector(state => state.utils.questTypes));
    const greetings = Object.values(useSelector(state => state.utils.greetings));
    const [greetingCat, setGreetingCat] = useState('Playstyle');
    const [filteredGreetings, setFilteredGreetings] = useState([])

    const [showFilterMenu, setShowFilterMenu] = useState(false);
    // filter monsters
    const [showMonsterOptions, setShowMonsterOptions] = useState(false);
    const [monPage, setMonPage] = useState(0);
    const [monsterName, setMonsterName] = useState('');

    // filter quest types
    const [showQuestTypeOptions, setShowQuestTypeOptions] = useState(false);
    const [questTypeName, setQuestTypeName] = useState('');

    // filter greetings
    const [showGreetingOptions, setShowGreetingOptions] = useState(false);
    const [grPage, setGrPage] = useState(0);
    const [greetingMsg, setGreetingMsg] = useState('');

    // lobby pages
    const [listPage, setListPage] = useState(0);

    const solidCircle = <i className="fa-solid fa-circle"></i>;
    const emptyCircle = <i className="fa-regular fa-circle"></i>;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadLobbies());
    }, [dispatch]);

    useEffect(() => {
        setFilteredGreetings(greetings.filter(g => g.category === greetingCat));
        setGrPage(0);
    }, [greetingCat]);

    useEffect(() => {
        setLobbiesArr(lobbies.arr);
    }, [lobbies]);

    async function handleFilter(e) {
        e.preventDefault();

        const queryParams = {
            name: monsterName,
            questType: questTypeName,
            greeting: greetingMsg
        }
        dispatch(loadLobbies(queryParams));
    }

    return (<div id='lby-ctn'>
        <div className='left-menu'>
            <button onClick={() => setShowFilterMenu(!showFilterMenu)}>Filter Lobbies</button>

{/* TARGET MONSTER */}
            {showFilterMenu && <div>
                <div className='left-menu-filter-option'>
                    <p onClick={() => setShowMonsterOptions(!showMonsterOptions)}>Target Monster</p>
                    {monsterName && <div><p>{monsterName}</p><i onClick={() => setMonsterName('')} className="fa-solid fa-circle-minus"></i></div>}
                </div>
                {showMonsterOptions && <>
                    <div className='two-col'>
                        {monsters.slice(monPage, monPage + 10).map(m => <p key={m.name} onClick={() => {
                            setMonsterName(m.name);
                            setShowMonsterOptions(false);
                        }}>{m.name}</p>)}
                    </div>

                    <div className='page-btns'>
                        <span onClick={() => setMonPage(() => {
                            if (monPage - 10 <= 0) return 0;
                            return monPage - 10;
                        })}><i className="fa-solid fa-arrow-left"></i></span>

                        {/* I hate this :/ there's gotta be a better way to dynamically make these */}
                        {monsters.map((m, i) => {
                            if (i % 10 === 0) {
                                return <span onClick={() => setMonPage(i)}>{monPage === i ? solidCircle: emptyCircle}</span>;
                            }
                        })}

                        <span onClick={() => setMonPage(() => {
                            if (monPage + 10 >= monsters.length) return monPage;
                            return monPage + 10;
                        })}><i className="fa-solid fa-arrow-right"></i></span>
                    </div>
                </>}
{/* QUEST TYPE */}
                <div className='left-menu-filter-option'>
                    <p onClick={() => setShowQuestTypeOptions(!showQuestTypeOptions)}>Quest Type</p>
                    {questTypeName && <div><p>{questTypeName}</p><i onClick={() => setQuestTypeName('')} className="fa-solid fa-circle-minus"></i></div>}
                </div>
                {showQuestTypeOptions && <>
                  <div>
                    {questTypes.map(qt => <p key={qt.type} onClick={() => {
                        setShowQuestTypeOptions(false);
                        setQuestTypeName(qt.type)
                    }}>{qt.type}</p>)}
                  </div>
                </>}

{/* GREETINGS */}
                <div className='left-menu-filter-option'>
                    <p onClick={() => setShowGreetingOptions(!showGreetingOptions)}>Greeting</p>
                    {greetingMsg && <div><p>{greetingMsg}</p><i onClick={() => setGreetingMsg('')} className="fa-solid fa-circle-minus"></i></div>}
                </div>
                {showGreetingOptions &&
                <div>
                    <select value={greetingCat} onChange={(e) => setGreetingCat(e.target.value)}>
                        <option value='Quests and Expeditions'>
                            Quests and Expeditions
                        </option>
                        <option value='Locale'>Locale</option>
                        <option value='Weapons and Armor'>Weapons and Armor</option>
                        <option value='Rank'>Rank</option>
                        <option value='Playstyle'>Playstyle</option>
                    </select>
                    {filteredGreetings.slice(grPage, grPage + 5).map(g => {
                    return <p
                                key={g.message}
                                onClick={() => {
                                    setGreetingMsg(g.message);
                                    setShowGreetingOptions(false);
                                }}
                    >{g.message}</p>})}

                    <div className='page-btns'>
                        <span onClick={() => setGrPage(() => {
                            if (grPage - 5 <= 0) return 0;
                            return grPage - 5;
                        })}><i className="fa-solid fa-arrow-left"></i></span>

                        {/* I hate this :/ there's gotta be a better way to dynamically make these */}
                        {filteredGreetings.map((_g, i) => {
                            if (i % 5 === 0) {
                                return <span onClick={() => setGrPage(i)}>{grPage === i ? solidCircle: emptyCircle}</span>;
                            }
                        })}

                        <span onClick={() => setGrPage(() => {
                            if (grPage + 5 >= filteredGreetings.length) return grPage;
                            return grPage + 5;
                        })}><i className="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
                }

                <button onClick={handleFilter}> FILTER </button>
            </div>}
            {user && <OpenModalButton
                buttonText='Open a Lobby'
                modalComponent={<CreateLobbyForm />}
            />}
        </div>
{/* LOBBY LISTINGS */}
        <div>
            <div className='lby-list-headers'>
                <h2>Host</h2>
                <h2>Target Monster</h2>
                <h2>Quest Type</h2>
                <h2>Greeting</h2>
            </div>

            {lobbiesArr?.length ? lobbiesArr.slice(listPage, listPage + 10).map( l => {
                return (<Link to={`/lobbies/${l.id}`} key={l.id} className="link">
                    <div className='lobby-listing'>
                        <p className='lby-list-host'>{l?.Host?.username}</p>
                        <p className='lby-list-monster'>{l?.Monster?.name || '-----'}</p>
                        <p className='lby-list-type'>{l?.QuestType?.type || '-----'}</p>
                        <p>{l?.Greeting?.message}</p>
                    </div>
                </Link>);
            })
            :
                <h2>No matches found</h2>
            }

            <div className='page-btns'>
                <span onClick={() => setListPage(() => {
                    if (listPage - 10 <= 0) return 0;
                    return listPage - 10;
                })}><i className="fa-solid fa-arrow-left"></i></span>

                {/* I hate this :/ there's gotta be a better way to dynamically make these */}
                {lobbiesArr.map((m, i) => {
                    if (i % 10 === 0) {
                        return <span onClick={() => setListPage(i)}>{listPage === i ? solidCircle: emptyCircle}</span>;
                    }
                })}

                <span onClick={() => setListPage(() => {
                    if (listPage + 10 >= lobbiesArr.length) return listPage;
                    return listPage + 10;
                })}><i className="fa-solid fa-arrow-right"></i></span>
            </div>
        </div>

    </div>);
};

export default Lobbies;
