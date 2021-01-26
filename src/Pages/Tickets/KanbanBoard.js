import React, { useEffect, useState } from 'react';

import {
    Category,
    Container,
    Item,
    List,
    ListItems,
    Status,
    User,
} from './TicketElements';

import { FaPlus } from 'react-icons/fa';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Modal from '../../Components/Modal';

import {
    Button,
    FormRow,
    Label,
    LabelS,
    Option,
    Select,
    Title,
} from '../OtherElements';
import useForm from '../../hooks/useForm';

import { api, auth, enums } from '../../services';

const KanbanBoard = ({ modalAddNew, backendData, getNewData }) => {
    const [entryModal, setEntryModal] = useState(false);
    const [entryForm, handleEntryForm] = useForm({
        description: '',
        status: enums.ticket.status.default,
        priority: enums.ticket.priority.default,
        category: enums.ticket.categories.default,
        user: {
            firstname: '',
            lastname: '',
            department: '',
        },
    });

    const getData = (toChangeData) => {
        let newData = [
            { id: '0', title: 'Entrada', items: [] },
            { id: '1', title: 'Em andamento', items: [] },
            { id: '2', title: 'Aguardando Terceiros', items: [] },
            { id: '3', title: 'Concluído', items: [] },
        ];

        if (toChangeData.length > 0) {
            toChangeData.map((item) => {
                switch (item.status) {
                    case 'entrada':
                        newData[0].items.push(item);
                        break;
                    case 'em andamento':
                        newData[1].items.push(item);
                        break;
                    case 'aguardando terceiros':
                        newData[2].items.push(item);
                        break;
                    case 'concluido':
                        newData[3].items.push(item);
                        break;
                    default:
                        console.log('error');
                }
                return null;
            });
        }
        return newData;
    };
    const [data, updateData] = useState([]);

    useEffect(() => {
        updateData(getData(backendData));
    }, [backendData]);

    const handleDragEnd = async ({ source, destination }) => {
        const items = Array.from(data);

        const [reorderedItem] = items[source.droppableId].items.splice(
            source.index,
            1
        );
        items[destination.droppableId].items.splice(
            destination.index,
            0,
            reorderedItem
        );
        if (source.droppableId !== destination.droppableId) {
            let headers = { authorization: `Bearer ${auth.getToken()}` };
            let status = '';
            switch (destination.droppableId) {
                case '0':
                    status = 'entrada';
                    break;
                case '1':
                    status = 'em andamento';
                    break;
                case '2':
                    status = 'aguardando terceiros';
                    break;
                case '3':
                    status = 'concluído';
                    break;
                default:
                    console.log('error');
            }
            await api.patch(
                `tickets/drag/${reorderedItem.id}`,
                { code: localStorage.getItem('code'), status },
                { headers }
            );
        }
        updateData(items);
    };

    const toggleEntryModal = (item) => {
        setEntryModal(!entryModal);
        handleEntryForm({ ...entryForm, ...item });
    };

    const handleAccept = async () => {
        const { priority, category } = entryForm;
        let headers = { authorization: `Bearer ${auth.getToken()}` };
        await api.patch(
            `tickets/drag/${entryForm.id}`,
            {
                code: localStorage.getItem('code'),
                status: 'em andamento',
                priority,
                category,
            },
            { headers }
        );
        setEntryModal(!entryModal);
        getNewData();
    };

    const handleReject = async () => {
        let headers = { authorization: `Bearer ${auth.getToken()}` };
        await api.patch(
            `tickets/drag/${entryForm.id}`,
            {
                code: localStorage.getItem('code'),
                status: 'perdido',
            },
            { headers }
        );
        setEntryModal(!entryModal);
        getNewData();
    };

    return (
        <Container>
            <Modal show={entryModal} height="70vh" toggleShow={setEntryModal}>
                <Title>Revisar Chamado</Title>
                <LabelS>Descrição</LabelS>
                <p>{entryForm.description}</p>
                <LabelS>Usuário</LabelS>
                {entryForm.user !== null ? (
                    <p>{`${entryForm.user.firstname} ${entryForm.user.lastname} | ${entryForm.user.department} `}</p>
                ) : null}

                <Label htmlFor="status">Status</Label>
                <Select
                    name="status"
                    id="status"
                    value={entryForm.status}
                    onChange={(e) => handleEntryForm(e)}
                >
                    {enums.ticket.status.enum.map((element) => (
                        <Option key={element} value={element}>
                            {element}
                        </Option>
                    ))}
                </Select>
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                    name="priority"
                    id="priority"
                    value={entryForm.priority}
                    onChange={(e) => handleEntryForm(e)}
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
                    value={entryForm.category}
                    onChange={(e) => handleEntryForm(e)}
                >
                    {enums.ticket.categories.enum.map((element) => (
                        <Option key={element} value={element}>
                            {element}
                        </Option>
                    ))}
                </Select>

                <FormRow>
                    <Button type="button" onClick={(e) => handleAccept()}>
                        Aceitar
                    </Button>
                    <Button type="button" onClick={() => handleReject()}>
                        Recusar
                    </Button>
                </FormRow>
            </Modal>
            <DragDropContext onDragEnd={handleDragEnd}>
                {data.map((element) => (
                    <Droppable droppableId={element.id} key={element.id}>
                        {(provided) => (
                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <span className="title">{element.title}</span>
                                <ListItems>
                                    {element.items.map((item, index) => (
                                        <Draggable
                                            draggableId={`${item.id}`}
                                            index={index}
                                            key={item.id}
                                        >
                                            {(provided) => (
                                                <Item
                                                    onClick={() =>
                                                        toggleEntryModal(item)
                                                    }
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <p>{item.description}</p>
                                                    <Status>
                                                        <Category
                                                            className={
                                                                item.priority
                                                            }
                                                        >
                                                            {item.category}
                                                        </Category>
                                                        <User>{`${item.user.firstname} ${item.user.lastname} | ${item.user.department}`}</User>
                                                    </Status>
                                                </Item>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}
                                    <button onClick={modalAddNew}>
                                        <FaPlus /> Chamado
                                    </button>
                                </ListItems>
                            </List>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </Container>
    );
};

export default KanbanBoard;
