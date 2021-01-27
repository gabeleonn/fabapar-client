import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.2rem;
    height: 100%;
    overflow: hidden;
    width: 100%;
`;

export const KanbanContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    height: 100%;
    overflow: hidden;
    width: 100%;
`;

export const List = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
        color: var(--primary--light);
        width: 100%;
        margin-bottom: 1.5rem;
    }

    button {
        min-height: 40px;
        width: 90%;
        border: none;
        outline: none;
        color: var(--primary--light);
        background: none;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 0.3rem;
        opacity: 0;
        transition: all 0.5s ease-in-out;

        &:hover {
            cursor: pointer;
            opacity: 1;
            transition: all 0.5s ease-in-out;
        }
    }
`;

export const ListItems = styled.div`
    width: 100%;
    height: 75.5vh;
    overflow-y: auto;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
`;

export const Item = styled.div`
    min-height: 80px;
    height: fit-content;
    width: 97%;
    background: var(--auxiliar--light);
    border-bottom: 1px solid var(--auxiliar);
    border-left: 1px solid var(--auxiliar);
    transition: all 0.3s ease-in-out;
    transform: translate(0, 0);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-bottom: 2px;

    &:hover {
        cursor: pointer;
        border-bottom: 3px solid var(--auxiliar);
        border-left: 3px solid var(--auxiliar);
        transform: translate(0.8px, -0.8px);
        transition: all 0.3s ease-in-out;
        margin-bottom: 0;
    }

    p {
        font-weight: 600;
    }
`;

export const Status = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
`;

export const Category = styled.span`
    text-transform: capitalize;
    border-radius: 50px;
    padding: 0.3rem .6rem;
    font-size: 0.8rem;

    &.high {
        background: #ffc4c7;
        color: #e52f39;
    }

    &.medium {
        background: #f2ddc8;
        color: #da7d26;
    }

    &.low {
        background: #c9e9d1;
        color: #28af55;
    }
`;

export const User = styled.span`
    font-size: 0.8rem;
    color: var(--primary--light);
    text-transform: capitalize;
`;

export const Ticket = styled.div`
    background: var(--auxiliar--light);
    color: var(--black);
    border-bottom: 3px solid transparent;
    border-left: 3px solid transparent;
    transform: translate(0, 0);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        border-bottom: 3px solid var(--auxiliar);
        border-left: 3px solid var(--auxiliar);
        transform: translate(0.8px, -0.8px);
        transition: all 0.3s ease-in-out;
    }
`;
