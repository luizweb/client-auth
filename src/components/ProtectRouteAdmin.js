import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

function ProtectRouteAdmin({Component}) {
    
    const { loggedInUser } = useContext(AuthContext)
    
    if (loggedInUser && loggedInUser.user.role === "ADMIN"){
        return <Component />
    } 
    
    // se for null, vai para o login
    if (!loggedInUser || loggedInUser.user.role === "USER") {
        return <Navigate to="/login" />
    }
   
}
export default ProtectRouteAdmin;



