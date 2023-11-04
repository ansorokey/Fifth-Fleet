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
import {v4 as uuidv4} from 'uuid';
import { addPhotos } from "../../store/photos";
import { csrfFetch } from "../../store/csrf";

function GuildPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const {guildId} = useParams();
    const {setModalContent} = useModal();
    const [isLoaded, setIsLoaded] = useState(false);
    const guildState = useSelector(state => state.guilds);
    const guild = guildState[guildId];
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);
    const user = useSelector(state => state.session.user);
    const isOwner = +user?.id === +guild?.hostId;
    const [isPending, setIsPending] = useState(false);
    const [isMember, setIsMember] = useState(false);

    // checks if the user's id is in the guilds members
    // sets a boolean if found
    useEffect(() => {
        if (user) {
            guild?.Members?.forEach(m => {
                if (+m.id === +user.id) {
                    if (m?.GuildMembers?.status === 'pending') {
                        return setIsPending(true);
                    } else {
                        return setIsMember(true);
                    }
                };
            });
        }
    }, [user, guild]);


    // send membership request
    function requestMembership(){
        csrfFetch(`/api/guildmembers/${guildId}`, {
            method: 'POST'
        });
        window.alert('Request sent! Awaiting approval from owner.');
        setIsPending(true);
    }

    // send membership delete request
    function endMembership(){
        const confirm = window.confirm('Are you sure you want to leave this guild?');
        if(confirm) {
            csrfFetch(`/api/guildmembers/${guildId}/users/${user?.id}`, {
                method: 'delete'
            });
            history.push('/guilds');
        }
    }

    const memberButton = isMember ? <button onClick={endMembership}>Leave Guild</button> :
                        isPending ? <button diabled={true}>Membership Pending</button> : <button onClick={requestMembership}>Join Guild</button>;

    useEffect(() => {
        dispatch(loadGuild(guildId));
        setIsLoaded(true);
    }, []);

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
                        {photos?.reverse().map(p => {
                            return (<div key={uuidv4()} className="gld-car-lnk" onClick={() => {
                                setModalContent(<PhotoViewModal photoId={p.id}/>)
                            }}>
                                <img src={p?.imageUrl} className="gld-car-pic"/>
                            </div>);
                        })}
                    </div>
                    :
                    <><h2>No photos to display</h2><p>Be the first to show off some memories and moments</p></>}

                    {user && (isMember || isOwner) &&
                        <OpenModalButton
                            buttonText='Add Photo'
                            modalComponent={<AddGuildPhotoForm guild={guild} />}
                        />
                    }

                    <h2>Members</h2>
                    {guild?.Members?.length ? <div className="member-list">
                        {guild?.Members?.map(m => {
                            if (isOwner) {
                                if(m?.GuildMembers?.status !== 'owner') return <PlayerListing key={uuidv4()} user={m} showMembership={true} isPending={m?.GuildMembers?.status === 'pending'} guildId={guild.id} />
                            } else {
                                if(m?.GuildMembers?.status === 'member') return <PlayerListing key={uuidv4()} user={m} />
                            }
                        })}
                    </div> : <h2>No members yet!</h2>}
                </div>

                {user ?
                    ((isMember || isOwner) ? <Chat user={user} session={guild} sessionType={'guild'}/> : <h2>Become a guild member to start chatting with fellow hunters!</h2>)
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
