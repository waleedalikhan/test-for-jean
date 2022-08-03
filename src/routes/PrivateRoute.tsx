import react, { FC } from 'react';
import { history } from '@/helper';
import { useAppSelector } from '@/store';
import { Navigate } from 'react-router-dom';


const PrivateRoute: FC<any> = ({ children }) => {

    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute;


