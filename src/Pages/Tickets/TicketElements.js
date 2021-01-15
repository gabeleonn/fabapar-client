import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    height: 100%;
`;

export const List = styled.div`
    width: 100%;
    height: 77.5vh;
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
        height: 80px;
        width: 90%;
        border: 1px solid var(--auxiliar);
        outline: none;
        color: var(--primary--light);
        background: var(--auxiliar--light);
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        margin-top: auto;

        &:hover {
            cursor: pointer;
            background: var(--auxiliar);
        }
    }
`;

export const ListItems = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;

export const Item = styled.div`
    min-height: 80px;
    height: fit-content;
    width: 90%;
    background: var(--auxiliar--light);
    border-radius: 5px;
    box-shadow: 0 2px 5px 1px rgba(16, 16, 16, 0.2);
    transform: translateY(0);
    padding: 0.5rem;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 5px 8px 2px rgba(16, 16, 16, 0.2);
        transform: translateY(-2%);
        cursor: pointer;
    }
`;
