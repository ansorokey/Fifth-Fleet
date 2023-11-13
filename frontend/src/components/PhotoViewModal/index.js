import './PhotoViewModal.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { uploadComment, deleteComment, updateComment } from '../../store/comments';
import { updatePhoto } from '../../store/photos';
import {v4 as uuidv4} from 'uuid';

function PhotoViewModal({photoId}) {
    // slices of state
    const user = useSelector(state => state.session.user);
    const comments = useSelector(state => state.comments[photoId]);
    const photo = useSelector(state => state.photos[photoId]);

    // state variables
    const [newCaption, setNewCaption] = useState('');
    const [newComment, setNewComment] = useState('');
    const [showCaptionEdit, setShowCaptionEdit] = useState(false);
    const [editing, setEditing] = useState(false);
    const [commentId, setCommentId] = useState(null);

    // hooks
    const dispatch = useDispatch();
    const {setModalContent, closeModal} = useModal();

    // extra
    const {imageUrl:url, caption, userId, User:owner} = photo;
    const isOwner = userId === user?.id;

    // form submission: edit photo caption
    async function handleEditCaption(e) {
        e.preventDefault();

        const data = {
            caption: newCaption
        }

        dispatch(updatePhoto(photo.id, data))
        setNewCaption('');
        setShowCaptionEdit(false);
    }

    // form submission: post a comment
    async function submitComment(e) {
        e.preventDefault();

        if(!newComment.length) return;

        if (editing) {
            const data = {
                content: newComment
            }

            dispatch(updateComment(commentId, data));
            setEditing(false);
            setNewComment('');
            setCommentId(null);
            return;
        }

        const data = {
            content: newComment,
            photoId: photo?.id
        }

        dispatch(uploadComment(data));

        setNewComment('');
    }

    // form submission: delete a comment
    async function handleDeleteComment(commentId) {
        dispatch(deleteComment(commentId, photoId));
    }

    // form submission: edit a comment
    function handleEditComment(commentId, content){
        setCommentId(commentId);
        setEditing(true);
        setNewComment(content);
    }

    // return component
    return <div className='photo-view-ctn'>
        <img src={url} />
        <div className='photo-view-content'>
            <div className='user-details'>
                <h2 className='photoview-h2'>Uploaded by {owner?.username}</h2>
                <i className={`fa-solid fa-trash ${!isOwner ? 'hide' : null}`} title="Delete Photo"></i>
                <div className='caption-ctn'>
                    {caption !== 'null' && <span className='caption'>{caption}</span>}
                    {isOwner && <i onClick={() => setShowCaptionEdit(!showCaptionEdit)} className="fa-solid fa-pen-to-square" title='Edit Caption'></i>}
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
                <h2 className='photoview-h2'>Comments</h2>
                <div className='comments-list'>
                    {comments && comments.map(c => {
                        return <div className='comment-ctn' key={uuidv4()}>
                            <img className='comment-prof-pic' src={c.User.avatarUrl}/>
                            <div>
                                <span>{c.User.username}</span>
                                <p>{c.content}</p>
                            </div>
                            <div>
                                {c.userId === user?.id && <button onClick={() => handleEditComment(c.id, c.content)}><i className="fa-solid fa-pen-to-square"></i></button>}
                                {c.userId === user?.id && <button onClick={() => handleDeleteComment(c.id)}><i className="fa-solid fa-trash"></i></button>}
                            </div>
                        </div>
                    })}
                </div>

            </div>


            {user && <form onSubmit={submitComment}>
                <input
                    type="text"
                    placeholder={editing ? 'Edit your comment' : 'Post a New Comment'}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button>{editing ? 'Save' : 'Post'}</button>
                {editing && <button onClick={(e) => {
                    e.preventDefault();
                    setEditing(false);
                    setNewComment('');
                }}>Cancel</button>}
            </form>}

        </div>
    </div>
}

export default PhotoViewModal;
