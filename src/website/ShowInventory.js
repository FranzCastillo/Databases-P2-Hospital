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
        
    }, [inputs]);

  return (
    <div>
        {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
        <br></br>
        <div className='divNewPage'>
            <ThemeProvider theme={theme}>
                <Typography variant="h5">{place} <br/> <br/> </Typography>
                    {inputs.length === 0 ? (
                        <Typography>No hay inventario</Typography>
                        ) : (
                            <>
                                {inputs.map(input => (
                                    <Typography sx={{width: '33%', flexShrink: 0}}>
                                        ID insumo: {input.insumo_id} <br/>
                                        Nombre insumo: {input.nombre_insumo} <br/>
                                        Tipo: {input.tipo} <br/>
                                        Cantidad inicial: {input.cantidad_inicial} <br/>
                                        Cantidad actual: {input.cantidad_actual} <br/>
                                        {input.cantidad_actual / input.cantidad_inicial < 0.15 ? <p className='red'> ADVERTENCIA: queda menos del 15% del insumo </p> : null}
                                        <hr/>
                                    </Typography>
                                    ))}
                                </>
                            )}
            </ThemeProvider>
        </div>
        

    </div>
  )
}

export default ShowInventory