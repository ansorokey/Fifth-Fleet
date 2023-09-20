import { useEffect, useState } from "react";
import {csrfFetch} from '../../store/csrf';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGuild } from "../../store/guilds";
import { useModal } from '../../context/Modal';

function CreateGuildForm() {
    const [guildName, setGuildName] = useState('');
    const [about, setAbout] = useState('');
    const [greetings, setGreetings] = useState([]);
    const [greetingCategory, setGreetingCategory] = useState('Playstyle');
    const [filteredGreetings, setFilteredGreetings] = useState([]);
    const [greeting, setGreeting] = useState(69);

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        async function getMessages() {
            const messages = await csrfFetch('/api/greetings');
            const res = await messages.json();
            setGreetings(res.greetings);
            setFilteredGreetings(res.greetings.filter(g => g.category === 'Playstyle'));
        }

        getMessages();
    }, []);

    useEffect(() => {
        setFilteredGreetings(greetings.filter(g => g.category === greetingCategory));
    }, [greetingCategory]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: guildName,
            about,
            greetingId: +greeting
        }

        const res = await dispatch(createGuild(data));

        history.push(`/guilds/${res}`);
        closeModal();
    }

    return (<>
        {filteredGreetings &&
        <form onSubmit={handleSubmit}>
            <h1> Start your new guild! </h1>

            <label>
                What is your guild's name?
                <input
                    required
                    type="text"
                    value={guildName}
                    onChange={e => setGuildName(e.target.value)}
                />
            </label>

            <label>
                Give new players a brief description of your guild
                <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                />
            </label>

            <label>
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

            <button>Save</button>

        </form>
        }
    </>);
};

export default CreateGuildForm;
