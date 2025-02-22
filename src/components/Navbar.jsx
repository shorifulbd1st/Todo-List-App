import React, { useContext, useState, useCallback, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
const themes = [

    'light',
    'dark',

]
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, handleLogout } = useContext(AuthContext);
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);


    // const [theme, setTheme] = useState(
    //     localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    // )

    // useEffect(() => {
    //     localStorage.setItem('theme', theme)
    //     const localTheme = localStorage.getItem('theme')
    //     document.querySelector('html').setAttribute('data-theme', localTheme)
    // }, [theme])

    return (
        <div className="sticky top-0 z-[900] ">
            <nav className="relative text-white shadow dark:bg-gray-800 bg-[#C70039]">
                <div className="w-11/12 py-4 mx-auto">
                    <div className="lg:flex justify-between">
                        {/* Logo and Brand Name */}
                        <div className="flex items-center justify-between">
                            <div className="relative flex justify-center items-center">
                                {/* <img
                                    className="w-12 rounded-full mr-1"
                                    // src="https://i.ibb.co.com/cyZC6hW/ai-generated-8243469-640.jpg"
                                    alt=""
                                    loading="lazy"
                                /> */}
                                <img width="64" height="64" src="https://img.icons8.com/external-flat-design-circle/64/external-Todo-List-business-flat-design-circle.png" alt="external-Todo-List-business-flat-design-circle" />
                                <h1 className="text-center flex">
                                    <Link href="/" className="text-2xl cursor-pointer font-semibold text-center text-transparent bg-clip-text  drop-shadow-lg text-white">
                                        Todo List
                                    </Link>
                                </h1>
                            </div>

                            {/* Mobile Menu Toggle Button */}
                            <div className="flex lg:hidden">
                                <button
                                    onClick={toggleMenu}
                                    type="button"
                                    className="text-gray-500 bg-[#C70039] dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                    aria-label="toggle menu"
                                >
                                    {isOpen ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            viewBox="0 0 30 30"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Navigation Links and User Actions */}
                        <div
                            className={`absolute inset-x-0 z-20 w-full px-6 py-4 bg-[#C70039] transition-all duration-700 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:flex lg:items-center ${isOpen
                                ? "translate-x-0 opacity-100 bg-[#C70039]"
                                : "opacity-0 -translate-x-full lg:opacity-100 lg:translate-x-0 bg-[#C70039]"
                                }`}
                        >
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-2 xl:mx-4 xl:text-lg ">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `inline-block px-2 py-2 mx-3 mt-2  transition-colors duration-700 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-green-500 text-white dark:hover:bg-gray-700 ${isActive ? "bg-green-600" : ""
                                        }`
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/add-task"
                                    className={({ isActive }) =>
                                        `inline-block px-2 py-2 text-white mx-3 mt-2 transition-colors duration-700 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-green-500 dark:hover:bg-gray-700 ${isActive ? "bg-green-600 text-white" : ""
                                        }`
                                    }
                                >
                                    Add Task
                                </NavLink>

                                {
                                    user?.email && <>
                                        <NavLink
                                            to="/profile"
                                            className={({ isActive }) =>
                                                `inline-block px-2 py-2 mx-3 mt-2 text-white transition-colors duration-700 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-green-500 dark:hover:bg-gray-700 ${isActive ? "bg-[#C70039]" : ""
                                                }`
                                            }
                                        >
                                            Profile
                                        </NavLink>

                                    </>
                                }
                            </div>

                            {/* User Actions */}
                            <div className="flex items-center mt-4 lg:mt-0 gap-3">
                                {user && user?.email ? (
                                    <div className="flex justify-between items-center gap-2">
                                        <button
                                            type="button"
                                            className="flex items-center focus:outline-none"
                                            aria-label="toggle profile dropdown"
                                        >
                                            <a id="not-clickable">
                                                <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
                                                    <img
                                                        referrerPolicy="no-referrer"
                                                        src={user?.photoURL}
                                                        className="object-cover w-full h-full"
                                                        alt="avatar"
                                                    />
                                                </div>
                                            </a>
                                            <Tooltip anchorSelect="#not-clickable">
                                                <div className="px-2 py-1 rounded text-sm" referrerPolicy="no-referrer"
                                                >
                                                    {user?.displayName}
                                                </div>
                                            </Tooltip>
                                        </button>

                                        <button
                                            onClick={() => handleLogout('s')}
                                            className="px-4 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-700 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        {/* <Link
                                            to="/register"
                                            className="px-4 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-700 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                        >
                                            Register
                                        </Link> */}
                                        <Link
                                            to="/login"
                                            className="px-4 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-700 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                            {/* <div className='flex-none'>
                                <select
                                    name='theme'
                                    className={`py-2 px-1  rounded border-2 focus-none outline-none ${theme === 'light' ? 'text-black' : 'text-white'}`}
                                    onChange={e => setTheme(e.target.value)}
                                    id=''
                                >
                                    {themes.map(theme => (
                                        <option key={theme} value={theme}>
                                            {theme[0].toUpperCase() + theme.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default React.memo(Navbar);
