import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase/client";
import {Link} from 'react-router-dom';
import Autocomplete from "@mui/material/Autocomplete";

const theme = createTheme();

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [address, setAddress] = useState('');
    const [imc, setImc] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [adictions, setAdictions] = useState('');
    const [diseases, setDiseases] = useState([]);
    const [userDiseases, setUserDiseases] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        supabase.from('enfermedades').select('id, nombre').then(({data, error}) => {
            data.forEach((disease) => {
                disease.label = disease.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setDiseases(data);
            }
        });
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from("pacientes")
                .insert({
                    nombres: firstName,
                    apellidos: lastName,
                    telefono: cellphone,
                    direccion: address,
                    imc: imc,
                    altura_en_cm: height,
                    peso_en_kg: weight,
                    adicciones: adictions
                });
            // Gets the id of the patient recently created
            const patientId = await supabase
                .from("pacientes")
                .select("id")
                .order("id", {ascending: false})
                .limit(1);
            await supabase
                .from("enfermedades_heredadas")
                .insert(userDiseases.map((disease) => {
                    return {
                        paciente_id: patientId.data[0].id,
                        enfermedad_id: disease.id
                    }
                } ));
            alert("Paciente creado con éxito!")
            navigate('/expedientes/nuevo');

        } catch (error) {
            console.log(error.message());
        }
    };

    return (
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
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrando Nuevo Paciente
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="imc"
                                    required
                                    fullWidth
                                    id="ïmc"
                                    label="IMC"
                                    autoFocus
                                    onChange={(event) => setImc(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="height"
                                    required
                                    fullWidth
                                    id="height"
                                    label="Altura (cm)"
                                    autoFocus
                                    onChange={(event) => setHeight(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="weight"
                                    required
                                    fullWidth
                                    id="weight"
                                    label="Peso (kg)"
                                    autoFocus
                                    onChange={(event) => setWeight(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="adictions"
                                    label="Adicciones"
                                    name="adictions"
                                    multiline={true}
                                    minRows={2}
                                    maxRows={3}
                                    autoFocus
                                    value={adictions}
                                    onChange={(e) => setAdictions(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    limitTags={2}
                                    id="multiple-limit-diseases"
                                    options={diseases}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Enfermedades Heredadas"
                                                   placeholder="Enfermedades"/>
                                    )}
                                    sx={{width: '500px'}}
                                    onChange={(event, value) => setUserDiseases(value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Registrar paciente
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/expedientes/nuevo" variant="body2">
                                    {"Regresar a un nuevo expediente"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}