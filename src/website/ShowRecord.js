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
    const [patient, setPatient] = useState(null);
    useEffect(() => {
        supabase.from('pacientes').select('id, nombre, apellidos').eq('id', id).then(({data, error}) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data[0]);
                setPatient(data[0]);
            }
        })
    }, []);

    const [records, setRecords] = useState([]);
    useEffect(() => {
        supabase.from('consultas')
            .select('*')
            .eq('paciente_id', id)
            .then(({data, error}) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                    setRecords(data);
                }
            })
    },[]);

    const navigate = useNavigate();
    const {id} = useParams();

    // FOR THE ACCORDION
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // --------------------------------------------

    return (
        <div>
            {patient === undefined ? (
                <Typography>No existe el paciente</Typography>
            ) : (
                <>
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
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}bh-content`} id={`panel${index}bh-header`}>
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>{record.date}</Typography>
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

export default ShowRecord