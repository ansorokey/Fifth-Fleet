import { useState } from "react";
import { useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { useDispatch } from 'react-redux';
import { createLobby } from "../../store/lobbies";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import {v4 as uuidv4} from 'uuid';
import './forms.css';

function CreateLobbyForm() {
    const greetings = Object.values(useSelector(state => state.utils.greetings));
    const monsters = Object.values(useSelector(state => state.utils.monsters));
    const questTypes = Object.values(useSelector(state => state.utils.questTypes));

    const [greetingCategory, setGreetingCategory] = useState('Playstyle');
    const [filteredGreetings, setFilteredGreetings] = useState([]);
    const [greeting, setGreeting] = useState(69);
    const [questType, setQuestType] = useState(0);
    const [rankPref, setRankPref] = useState('');
    const [targetMonster, setTargetMonster] = useState(0);
    const [sessionCode, setSessionCode] = useState('');
    const [errs, setErrs] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();

    useEffect(() => {
        let filt = greetings.filter(g => g.category === greetingCategory);
        setFilteredGreetings(filt);
        if(filt[0]) setGreeting(filt[0].id);
    }, [greetingCategory]);

    async function handleSubmit(e) {
        e.preventDefault();
        // const tempErrs = {};

        if (sessionCode.length !== 12) {
            setErrs({
                sessionCode: 'Invalid session code'
            })
            return;
        }

        const data = {
            messageId: +greeting,
            sessionCode
        }

        if (questType) data.questTypeId = +questType;
        if (rankPref) data.rankPreference = rankPref;
        if (targetMonster) data.targetMonsterId = +targetMonster;

        const newLobby = await dispatch(createLobby(data));
        closeModal();
        history.push(`/lobbies/${newLobby.id}`);
    }

    if (!filteredGreetings) {
        return <h1>Loading...</h1>
    }

    return (<>
        {filteredGreetings &&
        <form onSubmit={handleSubmit} id="lobby-form">
            <h1> Start a new lobby! </h1>

            <label>
                Add your session code so others can join you!
                <input
                    required
                    placeholder="12 Character Session Code..."
                    value={sessionCode}
                    onChange={e => setSessionCode(e.target.value)}
                />
                <span>{sessionCode.length}/12</span>
                {errs?.sessionCode && <div>{errs.sessionCode}</div>}
            </label>

            <label className="greeting-categories">
                Pick a message so players can see what your guild is all about at a glance
                <select value={greetingCategory} onChange={(e) => setGreetingCategory(e.target.value)}>
                    <option value="Quests and Expeditions">Quests and Expeditions</option>
                    <option value="Locale">Locale</option>
                    <option value="Weapons and Armor">Weapons and Armor</option>
                    <option value="Rank">Rank</option>
                    <option value='Playstyle'>Playstyle</option>
                </select>

                <select
                    onChange={(e) => setGreeting(e.target.value)}
                >
                    {filteredGreetings?.map(g => {
                        return (<option key={uuidv4()} value={g.id}>
                            {g.message}
                        </option>)
                    })}
                </select>
            </label>

            <label>
                What quest type will you be focusing on?
                <select
                    value={questType}
                    onChange={e => {setQuestType(e.target.value)}}
                >
                    <option value={0}>None</option>
                    {questTypes?.map(qt => {
                        return <option key={uuidv4()} value={qt.id}>{qt.type}</option>
                    })}
                </select>
            </label>

            <label>
                Rank Preference
                <select value={rankPref} onChange={(e) => setRankPref(e.target.value)}>
                    <option value={''}>None</option>
                    <option value={'low'}>Low Rank</option>
                    <option value={'high'}>High Rank</option>
                    <option value={'master'}>Master Rank</option>
                </select>
            </label>

            <label>
                Target Monster
                <select value={targetMonster} onChange={e => setTargetMonster(e.target.value)}>
                    <option value={0}>None</option>
                    {monsters?.map(m => {
                        return <option key={uuidv4()} value={m.id}>
                            {m.name}
                        </option>
                    })}
                </select>
            </label>

            <button>Save</button>

        </form>}
    </>);
};

export default CreateLobbyForm;
