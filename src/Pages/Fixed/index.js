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
} from '../OtherElements';

import { api, enums } from '../../services';
import useForm from '../../hooks/useForm';
import Modal from '../../Components/Modal';

const FixedItems = () => {
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
        brand: '',
        type: '',
        category: enums.categories.default,
        status: enums.status.default,
        warranty: '',
        details: '',
        maintainer: '',
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
        api.get('equipments/fixo').then((response) => {
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
        await api.post('equipments', form);
        refreshData();
        handleChangeAddForm({
            brand: '',
            type: '',
            category: enums.categories.default,
            status: enums.status.default,
            warranty: '',
            details: '',
            maintainer: '',
        });
    };

    function FormataStringData(data) {
        let date = new Date(data);
        var dia = date.getDate();
        var mes = date.getMonth();
        var ano = date.getFullYear();
        let str =
            ano +
            '-' +
            ('0' + (mes + 1)).slice(-2) +
            '-' +
            ('0' + (dia + 1)).slice(-2);
        return str;
    }

    const handlemodalEdit = (item) => {
        const { brand, type, category, status, maintenances } = item;
        handleChangeEditForm({
            brand,
            type,
            category,
            status,
            details: maintenances[maintenances.length - 1].details,
            maintainer: maintenances[maintenances.length - 1].maintainer,
            warranty: FormataStringData(
                maintenances[maintenances.length - 1].warranty
            ),
        });
        setModalEdit(!modalEdit);
        editFocus.current.focus();
    };

    const handleEdit = async (code) => {
        setModalEdit(!modalEdit);
        await api.patch(`equipments/${code}`, editForm);
        refreshData();
    };

    const handleDelete = async (id) => {
        setModalEdit(!modalEdit);
        await api.delete(`equipments/${id}`);
        refreshData();
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
                    <Modal show={addNew} toggleShow={modalAddNew}>
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
                <Modal show={modalEdit} toggleShow={setModalEdit}>
                    <Title>Editar Item</Title>
                    <Input
                        type="text"
                        placeholder="Marca"
                        name="brand"
                        ref={editFocus}
                        value={editForm.brand}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Input
                        type="text"
                        placeholder="Tipo (ex: teclado, mouse...)"
                        name="type"
                        value={editForm.type}
                        onChange={(e) => handleChangeEditForm(e)}
                    />
                    <Select
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
                    <Select
                        name="category"
                        value={editForm.category}
                        onChange={(e) => handleChangeEditForm(e)}
                    >
                        {enums.categories.enum.map((element) => (
                            <Option key={element} value={element}>
                                {element.toLowerCase()}
                            </Option>
                        ))}
                    </Select>
                    <SubTitle>Última Manutenção</SubTitle>
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
                              >
                                  <Row primary={true}>
                                      <Value>{element.description}</Value>
                                  </Row>
                                  <Row>
                                      <Label>Pessoa: </Label>
                                      <Value>{element.person}</Value>
                                  </Row>
                                  <Status>{element.department}</Status>
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
                                  >
                                      <Row primary={true}>
                                          <Value>{element.description}</Value>
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

export default FixedItems;
