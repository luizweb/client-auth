import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import {Link} from 'react-router-dom';

import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';

function NavbarMenu(){

    const { loggedInUser } = useContext(AuthContext);

    return (
        <Navbar bg="primary">
            <Container>
            <Link to='/'><Navbar.Brand className='fs-3 text-white'>luizweb</Navbar.Brand></Link>
              <div>
                
                {!loggedInUser && (
                  <>
                    <Link to='/signup'><Button variant="outline-light" className="mx-2">Sign Up</Button></Link>                
                    <Link to='/login'><Button variant="warning" className="mx-2">Log In</Button></Link>
                  </>
                )}

                

                
                
                {loggedInUser && (
                  <>

                  {loggedInUser.user.role === "ADMIN" && (
                    <Link to='/admin'><Button variant="dark" className="mx-2">ADMIN</Button></Link>
                  )}

                  <span className="text-white mx-2">{loggedInUser.user.name} </span>
                  <Link to='/profile' className="text-white">
                    
                    <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" width="35px" alt="user" /> 
                  </Link>
                  
                  </>
                )}
                
              
              </div>
            </Container>
        </Navbar>
      
    )
};

export default NavbarMenu; 