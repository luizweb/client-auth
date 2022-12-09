import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import api from "../api/api";

import {Container, Table, Button} from 'react-bootstrap';

function AdminPage() {
    
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchUser() {
            
            
            try {
            const response = await api.get("/user/admin");
            setUsers(response.data);
            
          } catch (error) {
            console.log(error);
            
          }
        }    
        fetchUser();
      }, []);

    return ( 
        <Container className="mt-5">
        
               

        <h4>Users</h4>
        <Table striped bordered hover className="mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Confirmed</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>+</th>
                </tr>
            </thead>
            
            <tbody>

            {
                users.map((user)=>{
                    return (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{(user.confirmEmail)?"Y":"N"}</td>
                            <td>{user.role}</td>
                            <td>{user.createdAt.slice(0,10)}</td>
                            <td> + </td>
                        </tr>
                    )
                })
            }
            </tbody>
            
         </Table>
         <div className="d-flex">
            <Link to="/"><Button variant="primary">Back to home</Button></Link>
            <Link className="nav-link" to="/logs"><Button variant="dark" className="mx-2">User Logs</Button></Link>
         </div>
         </Container>

     );
}

export default AdminPage;