

/* ~~~~~~~~~~~~~ Funcion para obtener las consultas ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION get_consultas(selected_id integer) 
RETURNS TABLE(nombre_paciente text, apellidos_paciente text, nombre_medico text, apellidos_medico text, nombre_lugar text, fecha_consulta timestamp, observaciones text, status text) 
AS $$
BEGIN
   RETURN QUERY
    SELECT CAST(p.nombres AS text) AS "nombre_paciente", 
       CAST(p.apellidos AS text) AS "apellidos_paciente", 
       CAST(m.nombres AS text) AS "nombre_medico",
       CAST(m.apellidos AS text) AS "apellidos_medico",
       CAST(l.nombre AS text) AS "nombre_lugar", 
       CAST(c.fecha AS timestamp) AS "fecha_consulta",
       CAST(c.observaciones AS text) AS "observaciones",
       CAST(s.status AS text) AS "status"
FROM consultas c
LEFT JOIN status s ON s.id = c.status_id
LEFT JOIN pacientes p ON p.id = c.paciente_id
LEFT JOIN lugares l ON l.id = c.lugar_id
LEFT JOIN medicos m ON m.id = c.id_medico
WHERE c.paciente_id = selected_id
GROUP BY c.id, c.paciente_id, p.nombres, p.apellidos, m.nombres, m.apellidos, l.nombre, c.fecha, c.observaciones, s.status
ORDER BY c.id;
END;
$$ LANGUAGE plpgsql;


/* ~~~~~~~~~~~~~ Funcion para obtener las enfermedades del paciente ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION get_patient_diseases()
RETURNS TABLE (consulta_id integer, nombre_enfermedad text)
AS $$
BEGIN
    RETURN QUERY
    SELECT ed.consulta_id, CAST(e.nombre AS text)
    FROM enfermedades e
    JOIN enfermedades_diagnosticadas ed ON ed.enfermedad_id = e.id
    GROUP BY ed.consulta_id, e.nombre;
END;
$$ LANGUAGE plpgsql;


/* ~~~~~~~~~~~~~ Funcion para obtener los insumos de un lugar ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getInsumos(selected_id integer)
  RETURNS TABLE ( insumo_id integer, 
                  lugar_id integer,
                  nombre_Insumo varchar(50),
                  nombre_lugar varchar(50),
                  tipo varchar(50),
                  cantidad_actual integer,
                  cantidad_inicial integer
                )
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT insumos.id AS insumo_id, 
    lugares.id AS lugar_id, 
    insumos.nombre AS insumo_nombre, 
    lugares.nombre AS lugar_nombre, 
    insumos.tipo AS insumo_tipo,
    insumos_del_lugar.cantidad_actual, 
    insumos_del_lugar.cantidad_inicial
    FROM insumos_del_lugar
    JOIN insumos ON insumos_del_lugar.insumo_id = insumos.id
    JOIN lugares ON insumos_del_lugar.lugar_id = lugares.id
    WHERE lugares.id = selected_id
    ORDER BY insumo_id;
END
$func$;


/* ~~~~~~~~~~~~~ Funcion para obtener el reporte 1 ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getReportOne()
  RETURNS TABLE ( enfermedad varchar(50),
                  muertes integer )
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT enfermedades.nombre, COUNT(enfermedad_id)::integer AS muertes
    FROM consultas 
    JOIN enfermedades_diagnosticadas ON consulta_id = consultas.id
    JOIN enfermedades ON enfermedades.id = enfermedades_diagnosticadas.enfermedad_id
    WHERE status_id = 3
    GROUP BY enfermedades.nombre
    ORDER BY muertes DESC
    LIMIT 10;
END
$func$;


/* ~~~~~~~~~~~~~ Funcion para obtener el reporte 2 ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getReportTwo()
  RETURNS TABLE ( nombre varchar(100),
                  cantidad integer )
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT CONCAT(medicos.nombres, ' ', medicos.apellidos)::varchar AS nombre_medico, 
    COUNT(id_medico)::integer AS cantidad_pacientes 
    FROM consultas 
    JOIN medicos ON medicos.id = id_medico
    GROUP BY nombre_medico
    ORDER BY cantidad_pacientes DESC
    LIMIT 10;
END
$func$;


/* ~~~~~~~~~~~~~ Funcion para obtener el reporte 3 ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getReportThree()
  RETURNS TABLE ( nombre varchar(100),
                  cantidad integer,
                  peso varchar(50),
                  altura varchar(50),
                  imc varchar(50) )
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT CONCAT(pacientes.nombres, ' ', pacientes.apellidos)::varchar AS nombre_paciente, 
    COUNT(paciente_id)::integer AS cantidad_consultas,
    pacientes.peso_en_kg::varchar, pacientes.altura_en_cm::varchar, pacientes.imc::varchar
    FROM consultas 
    JOIN pacientes ON pacientes.id = paciente_id
    GROUP BY nombre_paciente, pacientes.peso_en_kg, pacientes.altura_en_cm, pacientes.imc
    ORDER BY cantidad_consultas DESC
    LIMIT 5;
END
$func$;


/* ~~~~~~~~~~~~~ Funcion para obtener el reporte 4 ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getReportFour()
  RETURNS TABLE ( insumo varchar(100),
                  tipo varchar(50),
                  lugar varchar(50),
                  porcentaje integer)
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT insumos.nombre AS insumo, insumos.tipo AS tipo, lugares.nombre AS lugar, 
    ROUND(((CAST(cantidad_actual AS decimal(18,2)) / CAST(cantidad_inicial AS decimal(18,2))) * 100), 0)::integer  AS porcentaje
    FROM insumos_del_lugar
    JOIN insumos ON insumos.id = insumo_id
    JOIN lugares ON lugares.id = lugar_id
    WHERE ROUND(((CAST(cantidad_actual AS decimal(18,2)) / CAST(cantidad_inicial AS decimal(18,2))) * 100), 0)::integer < 15;
END
$func$;


/* ~~~~~~~~~~~~~ Funcion para obtener el reporte 5 ~~~~~~~~~~~~~ */

CREATE OR REPLACE FUNCTION getReportFive()
  RETURNS TABLE ( lugar varchar(100),
                  tipo varchar(50),
                  cantidad integer )
  LANGUAGE plpgsql AS
$func$
BEGIN
   RETURN QUERY
    SELECT lugares.nombre AS lugar, lugares.tipo AS tipo,
    COUNT(lugar_id)::integer AS cantidad_pacientes 
    FROM consultas 
    JOIN lugares ON lugares.id = lugar_id
    GROUP BY lugares.nombre, lugares.tipo
    ORDER BY cantidad_pacientes DESC
    LIMIT 3;
END
$func$;