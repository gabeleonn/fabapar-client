import styled from 'styled-components';

import { NavLink as Link } from 'react-router-dom';

export const NavTop = styled.div`
    grid-row: 1 / 2;
    height: 7.5vh;
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

    &:hover {
        color: var(--secondary);
        cursor: pointer;
    }
`;

export const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 100%;
    background: var(--black);
    width: 200%;
    padding: 0.5rem;
`;

export const DropdownOption = styled(Link)`
    font-size: 1rem;
    color: var(--white);
    text-decoration: none;
`;

export const NavAside = styled.div`
    grid-row: 3 / 4;
    height: 7.5vh;
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
        width: 7.5vw;
    }

    @media screen and (min-width: 1280px) {
        width: 5vw;
    }
`;

export const Icon = styled(Link)`
    font-size: 1.3rem;
    transition: all 0.3s ease-in-out;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: var(--secondary);
        cursor: pointer;
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
