import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

function AuthContextComponent(props) {    
    const [loggedInUser, setLoggedInUser] = useState({ token: "", user:{} });       

    useEffect(()=>{
        const loggedInUserJSON = localStorage.getItem("loggedInUser");        
        const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');

        //console.log('Dentro do useEffect do authContext' + parseLoggedInUser.token)

        if (parseLoggedInUser.token) {
            setLoggedInUser(parseLoggedInUser);
        } else{
            setLoggedInUser(null);
        }
    },[])

    

    //console.log('state loggedInUser:')
    //console.log(loggedInUser)

    return ( 
        <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {props.children}
        </AuthContext.Provider>
     );

    
}

export { AuthContext, AuthContextComponent };

