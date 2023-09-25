import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { loadGuild } from "../../store/guilds";
import { useModal } from "../../context/Modal";

import AddGuildPhotoForm from "../Forms/AddGuildPhotoForm";
import PhotoViewModal from "../PhotoViewModal";
import OpenModalButton from "../OpenModalButton";
import PlayerListing from "../PlayerListing";
import Chat from "../Chat";

function GuildPage() {
    const {setModalContent} = useModal();
    const [isLoaded, setIsLoaded] = useState(false);
    const [photos, setPhotos] = useState([]);
    const {guildId} = useParams();
    const dispatch = useDispatch();
    const guildState = useSelector(state => state.guilds);
    const guild = guildState[guildId];
    const user = useSelector(state => state.session.user);

    // checks if the user's id is in the guilds members
    // sets a boolean if found
    let isMember = false;
    if (user) {
        guild?.Members?.forEach(m => {
            if (m.id === user.id) isMember = true;
        });
    }

    const memberButton = isMember ? <button>Leave Guild</button> : <button>Join Guild</button>

    useEffect(() => {
        dispatch(loadGuild(guildId));
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        setPhotos(guildState?.guildPhotos[guildId]);
    }, [guildState]);

    return (<>
        {isLoaded && guild ?
            <div className="guild-page-ctn">
                <div className="guild-page-content">
                    {user && user.id === guild?.Host?.id ? <button>Edit</button>
                    :
                    memberButton
                    }
                    <h1>{guild?.name}</h1>
                    <h2>Created by {guild?.Host?.username}</h2>
                    <p><em>{guild?.Greeting?.message}</em></p>
                    <p>{guild?.about}</p>

                    {photos?.length ? <div className="photo-carousel">
                        {photos?.map(p => {
                            return (<div key={'img+cap' + p.id} className="gld-car-lnk" onClick={() => {
                                setModalContent(<PhotoViewModal photo={p}/>)
                            }}>
                                <img src={p?.imageUrl} className="gld-car-pic"/>
                            </div>);
                        })}
                    </div>
                    :
                    <><h2>No photos to display</h2><p>Be the first to show off some memories and moments</p></>}

                    {user &&
                        <OpenModalButton
                            buttonText='Add Photo'
                            modalComponent={<AddGuildPhotoForm guildId={guildId} />}
                        />
                    }

                    <h2>Members</h2>
                    <div className="member-list">
                        {guild?.Members?.map(m => {
                            return <PlayerListing user={m} />
                        })}
                    </div>
                </div>

                {user && <Chat user={user} session={guild} sessionType={'guild'}/>}

            </div>
            :
            <h1>Loading...</h1>
        }
    </>);

};

export default GuildPage;
