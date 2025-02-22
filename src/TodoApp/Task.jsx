import React, { useContext, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const options = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
};

const Task = ({ task, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const [isOpen, setIsOpen] = useState(false);
    const { notify, user } = useContext(AuthContext)
    const [taskData, setTaskData] = useState({
        title: task.title || "",
        description: task.description || ""
    });
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id,
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };
    const handleUpdate = async (event) => {
        event.stopPropagation();
        // console.log('update', id)
        event.preventDefault();

        const title = taskData.title;
        const description = taskData.description;
        const status = task.status;
        // const time = new Date().toLocaleString('en-GB', options).replace(',', '');
        const updateData = { email: user?.email, title, description, status }

        console.log(updateData)
        const res = await axiosPublic.patch(`/task/${task._id}`, updateData);
        if (res.data.modifiedCount > 0) {
            let timerInterval;
            Swal.fire({

                title: "Updating Data!",
                html: "Please wait, updating data will complete in <b></b> milliseconds.",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    refetch()
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);

                }

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    // console.log("Data update process completed successfully!");
                }
            });

        }

        setIsOpen(false)
    }
    const handleDelete = (event, id) => {
        event.stopPropagation();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/tasks/${id}`)
                if (res.data.acknowledged) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                }

            }
        });

    }
    return (
        <div
            // {...attributes}
            // {...listeners}
            ref={setNodeRef}
            className="cursor-pointer rounded-lg bg-teal-400 p-2 shadow-sm hover:shadow-lg"
            style={style}
        >
            <div className='px-2'
                {...attributes}
                {...listeners}
            >
                <h3
                    className="font-medium text-neutral-950 text-center">{task.title}</h3>
                <p className="my-2 text-sm text-neutral-800 text-justify">{task.description}</p>
                <p className="my-2 text-sm text-neutral-800 text-end">{task.time}</p>
            </div>
            <div className='flex justify-center gap-5 px-2'>
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        // handleUpdate(task._id);
                        setIsOpen(true)
                    }}

                    className='px-8 py-2 bg-green-700 rounded-lg flex gap-2 justify-center items-center'><GrUpdate /><span className='text-sm'>Update</span></button>
                <button onClick={(event) => handleDelete(event, task._id)} className='px-8 py-2 bg-red-600 rounded-lg flex gap-2 justify-center items-center'><MdDelete /> <span className='text-sm'>Delete </span></button>
            </div>

            <div className="relative flex justify-center">
                {/* <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2 mx-auto tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Open Modal
                </button> */}

                {isOpen && (
                    <div className="fixed inset-0 z-[9000] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-5 text-center sm:block sm:p-0">
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                <form onSubmit={handleUpdate}>
                                    <div className="grid grid-cols-1 ">

                                        <div>
                                            <label className="text-gray-700 dark:text-gray-200 capitalize text-lg" htmlFor="taskTitle">
                                                task title
                                            </label>
                                            <input
                                                id="taskTitle"
                                                type="text"
                                                name='title'
                                                value={taskData.title}
                                                onChange={handleChange}
                                                placeholder='write the task name'
                                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white text-sm border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-lg text-gray-700 dark:text-gray-200 capitalize" htmlFor="taskDescription">
                                                task description
                                            </label>
                                            <textarea
                                                id="taskDescription"
                                                type="text"
                                                name='description'
                                                placeholder='task description'
                                                value={taskData.description}
                                                onChange={handleChange}
                                                className="block w-full text-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring h-40"
                                            // className="block w-full text-sm px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring "
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >
                                            Cancel
                                        </button>

                                        <button type='submit' className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Task;
