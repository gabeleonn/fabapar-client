import styled from 'styled-components';

export const TicketStatus = styled.div`
    color: ${({ type }) => {
        switch (type) {
            case 'danger':
                return '#E83F5B';
            case 'warning':
                return '#FD951F';
            default:
                return '#04D361';
        }
    }};
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-size: 0.8rem;
`;
