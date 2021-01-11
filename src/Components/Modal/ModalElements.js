import styled from 'styled-components';

import { FaTimes } from 'react-icons/fa';

export const ModalWrapper = styled.div`
    position: fixed;
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({ show }) => (show ? '1' : '0')};
    transform: ${({ show }) => (show ? 'scale(1)' : 'scale(0)')};
    transition: opacity 0.3s ease-in-out;
`;

export const ModalBox = styled.div`
    width: 90%;
    margin: 0 auto;
    height: max-content;
    background: var(--primary);
    position: relative;
    border-radius: 3px;
    overflow-y: auto;
    height: ${({ height }) => height};

    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media screen and (min-width: 1024px) {
        width: 30%;
    }
`;

export const ModalBoxClose = styled(FaTimes)`
    transition: all 0.3s ease-in-out;
    position: absolute;
    right: 5px;
    top: 5px;

    &:hover {
        color: var(--secondary);
        cursor: pointer;
    }
`;

export const ModalBoxContent = styled.form`
    color: var(--white);
    padding: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    text-align: center;
    min-height: 100%;
`;
