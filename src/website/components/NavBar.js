import {NavLink} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/"> Inicio </a></li>
        <li><a href="#"> Expedientes </a></li>
        <li><a href="#"> Medicamentos e Insumos </a></li>
        <li><a href="#"> Historial de modificaciones </a></li>
        <li><a href="#"> Administración de usuarios </a></li>
        <li><a href="#"> Médicos </a></li>
        <li><a href="#"> Reportes </a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
