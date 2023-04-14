import './App.css';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {supabase} from './supabase/client';

import SignUp from './website/SignUp';
import LogIn from './website/LogIn';
import Home from './website/Home';
import NotFound from './website/NotFound';
import Records from './website/Records';

import NavBarAdmin from './website/components/NavBarAdmin';
import NavBarUser from './website/components/NavBarUser';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  //Validación para que no deje entrar si el usuario no esta loggeado
  useEffect(() => {  
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/login')
      }
      else if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
        navigate('/');
      }
      
      //Obtener el usuario actual para ver su rol (admin o user)
      const getCurrentUser = async () => {
        const user = (await supabase.auth.getUser()).data.user
        if (user) {
          const { data, error } = await supabase
            .from("usuarios")
            .select("role")
            .eq('email', user.email);
  
          if (error) {
            console.log(error.message);
          } else {
            setUserRole(data[0].role);
          }
        }
      };
      getCurrentUser();
    });
  }, [navigate]);

  //Segunda linea del return: Validacion para el navbar, pues es diferente dependiendo de si es user o admin
  return (
    <div className="App">
      {userRole && location.pathname !== "/signup" && location.pathname !== "/login" && (userRole === 'user' ? <NavBarUser /> : <NavBarAdmin />)}
      <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/expedientes" element={<Records />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
