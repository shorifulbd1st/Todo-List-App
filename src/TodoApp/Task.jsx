import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const Task = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: { column: task.status },
    });

    // Style for transform and transition
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined, // Apply transform when dragging
        transition: !transform ? 'transform 0.2s ease' : undefined, // Apply transition when not dragging
        opacity: isDragging ? 0.5 : 1, // Reduce opacity when dragging to show it's being moved
    };

    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            className="cursor-grab rounded-lg bg-teal-400 p-2 shadow-sm hover:shadow-lg"
            style={style}
        >
            <h3 className="font-medium text-neutral-950">{task.title}</h3>
            <p className="my-2 text-sm text-neutral-800">{task.description}</p>
        </div>
    );
};

export default Task;
