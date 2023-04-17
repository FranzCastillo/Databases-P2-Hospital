import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {supabase} from '../supabase/client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import {green} from '@mui/material/colors';

function Reports() {
    const user = getUser();
    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, []);
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });
    const [option, setOption] = useState([]);
    const navigate = useNavigate();

    const options = [
        { label: 'Top 10 las enfermedades más mortales', value: 1 },
        { label: 'Top 10 de los médicos que más pacientes han atendido', value: 2 },
        { label: 'Top 5 de los pacientes con más asistencias', value: 3 },
        { label: 'Reporte mensual de insumos', value: 4 },
        { label: 'Reporte de los 3 establecimientos que más pacientes atienden', value: 5 },
    ];

    //Al darle click al boton:
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(option.value)
        navigate('/reportes/' + option.value);
        
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
                            <StackedLineChartIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reportes
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 2, width: '100%'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-places"
                                        options={options}
                                        renderInput={(params) => <TextField {...params} label="Establecimiento"/>}
                                        onChange={(event, value) => setOption(value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Consultar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
    )
}
export default Reports