import './PlayerListing.css';

function PlayerListing({user}) {
    return (<div className='player-list-ctn'>
        <div className='player-list-pics'>
            <img className='player-pic-icon' src='https://i.redd.it/4al31h1ehd431.png'></img>
            <img className='player-weapon-icon' src={user?.Weapon?.iconUrl} />
        </div>
        {user?.username}
    </div>);
}

export default PlayerListing;
