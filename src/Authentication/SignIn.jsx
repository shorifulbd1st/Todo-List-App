import React, { useContext } from 'react'
import Lottie from 'lottie-react';
import signInAnimation from '../../public/login.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocialLogin from './SocialLogin';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../providers/AuthProvider';
const SignIn = () => {
    const { handleLogin, notify } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     handleLogin(email, password)
    //         .then(res => {
    //             const user = { email: email };
    //             notify('success', 'login successful')
    //             navigate(from)

    //         })
    //         .catch(error => {
    //             // console.log('error', error.message)
    //         })
    // }
    return (
        <div className='w-11/12 mx-auto my-5'>
            <Helmet>
                <title> Todo List | Login </title>
            </Helmet>
            <div className="border-2 border-blue-500 flex flex-col lg:flex-row w-full justify-center items-center mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className=" bg-cover  lg:w-1/2">
                    <Lottie animationData={signInAnimation}></Lottie>
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                        <img width="64" height="64" src="https://img.icons8.com/external-flat-design-circle/64/external-Todo-List-business-flat-design-circle.png" alt="external-Todo-List-business-flat-design-circle" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>
                    <SocialLogin></SocialLogin>


                    {/* <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or login with email
                        </p>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit}>


                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Email Address
                            </label>
                            <input
                                id="LoggingEmailAddress"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email"
                                name='email'
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">
                                    Password
                                </label>

                            </div>
                            <input
                                id="loggingPassword"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                name="password"

                            />
                        </div>

                        <div className="mt-6">
                            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to={'/register'} className="text-xs hover:text-blue-500 hover:font-bold text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or sign up
                        </Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default SignIn
