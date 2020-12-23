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
    Status,
} from '../OtherElements';

const Loans = () => {
    const data = [
        {
            id: '0001',
            item: 'Nome do item',
            person: 'John Doe',
            status: 'Em uso',
        },
        {
            id: '0002',
            item: 'Nome do item',
            person: 'Jane Smith',
            status: 'Em uso',
        },
        {
            id: '0003',
            item: 'Nome do item',
            person: 'Mark Williams',
            status: 'Em uso',
        },
        {
            id: '0004',
            item: 'Nome do item',
            person: 'Gabriel Leon',
            status: 'Em uso',
        },
        {
            id: '0005',
            item: 'Nome do item',
            person: 'Juan Carlos',
            status: 'Disponível',
        },
        {
            id: '0006',
            item: 'Nome do item',
            person: 'John Doe',
            status: 'Em uso',
        },
    ];

    return (
        <>
            <Wrapper>
                <Header>
                    <Title>Empréstimos</Title>
                    <Filters>
                        <Filter>Em uso</Filter>
                        <Filter>Disponível</Filter>
                        <Filter>Filtro 3</Filter>
                        <Filter>Filtro 4</Filter>
                        <Filter>Filtro 5</Filter>
                    </Filters>
                </Header>
                <ElementList>
                    {data.length > 0
                        ? data.map((element) => (
                              <Element key={element.id}>
                                  <Row primary={true}>
                                      <Value>{element.item}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Pessoa: </Label>
                                      <Value>{element.person}</Value>
                                  </Row>
                                  <Status>{element.status}</Status>
                              </Element>
                          ))
                        : null}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
