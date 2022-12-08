import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import {Navigate} from 'react-router-dom';

function ProtectRoute({Component}) {
    const {loggedInUser} = useContext(AuthContext)

    if (loggedInUser.user.role === "ADMIN"){
        console.log("A --> /admin")        
        console.log(loggedInUser)
        
        return <Component />
    } else{
        console.log("B --> /admin")        
        console.log(loggedInUser)

        return <Navigate to="/" />
    }
}

export default ProtectRoute;



