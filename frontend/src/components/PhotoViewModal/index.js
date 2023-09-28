import './PhotoViewModal.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import { uploadComment } from '../../store/guilds';
import { useDispatch } from 'react-redux';

function PhotoViewModal({photo}) {
    const {imageUrl:url, caption, userId, User:owner, Comments:comments} = photo;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [newCaption, setNewCaption] = useState('');
    const [newComment, setNewComment] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // dispatch an edit photo request
    }

    function submitComment(e) {
        e.preventDefault();

        const data = {
            content: newComment,
            userId: user?.id,
            photoId: photo?.id
        }

        dispatch(uploadComment(data));

        setNewComment('');
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

            <h2>Comments</h2>
            {comments && comments.map(c => {
                return <div>
                    <img src={c.User.avatarUrl}/>
                    <p>{c.User.username}</p>
                    <p>{c.content}</p>
                </div>
            })}


            <form onSubmit={submitComment}>
                <input
                    type="text"
                    placeholder='New Comment'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button>Post</button>
            </form>

        </div>
    </div>
}

export default PhotoViewModal;
