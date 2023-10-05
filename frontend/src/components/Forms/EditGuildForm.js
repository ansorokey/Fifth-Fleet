import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editGuild } from "../../store/guilds";
import { useModal } from '../../context/Modal';

function EditGuildForm({guild}) {
    const greetingsState = useSelector(state => state.utils.greetings);
    const [guildName, setGuildName] = useState(guild?.name);
    const [about, setAbout] = useState(guild?.about);
    const [greetings, setGreetings] = useState(Object.values(greetingsState));
    const [greetingCategory, setGreetingCategory] = useState(guild?.Greeting?.category);
    const [filteredGreetings, setFilteredGreetings] = useState([]);
    const [greeting, setGreeting] = useState(guild?.Greeting?.id);

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    useEffect(() => {
        let filt = greetings.filter(g => g.category === greetingCategory);
        setFilteredGreetings(filt);
        if(filt[0]) setGreeting(filt[0].id);
    }, [greetingCategory]);

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: guildName,
            about,
            greetingId: +greeting,
        }

        dispatch(editGuild(data, guild.id));

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

            <label>
                Give new players a brief description of your guild
                <textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                />
            </label>

            <label>
                Pick a message so players can see what your guild is all about at a glance
                <select value={greetingCategory} onChange={(e) => setGreetingCategory(e.target.value)}>
                    <option value="Quests and Expeditions">Quests and Expeditions</option>
                    <option value="Locale">Locale</option>
                    <option value="Weapons and Armor">Weapons and Armor</option>
                    <option value="Rank">Rank</option>
                    <option value='Playstyle'>Playstyle</option>
                </select>

                <select
                    value={greeting}
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

export default EditGuildForm;
