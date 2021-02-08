import styled from 'styled-components';

import { FaChevronDown } from 'react-icons/fa';

export const Container = styled.div`
    position: relative;
`;

export const Search = styled.div`
    position: relative;

    &:hover {
        cursor: pointer;
    }
`;

export const Searchable = styled.input`
    height: 5vh;
    width: 100%;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    background: var(--primary--dark);
    color: var(--white);
    border-radius: 3px;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease-in-out;
    padding-right: 0.3rem;

    &:focus {
        border-bottom: 3px solid var(--secondary);
    }

    &:disabled {
        color: var(--primary--light);
    }
`;

export const Selector = styled.div`
    position: absolute;
    top: 5vh;
    width: 100%;
`;

export const Icon = styled(FaChevronDown)`
    position: absolute;
    right: 2px;
    font-size: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
`;

export const SearchItem = styled.div`
    height: 5vh;
    width: 100%;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    background: var(--black);
    color: var(--white);
    transition: all 0.3s ease-in-out;
    padding-right: 0.3rem;
    display: flex;
    align-items: center;
    z-index: 900;

    &:last-child {
        margin-bottom: 2rem;
    }

    &:hover {
        background: var(--primary);
        cursor: pointer;
    }
`;

export const None = styled.p`
    height: 5vh;
    width: 100%;
    border: none;
    outline: none;
    padding-left: 0.5rem;
    background: var(--primary--dark);
    color: var(--white);
    transition: all 0.3s ease-in-out;
    padding-right: 0.3rem;
    display: flex;
    align-items: center;
`;
