import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import {Navigate} from 'react-router-dom';

function ProtectRoute({Component}) {
    const {loggedInUser} = useContext(AuthContext)

    //BUG? loggedInUser.token !== ""
    
    if (loggedInUser.token !== ""){
        
        console.log("A --> /profile") 
        console.log(loggedInUser)
        
        return <Component />
    } else{   
        
        console.log("B --> /profile")  
        console.log(loggedInUser)  

        return <Navigate to="/login" />
    }
}

export default ProtectRoute;



