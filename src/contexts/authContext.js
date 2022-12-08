import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

function AuthContextComponent(props) {
    
    const [loggedInUser, setLoggedInUser] = useState({ token: "", user:{} });
    
    useEffect(()=>{
        const loggedInUserJSON = localStorage.getItem("loggedInUser");        
        const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

        if (parseLoggedInUser.token) {
            console.log("A --> authContext --> LOGADO")
            setLoggedInUser(parseLoggedInUser);
        } else{
            console.log("B --> authContext --> não logado")
            setLoggedInUser(null);
        }

    },[])

    return ( 
        <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {props.children}
        </AuthContext.Provider>
     );
}

export {AuthContext, AuthContextComponent};

