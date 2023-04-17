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
import Users from "./website/Users";
import Logs from "./website/Logs";
import Reports from "./website/Reports";
import NewRecord from "./website/NewRecord";
import NewPatient from "./website/NewPatient";
import SignOut from "./website/SignOut";
import ShowRecord from "./website/ShowRecord";
import ShowInventory from "./website/ShowInventory";
import NewInput from "./website/NewInput";
import ReportOne from "./website/ReportOne";
import ReportTwo from "./website/ReportTwo";
import ReportThree from "./website/ReportThree";
import ReportFour from "./website/ReportFour";
import ReportFive from "./website/ReportFive";

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
                <Route path="/" element={<SignIn/>}/>
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
                <Route path="/inventario/:id" element={<ShowInventory/>}/>
                <Route path="/inventario/nuevo" element={<NewInput/>}/>
                <Route path="/expedientes" element={<Records/>}/>
                <Route path="/usuarios" element={<Users/>}/>
                <Route path="/bitacora" element={<Logs/>}/>
                <Route path="/reportes" element={<Reports/>}/>
                <Route path="/reportes/1" element={<ReportOne/>}/>
                <Route path="/reportes/2" element={<ReportTwo/>}/>
                <Route path="/reportes/3" element={<ReportThree/>}/>
                <Route path="/reportes/4" element={<ReportFour/>}/>
                <Route path="/reportes/5" element={<ReportFive/>}/>
                <Route path="/expedientes/nuevo" element={<NewRecord/>}/>
                <Route path="/expedientes/:id" element={<ShowRecord/>}/>
                <Route path="patient/new" element={<NewPatient/>}/>
                <Route path={"/signout"} element={<SignOut/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>)
    }
}