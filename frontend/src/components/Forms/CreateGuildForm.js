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
    const [errs, setErrs] = useState({});

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
        let filt = greetings.filter(g => g.category === greetingCategory);
        setFilteredGreetings(filt);
        if(filt[0]) setGreeting(filt[0].id);
    }, [greetingCategory]);

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(greeting);
        const data = {
            name: guildName,
            about,
            greetingId: +greeting
        }

        const res = await dispatch(createGuild(data));
        if(res && res.errors) {
            setErrs(res.errors);
            return;
        }

        history.push(`/guilds/${res}`);
        closeModal();
    }

    return (<>
        {filteredGreetings &&
        <form id="guild-form" onSubmit={handleSubmit}>
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
            {errs && <span className="err-span">{errs.name}</span>}

            <label>
                Give new players a brief description of your guild
                <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                />
            </label>

            <label>
                Pick a message so players can see what your guild is all about at a glance
                <select className='guild-category-select' value={greetingCategory} onChange={(e) => setGreetingCategory(e.target.value)}>
                    <option value='Quests and Expeditions'>
                            Quests and Expeditions
                    </option>
                    <option value='Locale'>Locale</option>
                    <option value='Weapons and Armor'>Weapons and Armor</option>
                    <option value='Rank'>Rank</option>
                    <option value='Playstyle'>Playstyle</option>
                </select>

                <select
                    id="sel"
                    onChange={(e) => setGreeting(e.target.value)}
                    value={greeting}
                >
                    {filteredGreetings?.map(g => {
                        return (<option key={uuidv4()} value={g.id}>
                            {g.message}
                        </option>)
                    })}
                </select>
            </label>

            <button className="save-button">Save</button>

        </form>
        }
    </>);
};

export default CreateGuildForm;
