import './App.css';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {useEffect} from 'react';

import {supabase} from './supabase/client';
import Login from './website/Login';
import Home from './website/Home';
import NotFound from './website/NotFound';
import NavBar from './website/components/NavBar';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session){
        navigate('/login');
      }
      else if (window.location.pathname === '/login') {
        navigate('/');
      }
    })
  }, []);

  return (
    <div className="App">
      {location.pathname !== "/login" && <NavBar />}
      <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
