import React, { useEffect, useRef, useState } from 'react';
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
    Hr,
    ButtonWrapper,
} from '../OtherElements';

import { api, enums } from '../../services';
import useForm from '../../hooks/useForm';

const Users = () => {
    const addNewFocus = useRef();
    const editFocus = useRef();

    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    const [modalEdit, setModalEdit] = useState(false);
    const [editForm, handleChangeEditForm] = useForm({
        code: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        department: enums.department.default,
        branch: '',
    });

    const [addForm, handleChangeAddForm] = useForm({
        code: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: enums.roles.default,
        department: enums.department.default,
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
        addNewFocus.current.focus();
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleNew = async (e) => {
        modalAddNew(!addNew);
        await api.post('users', addForm);
        refreshData();
        handleChangeAddForm({
            code: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            role: enums.roles.default,
            department: enums.department.default,
            branch: '',
        });
    };

    const handlemodalEdit = (item) => {
        const { code, email, branch, department, firstname, lastname } = item;
        handleChangeEditForm({
            code,
            password: '',
            email,
            branch,
            department,
            firstname,
            lastname,
        });
        setModalEdit(!modalEdit);
        editFocus.current.focus();
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
                        <ButtonWrapper onClick={modalAddNew}>
                            <AddButton />
                            <span>Adicionar usuário</span>
                        </ButtonWrapper>
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
                            ref={addNewFocus}
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
                            {enums.roles.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element === 'ADMIN' && 'Lider'}
                                    {element === 'SUPER' && 'Administrador'}
                                    {element === 'NORMAL' && 'Funcionário'}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            name="department"
                            value={addForm.department}
                            onChange={(e) => handleChangeAddForm(e)}
                        >
                            {enums.department.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element}
                                </Option>
                            ))}
                        </Select>
                        <Button type="button" onClick={handleNew}>
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={modalEdit} toggleShow={setModalEdit}>
                    <Title>Editar Usuário</Title>
                    <Input
                        type="text"
                        ref={editFocus}
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
                        name="department"
                        value={editForm.department}
                        onChange={(e) => handleChangeEditForm(e)}
                    >
                        {enums.department.enum.map((element) => (
                            <Option key={element} value={element}>
                                {element}
                            </Option>
                        ))}
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
                                  status={false}
                              >
                                  <Row primary={true}>
                                      <Value>{`${element.firstname} ${element.lastname} | ${element.department}`}</Value>
                                  </Row>
                                  <Hr />
                                  <Row>
                                      <Label>Ramal: </Label>
                                      <Value>{element.branch}</Value>
                                  </Row>
                                  <Row>
                                      <Label>email: </Label>
                                      <Value>{element.email}</Value>
                                  </Row>
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
                                      status={false}
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
