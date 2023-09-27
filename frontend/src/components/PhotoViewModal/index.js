import './PhotoViewModal.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';

function PhotoViewModal({photo}) {
    const {imageUrl:url, caption, userId, User:owner} = photo;
    const user = useSelector(state => state.session.user);
    const [newCaption, setNewCaption] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // dispatch an edit photo request
    }

    return <div className='photo-view-ctn'>
        <img src={url} />
        <div>
            <h2>Uploaded by {owner?.username}</h2>
            <p>{caption}</p>
            {user.id === userId && <form onSubmit={handleSubmit}>
                <textarea
                    value={newCaption}
                    maxLength={255}
                    placeholder='Edit caption...'
                    onChange={e => setNewCaption(e.target.value)}
                />
                <button>Save</button>
            </form>}

        </div>
    </div>
}

export default PhotoViewModal;
