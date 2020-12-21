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
        grid-template-columns: 10vw 1fr;
        grid-template-rows: 7.5vh 1fr;
    }

    @media screen and (min-width: 1280px) {
        grid-template-columns: 7.5vw 1fr;
        grid-template-rows: 7.5vh 1fr;
    }
`;

export const ContentWrapper = styled.section`
    overflow-y: auto;
    height: 80vh;
    grid-row: 2 / 3;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media screen and (min-width: 768px) {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        height: 92.5vh;
    }
`;
