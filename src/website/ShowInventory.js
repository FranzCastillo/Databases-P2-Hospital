import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
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

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ShowInventory() {
    const user = getUser();
    const theme = createTheme({
        typography: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        }
    });
    //const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [place, setPlace] = useState([]);
    // To load the right navbar
    const [rol, setRol] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(() => {
        getUser().then(objeto => {
            setRol(objeto["rol"]);
            setUserLoaded(true);
        });
    }, [userLoaded]);

    const {id} = useParams();

    useEffect(() => {
        supabase.rpc('getinsumos', {selected_id: parseInt(id)}).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                setInputs(data);
            }
        })

        supabase.from('lugares').select('nombre').eq('id', id).then(({data, error}) => {
            if (error) {
                console.log(error);
                
            } else {
                setPlace(data[0].nombre)
            }
        })
        
    }, [inputs, userLoaded]);

  return (
    <div>
        {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}
        <br></br>
        <div className='divNewPage'>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Typography sx={{width: '33%', flexShrink: 0}} variant="h5">
                        {place} <br/> <br/>
                    </Typography>
                                {inputs.length === 0 ? (
                                <Typography>No hay inventario</Typography>
                                ) : (
                                    <>
                                        {inputs.map(input => (
                                            <Accordion
                                            //key={index}
                                            //expanded={expanded === `panel${index}`}
                                            //onChange={handleChange(`panel${index}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                //aria-controls={`panel${index}bh-content`}
                                                //id={`panel${index}bh-header`}
                                                sx={{width: '100%'}}
                                            >
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    width: '100%'
                                                }}>
                                                    <Typography sx={{width: '33%'}}>
                                                    <span style={{fontWeight: "bold"}}>{input.nombre_insumo} </span>
                                                    </Typography>
                                                    <Typography sx={{width: '50%'}}>
                                                        {input.cantidad_actual / input.cantidad_inicial < 0.15 ? <p className='red'> ADVERTENCIA: queda menos del 15% del insumo </p> : null}
                                                    </Typography>
                                                </Box>
                                            </AccordionSummary>

                                            <AccordionDetails>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap',
                                                    width: '100%'
                                                }}>
                                                    <Typography sx={{width: '100%', height: 'auto'}}>
                                                        ID: {input.insumo_id}
                                                    </Typography>
                                                    <hr/>
                                                    <Typography sx={{width: '100%', height: 'auto'}}>
                                                        Tipo: {input.tipo}
                                                    </Typography>
                                                    <hr/>
                                                    <Typography sx={{width: '100%', height: 'auto'}}>
                                                        Cantidad inicial: {input.cantidad_inicial}
                                                    </Typography>
                                                    <hr/>
                                                    <Typography sx={{width: '100%', height: 'auto'}}>
                                                        Cantidad actual: {input.cantidad_actual}
                                                    </Typography>
                                                    <hr/>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                            ))}
                                        </>
                                    )}
                </Container>
            </ThemeProvider>
        </div>
        

    </div>
  )
}

export default ShowInventory