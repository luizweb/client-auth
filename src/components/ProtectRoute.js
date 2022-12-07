import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import {Navigate} from 'react-router-dom';

function ProtectRoute({Component}) {
    const {loggedInUser} = useContext(AuthContext)

    if (loggedInUser){
        // mostra o componente
        return <Component />
    } else{
        // navega o usuário para página de login
        return <Navigate to="/login" />
    }
}

export default ProtectRoute;