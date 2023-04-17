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
