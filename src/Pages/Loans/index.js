import React from 'react';

import {
    Wrapper,
    Header,
    Title,
    AddButton,
    ElementList,
    Element,
    Row,
    Label,
    Value,
    Status,
    Head,
    SearchBar,
    SearchInput,
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
                    <Head>
                        <Title>Empréstimos</Title>
                        <AddButton />
                    </Head>
                    <SearchBar>
                        <SearchInput type="text" placeholder="Pesquisa" />
                    </SearchBar>
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
