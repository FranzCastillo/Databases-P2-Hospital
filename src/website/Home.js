import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!supabase.auth.getUser()){
      navigate('/login'); 
    }

    const fetchEmail = async () => {
      const email = (await supabase.auth.getUser()).data.user.email
      setEmail(email);
    };
    fetchEmail();

  }, [navigate]);

  return (
    <div>
      <h1> Bienvenid@, {email} </h1>
      
      <button onClick={() => supabase.auth.signOut()}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Home