import './App.css';

import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import NavbarMenu from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import NotificationPage from "./pages/NotificationPage";
import AdminPage from './pages/AdminPage';

import {AuthContextComponent} from './contexts/authContext';
import ProtectRoute from './components/ProtectRoute';
import ProtectRouteAdmin from './components/ProtectRouteAdmin';

function App() {
  return (
    <div className="App">
      <Toaster />
      
      <AuthContextComponent>
        <NavbarMenu />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/profile' element={<ProtectRoute Component={ProfilePage} />}></Route>
          <Route path="/notificacoes" element={<ProtectRoute Component={NotificationPage} />}></Route>
          <Route path='/admin' element={<ProtectRouteAdmin Component={AdminPage} />}></Route>
          
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;

