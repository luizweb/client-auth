import {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import toast from 'react-hot-toast';

import api from "../api/api";
import {AuthContext} from "../contexts/authContext";


function ProfilePage() {
    
    const { setLoggedInUser } = useContext(AuthContext);    
    const navigate = useNavigate();
    const [img, setImg] = useState("");    
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    useEffect(() => {
        async function fetchUser() {
          try {
            const response = await api.get("/user/profile");
            setUser(response.data);
          } catch (error) {
            console.log(error);
          }
        }    
        fetchUser();
      }, []);


    function signOut(){
      localStorage.removeItem("loggedInUser");
      setLoggedInUser(null);
      navigate("/");
    };
    
    function handleChange(e) {
        console.log(form);
        setForm({...form , [e.target.name] : e.target.value});
        
    };

    function handleImage(e){
        setImg(e.target.files[0]);
    };

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
        
        //const imgUrl = await handleUpload();

        try {
            //await api.post("/user/signup", {...form, profilePic: imgUrl});
            toast.success('User successfully edited!')
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Error when editing a user.");
        }

    }

    
    
    return ( 
        <Container>
            {!showForm && (

            <Row>
              <Col></Col>
              <Col xs={6} className="shadow p-3 mb-5 bg-body rounded mt-5">
                    
                    <Row>
                        <Col md="auto">
                          <img src={user.profilePic} alt="profilepic" width="200px" height="200px" />
                        </Col>
                        
        
                        <Col>
                          <Row className="my-3">
                              <Col xs={3} className="fw-bold">Name: </Col>
                              <Col>{user.name}</Col>
                          </Row>
                          
                          <Row className="my-3">
                              <Col xs={3} className="fw-bold">Email: </Col>
                              <Col>{user.email}</Col>
                          </Row>
                      
                          <Row className="my-3">
                              <Col xs={3} className="fw-bold">Role: </Col>
                              <Col>{user.role}</Col>
                          </Row>

                          <br></br>
                            <Link to="/"><Button variant="primary" type="submit">Cancel</Button></Link> 
                            <Button variant="primary" type="submit" className="mx-2" onClick={()=>{setShowForm(!showForm)}}>Update</Button>
                      
                        </Col>
                    </Row>
                    
              </Col>
              <Col></Col>
    
              <Row><Col className="d-flex justify-content-center"><Button variant="primary" className="mx-2" onClick={signOut}>Sign Out</Button></Col></Row>
            </Row>
               
            )}

            {showForm && (
            <Row>
              <Col></Col>
              <Col xs={6} className="mt-5">
                    
                    
    
                    <Col>
                    
                    <Form>                
                        <Form.Group className="mb-2" >                    
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" name="name" onChange={handleChange} />                   
                        </Form.Group>

                        <Form.Group className="mb-2" >
                            <Form.Label>Email: </Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" name="email" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Profile image: </Form.Label>
                            <Form.Control type="file" placeholder="Enter your profile image" name="profilePic" onChange={handleImage} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Change Password: </Form.Label>
                            <Form.Control type="password" placeholder="Enter your new password" name="password" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Confirm Password: </Form.Label>
                            <Form.Control type="password" placeholder="Confirm your password" name="confirmPassword" onChange={handleChange} />
                        </Form.Group>

                        
                        <Button variant="primary" type="submit" onClick={()=>{setShowForm(!showForm)}}>Cancel</Button>
                        <Button variant="warning" type="submit" className="mx-2" onClick={handleSubmit}>Update</Button>                  
                    </Form> 



                    </Col>
                  
              </Col>
              <Col></Col>
    
              
            </Row>
            )}

        </Container>
     );
}

export default ProfilePage;