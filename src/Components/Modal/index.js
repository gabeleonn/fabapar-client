import React from 'react';

import {
    ModalBox,
    ModalBoxClose,
    ModalBoxContent,
    ModalWrapper,
} from './ModalElements';

const Modal = ({ children, show, toggleShow }) => {
    return (
        <>
            <ModalWrapper show={show}>
                <ModalBox>
                    <ModalBoxClose onClick={toggleShow} />
                    <ModalBoxContent>{children}</ModalBoxContent>
                </ModalBox>
            </ModalWrapper>
        </>
    );
};

export default Modal;
