import React from 'react';

export interface ModalProps {
    onDismiss?: () => void;
}

const Modal: React.FC = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};


export default Modal;
