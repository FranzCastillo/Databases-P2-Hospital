// import React from 'react'
// import NavBarUser from "./components/NavBarUser";
// import NavBarAdmin from "./components/NavBarAdmin";
// import {createNewUser, getUser, setNewUserPlace, setNewUserSpecialty} from "./components/UserInfo";
// import {useEffect, useState} from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import {createTheme, ThemeProvider} from '@mui/material/styles';
// import {useNavigate} from "react-router-dom";
// import {supabase} from "../supabase/client";
// import {Link} from 'react-router-dom';
// import Autocomplete from '@mui/material/Autocomplete';
//
// function Users() {
//     const user = getUser();
//     const [rol, setRol] = useState([]);
//     user.then(objeto => {
//         setRol(objeto["rol"]);
//     });
//     const theme = createTheme({
//         typography: {
//             fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
//         }
//     });
//
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [cellphone, setCellphone] = useState('');
//     const [colegiate_number, setColegiateNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [places, setPlaces] = useState([]);
//     const [place, setPlace] = React.useState('');
//     const [specialties, setSpecialties] = useState('');
//     const [specialty, setSpecialty] = useState('');
//     const navigate = useNavigate();
//
//     const handleCreateUser = async (event) => {
//         event.preventDefault();
//         try {
//             await supabase
//                 .from("medicos")
//                 .insert({
//                     nombres: firstName,
//                     apellidos: lastName,
//                     telefono: cellphone,
//                     direccion: address,
//                     num_colegiado: colegiate_number,
//                     correo: email,
//                 });
//
//             // Sets the user information in /components/UserInfo.js
//             const user = await createNewUser(email, place.id, specialty.id);
//             await supabase
//                 .from("especializados")
//                 .insert({
//                     medico_id: user.id,
//                     especialidad_id: specialty.id,
//                 });
//
//             await supabase
//                 .from("trabajos")
//                 .insert({
//                     medico_id: user.id,
//                     lugar_id: user.place,
//                 })
//
//
//             console.log("User created: ", user);
//             const { data, error } = await supabase.auth.admin.createUser({
//                 email: email,
//                 password: password,
//                 email_confirm: true
//               })
//               if (error){
//                 console.log(error)
//               }
//
//             alert("Usuario creado!")
//
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     const handleCreateUser = async (event) => {
//         event.preventDefault();
//         try {
//             await supabase
//                 .from("medicos")
//                 .insert({
//                     nombres: firstName,
//                     apellidos: lastName,
//                     telefono: cellphone,
//                     direccion: address,
//                     num_colegiado: colegiate_number,
//                     correo: email,
//                 });
//
//             // Sets the user information in /components/UserInfo.js
//             const user = await createNewUser(email, place.id, specialty.id);
//             await supabase
//                 .from("especializados")
//                 .insert({
//                     medico_id: user.id,
//                     especialidad_id: specialty.id,
//                 });
//
//             await supabase
//                 .from("trabajos")
//                 .insert({
//                     medico_id: user.id,
//                     lugar_id: user.place,
//                 })
//
//             alert("Usuario actualizado!")
//
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     // Creates an array of the places from the tables lugares
//     React.useEffect(() => {
//         supabase.from('lugares').select('id, nombre').then(({data, error}) => {
//             // Add a label to the places
//             data.forEach((place) => {
//                 place.label = place.nombre;
//             });
//             if (error) {
//                 alert(error.message);
//             } else {
//                 setPlaces(data);
//             }
//         });
//     }, []);
//
//     // Creates an array of the specialties from the tables especialidades
//     React.useEffect(() => {
//         supabase.from('especialidades').select('*').then(({data, error}) => {
//             data.forEach((specialty) => {
//                 specialty.label = specialty.nombre;
//             });
//             if (error) {
//                 alert(error.message);
//             } else {
//                 setSpecialties(data);
//             }
//         });
//     }, []);
//
//     return (
//         <div>
//             {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
//             <ThemeProvider theme={theme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline/>
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
//                         <ManageAccountsIcon/>
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Administrar usuario
//                     </Typography>
//                     <Box component="form" noValidate /*onSubmit={handleSubmit}*/ sx={{mt: 3}}>
//                         <Grid container spacing={2}>
//                             {/*TextBox for the first name*/}
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     autoComplete="given-name"
//                                     name="firstName"
//                                     required
//                                     fullWidth
//                                     id="firstName"
//                                     label="Nombres"
//                                     autoFocus
//                                     onChange={(event) => setFirstName(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the last name*/}
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="lastName"
//                                     label="Apellidos"
//                                     name="lastName"
//                                     autoComplete="family-name"
//                                     onChange={(event) => setLastName(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the cellphone number*/}
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     name="cellphone"
//                                     required
//                                     fullWidth
//                                     id="cellphone"
//                                     label="Teléfono"
//                                     autoFocus
//                                     onChange={(event) => setCellphone(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the collegiate number*/}
//                             <Grid item xs={12} sm={6}>
//                                 <TextField
//                                     name="colegiate_number"
//                                     required
//                                     fullWidth
//                                     id="colegiate_number"
//                                     label="Número de colegiado"
//                                     autoFocus
//                                     onChange={(event) => setColegiateNumber(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the address*/}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="address"
//                                     label="Dirección"
//                                     name="address"
//                                     autoComplete="address"
//                                     onChange={(event) => setAddress(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Combobox for the place of work*/}
//                             <Grid item xs={12}>
//                                 <Autocomplete
//                                     disablePortal
//                                     required
//                                     id="combo-box-places"
//                                     options={places}
//                                     renderInput={(params) => <TextField {...params} label="Lugar de trabajo"/>}
//                                     onChange={(event, value) => setPlace(value)}
//                                 />
//                             </Grid>
//                             {/*Combobox for specialties*/}
//                             <Grid item xs={12}>
//                                 <Autocomplete
//                                     disablePortal
//                                     required
//                                     id="combo-box-specialty"
//                                     options={specialties}
//                                     renderInput={(params) => <TextField {...params} label="Especialidad"/>}
//                                     onChange={(event, value) => setSpecialty(value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the email*/}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Correo Electrónico"
//                                     name="email"
//                                     autoComplete="email"
//                                     onChange={(event) => setEmail(event.target.value)}
//                                 />
//                             </Grid>
//                             {/*Textbox for the password*/}
//                             <Grid item xs={12}>
//                                 <TextField
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Contraseña"
//                                     type="password"
//                                     id="password"
//                                     autoComplete="new-password"
//                                     onChange={(event) => setPassword(event.target.value)}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                     <Button
//                                         fullWidth
//                                         variant="contained"
//                                         onClick={handleCreateUser}
//                                     >Crear Usuario</Button>
//                             </Grid>
//                             <Grid item xs={6}>
//                                     <Button
//                                         fullWidth
//                                         variant="contained"
//                                         //onClick={handleUdpateUser}
//                                     >Actualizar Usuario</Button>
//                                 </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//         <br></br>
//         </div>
//     )
// }
// export default Users