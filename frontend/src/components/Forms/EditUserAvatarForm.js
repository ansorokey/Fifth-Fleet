import { useState } from "react";
import { useDispatch } from 'react-redux';
import { editGuild } from "../../store/guilds";
import { useModal } from "../../context/Modal";
import { uploadAvatar, loadFullUser } from '../../store/profiles';

function EditUserAvatarForm({user}) {
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [valErrs, setValErrs] = useState({});
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        const tempErrs = {};

        if (
            !imageUrl.endsWith('.png') &&
            !imageUrl.endsWith('.jpg') &&
            !imageUrl.endsWith('.jpeg')
        ) {
            tempErrs.fileType = 'Submitted photo must end in \'.png\', \'.jpg\', or \'.jpeg\''
        }

        if (Object.values(tempErrs).length) {
            setValErrs(tempErrs);
            return;
        }

        const data = {
            userId: user.id,
            image
        }

        dispatch(uploadAvatar(data));
        dispatch(loadFullUser(user?.id));
        closeModal();

        // const uploadResponse = await dispatch(uploadAvatar(data));
        // if (uploadResponse && uploadResponse.message === 'success') {

        // }
    }

    return (<>
        <form className="photo-form-ctn" onSubmit={handleSubmit}>
            <input
                required
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                // multiple
                onChange={(e) => {
                    setImage(e.target.files[0]);
                    setImageUrl(e.target.value);
                    setValErrs(prev => {
                        delete prev.fileType;
                        return prev;
                    });
                }}
            />
            {valErrs && valErrs.fileType}

            <button>Upload</button>
        </form>
    </>);
};

export default EditUserAvatarForm;
