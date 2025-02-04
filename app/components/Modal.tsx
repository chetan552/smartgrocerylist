import React from 'react';

interface ModalProps {
    isOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, children}) => {
    return (
       <dialog id="my_modal_4" className={`modal ${isOpen ? "modal-open" : ""}`}>
           <div className="modal-box w-11/12 max-w-2xl">
               {children}
           </div>
       </dialog>
    );
};

export default Modal;
