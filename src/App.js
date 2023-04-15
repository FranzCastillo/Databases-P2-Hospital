import './index.css'
import {useState, useEffect} from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./website/Home";
import SignUp from "./website/SignUp";
import SignIn from "./website/SignIn";
import Records from "./website/Records";
import NotFound from "./website/NotFound";
import {supabase} from './supabase/client';
import Inventory from "./website/Inventory";
import Medics from "./website/Medics";
import Logs from "./website/Logs";
import Reports from "./website/Reports";
import NewRecord from "./website/NewRecord";


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
                <Route path="/inventario" element={<Inventory/>}/>
                <Route path="/expedientes" element={<Records/>}/>
                <Route path="/medicos" element={<Medics/>}/>
                <Route path="/bitacora" element={<Logs/>}/>
                <Route path="/reportes" element={<Reports/>}/>
                <Route path="/expedientes/nuevo" element={<NewRecord/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>)
    }
}