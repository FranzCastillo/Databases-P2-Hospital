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
import AddIcon from '@mui/icons-material/Add';
import {green} from '@mui/material/colors';

function NewInput() {
    const user = getUser();
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [place, setPlace] = useState([]);
    const [input, setInput] = useState([]);
    const [placeID, setPlaceID] = useState([]);
    const [inputID, setInputID] = useState([]);
    const [initialNumber, setInitialNumber] = useState([]);
    const [actualNumber, setActualNumber] = useState([]);
    const [rol, setRol] = useState([]);
    user.then(objeto => {
        setRol(objeto["rol"]);
        console.log(rol); // "admin"
    });

    //Al darle click al boton:
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Función no terminada")
        //const {data: placeID} = await supabase.from('lugares').select('id').eq('nombre', place);
        //setId(placeID.map(id => id.id))
        /*supabase.from('lugares').select('id').eq('nombre', place).then(({data, error}) => {
            if (error) {
                console.log(error);
                
            } else {
                //setID(data[0].id)
                navigate('/inventario/' + data[0].id);
            }*/
        //})
        
    }

    useEffect(() => {

        //Obtener los lugares que se muestran en el select
        async function getOptions() {
            const {data: optionsData} = await supabase.from('lugares').select('nombre');
            setOptions(optionsData.map(option => option.nombre));
        }

        getOptions();

        async function getOptions2() {
            const {data: optionsData2} = await supabase.from('insumos').select('nombre');
            setOptions2(optionsData2.map(option2 => option2.nombre));
        }

        getOptions2();

    }, []);

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
                            <AddIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ingresar insumos
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
                                        onChange={(event, value) => setPlace(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-inputs"
                                        options={options2}
                                        renderInput={(params) => <TextField {...params} label="Insumo"/>}
                                        onChange={(event, value) => setInput(value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="actual_number"
                                        required
                                        fullWidth
                                        id="actual_number"
                                        label="Cantidad actual"
                                        autoFocus
                                        onChange={(event) => setActualNumber(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="initial_number"
                                        required
                                        fullWidth
                                        id="initial_number"
                                        label="Cantidad inicial"
                                        autoFocus
                                        onChange={(event) => setInitialNumber(event.target.value)}
                                    />
                                </Grid>
                                
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Actualizar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </div>
  )
}

export default NewInput