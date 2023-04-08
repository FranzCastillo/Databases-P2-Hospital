import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase.auth.getUser()){
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      Home

      <button onClick={() => supabase.auth.signOut()}>
        Log Out
      </button>
    </div>
  )
}

export default Home