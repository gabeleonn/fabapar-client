import React from 'react';

import {
    Wrapper,
    Header,
    Title,
    Filters,
    Filter,
    ElementList,
    Element,
    Row,
    Label,
    Value,
} from '../OtherElements';
import { TicketStatus } from './TicketElements';

const Loans = () => {
    const data = [
        {
            id: '5fe3481bcfbb24e5d3c044aa',
            category: 'rede',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'danger',
        },
        {
            id: '5fe3481ba70a591ac359fb48',
            category: 'hardware',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'fine',
        },
        {
            id: '5fe3481b82b310ed784386d2',
            category: 'outros',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'fine',
        },
        {
            id: '5fe3481b005a97bfeaf40ea5',
            category: 'software',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'warning',
        },
        {
            id: '5fe3481b8bbc679da1c0344a',
            category: 'rede',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'warning',
        },
        {
            id: '5fe3481b5711e252ccc956cf',
            category: 'plataforma',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'danger',
        },
        {
            id: '5fe3481b098b3c78122091d0',
            category: 'rede',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'fine',
        },
        {
            id: '5fe3481b573ca9fd3ac80a7c',
            category: 'hardware',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'danger',
        },
        {
            id: '5fe3481b46ffed81c65906c0',
            category: 'rede',
            description: 'Descrição breve do chamado',
            ended: false,
            status: 'warning',
        },
    ];

    return (
        <>
            <Wrapper>
                <Header>
                    <Title>Tickets</Title>
                    <Filters>
                        <Filter>Rede</Filter>
                        <Filter>Hardware</Filter>
                        <Filter>Software</Filter>
                        <Filter>Plataforma</Filter>
                        <Filter>Outros</Filter>
                    </Filters>
                </Header>
                <ElementList>
                    {data.length > 0
                        ? data.map((element) => (
                              <Element key={element.id}>
                                  <Row primary={true}>
                                      <Value>{element.description}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Categoria: </Label>
                                      <Value>{element.category}</Value>
                                  </Row>
                                  <TicketStatus type={element.status} />
                              </Element>
                          ))
                        : null}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
