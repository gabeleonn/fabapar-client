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
    AddButton,
    SearchBar,
    SearchInput,
    Head,
    Input,
    Select,
    Button,
    Option,
    TextArea,
    FormRow,
} from '../OtherElements';

import { TicketStatus } from './TicketElements';

import Modal from '../../Components/Modal';

const Loans = () => {
    const [addNew, setAddNew] = useState(false);

    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({});

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

    const handleNewTicket = (e) => {
        console.log(e);
    };

    const handleEditMode = (item) => {
        setEditForm({ ...item });
        setEditMode(!editMode);
    };

    const handleEditTicket = (item) => {
        // It will be in the editForm
        console.log(item);
    };

    const handleDeleteTicket = (id) => {
        //id will come
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Tickets</Title>
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
                    <Modal show={addNew} toggleShow={handleAddNew}>
                        <Title>Adicionar Ticket</Title>
                        <Input type="text" placeholder="Descrição curta" />
                        <TextArea placeholder="Descrição detalhada" />
                        <Select>
                            <Option value="rede">Rede</Option>
                            <Option value="Hardware">Hardware</Option>
                        </Select>
                        <Button
                            type="button"
                            onClick={(e) => handleNewTicket(e)}
                        >
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={editMode} toggleShow={handleEditMode}>
                    <Title>Editar Ticket</Title>
                    <Input type="text" placeholder="Descrição curta" />
                    <TextArea placeholder="Descrição detalhada" />
                    <Select>
                        <Option value="rede">Rede</Option>
                        <Option value="Hardware">Hardware</Option>
                    </Select>
                    <FormRow>
                        <Button
                            type="button"
                            onClick={() => handleEditTicket(editForm)}
                        >
                            Editar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDeleteTicket(editForm.id)}
                        >
                            Excluir
                        </Button>
                    </FormRow>
                </Modal>
                <ElementList>
                    {data.length > 0 && !searchMode
                        ? data.map((element) => (
                              <Element
                                  key={element.id}
                                  onClick={() => handleEditMode(element)}
                              >
                                  <Row primary={true}>
                                      <Value>{element.description}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Categoria: </Label>
                                      <Value>{element.category}</Value>
                                  </Row>
                                  <TicketStatus type={element.status}>
                                      {element.status === 'danger'
                                          ? 'Atrasado'
                                          : null}
                                      {element.status === 'warning'
                                          ? 'Parado'
                                          : null}
                                      {element.status === 'fine' ? 'OK' : null}
                                  </TicketStatus>
                              </Element>
                          ))
                        : data
                              .filter(
                                  (element) =>
                                      element.category.match(
                                          new RegExp(search, 'i')
                                      ) !== null
                              )
                              .map((element) => (
                                  <Element key={element.id}>
                                      <Row primary={true}>
                                          <Value>{element.description}</Value>
                                      </Row>
                                      <Row>
                                          <Label>Categoria: </Label>
                                          <Value>{element.category}</Value>
                                      </Row>
                                      <TicketStatus type={element.status}>
                                          {element.status === 'danger'
                                              ? 'Atrasado'
                                              : null}
                                          {element.status === 'warning'
                                              ? 'Parado'
                                              : null}
                                          {element.status === 'fine'
                                              ? 'OK'
                                              : null}
                                      </TicketStatus>
                                  </Element>
                              ))}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Loans;
