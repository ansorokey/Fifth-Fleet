import './Guilds.css';

function GuildListing({guild}) {
    return (<>
        <div className="guild-listing-pic">
            <img className="guild-avatar" src={guild?.avatarUrl}/>
        </div>
        <h2>{guild?.name}</h2>
        <h3>{guild?.Host?.username}</h3>
        <p>{guild?.Greeting?.message}</p>
    </>)
}

export default GuildListing;
