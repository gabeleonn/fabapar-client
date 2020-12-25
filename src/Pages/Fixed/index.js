import React, { useEffect, useState } from 'react';

import {
    Wrapper,
    Header,
    Title,
    ElementList,
    Element,
    Row,
    Label,
    Value,
    Status,
    AddButton,
    Head,
    SearchBar,
    SearchInput,
} from '../OtherElements';

const Loans = () => {
    const [addNew, setAddNew] = useState(false);
    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const handleSearch = () => {
            if (search === '') {
                setSearchMode(false);
            } else {
                setSearchMode(true);
            }
        };
        handleSearch();
    }, [search]);

    const handleAddNew = () => {
        setAddNew(!addNew);
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const data = [
        {
            id: '0001',
            item: 'Nome do item',
            person: 'John Doe',
            department: 'Marketing',
        },
        {
            id: '0002',
            item: 'Nome do item',
            person: 'Jane Smith',
            department: 'RH',
        },
        {
            id: '0003',
            item: 'Nome do item',
            person: 'Mark Williams',
            department: 'Financeiro',
        },
        {
            id: '0004',
            item: 'Nome do item',
            person: 'Gabriel Leon',
            department: 'Financeiro',
        },
        {
            id: '0005',
            item: 'Nome do item',
            person: 'Juan Carlos',
            department: 'RH',
        },
        {
            id: '0006',
            item: 'Nome do item',
            person: 'John Doe',
            department: 'Marketing',
        },
    ];

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Itens Fixos</Title>
                        <AddButton onClick={handleAddNew} />
                    </Head>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Pesquisa"
                        />
                    </SearchBar>
                </Header>
                <ElementList>
                    {data.length > 0 && !searchMode
                        ? data.map((element) => (
                              <Element key={element.id}>
                                  <Row primary={true}>
                                      <Value>{element.item}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Pessoa: </Label>
                                      <Value>{element.person}</Value>
                                  </Row>
                                  <Status>{element.department}</Status>
                              </Element>
                          ))
                        : data
                              .filter((element) => {
                                  let c = new RegExp(search, 'i');
                                  if (element.person.match(c) !== null) {
                                      return element;
                                  } else if (element.item.match(c) !== null) {
                                      return element;
                                  }
                              })
                              .map((element) => (
                                  <Element key={element.id}>
                                      <Row primary={true}>
                                          <Value>{element.item}</Value>
                                      </Row>
                                      <Row>
                                          <Label>Pessoa: </Label>
                                          <Value>{element.person}</Value>
                                      </Row>
                                      <Status>{element.department}</Status>
                                  </Element>
                              ))}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
