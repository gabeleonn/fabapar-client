import React, { useState } from 'react';

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
} from '../OtherElements';

import Modal from '../../Components/Modal';
import KanbanBoard from './KanbanBoard';

const Loans = () => {
    const [addNew, setAddNew] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editForm, setEditForm] = useState({});

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
                <KanbanBoard />
            </Wrapper>
        </>
    );
};

export default Loans;
