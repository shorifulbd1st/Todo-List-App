import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import SignIn from "../Authentication/SignIn";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../TodoApp/AddTask";
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
            {
                path: '/add-task',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },


        ]
    },


])

export default router;