import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import {supabase} from './supabase/client';
import Login from './website/Login';
import Home from './website/Home';
import NotFound from './website/NotFound';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session){
        navigate('/login');
      }
      else{
        navigate('/');
      }
    })
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
