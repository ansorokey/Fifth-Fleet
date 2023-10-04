import './Guilds.css';

function GuildListing({guild}) {
    return (<div className='guild-listing'>
        <div className="guild-listing-pic">
            <img className="guild-listing-avatar" src={guild?.avatarUrl}/>
            <div className='guild-listing-content'>
                <h2 className='gl-h2'>{guild?.name}</h2>
                <h3 className='gl-h3'>By {guild?.Host?.username}</h3>
                <span className='gl-sp'>{guild?.Greeting?.message}</span>
            </div>
        </div>
    </div>)
}

export default GuildListing;
