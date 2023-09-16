import { useModal } from "../../context/Modal";

function OpenModalButton({modalComponent, buttonText, onButtonClick=null, onModalClose=null}) {
    const {setModalContent, setOnModalClose} = useModal();

    function handleModal() {
        onButtonClick();
        setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return (<>
        <button onClick={handleModal}>
            {buttonText}
        </button>
    </>);
}

export default OpenModalButton;
