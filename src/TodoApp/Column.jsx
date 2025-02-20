import React from 'react'
import Task from './Task'
import { useDroppable } from '@dnd-kit/core'
const Column = ({ column, tasks }) => {
    // console.log(column)
    // console.log(tasks)
    const { setNodeRef } = useDroppable({
        id: column.id
    })
    return (
        <div ref={setNodeRef}
            className='text-xl text-white font-semibold mb-4 shadow-md h-screen border border-red-700 bg-teal-700 rounded-xl p-4 text-center'>
            <h2 className='border-b-2 mb-2 border-black'>{column.title}</h2>
            <div className='space-y-4'>
                {
                    tasks.map((task) => <Task key={task.id} task={task}></Task>)
                }
            </div>
        </div>
    )
}

export default Column

