import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';

import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import api from '../api/api.js';


function SignUpPage() {
    
    const navigate = useNavigate();

    // esse state vai guardar a imagem escolhida pelo usuário
    const [img, setImg] = useState();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(e) {
        setForm({...form , [e.target.name] : e.target.value});
    }

    function handleImage(e){
        //console.log(e.target.files[0]);
        setImg(e.target.files[0]);

        handleUpload();
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

        //chamar a função handleUpload()
        const imgUrl = await handleUpload()

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
                <br></br>
                Already have registration? <Link to="/login">Login</Link>
          </Col>
          <Col></Col>
        </Row>
        </Container>  
     );
}

export default SignUpPage;