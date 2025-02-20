import Lottie from 'lottie-react'
import React, { useContext, useState } from 'react'
import registerLottieAnimation from '../../../public/register.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from './SocialLogin';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../hooks/useAxiosPublic';
const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { handleRegister, user, setUser, updateUserProfile, notify } = useContext(AuthContext);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        // const cPassword = form.get('cPassword');

        const hasUppercase = /.*[A-Z].*/;
        const hasLowercase = /.*[a-z].*/;
        const hasValidLength = /.{6,}/;

        if (!hasUppercase.test(password)) {
            setError({ upperCase: 'must have one uppercase letter' });
            return;
        }
        if (!hasLowercase.test(password)) {
            setError({ lowerCase: 'must have one lowercase letter' });
            return;
        }
        if (!hasValidLength.test(password)) {
            setError({ length: 'must be more than 6 character' });
            return;
        }

        handleRegister(email, password)
            .then(result => {
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        const userInfo = { name, email, photo, role: 'member' }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                notify('success', `Welcome ${name} your registration successful`);
                                navigate('/')
                            })
                    })
            })
            .catch(error => notify('error', 'Your account was not created successfully'))

    }
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title> Body Build House | Register </title>
            </Helmet>
            <div className="border-2 border-blue-500 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div
                    className="hidden bg-cover lg:block lg:w-1/2"
                // style={{
                //     backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')",
                // }}
                >
                    <Lottie animationData={registerLottieAnimation}></Lottie>
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" /> */}
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>
                    <SocialLogin></SocialLogin>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or register
                        </p>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Your Full Name
                            </label>
                            <input
                                id="name"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="text"
                                name='name'
                            />

                        </div>
                        <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                                Photo URL
                            </label>
                            <input
                                id="photo-url"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="url"
                                name='photo'
                            />

                        </div>



                        <div className="mt-2">
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

                        <div className="mt-2">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">
                                    Password
                                </label>

                            </div>
                            <input
                                id="loggingPassword"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                name='password'
                            />
                        </div>

                        <div className="mt-4">
                            <button type='submit' className="w-full px-6 py-2 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to={'/login'} className="text-xs hover:text-blue-500 hover:font-bold text-gray-500 uppercase dark:text-gray-400 hover:underline">
                            or login
                        </Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
