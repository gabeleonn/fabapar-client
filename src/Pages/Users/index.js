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
    SearchBar,
    SearchInput,
    Head,
} from '../OtherElements';

const Loans = () => {
    const data = [
        { id: '2041', branch: '2357', name: 'Gabriel Leon', department: 'NTI' },
        { id: '0001', branch: '0001', name: 'John Doe', department: 'RH' },
        {
            id: '0002',
            branch: '0002',
            name: 'Jane Doe',
            department: 'Financeiro',
        },
        {
            id: '0003',
            branch: '0003',
            name: 'Mark Smith',
            department: 'Marketing',
        },
        {
            id: '0004',
            branch: '0004',
            name: 'Paul Williams',
            department: 'NTI',
        },
    ];

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Usuários</Title>
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
                                      <Value>{element.name}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Ramal: </Label>
                                      <Value>{element.branch}</Value>
                                  </Row>
                                  <Status>{element.department}</Status>
                              </Element>
                          ))
                        : null}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
