import { useState } from "react";
import Column from "./components/Column";
import { DndContext } from "@dnd-kit/core";
function TodoApp() {

    const COLUMNS = [
        { id: 'TODO', title: 'To Do' },
        { id: 'IN_PROGRESS', title: 'Work in Progress' },
        { id: 'DONE', title: 'Completed' },
    ];

    const INITIAL_TASKS = [
        {
            id: '1',
            title: 'Brainstorm Features',
            description: 'Identify key features to include in the project.',
            status: 'TODO',
        },
        {
            id: '2',
            title: 'Design Wireframes',
            description: 'Sketch out basic layouts for the TodoApplication.',
            status: 'TODO',
        },
        {
            id: '3',
            title: 'Develop Core Components',
            description: 'Build and test the main components of the TodoApp.',
            status: 'IN_PROGRESS',
        },
        {
            id: '4',
            title: 'Deploy TodoApplication',
            description: 'Set up hosting and deploy the final build.',
            status: 'DONE',
        },
    ];
    const [tasks, setTasks] = useState(INITIAL_TASKS);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!active || !over) return;

        const taskId = active.id;
        const targetColumnId = over.id;

        console.log("Dragged Task ID:", taskId);
        console.log("Dropped on Column ID:", targetColumnId);

        // যদি টাস্ক একই কলামে ড্রপ হয়, তবে রি-অর্ডার করতে হবে
        if (active.data.current.column === targetColumnId) {
            const reorderedTasks = Array.from(tasks);
            const activeTaskIndex = reorderedTasks.findIndex((task) => task.id === taskId);
            const targetTaskIndex = reorderedTasks.findIndex((task) => task.id === over.id);

            // রি-অর্ডার লজিক (ড্র্যাগ করা টাস্কটি নতুন অবস্থানে রাখে)
            const [removedTask] = reorderedTasks.splice(activeTaskIndex, 1);
            reorderedTasks.splice(targetTaskIndex, 0, removedTask);

            setTasks(reorderedTasks);
        } else {
            // কলাম পরিবর্তন হলে, শুধু কলামের স্টেট আপডেট করো
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: targetColumnId } : task
                )
            );
        }
    };
    return (
        <DndContext onDragEnd={handleDragEnd}>

            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-8 bg-teal-950">
                    {
                        COLUMNS.map((column) => (
                            <Column key={column.id}
                                column={column}
                                tasks={tasks.filter((task) => task.status == column.id)}

                            >

                            </Column>))
                    }

                </div>
            </div>
        </DndContext>
    )
}

export default TodoApp
