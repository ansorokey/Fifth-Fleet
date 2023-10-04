import { useModal } from "../../context/Modal";

function OpenModalButton({modalComponent, buttonText, onButtonClick=null, onModalClose=null, className=null, buttonClassName=null}) {
    const {setModalContent, setOnModalClose} = useModal();

    function handleModal() {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (
        <button className={buttonClassName} onClick={handleModal}>
            {buttonText}
        </button>
    );
}

export default OpenModalButton;
