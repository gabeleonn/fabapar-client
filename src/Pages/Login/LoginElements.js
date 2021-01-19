import styled from 'styled-components';

export const LoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: var(--primary--dark);
`;

export const LoginHeading = styled.h2`
    text-align: center;
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: var(--white);
`;

export const LoginCard = styled.div`
    color: var(--black);
    width: 90%;
    height: max-content;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
    padding: 2rem;
    border-radius: 3px;
    background: var(--primary);

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

export const Label = styled.label`
    color: var(--primary--light);
    text-align: start;
    margin-bottom: -1rem;
    align-self: flex-start;
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
