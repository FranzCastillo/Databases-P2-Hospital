import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {supabase} from "../supabase/client";
import Autocomplete from '@mui/material/Autocomplete';
import {getUser} from "./components/UserInfo";
import React, {useState, useEffect} from 'react'
import NavBarUser from "./components/NavBarUser";
import NavBarAdmin from "./components/NavBarAdmin";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {green} from '@mui/material/colors';

const user = getUser();
const theme = createTheme();

function NewRecord() {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState('');
    const [places, setPlaces] = useState([]);
    const [place, setPlace] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [userTreatments, setUserTreatments] = useState([]);
    const [exams, setExams] = useState([]);
    const [userExams, setUserExams] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [userDiseases, setUserDiseases] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const [observations, setObservations] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        supabase.from('pacientes').select('id, nombre, apellidos').then(({data, error}) => {
            data.forEach((patient) => {
                patient.label = patient.nombre + ' ' + patient.apellidos;
            });
            if (error) {
                alert.log(error);
            } else {
                setPatients(data);
            }
        })
    }, []);
    useEffect(() => {
        supabase.from('lugares').select('id, nombre').then(({data, error}) => {
            data.forEach((place) => {
                place.label = place.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setPlaces(data);
            }
        });
    }, []);
    useEffect(() => {
        supabase.from('tratamientos').select('id, nombre').then(({data, error}) => {
            data.forEach((treatment) => {
                treatment.label = treatment.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setTreatments(data);
            }
        });
    }, []);
    useEffect(() => {
        supabase.from('examenes').select('id, nombre').then(({data, error}) => {
            data.forEach((exam) => {
                exam.label = exam.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setExams(data);
            }
        });
    }, []);
    useEffect(() => {
        supabase.from('status').select('id, status').then(({data, error}) => {
            data.forEach((status) => {
                status.label = status.status;
            });
            if (error) {
                alert(error.message);
            } else {
                setStatuses(data);
            }
        });
    }, []);
    useEffect(() => {
        supabase.from('enfermedades').select('id, nombre').then(({data, error}) => {
            data.forEach((disease) => {
                disease.label = disease.nombre;
            });
            if (error) {
                alert(error.message);
            } else {
                setDiseases(data);
            }
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from("consultas")
                .insert({
                    paciente_id: patient.id,
                    lugar_id: place.id,
                    observaciones: observations,
                    status_id: userStatus.id,
                });
            // Gets the id of the consulta recently created
            const consulta_id = await supabase
                .from("consultas")
                .select("id")
                .order("id", {ascending: false})
                .limit(1);

            for (const disease of userDiseases) {
                await supabase
                    .from("enfermedades_diagnosticadas")
                    .insert({
                        consulta_id: consulta_id.data[0].id,
                        enfermedad_id: disease.id,
                    });
            }
            for (const exam of userExams) {
                await supabase
                    .from("examenes_aplicados")
                    .insert({
                        consulta_id: consulta_id.data[0].id,
                        examen_id: exam.id,
                    });
            }
            for (const treatment of userTreatments) {
                await supabase
                    .from("tratamientos_aplicados")
                    .insert({
                        consulta_id: consulta_id.data[0].id,
                        tratamiento_id: treatment.id,
                    });
            }

            await supabase
                .from("medicos_tratantes")
                .insert({
                    consulta_id: consulta_id.data[0].id,
                    medico_id: user.id,
                });
            alert("Consulta creada con éxito!");
            navigate('/expedientes/' + patient.id);
        } catch (error) {
            console.log(error);
        }
    };

    function handleNewPatient() {
        navigate('/patient/new');
    }

    return (
        <div>
            {user.role === "admin" ? <NavBarUser/> : <NavBarAdmin/>}
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
                            <AssignmentIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Nueva consulta
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-patients"
                                        options={patients}
                                        renderInput={(params) => <TextField {...params} label="Pacientes"/>}
                                        onChange={(event, value) => setPatient(value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color={"secondary"}
                                        onClick={handleNewPatient}
                                    >Nuevo Paciente</Button>
                                </Grid>
                                <Grid item xs={8}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-places"
                                        options={places}
                                        renderInput={(params) => <TextField {...params} label="Lugar de diagnostico"/>}
                                        onChange={(event, value) => setPlace(value)}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Autocomplete
                                        disablePortal
                                        required
                                        id="combo-box-statuses"
                                        options={statuses}
                                        renderInput={(params) => <TextField {...params} label="Estado"/>}
                                        onChange={(event, value) => setUserStatus(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-diseases"
                                        options={diseases}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Enfermedades Diagnosticadas"
                                                       placeholder="Enfermedades"/>
                                        )}
                                        sx={{width: '500px'}}
                                        onChange={(event, value) => setUserDiseases(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-exams"
                                        options={exams}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Exámenes Solicitados" placeholder="Exámenes"/>
                                        )}
                                        sx={{width: '500px'}}
                                        onChange={(event, value) => setUserExams(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-treatments"
                                        options={treatments}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Tratamientos Indicados"
                                                       placeholder="Tratamientos"/>
                                        )}
                                        sx={{width: '500px'}}
                                        onChange={(event, value) => setUserTreatments(value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="observations"
                                        label="Observaciones"
                                        name="observations"
                                        autoFocus
                                        multiline={true}
                                        minRows={2}
                                        maxRows={3}
                                        value={observations}
                                        onChange={(e) => setObservations(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Registrar Consulta
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default NewRecord