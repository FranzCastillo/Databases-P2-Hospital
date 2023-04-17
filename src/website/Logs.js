import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {supabase} from '../supabase/client';


function BasicTable(filas) {
    if (filas === null || filas.length === 0) {
        return(
            <div>
                <h3>Todavía no existen consultas.</h3>
            </div>
        );
    }else{
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">id</TableCell>
                            <TableCell align="right">ID doctor</TableCell>
                            <TableCell align="right">Nombres</TableCell>
                            <TableCell align="right">Apellidos</TableCell>
                            <TableCell align="right">Teléfono</TableCell>
                            <TableCell align="right">Direccion</TableCell>
                            <TableCell align="right">Número de Colegiado</TableCell>
                            <TableCell align="right">Correo</TableCell>
                            <TableCell align="right">Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filas.map((row) => (
                            <TableRow
                                key={row.nombres}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nombres}
                                </TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">{row.id_medico}</TableCell>
                                <TableCell align="right">{row.nombres}</TableCell>
                                <TableCell align="right">{row.apellidos}</TableCell>
                                <TableCell align="right">{row.telefono}</TableCell>
                                <TableCell align="right">{row.direccion}</TableCell>
                                <TableCell align="right">{row.num_colegiado_medicos}</TableCell>
                                <TableCell align="right">{row.rol_medicos}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

function BasicTable2(filas) {
    if (filas === null || filas.length === 0) {
        return(
            <div>
                <h3>Todavía no existen consultas.</h3>
            </div>
        );
    }else{
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">id_doctor</TableCell>
                            <TableCell align="right">id_consulta</TableCell>
                            <TableCell align="right">paciente_id_consulta</TableCell>
                            <TableCell align="right">lugar_id_consulta</TableCell>
                            <TableCell align="right">fecha_consulta</TableCell>
                            <TableCell align="right">observaciones_consulta</TableCell>
                            <TableCell align="right">status_id_consulta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filas.map((row) => (
                            <TableRow
                                key={row.nombres}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.nombres}
                                </TableCell>
                                <TableCell align="right">{row.id_doctor}</TableCell>
                                <TableCell align="right">{row.id_consulta}</TableCell>
                                <TableCell align="right">{row.paciente_id_consulta}</TableCell>
                                <TableCell align="right">{row.lugar_id_consulta}</TableCell>
                                <TableCell align="right">{row.fecha_consulta}</TableCell>
                                <TableCell align="right">{row.observaciones_consulta}</TableCell>
                                <TableCell align="right">{row.status_id_consulta}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

function Logs() {
    const user = getUser();
    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [dataM, setDataM] = useState([]);
    const [dataC, setDataC] = useState([]);

    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, []);

    useEffect(() => {
        supabase.rpc('get_bitacora_medicos').then(({ data, error }) => {
            if (error) {
                console.log(error);
            }else{
                console.log(data); 
                setDataM(data)                           
            }
        })

        supabase.rpc('get_bitacora_consultas').then(({ data, error }) => {
            if (error) {
                console.log(error);
            }else{
                console.log(data); 
                setDataC(data)                           
            }
        })

    }, []);




    return (
        <div>
            {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
            <div className='ContentContainer' style={{marginLeft: '10%', marginRight: '10%', height: '100%'}}>
                <h1>Bitácora Médicos</h1>
                {BasicTable(dataM)}
                <div>
                    <h1>Bitácora Consultas</h1>
                    {BasicTable2(dataC)}
                </div>
            </div>
            
        </div>
    )
}
export default Logs