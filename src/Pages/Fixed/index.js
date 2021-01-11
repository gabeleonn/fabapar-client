import React, { useEffect, useRef, useState } from 'react';

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
    Button,
    FormRow,
    Select,
    Input,
    Option,
    TextArea,
    SubTitle,
    Description,
    Hr,
    Icon,
} from '../OtherElements';

import { FaPaperclip } from 'react-icons/fa';

import { api, enums } from '../../services';
import useForm from '../../hooks/useForm';
import Modal from '../../Components/Modal';

import moment from 'moment';
import 'moment/locale/pt-br';

const FixedItems = () => {
    const addNewFocus = useRef();
    const editFocus = useRef();

    const [usersEnum, setUsersEnum] = useState([]);

    const [upload, setUpload] = useState({ file: {} });

    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState([]);

    const [searchMode, setSearchMode] = useState(false);
    const [search, setSearch] = useState('');

    const [modalEdit, setModalEdit] = useState(false);
    const [editForm, handleChangeEditForm] = useForm({
        id: '',
        user_id: '2041',
        description: '',
        department: 'NTI',
        status: 'FIXO',
        warranty: '',
        details: '',
        maintainer: '',
    });

    const [addForm, handleChangeAddForm] = useForm({
        brand: '',
        user_id: '2041',
        type: '',
        specs: '',
        category: enums.categories.default,
        status: 'FIXO',
        warranty: '',
        details: '',
        maintainer: '',
        price: '',
    });

    useEffect(() => {
        refreshData();
        refreshEnums();
        const handleSearch = () => {
            if (search === '') {
                setSearchMode(false);
            } else {
                setSearchMode(true);
            }
        };
        handleSearch();
    }, [search]);

    const refreshEnums = () => {
        api.get('users/enum').then((response) => {
            setUsersEnum(response.data);
        });
    };

    const refreshData = () => {
        api.get('equipments/fixo').then((response) => {
            setData(response.data);
        });
    };

    const modalAddNew = async () => {
        await refreshEnums();
        setAddNew(!addNew);
        addNewFocus.current.focus();
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleNew = async (e) => {
        modalAddNew(!addNew);
        let form = { ...addForm };
        if (form.warranty !== '') {
            form = {
                ...form,
                maintenance: {
                    warranty: form.warranty,
                    maintainer: form.maintainer,
                    details: form.details,
                },
            };
        }
        delete form.warranty;
        delete form.maintainer;
        delete form.details;
        let formData = new FormData();

        formData.append('file', upload.file);
        formData.append('price', form.price);
        formData.append('brand', form.brand);
        formData.append('type', form.type);
        formData.append('specs', form.specs);
        formData.append('user_id', form.user_id);
        formData.append('category', form.category);
        formData.append('status', form.status);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        await api.post('equipments', formData, config);
        refreshData();
        handleChangeAddForm({
            id: '',
            brand: '',
            type: '',
            specs: '',
            user_id: '2041',
            category: enums.categories.default,
            status: 'FIXO',
            warranty: '',
            details: '',
            maintainer: '',
        });
    };

    const handlemodalEdit = (item) => {
        refreshEnums();
        const { status, specs, user_id, id, description, user, file } = item;
        handleChangeEditForm({
            ...editForm,
            id,
            description,
            department: user.department,
            user_id,
            status,
            specs,
            file,
        });
        setModalEdit(!modalEdit);
        editFocus.current.focus();
    };

    const handleEdit = async (id) => {
        setModalEdit(!modalEdit);
        await api.patch(`equipments/${id}`, editForm);
        setSearch('');
    };

    const handleDelete = async (id) => {
        setModalEdit(!modalEdit);
        await api.delete(`equipments/${id}`);
        setSearch('');
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Itens Fixos</Title>
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
                    <Modal show={addNew} height="90vh" toggleShow={modalAddNew}>
                        <Title>Adicionar Item</Title>
                        <Input
                            type="text"
                            placeholder="Marca"
                            name="brand"
                            ref={addNewFocus}
                            value={addForm.brand}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Tipo (ex: teclado, mouse...)"
                            name="type"
                            value={addForm.type}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Informações extras. (ex: cor, processador...)"
                            name="specs"
                            value={addForm.specs}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Select
                            name="status"
                            value={addForm.status}
                            onChange={(e) => handleChangeAddForm(e)}
                        >
                            {enums.status.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element.toLowerCase()}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            name="category"
                            value={addForm.category}
                            onChange={(e) => handleChangeAddForm(e)}
                        >
                            {enums.categories.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element.toLowerCase()}
                                </Option>
                            ))}
                        </Select>
                        {addForm.status === 'EMPRESTADO' ||
                        addForm.status === 'FIXO' ? (
                            <Select
                                name="user_id"
                                value={addForm.user_id}
                                onChange={(e) => handleChangeAddForm(e)}
                            >
                                {usersEnum.map((element) => (
                                    <Option
                                        key={element.code}
                                        value={element.code}
                                    >
                                        {`${element.firstname} ${element.lastname}`}
                                    </Option>
                                ))}
                            </Select>
                        ) : null}
                        <Input
                            type="file"
                            placeholder="Nota fiscal"
                            className="custom-file-input"
                            name="file"
                            onChange={(e) =>
                                setUpload({ file: e.target.files[0] })
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Preço pago"
                            name="price"
                            value={addForm.price}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <SubTitle>Última Manutenção</SubTitle>
                        <TextArea
                            placeholder="Observações"
                            name="details"
                            value={addForm.details}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="date"
                            placeholder="Data de garantia"
                            name="warranty"
                            value={addForm.warranty}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Input
                            type="text"
                            placeholder="Quem fez a manutenção?"
                            name="maintainer"
                            value={addForm.maintainer}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Button type="button" onClick={handleNew}>
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={modalEdit} height="auto" toggleShow={setModalEdit}>
                    <SubTitle>
                        <Icon
                            target="_blank"
                            rel="noreferrer"
                            href={`http://localhost:8080/${editForm.file}`}
                        >
                            <FaPaperclip />
                        </Icon>
                        {editForm.description}
                    </SubTitle>
                    <Description>{editForm.department}</Description>

                    <Select
                        ref={editFocus}
                        name="status"
                        value={editForm.status}
                        onChange={(e) => handleChangeEditForm(e)}
                    >
                        {enums.status.enum.map((element) => (
                            <Option key={element} value={element}>
                                {element.toLowerCase()}
                            </Option>
                        ))}
                    </Select>
                    {editForm.status === 'EMPRESTADO' ||
                    editForm.status === 'FIXO' ? (
                        <Select
                            name="user_id"
                            value={editForm.user_id}
                            onChange={(e) => handleChangeEditForm(e)}
                        >
                            {usersEnum.map((element) => (
                                <Option key={element.code} value={element.code}>
                                    {`${element.firstname} ${element.lastname}`}
                                </Option>
                            ))}
                        </Select>
                    ) : null}
                    {editForm.status === 'MANUTENÇÃO' ? (
                        <>
                            <SubTitle>Adicionar Manutenção</SubTitle>
                            <TextArea
                                placeholder="Observações"
                                name="details"
                                value={editForm.details}
                                onChange={(e) => handleChangeEditForm(e)}
                            />
                            <Input
                                type="date"
                                placeholder="Data de garantia"
                                name="warranty"
                                value={editForm.warranty}
                                onChange={(e) => handleChangeEditForm(e)}
                            />
                            <Input
                                type="text"
                                placeholder="Quem fez a manutenção?"
                                name="maintainer"
                                value={editForm.maintainer}
                                onChange={(e) => handleChangeEditForm(e)}
                            />
                        </>
                    ) : null}
                    <FormRow>
                        <Button
                            type="button"
                            onClick={() => handleEdit(editForm.id)}
                        >
                            Salvar
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
                        ? data.map((element) => (
                              <Element
                                  key={element.id}
                                  onClick={() => handlemodalEdit(element)}
                                  status={true}
                              >
                                  <Row primary={true}>
                                      <Value>{element.description}</Value>
                                  </Row>
                                  <Hr />
                                  <Row>
                                      <Label>
                                          Última Manutenção:
                                          <br />
                                      </Label>
                                      <Value>
                                          {element.maintenances
                                              ? ` ${
                                                    element.maintenances &&
                                                    moment(
                                                        element.maintenances[
                                                            element.maintenances
                                                                .length - 1
                                                        ].updatedAt
                                                    )
                                                        .locale('pt-br')
                                                        .format('LLLL')
                                                } | ${
                                                    element.maintenances[
                                                        element.maintenances
                                                            .length - 1
                                                    ].maintainer
                                                }`
                                              : null}
                                      </Value>
                                  </Row>
                                  <Status>
                                      {element.user
                                          ? `${element.user.department} | ${element.user.firstname} ${element.user.lastname}`
                                          : null}
                                  </Status>
                              </Element>
                          ))
                        : data
                              .filter(
                                  (element) =>
                                      element.id
                                          .toString()
                                          .match(new RegExp(search, 'i')) !==
                                          null ||
                                      element.description.match(
                                          new RegExp(search, 'i')
                                      ) !== null
                              )
                              .map((element) => (
                                  <Element
                                      key={element.id}
                                      onClick={() => handlemodalEdit(element)}
                                      status={true}
                                  >
                                      <Row primary={true}>
                                          <Value>{element.description}</Value>
                                      </Row>
                                      <Row>
                                          <Label>Última Manutenção:</Label>
                                          <Value>{` ${moment(
                                              element.maintenances[
                                                  element.maintenances.length -
                                                      1
                                              ].updatedAt
                                          )
                                              .locale('pt-br')
                                              .format('LLLL')} | ${
                                              element.maintenances[
                                                  element.maintenances.length -
                                                      1
                                              ].maintainer
                                          }`}</Value>
                                      </Row>
                                      <Status>{element.department}</Status>
                                  </Element>
                              ))}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default FixedItems;
