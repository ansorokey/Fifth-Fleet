import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { editLobby } from "../../store/lobbies";
import { useModal } from "../../context/Modal";
import './forms.css';

function EditLobbyForm({lobby}) {
    const greetings = Object.values(useSelector(state => state.utils.greetings));
    const monsters = Object.values(useSelector(state => state.utils.monsters));
    const questTypes = Object.values(useSelector(state => state.utils.questTypes));

    const [greetingCategory, setGreetingCategory] = useState(lobby?.Greeting?.category);
    const [filteredGreetings, setFilteredGreetings] = useState([]);
    const [greeting, setGreeting] = useState(lobby?.Greeting?.id);
    const [questType, setQuestType] = useState(lobby?.QuestType?.id);
    const [rankPref, setRankPref] = useState(lobby.rankPreference);
    const [targetMonster, setTargetMonster] = useState(lobby?.targetMonsterId);
    const [sessionCode, setSessionCode] = useState(lobby?.sessionCode);
    const [errs, setErrs] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();

    useEffect(() => {
        setFilteredGreetings(greetings.filter(g => g.category === greetingCategory));
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

        // const newLobby =
        await dispatch(editLobby(data, lobby?.id));
        closeModal();
        // history.push(`/lobbies/${newLobby.id}`);
    }

    if (!filteredGreetings) {
        return <h1>Loading...</h1>
    }

    return (<>
        {filteredGreetings &&
        <form onSubmit={handleSubmit} id="lobby-form">
            <h1> Start a new lobby! </h1>

            <label>
                Add your session code so other can join you!
                <input
                    required
                    value={sessionCode}
                    onChange={e => setSessionCode(e.target.value)}
                />
                {errs?.sessionCode && <div>{errs.sessionCode}</div>}
            </label>

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

export default EditLobbyForm;
