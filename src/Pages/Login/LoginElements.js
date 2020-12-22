import styled from 'styled-components';

export const LoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: var(--primary);
`;

export const LoginHeading = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: var(--secondary);
`;

export const LoginCard = styled.div`
    background: var(--white);
    color: var(--black);
    width: 90%;
    height: max-content;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    padding: 2rem;
    border-radius: 3px;

    @media screen and (min-width: 768px) {
        width: 50%;
    }

    @media screen and (min-width: 1024px) {
        width: 30%;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1rem;
`;

export const Input = styled.input`
    width: 100%;
    height: 4vh;
    padding: 0.5rem;

    &:last-child {
        background: var(--secondary);
        border: none;
        outline: none;
        color: var(--white);

        &:hover {
            background: var(--secondary--light);
            cursor: pointer;
        }
    }
`;
