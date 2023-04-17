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
        supabase.rpc('getConsultas', {selected_id: id}).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                setRecords(data);
            }
        } );

        setLoading(false);
    }, [userLoaded]);

    // useEffect(() => {
    //     fullRecords = records.map(async (record) => {
    //         return {
    //             ...record,
    //             doctor: await supabase.from('medicos').select('nombre, apellidos').eq('id', record.medico_id)
    //         }
    //     })
    //     supabase.from('medicos')
    //         .select('*')
    //         .eq('id', records.medico_id)
    // }, [patient, records]);
    //
    // useEffect(() => {
    //     console.log("Paciente: ", patient);
    //     console.log("Consultas: ", records);
    // }, [patient, records]);



    // FOR THE ACCORDION
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // --------------------------------------------

    // console.log("Paciente: ", patient);
    // console.log("Consultas: ", records);

    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {patient === undefined ? (
                    <Typography>No existe el paciente</Typography>
                ) : (
                    <>
                        {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
                        <Typography variant="h5">{patient.nombre}</Typography>
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
                                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                                          aria-controls={`panel${index}bh-content`}
                                                          id={`panel${index}bh-header`}>
                                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                                Fecha de la consulta: {new Date(record.fecha).toLocaleDateString()}
                                                <br/>
                                                Hora de la consulta: {new Date(record.fecha).toLocaleTimeString()} <br/>
                                                Doctor: {record.doctor}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{record.details}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </>
                        )}
                    </>
                )}
            </div>
        );
    }
}

export default ShowRecord