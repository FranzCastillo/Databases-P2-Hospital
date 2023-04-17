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



function BasicTable(filas) {
    if (filas === null || filas.length === 0) {
        return(
            <div>
                <h3>Todavía no tienes consultas.</h3>
            </div>
        );
    }else{
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Apellidos</TableCell>
                            <TableCell align="right">Hospital</TableCell>
                            <TableCell align="right">Observaciones</TableCell>
                            <TableCell align="right">Status</TableCell>
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
                                <TableCell align="right">{row.apellidos}</TableCell>
                                <TableCell align="right">{row.lugar_nombre}</TableCell>
                                <TableCell align="right">{row.observaciones}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

const card = (name, lastName,email) => {
    return (
        <div style={{ marginLeft:'25px', marginTop: '25px',position: 'absolute', display:'flex', flexDirection:'row'}}>
            <Avatar src = "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"/>
            <div id = 'info' style={{paddingLeft:'5px'}}>
                <h5 style={{marginTop:'0', marginBottom: '0'}}>{name} {lastName}</h5>
                <h5 style={{fontWeight:'normal', marginTop:'0',marginBottom:'0'}}>{email}</h5>
            </div>
        </div>
    );
}

const box = (callback) => {
    return (
        <div id='box' style={{display:'flex', backgroundColor:'#cfcfcf', height:'300px', marginTop: '25px', borderRadius:'5px', overflow:'hidden', boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.1)'}}>
            <img style={{height:'inherit', marginRight: '12px'}} src='https://www.hartmann.info/en-dx/-/media/corporate/img/nci-2/hartmann-personalhealthcare-stage-nci.jpg?h=1100&iar=0&mw=1440&w=1440&rev=1ed346208e7d4ab39c861f7703313a89&sc_lang&hash=E7CBDCE65634232C758D591FCB04C197'></img>
            <div id='textContainer' style={{display:'flex', flexDirection:'column'}}>
                <p style={{color:'white'}}>Bienvenido al software de salud diseñado especialmente para médicos como tú. Nuestra herramienta es una solución integral para la gestión de pacientes, historiales médicos, y citas</p>
                <div style={{display:'flex', justifyContent: 'right', padding:'20px' }}>
                    <div id='buttonWrapper' style = {{backgroundColor:'#0072c6', height:'20px', display:'flex', alignItems:'center', borderRadius:'5px', padding:'7px'}}>
                        <a style ={{color:'white'}} onClick={() =>  callback()} >Nueva Consulta</a>
                    </div>
                </div>
            </div>
        </div>
    );
}




function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const user = getUser();
    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [rows, setRows] = useState(null);
    const [doctorId, setDoctorId] = useState(null);    

    const handleClick = () => {
    // Navigate to the "/about" page
        navigate('/expedientes/nuevo');
    }

    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, []);


    user.then(objeto => {
        setRol(objeto["rol"]);
        console.log(rol); // "admin"
    });

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

    }, [navigate, userLoaded]);

    useEffect(() => {
        //obtener nombres y apellidos del usuario
        const user2 = getUser()
        user2.then(response => setName(response["nombres"]));

        user2.then(response => setLastName(response["apellidos"]));

        user2.then(response => setDoctorId(response["id"]));
    }, [userLoaded]);

    useEffect(() => {
        supabase.rpc('get_consultas2', {id_medico_param: doctorId}).then(({ data, error }) => {
            if (error) {
                console.log(error);
            }else{
                console.log(data);
                console.log(doctorId);
                setRows(data);
            }
        })
    }, [userLoaded]);

    return (
        <div>
            {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
            {card(name, lastName, email)}
            <div className='ContentContainer' style={{marginLeft: '25%', marginRight: '25%', height: '100%'}}>
                <h1>Mis Consultas</h1>
                <div className='TableContainer' >
                    {BasicTable(rows)}
                </div>
                {box(handleClick)}
            </div>            
        </div>
    )
}

export default Home