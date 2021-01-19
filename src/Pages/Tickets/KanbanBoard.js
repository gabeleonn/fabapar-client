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

const KanbanBoard = ({ modalEdit, modalAddNew, backendData }) => {
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

    const handleDragEnd = ({ source, destination }) => {
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
        updateData(items);
    };

    return (
        <Container>
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
                                                        modalEdit(item)
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
