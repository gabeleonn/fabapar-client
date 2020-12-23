import styled from 'styled-components';

export const ProfileWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    gap: 2rem;
`;

export const Form = styled.form`
    width: 80%;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;

    @media screen and (min-width: 768px) {
        width: 60%;
    }

    @media screen and (min-width: 1024px) {
        max-width: 350px;
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 6vh;
    padding: 0.5rem;

    @media screen and (min-width: 768px) {
        height: 4vh;
    }
`;

export const InputButton = styled(Input)`
    color: var(--white);
    background: var(--primary);
    border: none;
    outline: none;
    border-radius: 3px;

    &:hover {
        background: var(--black);
        cursor: pointer;
    }
`;
