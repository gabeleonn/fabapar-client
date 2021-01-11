import styled from 'styled-components';

import { FaPlus } from 'react-icons/fa';

export const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media screen and (min-width: 768px) {
        grid-template-columns: 10vw 1fr;
        grid-template-rows: 7.5vh 1fr;
    }

    @media screen and (min-width: 1024px) {
        grid-template-columns: 8vw 1fr;
        grid-template-rows: 10vh 1fr;
    }

    @media screen and (min-width: 1280px) {
        grid-template-columns: 5vw 1fr;
        grid-template-rows: 10vh 1fr;
    }
`;

export const ContentWrapper = styled.section`
    overflow-y: auto;
    height: 80vh;
    grid-row: 2 / 3;
    width: 100%;
    position: relative;

    @media screen and (min-width: 768px) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        height: 92.5vh;
    }

    /* @media screen and (min-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
    } */
`;

// For all Pages

export const Wrapper = styled.div`
    width: 100%;
    height: max-content;
    padding: 0.5rem;
`;

export const Header = styled.div`
    background: var(--primary);
    border-radius: 3px;
    padding: 1rem;
    color: var(--white);
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 0.5rem;

    @media screen and (min-width: 768px) {
        flex-direction: row;
        gap: 1rem;
    }
`;

export const Head = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const Title = styled.h2`
    display: inline-block;
`;

export const SubTitle = styled.h4`
    display: inline-block;
`;

export const Hr = styled.hr`
    margin-bottom: 1rem;
`;

export const Description = styled.span`
    color: var(--auxiliar);
    margin-top: -0.5rem;
`;

export const AddButton = styled(FaPlus)`
    transition: all 0.3s ease-in-out;

    &:hover {
        color: var(--secondary);
        cursor: pointer;
    }
`;

export const SearchBar = styled.form`
    height: 5vh;
    width: 100%;
    position: relative;

    @media screen and (min-width: 768px) {
        width: 50%;
    }
`;

export const SearchInput = styled.input`
    height: 100%;
    background: var(--black);
    padding: 0.5rem;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--white);

    &:focus {
        border-bottom: 2px solid var(--secondary);
    }
`;

export const ElementList = styled.div`
    margin-top: 1rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    padding: 0 1rem;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
`;

export const Element = styled.div`
    background: var(--auxiliar--light);
    border-radius: 3px;
    padding: 0.5rem 1rem;
    color: var(--black);
    position: relative;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    padding-bottom: ${({ status }) => (status ? '2.5rem' : '1rem')};

    &:hover {
        transform: scale(1.01);
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
`;

export const Row = styled.p`
    font-size: ${({ primary }) => (primary ? '1.1rem' : '.8rem')};
`;

export const Label = styled.span`
    text-transform: capitalize;
    font-weight: 800;
`;

export const Value = styled.span`
    text-transform: capitalize;
`;

export const Status = styled.span`
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.8rem;
`;

//FORMS

export const FormRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 5vh;
    gap: 1rem;
`;

export const Input = styled.input`
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

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
    }
    &.custom-file-input {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: none;
        border: none;
    }

    &.custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    &.custom-file-input::before {
        text-align: center;
        content: 'Upload da nota fiscal';
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        height: 100%;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
    }
    &.custom-file-input:hover::before {
        border-color: var(--secondary);
        color: var(--secondary);
    }
`;

export const Select = styled.select`
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
    text-transform: capitalize;

    & option {
        text-transform: capitalize;
    }

    &:focus {
        border-bottom: 3px solid var(--secondary);
    }
`;

export const Option = styled.option`
    text-transform: capitalize;
`;

export const TextArea = styled.textarea`
    height: 10vh;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 3px;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease-in-out;
    background: var(--primary--dark);
    padding: 0.5rem;
    color: var(--white);
    font-family: inherit;

    &:focus {
        border-bottom: 3px solid var(--secondary);
    }
`;

export const Button = styled.button`
    height: 5vh;
    width: 100%;
    border: none;
    outline: none;
    background: var(--black);
    color: var(--white);
    border-radius: 3px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: var(--primary--dark);
        cursor: pointer;
    }

    &:focus {
        outline: 1px solid var(--secondary);
    }
`;

export const Icon = styled.a`
    font-size: 1rem;
    color: var(--secondary);
    margin-right: 0.5rem;

    &:hover {
        color: var(--primary--light);
    }
`;
