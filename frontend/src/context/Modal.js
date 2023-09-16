import React, {useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = React.createContext();

export function ModalProvider({children}) {
    const modalRef = useRef();

    const [modalContent, setModalContent] = useState(null);
    // Below runs any callbacks when closeing modal
    const [onModalClose, setOnModalClose] = useState(null);

    // function that closes modal
    function closeModal() {
        setModalContent(null);
        if (typeof onModalClose === 'function') {
            // schedules the onModalClose to be null
            setOnModalClose(null);
            // runs the modalClose callback (before getting set to null)
            onModalClose();
        }
    }

    const contextValue = {
        modalRef,
        modalContent, setModalContent,
        setOnModalClose,
        closeModal
    }

    return (<>
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
        <div ref={modalRef}></div>
    </>);

}

export function Modal() {
    const {modalRef, modalContent, closeModal} = useContext(ModalContext);

    if (!modalRef || !modalRef.current || !modalContent) {
        return null;
    }

    return ReactDOM.createPortal(<>
        <div id="modal">
            <div
                id="modal-background"
                onClick={closeModal}
                >
                <div id="modal-content">
                    {modalContent}
                </div>
            </div>
        </div>,
        modalRef.current
    </>);
}

export function useModal() {
    return useContext(ModalContext);
}
