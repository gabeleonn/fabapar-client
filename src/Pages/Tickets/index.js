import React, { useEffect, useState } from 'react';

import {
    Wrapper,
    Header,
    Title,
    Head,
    Select,
    Button,
    Option,
    TextArea,
    FormRow,
    ButtonWrapper,
    AddButton,
    ElementList,
    Label,
    Input,
} from '../OtherElements';

import SelectComponent from '../../Components/SearchableSelect';
import Modal from '../../Components/Modal';
import KanbanBoard from './KanbanBoard';

import { api, enums } from '../../services';
import { useAuth } from '../../context/AuthContext';
import { Category, Status, Ticket, User } from './TicketElements';
import useForm from '../../hooks/useForm';

const Loans = () => {
    const { user, token } = useAuth();

    const [addNew, setAddNew] = useState(false);

    const [data, setData] = useState([]);
    const [kanban, setKanban] = useState([]);

    const [usersEnum, setUsersEnum] = useState([]);

    const [addForm, handleAddForm] = useForm({
        description: '',
        status: enums.ticket.status.default,
        priority: enums.ticket.priority.default,
        category: enums.ticket.categories.default,
        title: '',
    });

    const [editForm, handleEditForm] = useForm({
        user_id: '',
        description: '',
        status: enums.ticket.status.default,
        priority: enums.ticket.priority.default,
        category: enums.ticket.categories.default,
        title: '',
    });

    useEffect(() => {
        let headers = { authorization: `Bearer ${token}` };
        if (user.role === 'NORMAL') {
            api.get(`tickets/${user.code}`, {
                headers,
            }).then((response) => {
                if (!response.data.error) {
                    setData(response.data);
                }
            });
        } else {
            api.get('users/enum', { headers }).then((response) => {
                if (!response.data.error) {
                    setUsersEnum(response.data);
                }
            });
            api.get(`tickets`, {
                headers,
            }).then((response) => {
                if (!response.data.error) {
                    setKanban(response.data);
                }
            });
        }
    }, [user.code, user.role, token]);

    const [editMode, setEditMode] = useState(false);

    const modalAddNew = () => {
        setAddNew(!addNew);
    };

    const getData = () => {
        let headers = { authorization: `Bearer ${token}` };
        if (user.role === 'NORMAL') {
            api.get(`tickets/${user.code}`, {
                headers,
            }).then((response) => {
                if (!response.data.error) {
                    setData(response.data);
                }
            });
        } else {
            api.get('users/enum', { headers }).then((response) => {
                if (!response.data.error) {
                    setUsersEnum(response.data);
                }
            });
            api.get(`tickets`, {
                headers,
            }).then((response) => {
                if (!response.data.error) {
                    setKanban(response.data);
                }
            });
        }
    };

    const handleNewTicket = async () => {
        let headers = { authorization: `Bearer ${token}` };
        await api.post(
            `tickets`,
            { user_id: user.code, ...addForm },
            { headers }
        );
        getData();
        handleAddForm({
            user_id: user.role !== 'SUPER' ? user.code : '',
            title: '',
            description: '',
            status: enums.ticket.status.default,
            priority: enums.ticket.priority.default,
            category: enums.ticket.categories.default,
        });
        setAddNew(!addNew);
    };

    const handleEditMode = (item) => {
        let {
            description,
            status,
            priority,
            category,
            user_id,
            id,
            title,
        } = item;
        handleEditForm({
            ...editForm,
            description,
            status,
            priority,
            category,
            user_id,
            id,
            title,
        });
        setEditMode(!editMode);
    };

    const handleEditTicket = async () => {
        let headers = { authorization: `Bearer ${token}` };
        await api.patch(
            `tickets/${editForm.id}`,
            { code: user.code, ...editForm },
            { headers }
        );
        getData();
        setEditMode(!editMode);
    };

    const handleDeleteTicket = async (id) => {
        let headers = { authorization: `Bearer ${token}` };
        await api.delete(`tickets`, { data: { id, code: user.code }, headers });
        getData();
        setEditMode(!editMode);
    };

    const handleAddSelect = (code) => {
        handleAddForm({
            ...addForm,
            user_id: code,
        });
    };

    const handleEditSelect = (code) => {
        handleEditForm({
            ...editForm,
            user_id: code,
        });
    };

    return (
        <>
            <Wrapper>
                <Header>
                    <Head>
                        <Title>Chamados</Title>
                        {user.role === 'NORMAL' ? (
                            <ButtonWrapper onClick={modalAddNew}>
                                <AddButton />
                                <span>Abrir Chamado</span>
                            </ButtonWrapper>
                        ) : null}
                    </Head>
                    <Modal
                        show={addNew}
                        height={user.role === 'NORMAL' ? '75vh' : '90vh'}
                        toggleShow={modalAddNew}
                    >
                        <Title>Adicionar Chamado</Title>
                        <Label htmlFor="title-addnew">Título</Label>
                        <Input
                            id="title-addnew"
                            name="title"
                            value={addForm.title}
                            placeholder="Título do chamado"
                            maxLength="90"
                            onChange={(e) => handleAddForm(e)}
                        />
                        <Label htmlFor="description">Descrição</Label>
                        <TextArea
                            id="description"
                            name="description"
                            value={addForm.description}
                            placeholder="Descrição detalhada"
                            onChange={(e) => handleAddForm(e)}
                        />
                        {user.role === 'SUPER' ? (
                            <>
                                <Label htmlFor="user-new">Usuário</Label>
                                <SelectComponent
                                    data={usersEnum}
                                    handleSelect={handleAddSelect}
                                />
                            </>
                        ) : null}
                        {user.role !== 'NORMAL' && (
                            <>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    name="status"
                                    id="status"
                                    value={addForm.status}
                                    onChange={(e) => handleAddForm(e)}
                                >
                                    {enums.ticket.status.enum.map((element) => (
                                        <Option key={element} value={element}>
                                            {element}
                                        </Option>
                                    ))}
                                </Select>
                            </>
                        )}
                        <Label htmlFor="priority">Prioridade</Label>
                        <Select
                            name="priority"
                            id="priority"
                            value={addForm.priority}
                            onChange={(e) => handleAddForm(e)}
                        >
                            {enums.ticket.priority.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element === 'low' && 'Baixa'}
                                    {element === 'medium' && 'Média'}
                                    {element === 'high' && 'Alta'}
                                </Option>
                            ))}
                        </Select>
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                            name="category"
                            id="category"
                            value={addForm.category}
                            onChange={(e) => handleAddForm(e)}
                        >
                            {enums.ticket.categories.enum.map((element) => (
                                <Option key={element} value={element}>
                                    {element}
                                </Option>
                            ))}
                        </Select>

                        <Button
                            type="button"
                            onClick={(e) => handleNewTicket(e)}
                        >
                            Adicionar
                        </Button>
                    </Modal>
                </Header>

                <Modal
                    show={editMode}
                    toggleShow={handleEditMode}
                    height="70vh"
                >
                    <Title>Adicionar Chamado</Title>
                    <Label htmlFor="title-edit">Título</Label>
                    <Input
                        id="title-edit"
                        name="title"
                        value={editForm.title}
                        placeholder="Título do chamado"
                        maxLength="100"
                        onChange={(e) => handleEditForm(e)}
                    />
                    <Label htmlFor="description-edit">Descrição</Label>
                    <TextArea
                        id="description-edit"
                        name="description"
                        value={editForm.description}
                        placeholder="Descrição detalhada"
                        onChange={(e) => handleEditForm(e)}
                    />
                    {user.role === 'SUPER' ? (
                        <>
                            <Label htmlFor="user-edit">Usuário</Label>
                            <SelectComponent
                                data={usersEnum}
                                handleSelect={handleEditSelect}
                                defaultValue={editForm.user_id}
                            />
                        </>
                    ) : null}
                    {user.role !== 'NORMAL' && (
                        <>
                            <Label htmlFor="status-edit">Status</Label>
                            <Select
                                name="status"
                                id="status-edit"
                                value={editForm.status}
                                onChange={(e) => handleEditForm(e)}
                            >
                                {enums.ticket.status.enum.map((element) => (
                                    <Option key={element} value={element}>
                                        {element}
                                    </Option>
                                ))}
                            </Select>
                        </>
                    )}

                    <Label htmlFor="priority-edit">Prioridade</Label>
                    <Select
                        name="priority"
                        id="priority-edit"
                        value={editForm.priority}
                        onChange={(e) => handleEditForm(e)}
                    >
                        {enums.ticket.priority.enum.map((element) => (
                            <Option key={element} value={element}>
                                {element === 'low' && 'Baixa'}
                                {element === 'medium' && 'Média'}
                                {element === 'high' && 'Alta'}
                            </Option>
                        ))}
                    </Select>
                    <Label htmlFor="category-edit">Categoria</Label>
                    <Select
                        name="category"
                        id="category-edit"
                        value={editForm.category}
                        onChange={(e) => handleEditForm(e)}
                    >
                        {enums.ticket.categories.enum.map((element) => (
                            <Option key={element} value={element}>
                                {element}
                            </Option>
                        ))}
                    </Select>
                    <FormRow>
                        <Button
                            type="button"
                            onClick={() => handleEditTicket()}
                        >
                            Salvar
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleDeleteTicket(editForm.id)}
                        >
                            Excluir
                        </Button>
                    </FormRow>
                </Modal>
                {user.role !== 'NORMAL' ? (
                    <KanbanBoard
                        backendData={kanban}
                        modalAddNew={modalAddNew}
                        modalEdit={handleEditMode}
                        getNewData={getData}
                    />
                ) : (
                    <ElementList>
                        {data.map((element) => (
                            <Ticket
                                key={element.id}
                                onClick={() => handleEditMode(element)}
                            >
                                {element.title}
                                <Status>
                                    <Category className={element.priority}>
                                        {element.category}
                                    </Category>
                                    <User>Status: {element.status}</User>
                                </Status>
                            </Ticket>
                        ))}
                    </ElementList>
                )}
            </Wrapper>
        </>
    );
};

export default Loans;
