import { useContext, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import LoadingSpinner from "../components/LoadingSpinner";
const options = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
};

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

function TodoApp() {
    const COLUMNS = [
        { id: 'TODO', title: 'To Do' },
        { id: 'IN_PROGRESS', title: 'Work in Progress' },
        { id: 'DONE', title: 'Completed' },
    ];
    const { user, notify } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState([]);

    const { data: newTasks = [], isPending, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/${user?.email}`)
            // console.log(res.data)
            setTasks(res.data)
            return res.data;
        }
    })
    if (isPending) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const handleDragEnd = async (event) => {
        console.log('event', event)
        const { active, over } = event;
        if (!active || !over) return;

        const taskId = active.id;
        const targetColumnId = over.id;

        console.log("Dragged Task ID:", taskId);
        console.log("Dropped on Column ID:", targetColumnId);
        // const time = new Date().toLocaleString('en-GB', options).replace(',', '');
        const info = { taskId, targetColumnId }
        const res = await axiosPublic.patch(`/task-drag`, info);
        if (res.data.modifiedCount > 0) {
            notify('success', 'Task moved to Done')
            refetch();
        }
        if (active.data.current.column === targetColumnId) {
            const reorderedTasks = Array.from(tasks);
            const activeTaskIndex = reorderedTasks.findIndex((task) => task._id === taskId);
            const targetTaskIndex = reorderedTasks.findIndex((task) => task._id === over.id);

            const [removedTask] = reorderedTasks.splice(activeTaskIndex, 1);
            reorderedTasks.splice(targetTaskIndex, 0, removedTask);

            setTasks(reorderedTasks);
        } else {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, status: targetColumnId } : task
                )
            );
        }
    };

    return (
        <div className=" ">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-8 bg-teal-950">
                    {
                        COLUMNS.map((column) => (
                            <Column key={column.id}
                                refetch={refetch}
                                column={column}
                                tasks={tasks.filter((task) => task.status == column.id)}

                            >

                            </Column>))
                    }

                </div>

            </DndContext>
        </div>

    )
}

export default TodoApp
