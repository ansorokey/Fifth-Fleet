import { useModal } from "../../context/Modal";

function OpenModalButton({modalComponent, buttonText, onButtonClick=null, onModalClose=null, className=null}) {
    const {setModalContent, setOnModalClose} = useModal();

    function handleModal() {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (<div className={className}>
        <button onClick={handleModal}>
            {buttonText}
        </button>
    </div>);
}

export default OpenModalButton;
