import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';

function HomePage(){

    

    const { loggedInUser } = useContext(AuthContext);
    
    return (        
            
        <Container className="mt-5">
            {loggedInUser && (
                <h5>Olá, {loggedInUser.user.name}!</h5>
            )}

            {!loggedInUser && (
                <h5>Visitante. Faça o <Link to="/login">login</Link></h5>
            )}
        </Container>
    )
}

export default HomePage;