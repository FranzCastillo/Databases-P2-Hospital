import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  function redirectPage() {
    navigate('/login');
    supabase.auth.signOut()
}

  //Validación para que no deje entrar a login (pues el usuario ya está loggeado)
  useEffect(() => {
    if (!supabase.auth.getUser()){
      console.log("AAAA")
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
      
      <button onClick={redirectPage}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default Home