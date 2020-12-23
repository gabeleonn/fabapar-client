import styled from 'styled-components';

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

    @media screen and (min-width: 768px) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        height: 92.5vh;
    }

    @media screen and (min-width: 1024px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// For all Pages

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
`;

export const Header = styled.div`
    background: var(--primary);
    border-radius: 3px;
    padding: 1rem;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;

export const Title = styled.h2`
    display: inline-block;
`;

export const Filters = styled.div`
    margin-top: 0.5rem;

    @media screen and (min-width: 768px) {
        margin-top: 0;
    }
`;

export const Filter = styled.button`
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: var(--primary--light);

    &:hover {
        color: var(--secondary);
        cursor: pointer;
    }

    &:not(:last-child) {
        margin-right: 1rem;
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
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
`;

export const Row = styled.p`
    font-size: ${({ primary }) => (primary ? '1.2rem' : '.8rem')};
`;

export const Label = styled.span``;

export const Value = styled.span``;

export const Status = styled.span`
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.8rem;
`;
