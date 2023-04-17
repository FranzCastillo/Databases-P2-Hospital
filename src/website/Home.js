import React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {supabase} from '../supabase/client';
import NavBarUser from "./components/NavBarUser";
import {getUser} from "./components/UserInfo";
import NavBarAdmin from "./components/NavBarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function createData(name,calories,fat,carbs,protein,) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
createData('Eclair', 262, 16.0, 24, 6.0),
createData('Cupcake', 305, 3.7, 67, 4.3),
createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BasicTable() {
return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
            <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    </TableContainer>
);
}

const card = () => {
    return (
        <div style={{position: 'absolute'}}>
            <Avatar src = "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"/>
            <h4></h4>
        </div>
    );
}

const getData = async () => {    
    const user = getUser();
    console.log('corrio');
    console.log(user);
}

function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const user = getUser();
    
    console.log('1');
    getData();
    console.log('2');

    async function redirectPage() {
        await supabase.auth.signOut();
        navigate('/login');
    }

    //Validación para que no deje entrar a login (pues el usuario ya está loggeado)
    useEffect(() => {
        if (!supabase.auth.getUser()) {
            console.log("AAAA")
            navigate('/signin');
        }

        //Obtener email para mostrarlo en la web
        const fetchEmail = async () => {
            const user = (await supabase.auth.getUser())
            const email = (await supabase.auth.getUser()).data.user.email
            setEmail(email);        
        };
        fetchEmail();
        
    }, [navigate]);
    
    return (
        <div>
            {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
            <h1> Bienvenidx, {getUser().correo}, {email} </h1>

            <div className='ContentContainer' style={{marginLeft: '25%', marginRight: '25%', height: '100%'}}>
                <h1>Mis Consultas</h1>
                <div className='TableContainer' >
                    {BasicTable()}
                </div>
            </div>
            
            <button onClick={redirectPage}>
                Cerrar sesión
            </button>            
        </div>
    )
}

export default Home