import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

function ProtectRoute({Component}) {

  const { loggedInUser } = useContext(AuthContext)

  if (loggedInUser && loggedInUser.token !== "") {
    return <Component />
  } 
  
  // se for null, vai para o login
  if (!loggedInUser) {
    return <Navigate to='/login' />
  }
}
export default ProtectRoute;