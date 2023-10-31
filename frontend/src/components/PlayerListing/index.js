import './PlayerListing.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { approveMembershipThunk, deleteMembership } from '../../store/guilds';
import { useDispatch } from 'react-redux';

function PlayerListing({user, showMembership=false, isPending=false, guildId}) {
    // Hooks
    const history = useHistory();
    const dispatch = useDispatch();

    function toUserPage(){
        history.push(`/profiles/${user.id}`);
    }

    function approveMembership(e) {
        e.preventDefault();
        e.stopPropagation();
        const confirm = window.confirm('Approve this user for guild membership?');
        if(confirm) {
            const data = {
            userId: user.id,
            guildId,
            membership: 'member'
        }
            dispatch(approveMembershipThunk(data))
        }
    }

    function removeMembership(e, userId) {
        e.preventDefault();
        e.stopPropagation();

        const confirm = window.confirm('Remove this user from guild?');
        if(confirm) {
            dispatch(deleteMembership(user.id, guildId))
        }
    }

    return (<div className='player-list-ctn' onClick={toUserPage}>
        <div className='membership-manage'>
            {showMembership && isPending && <i onClick={approveMembership} className="fa-solid fa-circle-check"></i>}
            {showMembership && <i onClick={removeMembership} className="fa-solid fa-circle-xmark"></i>}
        </div>
        <div className='player-list-pics'>
            <img className='player-pic-icon' src={user?.avatarUrl}></img>
            <img className='player-weapon-icon' src={user?.Weapon?.iconUrl} />
        </div>
        {user?.username}
    </div>);
}

export default PlayerListing;
