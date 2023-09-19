import { useState } from "react";

function AddGuildPhotoForm() {
    const [imageUrl, setImageUrl] = useState(null);
    const [imageCaption, setImageCaption] = useState(null);
    const [valErrs, setValErrs] = useState({});

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

        if (imageCaption && imageCaption.length > 255) {
            tempErrs.caption = 'max character limit exceeded (255)';
        }

        if (Object.values(tempErrs).length) {
            setValErrs(tempErrs);
            return;
        }

    }

    return (<>
        <form onSubmit={handleSubmit}>
            <input
                required
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => {
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
                onChange={(e) => setImageCaption(e.target.value)}
            />
            {valErrs && valErrs.caption}

            <button>Upload</button>
        </form>
    </>);
};

export default AddGuildPhotoForm;
