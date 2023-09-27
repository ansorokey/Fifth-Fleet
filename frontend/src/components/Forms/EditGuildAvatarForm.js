import { useState } from "react";
import { useDispatch } from 'react-redux';
import { uploadPhoto } from "../../store/guilds";
import { useModal } from "../../context/Modal";

function EditGuildAvatarForm({guildId}) {
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState(null);
    const [valErrs, setValErrs] = useState({});
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const tempErrs = {};

        if (
            !imageUrl.endsWith('.png') &&
            !imageUrl.endsWith('.jpg') &&
            !imageUrl.endsWith('.jpeg')
        ) {
            tempErrs.fileType = 'Submitted photo must end in \'.png\', \'.jpg\', or \'.jpeg\''
        }

        if (caption && caption.length > 255) {
            tempErrs.caption = 'max character limit exceeded (255)';
        }

        if (Object.values(tempErrs).length) {
            setValErrs(tempErrs);
            return;
        }

        const data = {
            guildId,
            image,
            caption
        }

        dispatch(uploadPhoto(data));
        closeModal();
    }

    return (<>
        <form onSubmit={handleSubmit}>
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

            <textarea
                placeholder="Enter a caption here..."
                maxLength="255"
                onChange={(e) => setCaption(e.target.value)}
            />
            {valErrs && valErrs.caption}

            <button>Upload</button>
        </form>
    </>);
};

export default EditGuildAvatarForm;
