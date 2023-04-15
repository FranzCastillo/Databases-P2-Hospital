import './index.css'
import {useState, useEffect} from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./website/Home";
import SignUp from "./website/SignUp";
import SignIn from "./website/SignIn";
import Records from "./website/Records";
import NotFound from "./website/NotFound";
import {supabase} from './supabase/client';


export default function App() {
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
        return (<div className="App">
            <Routes>
                <Route path="*" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
            </Routes>
        </div>)
    } else {
        return (<div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/expedientes" element={<Records/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>)
    }
}