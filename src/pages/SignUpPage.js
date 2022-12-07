import {useState} from 'react';
import api from '../api/api.js';

import { Link, useNavigate } from "react-router-dom";
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import toast from 'react-hot-toast';


function SignUpPage() {
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [img, setImg] = useState("");

    function handleChange(e) {
        setForm({...form , [e.target.name] : e.target.value});
    }

    function handleImage(e){
        setImg(e.target.files[0]);
    }

    async function handleUpload(e){
        try {
            const uploadData = new FormData();
            uploadData.append("picture", img);
            
            const response = await api.post("/uploadImage/upload", uploadData);
            
            return response.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (form.password !== form.confirmPassword) {
            toast.error("Senhas incompatíveis!");
            return;
        }

        const imgUrl = await handleUpload();

        try {
            await api.post("/user/signup", {...form, profilePic: imgUrl});
            toast.success('New user successfully registered!')
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Error registering user.");
        }
    }
    
    return ( 
        <Container>
        <Row>
          <Col></Col>
          <Col xs={8} className="shadow p-3 mb-5 bg-body rounded mt-5">           

                <Form>                
                    <Form.Group className="mb-2">                    
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name="name" onChange={handleChange} />                   
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" name="email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Profile image: </Form.Label>
                        <Form.Control type="file" placeholder="Enter your profile image" name="profilePic" onChange={handleImage} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Confirm Password: </Form.Label>
                        <Form.Control type="password" placeholder="Confirm your password" name="confirmPassword" onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>Sign Up!</Button>                   
                </Form>  
                
                <Row><Col className="mt-3">Already have registration? <Link to="/login">Login</Link></Col></Row>
          </Col>
          <Col></Col>
        </Row>
        </Container>  
     );
}

export default SignUpPage;


