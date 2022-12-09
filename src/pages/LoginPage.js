import {useState, useContext} from 'react';
import {AuthContext} from '../contexts/authContext';
import api from '../api/api.js';

import {Link, useNavigate} from 'react-router-dom';
import {Container,Row,Col,Button,Form,InputGroup,Image} from 'react-bootstrap';
import toast from 'react-hot-toast';

function LoginPage() {
    
    const {setLoggedInUser} = useContext(AuthContext);
    
    const navigate = useNavigate();    

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        setForm({...form , [e.target.name] : e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await api.post("/user/login", form);            
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));
            setLoggedInUser({...response.data});

            

            toast.success('Welcome!');
            navigate("/profile");

        } catch (error) {
            console.log(error);
            toast.error("Invalid email or password! Make sure your email is confirmed");
        }
    }
    
    return ( 
        <Container>
        
        <Row>
          <Col></Col>
          <Col xs={4} className="shadow p-3 mb-5 bg-body rounded mt-5">
            <Row className="mb-4">
                <Col className="text-center"><Image src="https://cdn-icons-png.flaticon.com/512/9051/9051831.png" alt="login" className="w-25"/></Col>
            </Row>
            
            <Form>      
            <InputGroup className="mb-3">
                <InputGroup.Text >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>                    
                    </InputGroup.Text>
                    <Form.Control type="email" placeholder="e-mail" name="email" onChange={handleChange} />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>             
                    </InputGroup.Text>
                    <Form.Control type="password" placeholder="password" name="password" onChange={handleChange} />
                </InputGroup>

                
                <Row className="mb-3">
                    <Col>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <small><Form.Check type="checkbox" name="remember" label="Remember me" onChange={handleChange} /></small>
                    </Form.Group>
                    </Col>
                    
                    <Col className="text-end">
                    <small><Link to="/">forgot your password?</Link></small>
                    </Col>
                </Row>
                
                <Row className="m-1">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Log in</Button>
                </Row>
            </Form>     

          </Col>
          <Col></Col>
        </Row>       
                       
        </Container>  
     );
}

export default LoginPage;

