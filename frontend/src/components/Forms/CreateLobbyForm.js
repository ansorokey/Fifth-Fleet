import { useState } from "react";
import { useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { useDispatch } from 'react-redux';
import { createLobby } from "../../store/lobbies";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
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

    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();

    useEffect(() => {
        setFilteredGreetings(greetings.filter(g => g.category === greetingCategory));
    }, [greetingCategory]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            messageId: +greeting,
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

            <label className="greeting-categories">
                Pick a message so players can see what your guild is all about at a glance
                <label>
                    Quests and Expeditions
                    <input
                        type="radio"
                        value='Quests and Expeditions'
                        name='greetingCategory'
                        onChange={(e) => setGreetingCategory(e.target.value) }
                    />
                </label>

                <label>
                    Locale
                    <input
                        type="radio"
                        value='Locale'
                        name='greetingCategory'
                        onChange={(e) => setGreetingCategory(e.target.value) }
                    />
                </label>

                <label>
                    Weapons and Armor
                    <input
                        type="radio"
                        value='Weapons and Armor'
                        name='greetingCategory'
                        onChange={(e) => setGreetingCategory(e.target.value) }
                    />
                </label>

                <label>
                    Rank
                    <input
                        type="radio"
                        value='Rank'
                        name='greetingCategory'
                        onChange={(e) => setGreetingCategory(e.target.value) }
                    />
                </label>

                <label>
                    Playstyle
                    <input
                        type="radio"
                        value='Playstyle'
                        name='greetingCategory'
                        checked={greetingCategory === 'Playstyle'}
                        onChange={(e) => setGreetingCategory(e.target.value) }
                    />
                </label>

                <select
                    onChange={(e) => setGreeting(e.target.value)}
                >
                    {filteredGreetings?.map(g => {
                        return (<option key={g.id} value={g.id}>
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
                        return <option key={'questtype' + qt.id} value={qt.id}>{qt.type}</option>
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
                        return <option key={m.name} value={m.id}>
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
