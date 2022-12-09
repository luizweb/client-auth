import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import {Navigate} from 'react-router-dom';

function ProtectRoute({Component}) {

    const { loggedInUser } = useContext(AuthContext);

    const loggedInUserJSON = localStorage.getItem("loggedInUser");        
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

    if (parseLoggedInUser){
        console.log("LOGADO")
        if (loggedInUser.user.role === "ADMIN" || parseLoggedInUser.user.role === "ADMIN"){
            return <Component />
        }
    } else {
        console.log("*NÃO LOGADO*");
        return <Navigate to="/login" />
    }

   


    /*
    if (loggedInUser.user.role === "ADMIN"){
        return <Component />
    } else{
        return <Navigate to="/" />
    }
    */
}

export default ProtectRoute;



