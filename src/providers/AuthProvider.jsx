
import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';



export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

    const notify = (value, message) => {
        if (value == 'success')
            toast.success(`${message}`, { toastId: 'hello' });
        else
            toast.error(`${message}`, { toastId: 'hello' })

    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newEmail, setNewEmail] = useState('');


    const handleGoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)

    }


    const handleLogout = (v) => {
        setLoading(true);
        signOut(auth).then(() => {
            if (v === 's') {
                notify('success', 'logout successfully');
            }
            else {
                notify('error', 'login first');
            }

        }).catch((error) => {
        });
    }

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }
    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    useEffect(() => {
        console.log('user--->', user)
    }, [user])

    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            //     if (currentUser) {
            //         const userInfo = { email: currentUser.email };
            //         axiosPublic.post('/jwt', userInfo)
            //             .then(res => {
            //                 if (res.data.token) {
            //                     localStorage.setItem('access-token', res.data.token)
            //                     setLoading(false)
            //                 }
            //             })
            //     }
            //     else {
            //         localStorage.removeItem('access-token')
            //         setLoading(false);
            //     }

        })
        return () => { unsubscribe() }
    }, [])



    const authInfo = {
        notify,
        user, setUser,
        loading,
        newEmail,
        setNewEmail,
        handleGoogleLogin,
        handleRegister,
        handleLogin,
        updateUserProfile,
        forgetPassword,
        handleLogout,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            <ToastContainer

                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="toast-custom-width"
            />
        </AuthContext.Provider>
    )
}

export default AuthProvider

