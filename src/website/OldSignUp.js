import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';


function SignUp() {
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
                await supabase.auth.signUp ({
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
                    alert("Se ha enviado un enlace a su correo electrónico para acceder a su cuenta. Por favor, revise su bandeja de entrada.")
                }
                else{
                    alert("El correo electrónico ingresado ya está en uso.")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function redirectPage() {
        navigate('/login');
        
    }

    //Validación para que no deje entrar a otra página si no se ha loggeado
    useEffect(() => {
        if (!supabase.auth.getUser()){
          navigate('/');
        }
      }, [navigate]);
  
  return (    
    <div>
        <h1> Crear Cuenta </h1>
        <form onSubmit={handleSubmit} id='SignUpForm'>
            
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
            <button onClick={() => document.getElementById('SignUpForm').reset()}>
                Enviar
            </button>
        </form>

        <form onSubmit={redirectPage}>
            <br></br>
            <br></br>
            <br></br>
            <h3> ¿Ya tienes cuenta? </h3>
            <button onClick={() => document.getElementById('SignUpForm').reset()}>
                Iniciar Sesión
            </button>
        </form>


    </div>
  )
}

export default SignUp