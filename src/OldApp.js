import './App.css';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {supabase} from './supabase/client';

import Home from './website/Home';
import SignIn from "./website/SignIn";
import SignUp from "./website/SignUp";
import NotFound from './website/NotFound';
import Records from './website/Records';

import './website/SignIn';
import NavBarAdmin from './website/components/NavBarAdmin';
import NavBarUser from './website/components/NavBarUser';

function App() {
    const [session, setSession] = useState(null)
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<div><h1>???</h1></div>);
    } else {
        return (<div className="App">

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<SignIn/>}/>
                <Route path="/expedientes" element={<Records/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>)
    }


}

export default App;
