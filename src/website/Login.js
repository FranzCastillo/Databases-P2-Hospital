import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';


function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email.trim() === '') {
                alert('El campo de entrada está vacío. Por favor, ingrese un valor.');
              }
            else{
                await supabase.auth.signInWithOtp ({
                    email: email,
                });
    
                const {data} = await supabase
                .from("usuarios")
                .select("*")
                .eq('email', email);
    
                if (data.length === 0){
                    await supabase.from("usuarios").insert({
                        email: email, 
                        role: "user"
                    })
                }
                alert("Se ha enviado un enlace para ingresar a su correo. Por favor revise su bandeja.")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!supabase.auth.getUser()){
          navigate('/');
        }
      }, [navigate]);
  
  return (    
    <div>
        <h1> Iniciar Sesión </h1>
        <form onSubmit={handleSubmit}>
            
            <input 
                type="email"  
                name="email" 
                placeholder='tucorreo@correo.com' 
                onChange = {(e) => setEmail(e.target.value)}
            />
            <br></br>
            <br></br>
            <button>
                Enviar
            </button>
        </form>

    </div>
  )
}

export default Login