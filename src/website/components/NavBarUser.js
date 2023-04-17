import { supabase } from "../../supabase/client";
import {useNavigate} from "react-router-dom";

function NavBarUser() { //Navbar del user
    const navigate = useNavigate();
    
    function redirectPage() {
        navigate('/login');
        supabase.auth.signOut();
    }

    return (
        <nav className="navbar">
            <ul>
                <li><a href="/home"> Inicio </a></li>
                <li><a href="/inventario"> Inventario </a></li>
                <li><a href="/expedientes"> Expedientes </a></li>
                <li><a href="/bitacora"> Bitácora </a></li>
                <li><a href="/expedientes/nuevo"> Nueva Consulta </a></li>
                <li><a href="#" onClick={redirectPage} >Cerrar sesión</a></li>
            </ul>
        </nav>
    );
}

export default NavBarUser;
