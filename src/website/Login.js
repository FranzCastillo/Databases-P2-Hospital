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
            //Validacion campo vacio
            if (email.trim() === '') {
                alert('El campo de entrada está vacío. Por favor, ingrese un valor.');
              }
            else{
                //Mandar magic link al email
                await supabase.auth.signInWithOtp ({
                    email: email,
                });
                
                //Select usuarios
                const {data} = await supabase
                .from("usuarios")
                .select("*")
                .eq('email', email);
                
                //Validacion, si el email no existe se ingresa, de lo contrario, no
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

    //Validación para que no deje entrar a otra página si no se ha loggeado
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