import React, { useEffect, useState } from 'react';

import {
    Wrapper,
    Header,
    Title,
    Head,
    Input,
    Select,
    Button,
    Option,
    TextArea,
    FormRow,
    ButtonWrapper,
    AddButton,
    ElementList,
} from '../OtherElements';

import Modal from '../../Components/Modal';
import KanbanBoard from './KanbanBoard';
import { api } from '../../services';
import { Category, Status, Ticket, User } from './TicketElements';

const Loans = () => {
    const [addNew, setAddNew] = useState(false);

    const [role, setRole] = useState('');
    const [code, setCode] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        setRole(localStorage.getItem('role'));
        setCode(localStorage.getItem('code'));
        setData([
            {
                id: '1',
                description: 'Item 1',
                category: 'hardware',
                priority: 'low',
                status: 'entrada',
                user: '2041',
            },
            {
                id: '2',
                description: 'Item 2',
                category: 'software',
                priority: 'high',
                status: 'entrada',
                user: '2041',
            },
        ]);
    }, []);

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({});

    const refreshData = () => {
        if (role === 'NORMAL') {
        }
    };

    const modalAddNew = () => {
        setAddNew(!addNew);
    };

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
                        <Title>Chamados</Title>
                        {role === 'NORMAL' ? (
                            <ButtonWrapper onClick={modalAddNew}>
                                <AddButton />
                                <span>Abrir Chamado</span>
                            </ButtonWrapper>
                        ) : null}
                    </Head>
                    <Modal show={addNew} toggleShow={modalAddNew}>
                        <Title>Adicionar Chamado</Title>
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
                {role !== 'NORMAL' ? (
                    <KanbanBoard />
                ) : (
                    <ElementList>
                        {data.map((element) => (
                            <Ticket key={element.id}>
                                {element.description}
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
