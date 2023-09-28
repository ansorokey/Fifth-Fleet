import './PhotoViewModal.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import { uploadComment, deleteComment } from '../../store/guilds';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function PhotoViewModal({photo}) {
    const {setModalContent, closeModal} = useModal();
    const {imageUrl:url, caption, userId, User:owner, Comments:comments} = photo;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [newCaption, setNewCaption] = useState('');
    const [newComment, setNewComment] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        // dispatch an edit photo request
    }

    async function submitComment(e) {
        e.preventDefault();

        const data = {
            content: newComment,
            userId: user?.id,
            photoId: photo?.id
        }

        const newPhoto = await dispatch(uploadComment(data));
        // closeModal();
        setModalContent(<PhotoViewModal photo={newPhoto} />)

        setNewComment('');
    }

    async function handleDeleteComment(commentId) {
        const newPhoto = await dispatch(deleteComment(commentId));
        console.log(newPhoto);
        setModalContent(<PhotoViewModal photo={newPhoto} />)
    }

    async function handleEditComment(commentId){
        //
    }

    return <div className='photo-view-ctn'>
        <img src={url} />
        <div className='photo-view-content'>
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
            <div className='comments-list'>
                {comments && comments.map(c => {
                    return <div className='comment-ctn'>
                        <img className='comment-prof-pic' src={c.User.avatarUrl}/>
                        <div>
                            <span>{c.User.username}</span>
                            <p>{c.content}</p>
                        </div>
                        {c.userId === user.id && <button onClick={() => handleEditComment(c.id)}>Edit</button>}
                        {c.userId === user.id && <button onClick={() => handleDeleteComment(c.id)}>Delete</button>}
                    </div>
                })}
            </div>


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
