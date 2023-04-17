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

    const {id} = useParams();

    useEffect(() => {
        //alert(typeof id)
        supabase.rpc('getinsumos', {selected_id: 1}).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                setInputs(data);
            }
        })
        console.log(inputs)
    }, []);

  return (
    <div>ShowInventory

        {inputs && (
                <>
                    {
                        inputs.map(input => (
                            <>
                                <div className='records'>
                                    <b> ID insumo: </b> <a> {input.insumo_id} </a>
                                    <br></br>
                                    <b> Nombre insumo: </b> <a> {input.nombre} </a>
                                    <br></br>
                                    <b> Tipo: </b> <a> {input.tipo} </a>
                                    <br></br>
                                    <b> Cantidad inicial </b> <a> {input.cantidad_inicial} </a>
                                    <br></br>
                                    <b> Cantidad actual: </b> <a> {input.cantidad_actual} </a>
                                    <br></br>
                                </div>
                                <br></br>
                            </>
                        ))
                    }
                </>
            )}  

    </div>
  )
}

export default ShowInventory