import { useState, useEffect } from "react";
import api from "../api/api";
import {Link} from 'react-router-dom';
import {Container, Table, Button, Pagination } from 'react-bootstrap';

function NotificationPage() {
  
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/log/my-logs");
        setLogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLogs();
  }, []);


  return (
      <Container className="mt-5">             

        <h4>User Logs</h4>
        <Table striped bordered hover className="mt-3">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Route</th>
                    <th>Log</th>
                    <th>Date</th>
                    
                </tr>
            </thead>
            
            <tbody>

            {!isLoading &&
                logs.map((log)=>{
                    return (
                        <tr key={log._id}>
                            <td>{log.user._id}</td>
                            <td>{log.user.name}</td>
                            <td>{log.route}</td>
                            <td>{log.log}</td>
                            <td>{log.date.slice(0,10)}</td>
                            
                        </tr>
                    )
                }).reverse()
            }
            </tbody>
            
         </Table>

         <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>



            <Link to="/admin"><Button variant="primary">Back to Admin</Button></Link>
            

         </Container>
  );
}

export default NotificationPage;