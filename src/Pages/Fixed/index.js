import React, { useEffect, useRef, useState } from 'react';

import {
    Wrapper,
    Header,
    Title,
    ElementList,
    Element,
    Row,
    Label,
    LabelS,
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
    ButtonWrapper,
    AuxiliaryButtons,
    FilterOption,
    UploadFile,
} from '../OtherElements';

import SelectComponent from '../../Components/SearchableSelect';

import { FaPaperclip } from 'react-icons/fa';

import { api, enums } from '../../services';
import useForm from '../../hooks/useForm';
import Modal from '../../Components/Modal';

import moment from 'moment';
import 'moment/locale/pt-br';
import { useAuth } from '../../context/AuthContext';

const FixedItems = () => {
    const addNewFocus = useRef();
    const editFocus = useRef();

    const { token } = useAuth();

    const [status, updateStatus] = useState(enums.status.default);

    const [usersEnum, setUsersEnum] = useState([]);

    const [upload, setUpload] = useState({ file: {}, term: {} });

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
        status,
        warranty: '',
        details: '',
        maintainer: '',
        price: '',
    });

    useEffect(() => {
        let headers = { authorization: `Bearer ${token}` };
        api.get('equipments/', { headers }).then((response) => {
            setData(response.data);
        });
        api.get('users/enum', { headers }).then((response) => {
            setUsersEnum(response.data);
        });
    }, [token]);

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

    const refreshEnums = () => {
        let headers = { authorization: `Bearer ${token}` };
        api.get('users/enum', { headers }).then((response) => {
            setUsersEnum(response.data);
        });
    };

    const getNewData = () => {
        let headers = { authorization: `Bearer ${token}` };
        api.get('equipments', { headers }).then((response) => {
            setData(response.data);
        });
    };

    const modalAddNew = async () => {
        await refreshEnums();
        setAddNew(!addNew);
        handleChangeAddForm({
            brand: '',
            user_id: '2041',
            type: '',
            specs: '',
            category: enums.categories.default,
            status,
            warranty: '',
            details: '',
            maintainer: '',
            price: '',
        });
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
        formData.append('term', upload.term);
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
                authorization: `Bearer ${token}`,
            },
        };

        await api.post('equipments', formData, config);
        getNewData();
        handleChangeAddForm({
            brand: '',
            user_id: '2041',
            type: '',
            specs: '',
            category: enums.categories.default,
            status,
            warranty: '',
            details: '',
            maintainer: '',
            price: 0.0,
        });
        setUpload({ file: {}, term: {} });
    };

    const handlemodalEdit = (item) => {
        refreshEnums();
        const { status, specs, user_id, id, description, user, file } = item;
        handleChangeEditForm({
            ...editForm,
            id,
            description,
            department: user !== null ? user.department : 'Disponível',
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
        let headers = { authorization: `Bearer ${token}` };
        let formData = new FormData();
        formData.append('file', upload.file);
        formData.append('term', upload.term);
        formData.append('status', editForm.status);
        formData.append('user_id', editForm.user_id);
        if(editForm.status === 'MANUTENÇÃO') {
            formData.append('details', editForm.details);
            formData.append('warranty', editForm.warranty);
            formData.append('maintainer', editForm.maintainer);
        }

        await api.patch(`equipments/${id}`, formData, { headers });
        getNewData();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluír o item?')) {
            setModalEdit(!modalEdit);
            let headers = { authorization: `Bearer ${token}` };
            await api.delete(`equipments/${id}`, { headers });
            updateStatus(status);
            getNewData();
        }
    };

    const handleAddSelect = (user) => {
        handleChangeAddForm({
            ...addForm,
            user_id: user.code,
        });
    };

    const handleEditSelect = (user) => {
        handleChangeEditForm({
            ...editForm,
            user_id: user.code,
        });
    };

    const handleFilter = (element) => {
        if (element.id === null) {
            return false;
        } else {
            if (element.user !== null) {
                return (
                    (element.id.toString().match(new RegExp(search, 'i')) !==
                        null ||
                        element.description.match(new RegExp(search, 'i')) !==
                            null ||
                        element.user.department.match(
                            new RegExp(search, 'i')
                        ) !== null) &&
                    element.status === status
                );
            } else {
                return (
                    (element.id.toString().match(new RegExp(search, 'i')) !==
                        null ||
                        element.description.match(new RegExp(search, 'i')) !==
                            null) &&
                    element.status === status
                );
            }
        }
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Equipamentos</Title>
                        <ButtonWrapper onClick={modalAddNew}>
                            <AddButton />
                            <span>Adicionar item</span>
                        </ButtonWrapper>
                    </Head>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Filtre por departamento ou por item"
                        />
                    </SearchBar>
                    <Hr light={true} />
                    <AuxiliaryButtons>
                        <FilterOption
                            className={status === 'FIXO' ? 'active' : null}
                            onClick={() => updateStatus('FIXO')}
                        >
                            Fixo
                        </FilterOption>
                        <FilterOption
                            className={
                                status === 'EMPRESTADO' ? 'active' : null
                            }
                            onClick={() => updateStatus('EMPRESTADO')}
                        >
                            Emprestado
                        </FilterOption>
                        <FilterOption
                            className={
                                status === 'DISPONÍVEL' ? 'active' : null
                            }
                            onClick={() => updateStatus('DISPONÍVEL')}
                        >
                            Disponível
                        </FilterOption>
                        <FilterOption
                            className={
                                status === 'MANUTENÇÃO' ? 'active' : null
                            }
                            onClick={() => updateStatus('MANUTENÇÃO')}
                        >
                            Manutenção
                        </FilterOption>
                        <FilterOption
                            className={
                                status === 'DESCARTADO' ? 'active' : null
                            }
                            onClick={() => updateStatus('DESCARTADO')}
                        >
                            Descartado
                        </FilterOption>
                    </AuxiliaryButtons>
                    <Modal show={addNew} height="90vh" toggleShow={modalAddNew}>
                        <Title>Adicionar Item</Title>
                        <Label htmlFor="brand-new">Marca</Label>
                        <Input
                            id="brand-new"
                            type="text"
                            placeholder="Marca"
                            name="brand"
                            ref={addNewFocus}
                            value={addForm.brand}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Label htmlFor="type-new">Tipo</Label>
                        <Input
                            id="type-new"
                            type="text"
                            placeholder="Tipo (ex: teclado, mouse...)"
                            name="type"
                            value={addForm.type}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Label htmlFor="specs-new">Especificações</Label>
                        <Input
                            id="specs-new"
                            type="text"
                            placeholder="Informações extras. (ex: cor, processador...)"
                            name="specs"
                            value={addForm.specs}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Label htmlFor="status-new">Status</Label>
                        <Select
                            id="status-new"
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
                        <Label htmlFor="category-new">Categoria</Label>
                        <Select
                            id="category-new"
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
                            <>
                                <Label htmlFor="user-new">Usuário</Label>
                                <SelectComponent
                                    type="user"
                                    data={usersEnum}
                                    handleSelect={handleAddSelect}
                                />
                                <UploadFile
                                    type="file"
                                    description="term"
                                    className="custom-file-input"
                                    name="term"
                                    onChange={(e) =>
                                        setUpload({
                                            ...upload,
                                            term: e.target.files[0],
                                        })
                                    }
                                />
                            </>
                        ) : null}
                        <UploadFile
                            type="file"
                            description="file"
                            className="custom-file-input"
                            name="file"
                            onChange={(e) =>
                                setUpload({
                                    ...upload,
                                    file: e.target.files[0],
                                })
                            }
                        />

                        <Label htmlFor="price-new">Preço pago</Label>
                        <Input
                            id="price-new"
                            type="number"
                            placeholder="Preço pago"
                            name="price"
                            value={addForm.price}
                            onChange={(e) => handleChangeAddForm(e)}
                        />
                        <Button type="button" onClick={handleNew}>
                            Adicionar
                        </Button>
                    </Modal>
                </Header>
                <Modal show={modalEdit} height="auto" toggleShow={setModalEdit}>
                    <SubTitle>{editForm.description}</SubTitle>

                    <Description>
                        {editForm.department} &nbsp;&nbsp;| {
                        !!editForm.file &&
                        <Icon
                            target="_blank"
                            rel="noreferrer"
                            href={`http://192.168.0.43:8080/${editForm.file}`}
                        >
                            <FaPaperclip />
                            Nota fiscal
                        </Icon>}
                    </Description>
                    <Label htmlFor="status-edit">Status</Label>
                    <Select
                        id="status-edit"
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
                    <UploadFile
                            type="file"
                            description="file"
                            className="custom-file-input"
                            name="file"
                            onChange={(e) =>
                                setUpload({
                                    ...upload,
                                    file: e.target.files[0],
                                })
                            }
                        />
                    {editForm.status === 'EMPRESTADO' ||
                    editForm.status === 'FIXO' ? (
                        <>
                            <Label htmlFor="user-edit">Usuário</Label>
                            <SelectComponent
                                id="user-edit"
                                data={usersEnum}
                                type="user"
                                handleSelect={handleEditSelect}
                                defaultValue={editForm.user_id}
                            />
                            <UploadFile
                                    type="file"
                                    description="term"
                                    className="custom-file-input"
                                    name="term"
                                    onChange={(e) =>
                                        setUpload({
                                            ...upload,
                                            term: e.target.files[0],
                                        })
                                    }
                                />
                        </>
                    ) : null}
                    {status === 'MANUTENÇÃO' ? (
                        <>
                            <SubTitle>Adicionar Manutenção</SubTitle>
                            <Label htmlFor="details-edit">Detalhes</Label>
                            <TextArea
                                id="details-edit"
                                placeholder="Observações"
                                name="details"
                                value={editForm.details}
                                onChange={(e) => handleChangeEditForm(e)}
                            />
                            <Label htmlFor="warranty-edit">
                                Data da Garantia
                            </Label>
                            <Input
                                id="warranty-edit"
                                type="date"
                                placeholder="Data de garantia"
                                name="warranty"
                                value={editForm.warranty}
                                onChange={(e) => handleChangeEditForm(e)}
                            />
                            <Label htmlFor="maintainer-edit">
                                Quem fez a manutenção
                            </Label>
                            <Input
                                id="maintainer-edit"
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
                        ? data
                              .filter(
                                  (element) =>
                                      element.status.match(
                                          new RegExp(status, 'i')
                                      ) !== null
                              )
                              .map((element) => {
                                  let {
                                      id,
                                      description,
                                      maintenances,
                                      user,
                                  } = element;

                                  return (
                                      <Element
                                          key={id}
                                          onClick={() =>
                                              handlemodalEdit(element)
                                          }
                                          status={true}
                                      >
                                          <Row primary={true}>
                                              <Value>{description}</Value>
                                          </Row>
                                          <Hr />
                                          {!!maintenances.length ? (
                                              <div className="small">
                                                  <LabelS>
                                                      Última Manutenção:
                                                      <br />
                                                  </LabelS>
                                                  <Value>
                                                      {maintenances
                                                          ? ` ${
                                                                maintenances &&
                                                                moment(
                                                                    maintenances[
                                                                        maintenances.length -
                                                                            1
                                                                    ].updatedAt
                                                                )
                                                                    .locale(
                                                                        'pt-br'
                                                                    )
                                                                    .format(
                                                                        'LLLL'
                                                                    )
                                                            } | ${
                                                                maintenances[
                                                                    maintenances.length -
                                                                        1
                                                                ].maintainer
                                                            }`
                                                          : null}
                                                  </Value>
                                              </div>
                                          ) : (
                                              <div className="small">
                                                  <LabelS>
                                                      Última Manutenção:
                                                      <br />
                                                  </LabelS>
                                                  <Value>
                                                      Não teve manutenção
                                                  </Value>
                                              </div>
                                          )}
                                          <Status>
                                              {user !== null
                                                  ? `${user.department} | ${user.firstname} ${user.lastname}`
                                                  : null}
                                          </Status>
                                      </Element>
                                  );
                              })
                        : data.length > 0
                        ? data
                              .filter((element) => handleFilter(element))
                              .map((element) => {
                                  let {
                                      id,
                                      description,
                                      maintenances,
                                      user,
                                  } = element;
                                  return (
                                      <Element
                                          key={id}
                                          onClick={() =>
                                              handlemodalEdit(element)
                                          }
                                          status={true}
                                      >
                                          <Row primary={true}>
                                              <Value>{description}</Value>
                                          </Row>
                                          <Hr />
                                          <Row>
                                              <LabelS>
                                                  Última Manutenção:
                                                  <br />
                                              </LabelS>
                                              <Value>
                                                  {maintenances
                                                      ? ` ${
                                                            maintenances &&
                                                            moment(
                                                                maintenances[
                                                                    maintenances.length -
                                                                        1
                                                                ].updatedAt
                                                            )
                                                                .locale('pt-br')
                                                                .format('LLLL')
                                                        } | ${
                                                            maintenances[
                                                                maintenances.length -
                                                                    1
                                                            ].maintainer
                                                        }`
                                                      : null}
                                              </Value>
                                          </Row>
                                          <Status>
                                              {user !== null
                                                  ? `${user.department} | ${user.firstname} ${user.lastname}`
                                                  : null}
                                          </Status>
                                      </Element>
                                  );
                              })
                        : null}
                </ElementList>
            </Wrapper>
        </>
    );
};

export default FixedItems;
