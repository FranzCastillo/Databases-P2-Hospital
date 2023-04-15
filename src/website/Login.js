import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';


function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Validacion campo vacio
            if (email.trim() === '') {
                alert('El campo de entrada está vacío. Por favor, ingrese un valor.');
              }
            else{
                //Mandar link para ingresar al correo
                await supabase.auth.signInWithPassword ({
                    email: email,
                    password: password,
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
                    alert("Su correo no se encuentra registado.")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function redirectPage() {
        navigate('/signup');
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
        <form onSubmit={handleSubmit} id='LogInForm'>
            
            <b> Correo electrónico </b>
            <input 
                type="email"  
                name="email" 
                placeholder='tucorreo@correo.com' 
                onChange = {(e) => setEmail(e.target.value)}
            />
            <br></br>
            <br></br>
            <b> Contraseña </b>
            <input 
                type="password"  
                name="password"
                className='password' 
                placeholder='●●●●●●●●' 
                onChange = {(e) => setPassword(e.target.value)}
            />
            <br></br>
            <br></br>
            <button onClick={() => document.getElementById('LogInForm').reset()}>
                Iniciar Sesión
            </button>
        </form>

        <form onSubmit={redirectPage}>
            <br></br>
            <br></br>
            <br></br>
            <h3> ¿No tienes cuenta? </h3>
            <button onClick={() => document.getElementById('LogInForm').reset()}>
                Crear Cuenta
            </button>
        </form>


    </div>
  )
}

export default LogIn