import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { loadGuild } from "../../store/guilds";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import AddGuildPhotoForm from "../Forms/AddGuildPhotoForm";
import Chat from "../Chat";

function GuildPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const {guildId} = useParams();
    const dispatch = useDispatch();
    const guild = useSelector(state => state.guilds[guildId]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        async function init(){
            const response = await dispatch(loadGuild(guildId));
            // console.log(response);
            // if(response && response.message) {
            // }
        }

        init();
        setIsLoaded(true);
    }, []);

    return (<>
        {isLoaded && guild ?
            <>
                <h1>{guild?.name}</h1>
                <h2>Created by {guild?.Host?.username}</h2>
                <p><em>{guild?.Greeting?.message}</em></p>
                <p>{guild?.about}</p>
                <h2> Turn this into a carousel, also normalize image size</h2>
                <h3>Also also, make it so they can be clcked on for full size and caption</h3>
                {guild?.Photos?.map(p => {
                    return (<div key={'img+cap' + p.id}>
                        <img src={p?.imageUrl}/>
                        <p>{p?.caption}</p>
                    </div>);
                })}

                <OpenModalButton
                    buttonText='Add Photo'
                    modalComponent={<AddGuildPhotoForm guildId={guildId} />}
                />

                <Chat user={user}/>
            </>
            :
            <h1>Loading...</h1>
        }
    </>);

    // if(!isLoaded) {
    //     return ();
    // }

    // if(guild) {
    //     return ();
    // }

};

export default GuildPage;
