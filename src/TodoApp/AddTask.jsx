import React, { useContext, useState } from 'react'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
const options = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
};
const AddTask = () => {
    const axiosPublic = useAxiosPublic();
    const { user, notify } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = "To Do";
        const time = new Date().toLocaleString('en-GB', options).replace(',', '');
        const task = { email: user?.email, title, description, status, time }
        // console.log(task)
        const res = await axiosPublic.post('/tasks', task)
        // console.log(res)
        if (res.data.insertedId) {
            notify('success', 'add new task successful')
            navigate('/')
        }
    }
    return (
        <div className='w-11/12 mx-auto my-8  '>
            <h1 className='text-3xl text-center font-semibold '>Add New Task</h1>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 border border-[#C70039] my-5">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200 capitalize" htmlFor="taskTitle">
                                task title
                            </label>
                            <input
                                id="taskTitle"
                                type="text"
                                name='title'
                                placeholder='write the task name'
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>



                        <div>
                            <label className="text-gray-700 dark:text-gray-200 capitalize" htmlFor="taskDescription">
                                task description
                            </label>
                            <textarea
                                id="taskDescription"
                                type="text"
                                name='description'
                                placeholder='task description'
                                required
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        {/* <div>
                            <h1 className="text-gray-700 dark:text-gray-200 mb-2 capitalize" htmlFor="passwordConfirmation">
                                task category
                            </h1>
                            <select
                                id="category"
                                name="category"
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="TODO">To-Do</option>
                                <option value="IN_PROGRESS">In -Progress</option>

                            </select>
                        </div> */}
                    </div>

                    <div className="flex justify-start mt-6">
                        <input type='submit' value="Add Task" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#C70039] rounded-md capitalize  focus:outline-none ">

                        </input>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default AddTask
