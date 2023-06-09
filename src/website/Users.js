import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {createNewUser, getUser, setNewUserPlace, setNewUserSpecialty} from "./components/UserInfo";
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase/client";
import {Link} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

function Users() {
    const user = getUser();
    const [rol, setRol] = useState([]);
    user.then(objeto => {
        setRol(objeto["rol"]);
    });
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [colegiate_number, setColegiateNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [places, setPlaces] = useState([]);
    const [place, setPlace] = React.useState('');
    const [specialties, setSpecialties] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [role, setRole] = useState('');
    const [flagNumber, setFlagNumber] = useState('');
    const [flagID, setFlagID] = useState('');
    const [flagRol, setFlagRol] = useState('');
    const [medicsNumbers, setMedicsNumbers] = useState('');
    const navigate = useNavigate();

    const roles = [
        { label: 'Administrador', value: 'admin' },
        { label: 'Usuario', value: 'user' },
      ];

    // Creates an array of the places from the tables lugares
    React.useEffect(() => {
        supabase.from('lugares').select('id, nombre').then(({data, error}) => {
            // Add a label to the places
            data.forEach((place) => {
                place.label = place.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setPlaces(data);
            }
        });
    }, []);

    // Creates an array of the specialties from the tables especialidades
    React.useEffect(() => {
        supabase.from('especialidades').select('*').then(({data, error}) => {
            data.forEach((specialty) => {
                specialty.label = specialty.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setSpecialties(data);
            }
        });
    }, []);

    // Creates an array of the colegiates numbers
    React.useEffect(() => {
        supabase.from('medicos').select('num_colegiado').then(({data, error}) => {
            if (error) {
                alert(error.message);
            } else {
                setMedicsNumbers(data);
            }
        });
    }, []);

    function validateForm() {
        const form = document.querySelector('form');
        const fields = form.elements;
      
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].required && fields[i].value.trim() === '') {
            alert('Por favor complete todos los campos del formulario');
            return false;
          }
        }
        return true;
      }
      
    const handleCreateUser = async (event) => {
        if (validateForm()){
            event.preventDefault();
            let contador = 0;
            for (let i = 0; i <= medicsNumbers.length - 1; i++) {
                if (medicsNumbers[i].num_colegiado === colegiate_number){
                    contador = contador + 1;
                }
            }
            if (contador == 0){
                try {
                    await supabase
                        .from("medicos")
                        .insert({
                            nombres: firstName,
                            apellidos: lastName,
                            telefono: cellphone,
                            direccion: address,
                            num_colegiado: colegiate_number,
                            correo: email,
                            rol: role.value,
                        });
        
                    // Sets the user information in /components/UserInfo.js
                    const user = await createNewUser(email, place.id, specialty.id);
                    await supabase
                        .from("especializados")
                        .insert({
                            medico_id: user.id,
                            especialidad_id: specialty.id,
                        });
        
                    await supabase
                        .from("trabajos")
                        .insert({
                            medico_id: user.id,
                            lugar_id: user.place,
                        })
        
        
                    console.log("User created: ", user);
                    const { data, error } = await supabase.auth.admin.createUser({
                        email: email,
                        password: password,
                        email_confirm: true
                    })
                    if (error){
                        console.log(error)
                    }
        
                    alert("Usuario creado!")
        
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                alert("El usuario ya existe")
            }
        }
        
        
    };

    const handleUpdateUser = async (event) => {
        if (validateForm()){
            event.preventDefault();
            let contador = 0;
            for (let i = 0; i <= medicsNumbers.length - 1; i++) {
                if (medicsNumbers[i].num_colegiado === colegiate_number){
                    contador = contador + 1;
                    setFlagNumber(medicsNumbers[i].num_colegiado)
                    supabase.from('medicos').select('id').eq('num_colegiado', flagNumber).then(({data, error}) => {
                        if (error) {
                            alert(error.message);
                        } else {
                            setFlagID(data[0].id);
                        }
                    });
                }
            }
            if (contador > 0){
                try {
                    await supabase
                        .from("medicos")
                        .update({
                            nombres: firstName,
                            apellidos: lastName,
                            telefono: cellphone,
                            direccion: address,
                            num_colegiado: colegiate_number,
                            correo: email,
                            rol: role.value,
                        })
                        .eq('num_colegiado', flagNumber);
                    
                    await supabase
                        .from("especializados")
                        .update({
                            medico_id: flagID,
                            especialidad_id: specialty.id,
                        })
                        .eq('medico_id', flagID);
        
                    await supabase
                        .from("trabajos")
                        .update({
                            medico_id: flagID,
                            lugar_id: place.id, 
                        })
                        .eq('medico_id', flagID);
        
                    alert("Usuario actualizado!")
        
                } catch (error) {
                    console.log(error);
                }
            }
            else{
                alert("El usuario no existe")
            }
        }
        
    };


    return (
        <div>
            {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <ManageAccountsIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Administrar usuario
                    </Typography>
                    <Box component="form" noValidate /*onSubmit={validateForm()}*/ sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            {/*TextBox for the first name*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombres"
                                    autoFocus
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </Grid>
                            {/*Textbox for the last name*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellidos"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </Grid>
                            {/*Textbox for the cellphone number*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="cellphone"
                                    required
                                    fullWidth
                                    id="cellphone"
                                    label="Teléfono"
                                    autoFocus
                                    onChange={(event) => setCellphone(event.target.value)}
                                />
                            </Grid>
                            {/*Textbox for the collegiate number*/}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="colegiate_number"
                                    required
                                    fullWidth
                                    id="colegiate_number"
                                    label="Número de colegiado"
                                    autoFocus
                                    onChange={(event) => setColegiateNumber(event.target.value)}
                                />
                            </Grid>
                            {/*Textbox for the address*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Dirección"
                                    name="address"
                                    autoComplete="address"
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </Grid>
                            {/*Combobox for the place of work*/}
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    required
                                    id="combo-box-places"
                                    options={places}
                                    renderInput={(params) => <TextField {...params} label="Lugar de trabajo"/>}
                                    onChange={(event, value) => setPlace(value)}
                                />
                            </Grid>
                            {/*Combobox for specialties*/}
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    required
                                    id="combo-box-specialty"
                                    options={specialties}
                                    renderInput={(params) => <TextField {...params} label="Especialidad"/>}
                                    onChange={(event, value) => setSpecialty(value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    required
                                    id="combo-box-role"
                                    options={roles}
                                    renderInput={(params) => <TextField {...params} label="Rol"/>}
                                    onChange={(event, value) => setRole(value)}
                                />
                            </Grid>
                            {/*Textbox for the email*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            {/*Textbox for the password*/}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleCreateUser}
                                    >Crear Usuario</Button>
                            </Grid>
                            <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleUpdateUser}
                                    >Actualizar Usuario</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <br></br>
        </div>
    )
}
export default Users