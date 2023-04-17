SELECT p.nombres AS "nombre_paciente", 
       p.apellidos AS "apellidos_paciente", 
       m.nombres AS "nombre_medico",
       m.apellidos AS "apellidos_medico",
       l.nombre AS "nombre_lugar", 
       c.fecha AS "fecha_consulta",
       c.observaciones,
       s.status
FROM consultas c
LEFT JOIN status s ON s.id = c.status_id
LEFT JOIN pacientes p ON p.id = c.paciente_id
LEFT JOIN lugares l ON l.id = c.lugar_id
LEFT JOIN medicos m ON m.id = c.id_medico
WHERE c.paciente_id = selected_id
GROUP BY c.id, c.paciente_id, p.nombres, p.apellidos, m.nombres, m.apellidos, l.nombre, c.fecha, c.observaciones, s.status
ORDER BY c.id;