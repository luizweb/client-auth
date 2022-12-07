import {Container, Col, Row, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../contexts/authContext';

function HomePage(){

    const { loggedInUser } = useContext(AuthContext);
    
    console.log(loggedInUser);

    return (        
            
        <Container className="mt-5">
            {loggedInUser && (
                <h5>Olá, {loggedInUser.user.name}!</h5>
            )}

            {!loggedInUser && (
                <h5>Visitante. Faça o <Link to="/login">login</Link></h5>
            )}

            <Row className="mt-5">
                <Col >
                    <Image width="400px" src="https://img.freepik.com/free-vector/digital-marketing-team-constructing-landing-home-page-tiny-people-painting-units-webpage-illustration-website-designers-content-managers-internet-promotion-concept-landing-page_74855-17962.jpg?w=1380&t=st=1670444951~exp=1670445551~hmac=a64c9911a5b2b30f5d79e907b53e1a1c854e4622ff2c2665ceafbde403955aab" />
                </Col> 
                <Col>
                    <Image width="400px" src="https://img.freepik.com/free-vector/happy-women-learning-language-online-isolated-landing-page-flat-style_74855-18887.jpg?t=st=1670441781~exp=1670442381~hmac=14e968fa59df8c5fd29950540bc039d0f1972ea44386395a6a1fa5ecafdc55e5" />
                </Col> 
                <Col>
                    <Image width="400px" src="https://img.freepik.com/free-vector/rx-prescription-landing-page-flat-style_74855-19031.jpg?t=st=1670441781~exp=1670442381~hmac=44eb1c33aeff5acc86446ede6c8efebcf6dbf0fc972f0924410fc5f9f6bcdc64" />
                </Col> 
                            
            </Row>
            
        </Container>
    )
}

export default HomePage;