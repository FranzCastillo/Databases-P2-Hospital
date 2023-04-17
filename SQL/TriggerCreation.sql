-- Creates a trigger that prevents deletion on the usuarios table
CREATE OR REPLACE FUNCTION prevent_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'No se puede eliminar usuarios';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_prevent_delete
BEFORE DELETE ON medicos
FOR EACH ROW
EXECUTE FUNCTION prevent_delete();

--Trigger para la tabla medicos que registra los cambios en la tabla bitacora_medicos
--Trigger para la tabla medicos que registra los cambios en la tabla bitacora_medicos
CREATE OR REPLACE FUNCTION bitacora_medicos_change_log()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO bitacora_medicos(id_doctor, nombres, apellidos, teléfono, dirección, num_colegiado_medicos, correo_medicos, rol_medicos)
	VALUES (NEW.id, NEW.nombres, NEW.apellidos, NEW.telefono, NEW.direccion, NEW.num_colegiado, NEW.correo, NEW.rol);

	RAISE NOTICE 'log exitoso en tabla bitacora_medicos';
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bitacora_medicos_change_log_trigger
AFTER INSERT OR UPDATE OR DELETE
ON medicos
FOR EACH ROW
EXECUTE FUNCTION bitacora_medicos_change_log();


--Trigger para la tabla consultas que registra los cambios en la tabla bitacora_consultas
CREATE OR REPLACE FUNCTION bitacora_consultas_change_log()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO bitacora_consultas (id_doctor, id_consultas, paciente_id_consulta, lugar_id_consulta, fecha_consulta, observaciones_consulta, status_id_consulta)
	VALUES (NEW.id_medico, NEW.id, NEW.paciente_id, NEW.lugar_id, NEW.fecha, NEW.observaciones, NEW.status_id);
	RAISE NOTICE 'Log exitoso';

	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bitacora_consultas_change_log_trigger
AFTER INSERT OR UPDATE OR DELETE
ON consultas
FOR EACH ROW
EXECUTE FUNCTION bitacora_consultas_change_log();

-- Creates a trigger that logs actions on the bitacora table
-- CREATE OR REPLACE FUNCTION log_changes()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     datos_viejos JSON;
--     datos_nuevos JSON;
-- BEGIN
--     IF TG_OP = 'INSERT' THEN
--         datos_viejos = NULL;
--         datos_nuevos = row_to_json(NEW);
--         INSERT INTO bitacora(usua) VALUES (NEW.id, TG_OP, datos_viejos, datos_nuevos);
