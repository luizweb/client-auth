import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import {Navigate} from 'react-router-dom';

function ProtectRoute({Component}) {
    const {loggedInUser} = useContext(AuthContext)

    const loggedInUserJSON = localStorage.getItem("loggedInUser");        
    const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');
    
    if (parseLoggedInUser){
        console.log("LOGADO")
        if (loggedInUser.token !== "" || parseLoggedInUser.token !== ""){
            return <Component />
        }
    } else {
        console.log("*NÃO LOGADO*");
        return <Navigate to="/login" />
    }



    /*
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
    */
}

export default ProtectRoute;



