import React from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {useEffect, useState} from 'react';
import {supabase} from '../supabase/client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ReportFive() {
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
  const [report, setReport] = useState([]);

  useEffect(() => {

    //Obtener los lugares que se muestran en el select
    async function getReport() {
        const {data: reportData} = await supabase.rpc('getreportfive')
        setReport(reportData);
        console.log(report)
    }
    getReport();

}, [userLoaded]);

  return (
    <div>
      {rol === "admin" ? <NavBarAdmin/> : <NavBarUser/>}

      <ThemeProvider theme={theme}>
          <Container component="main" maxWidth={"xs"}>
            <CssBaseline/>
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                  Establecimientos con más pacientes
              </Typography>
            </Box>
            <br></br>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>

                  <TableRow>
                    <TableCell align="center">Establecimiento</TableCell>
                    <TableCell align="center">Tipo</TableCell>
                    <TableCell align="center">Pacientes</TableCell>
                  </TableRow>

                </TableHead>

                <TableBody>
                  {report.map((dato) => (
                    <TableRow
                      key={dato.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{dato.lugar}</TableCell>
                      <TableCell align="center">{dato.tipo}</TableCell>
                      <TableCell align="center">{dato.cantidad}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              </Table>
            </TableContainer>
          </Container>
        </ThemeProvider>

    </div>
  )
}

export default ReportFive