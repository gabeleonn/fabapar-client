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
import useForm from '../../hooks/useForm';

const Users = () => {
    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    const [modalEdit, setModalEdit] = useState(false);
    const [editForm, handleChangeEditForm] = useState({
        code: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        department_id: '1',
        branch: '',
    });

    const [addForm, handleChangeAddForm] = useForm({
        code: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'NORMAL',
        department_id: '1',
        branch: '',
    });

    useEffect(() => {
        refreshData();
        const handleSearch = () => {
            if (search === '') {
                setSearchMode(false);
            } else {
                setSearchMode(true);
            }
        };
        handleSearch();
    }, [search]);

    const refreshData = () => {
        api.get('users').then((response) => {
            setData(response.data);
        });
    };

    const modalAddNew = () => {
        setAddNew(!addNew);
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleNew = async (e) => {
        modalAddNew(!addNew);
        await api.post('users', addForm);
        refreshData();
        handleChangeAddForm();
    };

    const handlemodalEdit = (item) => {
        const {
            code,
            email,
            branch,
            department_id,
            firstname,
            lastname,
        } = item;
        handleChangeEditForm({
            code,
            password: '',
            email,
            branch,
            department_id,
            firstname,
            lastname,
        });
        console.log(editForm);
        setModalEdit(!modalEdit);
    };

    const handleEdit = async (code) => {
        setModalEdit(!modalEdit);
        await api.patch(`users/${code}`, editForm);
        refreshData();
    };

    const handleDelete = async (code) => {
        setModalEdit(!modalEdit);
        await api.delete(`users/${code}`);
        refreshData();
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
                        <Input
                            type="text"
                            placeholder="Matrícula"
                            name="code"
                            value={addForm.code}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Nome"
                            name="firstname"
                            value={addForm.firstname}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Sobrenome"
                            name="lastname"
                            value={addForm.lastname}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Ramal"
                            maxLength={4}
                            name="branch"
                            value={addForm.branch}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={addForm.email}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="password"
                            placeholder="Senha"
                            name="password"
                            value={addForm.password}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Select
                            name="role"
                            value={addForm.role}
                            onChange={(e) => handleChangeAddForm(e)}
                        >
                            <Option value="SUPER">Administrador</Option>
                            <Option value="ADMIN">Liderança</Option>
                            <Option value="NORMAL">Funcionário</Option>
                        </Select>
                        <Select
                            name="department_id"
                            value={addForm.department_id}
                            onChange={(e) => handleChangeAddForm(e)}
                        >
                            <Option value="1">NTI</Option>
                            <Option value="2">RH</Option>
                        </Select>
                        <Button type="button" onClick={handleNew}>
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={modalEdit} toggleShow={handlemodalEdit}>
                    <Title>Editar Usuário</Title>
                    {editForm.firstname}
                    <Input
                        type="text"
                        placeholder="Nome"
                        name="firstname"
                        value={editForm.firstname}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Input
                        type="text"
                        placeholder="Sobrenome"
                        name="lastname"
                        value={editForm.lastname}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Input
                        type="text"
                        placeholder="Ramal"
                        name="branch"
                        value={editForm.branch}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={editForm.email}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Input
                        type="password"
                        placeholder="Nova senha"
                        name="password"
                        value={editForm.password}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Select
                        name="department_id"
                        value={editForm.department_id}
                        onChange={(e) => handleChangeEditForm(e)}
                    >
                        <Option value="1">NTI</Option>
                    </Select>
                    <FormRow>
                        <Button
                            type="button"
                            onClick={() => handleEdit(editForm.code)}
                        >
                            Salvar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDelete(editForm.code)}
                        >
                            Excluir
                        </Button>
                    </FormRow>
                </Modal>
                <ElementList>
                    {data.length > 0 && !searchMode
                        ? data.map((element) => (
                              <Element
                                  key={element.code}
                                  onClick={() => handlemodalEdit(element)}
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
                          ))
                        : data
                              .filter(
                                  (element) =>
                                      element.firstname.match(
                                          new RegExp(search, 'i')
                                      ) !== null ||
                                      element.lastname.match(
                                          new RegExp(search, 'i')
                                      ) !== null ||
                                      element.email.match(
                                          new RegExp(search, 'i')
                                      ) !== null ||
                                      element.code
                                          .toString()
                                          .match(new RegExp(search, 'i')) !==
                                          null
                              )
                              .map((element) => (
                                  <Element
                                      key={element.code}
                                      onClick={() => handlemodalEdit(element)}
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
                              ))}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default Users;
