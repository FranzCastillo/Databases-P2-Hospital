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
            await supabase.auth.signInWithOtp ({
                email: email,
            });

            const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq('email', email);

            if (data.length == 0){
                const result = await supabase.from("usuarios").insert({
                    email: email, 
                    role: "user"
                })
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
        <form onSubmit={handleSubmit}>
            <input 
                type="email"  
                name="email" 
                placeholder='tucorreo@correo.com' 
                onChange = {(e) => setEmail(e.target.value)}
            />
            <button>
                Send
            </button>
        </form>

    </div>
  )
}

export default Login