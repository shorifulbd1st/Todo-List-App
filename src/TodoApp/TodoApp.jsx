import { useContext, useEffect, useState } from "react";
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


function TodoApp() {
    // const COLUMNS = [
    //     { id: 'TODO', title: 'To Do' },
    //     { id: 'IN_PROGRESS', title: 'Work in Progress' },
    //     { id: 'DONE', title: 'Completed' },
    // ];
    const COLUMNS = [
        { id: 'To Do', title: 'To Do' },
        { id: 'Work in Progress', title: 'Work in Progress' },
        { id: 'Completed', title: 'Completed' },
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
    const { data: userData = [], isPendingUser } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            // console.log(res.data)
            // setTasks(res.data)
            return res.data;
        }
    })




    if (isPending || isPendingUser) {
        return <LoadingSpinner></LoadingSpinner>
    }


    const handleDragEnd = async (event) => {
        // console.log('event', event)
        const { active, over } = event;
        if (!active || !over) return;

        const taskId = active.id;
        const targetColumnId = over.id;

        // console.log("Dragged Task ID:", taskId);
        // console.log("Dropped on Column ID:", targetColumnId);
        // const time = new Date().toLocaleString('en-GB', options).replace(',', '');

        const info = { taskId, targetColumnId }
        const res = await axiosPublic.patch(`/task-drag`, info);
        if (res.data.modifiedCount > 0) {
            notify('success', `Task moved ${active.data.current.column} to ${over.id} `)
            // refetch();
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
        <div className="bg-teal-950 ">
            <div className="w-11/12 mx-auto py-5 text-white flex flex-col justify-center items-center ">
                <h1 className="">User ID : 012345 - {userData?.uid?.slice(-5)}</h1>
                <h1 className="">Name : {userData?.name}</h1>
                <h1 className="">Email : {userData?.email}</h1>
            </div>
            <DndContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-8 ">
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
