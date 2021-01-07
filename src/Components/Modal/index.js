import React, { useRef } from 'react';

import {
    ModalBox,
    ModalBoxClose,
    ModalBoxContent,
    ModalWrapper,
} from './ModalElements';

const Modal = ({ children, show, toggleShow }) => {
    const outter = useRef();

    const handleOutter = (e) => {
        if (outter.current === e.target) {
            toggleShow(!show);
        }
    };

    return (
        <>
            <ModalWrapper
                ref={outter}
                onClick={(e) => handleOutter(e)}
                show={show}
            >
                <ModalBox>
                    <ModalBoxClose onClick={() => toggleShow(!show)} />
                    <ModalBoxContent>{children}</ModalBoxContent>
                </ModalBox>
            </ModalWrapper>
        </>
    );
};

export default Modal;
