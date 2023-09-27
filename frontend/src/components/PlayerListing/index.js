import './PlayerListing.css';

function PlayerListing({user}) {
    return (<div className='player-list-ctn'>
        <div className='player-list-pics'>
            <img className='player-pic-icon' src={user?.avatarUrl}></img>
            <img className='player-weapon-icon' src={user?.Weapon?.iconUrl} />
        </div>
        {user?.username}
    </div>);
}

export default PlayerListing;
