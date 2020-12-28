import styled from 'styled-components';

import { NavLink as Link } from 'react-router-dom';

export const NavTop = styled.div`
    grid-row: 1 / 2;
    height: 10vh;
    background: var(--black);
    color: var(--white);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7.5vw;

    @media screen and (min-width: 768px) {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        height: 7.5vh;
    }

    @media screen and (min-width: 1024px) {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        height: 10vh;
    }
`;

export const NavTopButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    font-size: 2rem;
    position: relative;
    width: 10vw;
    height: 100%;
`;

export const NavTopButton = styled(Link)`
    font-size: 1rem;
    color: var(--white);
    text-decoration: none;
    width: 100%;
    padding: 0.5rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        color: var(--secondary);
    }
`;

export const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    right: -30%;
    background: var(--black);
    width: 300%;
    z-index: 11;
    text-align: center;

    @media screen and (min-width: 768px) {
        width: 150%;
    }

    @media screen and (min-width: 1280px) {
        width: 100%;
    }
`;

export const DropdownOption = styled(Link)`
    font-size: 1rem;
    color: var(--white);
    text-decoration: none;
    height: 100%;
    width: 100%;
    padding: 0.5rem;

    &:hover {
        background: var(--primary--light);
    }
`;

export const NavAside = styled.div`
    grid-row: 3 / 4;
    height: 10vh;
    background: var(--primary);
    color: var(--white);

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 7.5vw;

    @media screen and (min-width: 768px) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        width: 10vw;
        height: 92.5vh;

        flex-direction: column;
        padding: 7.5vh 0;
        justify-content: start;
        gap: 2.5rem;
    }

    @media screen and (min-width: 1024px) {
        width: 8vw;
    }

    @media screen and (min-width: 1280px) {
        width: 5vw;
    }
`;

export const Icon = styled(Link)`
    font-size: 1.3rem;
    transition: color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover {
        color: var(--secondary);
        cursor: pointer;

        &::after {
            display: block;
            color: var(--black);
            font-size: 1rem;
            width: max-content;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.6));
            left: 150%;
            opacity: 1;
        }
    }

    &::after {
        content: ${({ name }) => `'${name}'`};
        position: absolute;
        left: 130%;
        display: none;
        z-index: 20;
        clip-path: polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%);
        background: var(--auxiliar);
        padding: 0.1rem 0.5rem 0.1rem 0.9rem;
        border-radius: 3px;
        opacity: 0;
    }

    &.active {
        color: var(--secondary);
    }
`;

export const Logo = styled(Link)`
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--white);
    text-decoration: none;
`;
