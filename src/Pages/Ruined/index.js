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
            id: '0002',
            item: 'Nome do item',
            person: 'John Doe',
            status: 'Mal uso',
        },
        {
            id: '0003',
            item: 'Nome do item',
            person: 'Jane Smith',
            status: 'Outros',
        },
        {
            id: '0004',
            item: 'Nome do item',
            person: 'Mark Williams',
            status: 'Outros',
        },
        {
            id: '0005',
            item: 'Nome do item',
            person: 'Gabriel Leon',
            status: 'Mal uso',
        },
        {
            id: '0006',
            item: 'Nome do item',
            person: 'Juan Carlos',
            status: 'Tempo',
        },
        {
            id: '0007',
            item: 'Nome do item',
            person: 'John Doe',
            status: 'Mal uso',
        },
    ];

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Descartados</Title>
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
