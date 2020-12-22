import styled from 'styled-components';

import Chart from 'react-apexcharts';

export const DashboardWrapper = styled.section`
    padding: 0.5rem;
    gap: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 3fr 3fr;
    height: 100%;
    width: 100%;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(6, minmax(100px, 150px));
        grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
        width: max-content;
        margin: auto;
    }
`;

export const DashboardInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: max-content;
`;

export const Card = styled.div`
    background: var(--primary);
    padding: 1rem;
    color: var(--white);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    border-radius: 3px;

    grid-column: 1 / 3;

    @media screen and (min-width: 768px) {
        grid-column: 1 / 4;

        &:nth-child(even) {
            grid-column: 4 / 7;
        }
    }
`;

export const CardCount = styled.div`
    background: var(--primary);
    padding: 0.5rem;
    color: var(--white);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
    border-radius: 3px;

    grid-column: 1 / 2;
    min-height: 100px;

    &:nth-child(even) {
        grid-column: 2 / 3;
    }

    @media screen and (min-width: 768px) {
        grid-column: 1 / 2;
        height: 150px;

        &:nth-child(2) {
            grid-column: 2 / 3;
        }

        &:nth-child(3) {
            grid-column: 3 / 4;
        }

        &:nth-child(4) {
            grid-column: 4 / 5;
        }

        &:nth-child(5) {
            grid-column: 5 / 6;
        }

        &:nth-child(6) {
            grid-column: 6 / 7;
        }
    }
`;

export const CardTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 500;
`;

export const CardCounter = styled.p`
    font-size: 1.8rem;
`;

export const ChartWidget = styled(Chart)`
    width: 100% !important;
`;
