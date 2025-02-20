import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (isAdminLoading || loading) {
        return <div className=''><LoadingSpinner></LoadingSpinner></div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>

}
export default AdminRoute
