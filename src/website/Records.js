import React from 'react';
import {useEffect, useState} from 'react';
import {supabase} from '../supabase/client';

function Records() {
  const [ID, setID] = useState(null);
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);

  //Agarrar el ID del select
  const handleSelect = (e) => {
    setID(e.target.value);
    console.log(e.target.value)
  };
  
  //Al darle click al boton:
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data, error} = await supabase.rpc('getconsultas', {selected_id: ID})
    if (error) throw error;
    setRecords(data);
    console.log(data)
  }

  useEffect(() => {

    //Obtener los pacientes que se muestran en el select
    async function getPatients() {
      const { data: patientsData } = await supabase.from('pacientes').select('id');
      setPatients(patientsData.map(patient => patient.id));
    }
    getPatients();

  }, []);

  return (
    <div>

      <h2> Seleccione el ID del paciente </h2>
      <form onSubmit={handleSubmit}>

        <select name="id" onChange={handleSelect}>
          <option value="" disabled selected> Selecciona un ID </option>
          {patients.map((patient, index) => (
          <option key={index} value={patient}>{patient}</option>
        ))}
        </select>

        <br></br>
        <br></br>
        <button>
          Consultar expediente
        </button>
        <br></br>
        <br></br>
      </form>

      {records&&(
        <>
          {
            records.map(record => (
              <>
              <div className='records'> 
                <b> ID consulta: </b> <a> {record.consulta_id} </a> 
                <br></br>
                <b> Nombre paciente: </b> <a> {record.nombre_paciente} {record.apellidos_paciente} </a>
                <br></br>
                <b> Médico tratante: </b> <a> {record.nombre_medico} {record.apellidos_medico} </a>
                <br></br>
                <b> Especialidad del médico tratante: </b> <a> {record.especialidad_medico} </a>
                <br></br>
                <b> Tratamiento: </b> <a> {record.nombre_tratamiento} </a>
                <br></br>
                <b> Lugar de atención: </b> <a> {record.nombre_lugar} </a>
                <br></br>
                <b> Fecha y hora de atención: </b> <a> {record.nombre_fecha} </a>
                <br></br>
                <b> Enfermedad diagnósticada: </b> <a> {record.nombre_enfermedad} </a>
                <br></br>
                <b> Examen realizado: </b> <a> {record.nombre_examen} </a>
                <br></br>
                <b> Cirugía realizada: </b> <a> {record.nombre_cirugia} </a>
                <br></br>
                <b> Observaciones: </b> <a> {record.observaciones} </a>
                <br></br>
                <b> Estado del paciente: </b> <a> {record.status} </a>
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

export default Records