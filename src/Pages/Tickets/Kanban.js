import React, { useState, useEffect } from 'react';

import { Container, List } from './KanbanElements';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Kanban = ({ items }) => {
    const [data, updateData] = useState(items);

    return (
        <Container>
            <DragDropContext>
                {data.length > 0
                    ? data.map((element) => <List key={element.id} />)
                    : null}
            </DragDropContext>
        </Container>
    );
};

export default Kanban;
