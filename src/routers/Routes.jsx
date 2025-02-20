import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import SignIn from "../Authentication/SignIn";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/login',
                element: <SignIn></SignIn>
            },
            // {
            //     path: '/register',
            //     element: <Register></Register>
            // },

        ]
    },


])

export default router;