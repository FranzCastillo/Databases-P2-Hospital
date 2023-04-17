import * as React from 'react';
import {useEffect, useState} from 'react';
import {supabase} from '../supabase/client';
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import {getUser} from "./components/UserInfo";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const user = getUser();
const theme = createTheme();

function ShowRecord() {
    // user = await getUser();
    const [patient, setPatient] = useState({});
    let [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
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
        supabase.rpc('get_consultas', {selected_id: id}).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                setRecords(data);
            }
        });

        supabase
            .from('pacientes')
            .select('*')
            .eq('id', id).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                setPatient(data[0]);
                setLoading(false);
            }
        });
    }, [userLoaded]);

    // FOR THE ACCORDION
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // --------------------------------------------

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div sx={{maxWidth: 'lg'}}>
                {patient === undefined ? (
                    <Typography>No existe el paciente</Typography>
                ) : (
                    <>
                        {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
                        <Container maxWidth="lg">
                        <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography sx={{width: '33%', flexShrink: 0}} variant="h5">
                                            Expediente <br/><span
                                            style={{fontWeight: "bold"}}>{patient.nombres} {patient.apellidos}</span>
                                        </Typography>

                                        <Typography sx={{color: 'text.secondary'}}>Información del paciente</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            width: '100%'
                                        }}>
                                            <Typography sx={{width: '100%'}}>
                                                Nombre y apellido: <span
                                                style={{fontWeight: "bold"}}>{patient.nombres + ' ' + patient.apellidos}</span>
                                            </Typography>
                                            <Typography sx={{width: '33%'}}>
                                                Altura: <span
                                                style={{fontWeight: "bold"}}>{patient.altura_en_cm} cm</span>
                                            </Typography>
                                            <Typography sx={{width: '33%'}}>
                                                Peso: <span style={{fontWeight: "bold"}}>{patient.peso_en_kg} kg</span>
                                            </Typography>
                                            <Typography sx={{width: '33%'}}>
                                                IMC: <span style={{fontWeight: "bold"}}>{patient.imc}</span>
                                            </Typography>
                                            <Typography sx={{width: '66%'}}>
                                                Direccion: <span style={{fontWeight: "bold"}}>{patient.direccion}</span>
                                            </Typography>
                                            <Typography sx={{width: '33%'}}>
                                                Teléfono: <span style={{fontWeight: "bold"}}>{patient.telefono}</span>
                                            </Typography>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                        </div>

                        {records.length === 0 ? (
                            <Typography>No hay registros</Typography>
                        ) : (
                            <>
                                {records.map((record, index) => (
                                    <Accordion
                                        key={index}
                                        expanded={expanded === `panel${index}`}
                                        onChange={handleChange(`panel${index}`)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls={`panel${index}bh-content`}
                                            id={`panel${index}bh-header`}
                                            sx={{width: '100%'}}
                                        >
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                <Typography sx={{width: '33%'}}>
                                                    Doctor: {record.nombre_medico + ' ' + record.apellidos_medico}
                                                </Typography>
                                                <Typography sx={{width: '66%'}}>
                                                    Fecha y
                                                    hora: {new Date(record.fecha_consulta).toLocaleString('es-GT', {timeZone: 'America/Guatemala'})}
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
                                                <Typography sx={{width: '100%'}}>
                                                    Enfermedades Diagnosticadas:
                                                </Typography>
                                                <Typography sx={{width: '100%'}}>
                                                    Enfermedades Diagnosticadas:
                                                </Typography>
                                                <Typography sx={{width: '100%'}}>
                                                    Exámenes Solicitados:
                                                </Typography>
                                                <Typography sx={{width: '100%'}}>
                                                    Tratamientos Recomendados:
                                                </Typography>
                                                <Typography sx={{width: '50%'}}>
                                                    Status: {record.status}
                                                </Typography>
                                                <Typography sx={{width: '50%'}}>
                                                    Observaciones: {record.observaciones}
                                                </Typography>
                                            </Box>
                                        </AccordionDetails>

                                    </Accordion>
                                ))}
                            </>
                        )
                        }
                        </Container>
                    </>
                )}
            </div>
        );
    }
}

export default ShowRecord