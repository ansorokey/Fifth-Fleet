import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { loadGuild, deleteGuild } from "../../store/guilds";
import { useModal } from "../../context/Modal";

import AddGuildPhotoForm from "../Forms/AddGuildPhotoForm";
import PhotoViewModal from "../PhotoViewModal";
import OpenModalButton from "../OpenModalButton";
import PlayerListing from "../PlayerListing";
import Chat from "../Chat";
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import EditGuildForm from '../Forms/EditGuildForm'
import EditGuildAvatarForm from '../Forms/EditGuildAvatarForm';
import EditGuildBannerForm from "../Forms/EditGuildBannerForm";

function GuildPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {guildId} = useParams();
    const {setModalContent} = useModal();
    const [isLoaded, setIsLoaded] = useState(false);
    const [photos, setPhotos] = useState([]);
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

    const memberButton = isMember ? <button onClick={() => alert('Feature in progress')}>Leave Guild</button> : <button onClick={() => alert('Feature in progress')}>Join Guild</button>

    useEffect(() => {
        dispatch(loadGuild(guildId));
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        setPhotos(guildState?.guildPhotos[guildId]);
    }, [guildState]);

    return (<>
        {isLoaded && guild ? <div className="guild-page-ctn">
            <div className="guild-header-images">
                <div>
                    <div className="banner-ctn">
                        <img className="guild-page-banner" src={guild?.bannerUrl} />
                        {+user?.id === +guild?.hostId &&
                        <OpenModalButton
                            buttonClassName="guild-change-banner-btn"
                            buttonText='Change Banner'
                            modalComponent={<EditGuildBannerForm guild={guild} />}
                        />}
                    </div>
                    <div className="avatar-ctn">
                        <img className="guild-page-avatar" src={guild?.avatarUrl} />
                        {+user?.id === +guild?.hostId &&
                        <OpenModalButton
                            buttonClassName="guild-change-avatar-btn"
                            buttonText='Change Avatar'
                            modalComponent={<EditGuildAvatarForm guild={guild} />}
                        />}
                    </div>
                </div>

            </div>

            <div className="guild-page-grid">
                <div className="guild-page-content">
                    {user && user.id === guild?.Host?.id &&
                        <>
                            <OpenModalButton
                                buttonText={'Edit Guild'}
                                modalComponent={<EditGuildForm guild={guild}/>}
                            />
                            <button onClick={async () => {
                                const choice = window.confirm('Are you sure you want to delete this guild?');
                                if (choice) {
                                    dispatch(deleteGuild(guildId));
                                    history.push('/guilds');
                                }
                            }}>
                                Delete guild
                            </button>
                        </>
                    }

                    { user && user?.id !== guild?.hostId && memberButton}

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
                            modalComponent={<AddGuildPhotoForm guild={guild} />}
                        />
                    }

                    <h2>Members</h2>
                    {guild?.Members?.length ? <div className="member-list">
                        {guild?.Members?.map(m => {
                            return <PlayerListing user={m} />
                        })}
                    </div> : <h2>No members yet!</h2>}
                </div>

                {user ?
                    <Chat user={user} session={guild} sessionType={'guild'}/>
                :
                    <div className="gld-not-mem">
                        <h2>Become a member to chat with the guild!</h2>
                        <OpenModalButton
                            buttonText='Sign Up'
                            modalComponent={<SignupFormModal />}
                        />
                        <OpenModalButton
                            buttonText={'Log In'}
                            modalComponent={<LoginFormModal />}
                        />
                    </div>
                }

            </div>
        </div>
            :
            <h1>Loading...</h1>
        }
    </>);

};

export default GuildPage;
