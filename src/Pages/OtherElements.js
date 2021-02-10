import styled, { css } from 'styled-components';

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
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    position: relative;

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
    flex: 1;
`;

export const AuxiliaryButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 30px;
    width: 100%;
    justify-content: center;
`;

export const FilterOption = styled.button`
    border: none;
    outline: none;
    color: var(--auxiliar);
    background: none;
    transition: all 0.3s ease-in-out;
    padding: 0.5rem 1rem;

    &:hover {
        cursor: pointer;
        color: var(--secondary);
    }

    &:focus {
        animation: focus 3s 1;
    }

    &.active {
        color: var(--secondary);
    }
`;

export const Title = styled.h2`
    display: inline-block;
`;

export const SubTitle = styled.h4`
    display: inline-block;
`;

export const Hr = styled.hr`
    margin-bottom: ${({ light }) => (light ? '0' : '1rem')};
    border: none;
    background: none;
    width: 100%;
    border-bottom: ${({ light }) => (light ? '2px' : '1px')} solid
        var(${({ light }) => (light ? '--primary--light' : '--primary')});
`;

export const Description = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--auxiliar);
    margin-top: -0.5rem;
    gap: 0.5rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    & > span {
        visibility: hidden;
        opacity: 0;
        transform: translateX(-15%);
        transition: all 0.3s ease-in-out;
        color: var(--auxiliar);
    }

    &:hover {
        cursor: pointer;

        & > svg {
            color: var(--secondary);
        }

        & > span {
            visibility: visible;
            transform: translateX(5%);
            opacity: 1;
            transition: all 0.3s ease-in-out;
        }
    }
`;

export const AddButton = styled(FaPlus)`
    transition: all 0.3s ease-in-out;
    position: relative;
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

    @media screen and (min-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 1440px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export const Element = styled.div`
    background: var(--auxiliar--light);
    color: var(--black);
    position: relative;
    min-height: 80px;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-bottom: 1px solid var(--auxiliar);
    border-left: 1px solid var(--auxiliar);
    margin-bottom: 2px;
    transition: all 0.3s ease-in-out;
    transform: translate(0, 0);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    padding-bottom: ${({ status }) => (status ? '2.5rem' : '1rem')};

    &:hover {
        cursor: pointer;
        border-bottom: 3px solid var(--auxiliar);
        border-left: 3px solid var(--auxiliar);
        transform: translate(0.3px, -1px);
        transition: all 0.3s ease-in-out;
        margin-bottom: 0;
    }

    & .small {
        font-size: 0.75rem;
    }
`;

export const Row = styled.p`
    font-size: ${({ primary }) => (primary ? '1.1rem' : '.8rem')};
`;

export const Label = styled.label`
    color: var(--primary--light);
    text-align: start;
    margin-bottom: -1rem;
`;

export const LabelS = styled.span`
    text-transform: capitalize;
    font-weight: 800;
    color: var(--primary--light);
`;

export const Value = styled.span``;

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

export const UploadFile = styled.input`
    &.custom-file-input {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 25px;
        height: 40px;
        background: none;

        &:focus::before {
            border-color: var(--secondary);
            color: var(--secondary);
        }
    }

    &.custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    &.custom-file-input::before {
        ${({ description }) =>
            description === 'file'
                ? css`
                      content: 'Upload da nota fiscal';
                  `
                : css`
                      content: 'Upload do termo de responsabilidade';
                  `}
        display: inline-block;
        border: 1px solid #999;
        border-radius: 3px;
        height: 100%;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &.custom-file-input:hover::before {
        border-color: var(--secondary);
        color: var(--secondary);
    }
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
    z-index: 100;

    &:focus {
        border-bottom: 3px solid var(--secondary);
    }

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
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
    color: var(--primary--light);
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
    align-content: center;
    height: 20px;
    gap: 0.5rem;
    text-decoration: none;
    &:hover > svg {
        color: var(--secondary);
    }
`;
