import './PhotoViewModal.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import { uploadComment, deleteComment, editPhoto } from '../../store/guilds';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function PhotoViewModal({photo}) {
    const {setModalContent, closeModal} = useModal();
    const {imageUrl:url, caption, userId, User:owner, Comments:comments} = photo;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [newCaption, setNewCaption] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showCaptionEdit, setShowCaptionEdit] = useState(false);

    async function handleEditCaption(e) {
        e.preventDefault();

        const data = {
            caption: newCaption
        }

        const newPhoto = await dispatch(editPhoto(photo.id, data))
        setNewCaption('');
        setModalContent(<PhotoViewModal photo={newPhoto} />)
        setShowCaptionEdit(false);
    }

    async function submitComment(e) {
        e.preventDefault();

        if(!newComment.length) return;

        const data = {
            content: newComment,
            userId: user?.id,
            photoId: photo?.id
        }

        const newPhoto = await dispatch(uploadComment(data));
        setModalContent(<PhotoViewModal photo={newPhoto} />)

        setNewComment('');
    }

    async function handleDeleteComment(commentId) {
        const newPhoto = await dispatch(deleteComment(commentId));
        setModalContent(<PhotoViewModal photo={newPhoto} />)
    }

    async function handleEditComment(commentId){
        //
    }

    return <div className='photo-view-ctn'>
        <img src={url} />
        <div className='photo-view-content'>
            <div className='user-details'>
                <h2>Uploaded by {owner?.username}</h2>
                <div className='caption-ctn'>
                    {caption !== 'null' && <span className='caption'>{caption}</span>}
                    {user?.id === userId && <i onClick={() => setShowCaptionEdit(!showCaptionEdit)} className="fa-solid fa-pen-to-square"></i>}
                </div>
                {showCaptionEdit && <form onSubmit={handleEditCaption}>
                    <textarea
                        value={newCaption}
                        maxLength={255}
                        placeholder='Edit caption...'
                        onChange={e => setNewCaption(e.target.value)}
                    />
                    <button>Save</button>
                </form>}
            </div>

            <div>
                <h2>Comments</h2>
                <div className='comments-list'>
                    {comments && comments.map(c => {
                        return <div className='comment-ctn'>
                            <img className='comment-prof-pic' src={c.User.avatarUrl}/>
                            <div>
                                <span>{c.User.username}</span>
                                <p>{c.content}</p>
                            </div>
                            {/* {c.userId === user.id && <button onClick={() => handleEditComment(c.id)}><i className="fa-solid fa-pen-to-square"></i></button>} */}
                            {c.userId === user?.id && <button onClick={() => handleDeleteComment(c.id)}><i className="fa-solid fa-trash"></i></button>}
                        </div>
                    })}
                </div>

            </div>


            {user && <form onSubmit={submitComment}>
                <input
                    type="text"
                    placeholder='New Comment'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button>Post</button>
            </form>}

        </div>
    </div>
}

export default PhotoViewModal;
