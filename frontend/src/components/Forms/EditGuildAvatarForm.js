import { useState } from "react";
import { useDispatch } from 'react-redux';
import { editGuild, uploadPhoto } from "../../store/guilds";
import { useModal } from "../../context/Modal";

function EditGuildAvatarForm({guild}) {
    const [imageUrl, setImageUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState(null);
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

        if (caption && caption.length > 255) {
            tempErrs.caption = 'max character limit exceeded (255)';
        }

        if (Object.values(tempErrs).length) {
            setValErrs(tempErrs);
            return;
        }

        const data = {
            guildId: guild?.id,
            image,
            caption,
            imageType: 'avatar'
        }

        const uploadResponse = await dispatch(uploadPhoto(data));
        if (uploadResponse && uploadResponse.message === 'success') {
            const data = {
                name: guild?.name,
                about: guild?.about,
                greetingId: guild?.greetingId,
                avatarUrl: uploadResponse.imageUrl,
                bannerUrl: guild?.bannerUrl
            }
            dispatch(editGuild(data, guild?.id));

        }
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
