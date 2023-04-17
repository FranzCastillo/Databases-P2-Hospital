function NavBarAdmin() { //Navbar del admin
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/home"> Inicio </a></li>
                <li><a href="/inventario"> Inventario </a></li>
                <li><a href="/expedientes"> Expedientes </a></li>
                <li><a href="/usuarios"> Administar usuarios </a></li>
                <li><a href="/bitacora"> Bitácora </a></li>
                <li><a href="/reportes"> Reportes </a></li>
                <li><a href="/expedientes/nuevo"> Nueva Consulta </a></li>
                <li><a href="/signout">Cerrar sesión</a></li>
            </ul>
        </nav>
    );
}

export default NavBarAdmin;
