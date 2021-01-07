import React, { useEffect, useState } from 'react';
import Modal from '../../Components/Modal';

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
    Input,
    Select,
    Option,
    Button,
    FormRow,
} from '../OtherElements';

import api from '../../services';

const Users = () => {
    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        api.get('users').then((response) => {
            setData(response.data);
        });
        const handleSearch = () => {
            if (search === '') {
                setSearchMode(false);
            } else {
                setSearchMode(true);
            }
        };
        handleSearch();
    }, [search]);

    const handleData = async () => {
        let users = await api.get('users');
        setData(users);
    };

    const modalAddNew = () => {
        setAddNew(!addNew);
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleNew = (e) => {
        modalAddNew(!addNew);
        console.log(e);
    };

    const handleEditMode = (item) => {
        setEditForm({ ...item });
        setEditMode(!editMode);
    };

    const handleEdit = (item) => {
        // It will be in the editForm
        console.log(item);
    };

    const handleDelete = (id) => {
        //id will come
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Usuários</Title>
                        <AddButton onClick={modalAddNew} />
                    </Head>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Pesquisa"
                        />
                    </SearchBar>
                    <Modal show={addNew} toggleShow={modalAddNew}>
                        <Title>Adicionar Usuário</Title>
                        <Input type="text" placeholder="Nome" />
                        <Input type="text" placeholder="Sobrenome" />
                        <Input type="text" placeholder="Ramal" />
                        <Input type="text" placeholder="E-mail" />
                        <Select>
                            <Option value="SUPER">Administrador</Option>
                            <Option value="ADMIN">Liderança</Option>
                            <Option value="NORMAL">Funcionário</Option>
                        </Select>
                        <Select>
                            <Option value="1">NTI</Option>
                        </Select>
                        <Button type="button" onClick={(e) => handleNew(e)}>
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={editMode} toggleShow={handleEditMode}>
                    <Title>Editar Usuário</Title>
                    <Input type="text" placeholder="Nome" />
                    <Input type="text" placeholder="Sobrenome" />
                    <Input type="text" placeholder="Ramal" />
                    <Input type="text" placeholder="E-mail" />
                    <Select>
                        <Option value="SUPER">Administrador</Option>
                        <Option value="ADMIN">Liderança</Option>
                        <Option value="NORMAL">Funcionário</Option>
                    </Select>
                    <Select>
                        <Option value="1">NTI</Option>
                    </Select>
                    <FormRow>
                        <Button
                            type="button"
                            onClick={() => handleEdit(editForm)}
                        >
                            Editar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDelete(editForm.id)}
                        >
                            Excluir
                        </Button>
                    </FormRow>
                </Modal>
                <ElementList>
                    {data.length > 0 && !searchMode
                        ? data.map((element) => {
                              return (
                                  <Element
                                      key={element.code}
                                      onClick={() => handleEditMode(element)}
                                  >
                                      <Row primary={true}>
                                          <Value>{`${element.firstname} ${element.lastname}`}</Value>
                                      </Row>
                                      <Row>
                                          <Label>Ramal: </Label>
                                          <Value>{element.branch}</Value>
                                      </Row>
                                      <Status>{element.department.name}</Status>
                                  </Element>
                              );
                          })
                        : data
                              .filter(
                                  (element) =>
                                      element.id.match(
                                          new RegExp(search, 'i')
                                      ) !== null ||
                                      element.name.match(
                                          new RegExp(search, 'i')
                                      ) !== null
                              )
                              .map((element) => (
                                  <Element
                                      key={element.id}
                                      onClick={() => handleEditMode(element)}
                                  >
                                      <Row primary={true}>
                                          <Value>{element.name}</Value>
                                      </Row>
                                      <Row>
                                          <Label>Ramal: </Label>
                                          <Value>{element.branch}</Value>
                                      </Row>
                                      <Status>{element.department}</Status>
                                  </Element>
                              ))}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Users;
