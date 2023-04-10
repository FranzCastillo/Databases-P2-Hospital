import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  //Validación para que no deje entrar a login (pues el usuario ya está loggeado)
  useEffect(() => {
    if (!supabase.auth.getUser()){
      navigate('/login'); 
    }
    
    //Obtener email para mostrarlo en la web
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