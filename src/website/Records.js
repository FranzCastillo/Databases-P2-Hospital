import React from 'react';
import {useEffect, useState} from 'react';
import {supabase} from '../supabase/client';
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {green} from "@mui/material/colors";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Records() {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });

    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (userLoaded) {
            supabase.from('pacientes').select('id, nombres, apellidos').then(({data, error}) => {
                data.forEach((patient) => {
                    patient.label = patient.nombres + ' ' + patient.apellidos;
                });
                if (error) {
                    alert.log(error);
                } else {
                    setPatients(data);
                }
            })
        }
    }, [userLoaded]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate('/expedientes/' + patient.id);
    }
    return (
        <div>
            {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth={"xs"}>
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{bgcolor: green[500]}} variant="rounded">
                            <SearchIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Expedientes
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-patients"
                                        options={patients}
                                        renderInput={(params) => <TextField {...params} label="Pacientes"/>}
                                        onChange={(event, value) => setPatient(value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Buscar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Records
