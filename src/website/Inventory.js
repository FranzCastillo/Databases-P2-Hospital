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
import VaccinesIcon from '@mui/icons-material/Vaccines';
import {green} from '@mui/material/colors';


function Inventory() {
    const user = getUser();
    const navigate = useNavigate();
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });
    const [options, setOptions] = useState([]);
    const [place, setPlace] = useState([]);
    const [id, setID] = useState([]);
    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, []);


    //Al darle click al boton:
    const handleSubmit = async (e) => {
        e.preventDefault();
        //const {data: placeID} = await supabase.from('lugares').select('id').eq('nombre', place);
        //setId(placeID.map(id => id.id))
        supabase.from('lugares').select('id').eq('nombre', place).then(({data, error}) => {
            if (error) {
                console.log(error);
                
            } else {
                setID(data[0].id)
                navigate('/inventario/' + data[0].id);
            }
        })
        
    }

    const handleNewInput = async (event) => {
        event.preventDefault();
        navigate('/inventario/nuevo');
    }

    useEffect(() => {

        //Obtener los lugares que se muestran en el select
        async function getOptions() {
            const {data: optionsData} = await supabase.from('lugares').select('nombre');
            setOptions(optionsData.map(option => option.nombre));
        }

        getOptions();

    }, [id, userLoaded]);

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
                            <VaccinesIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Inventario de insumos
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
export default Inventory