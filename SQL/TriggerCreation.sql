-- Creates a trigger that prevents deletion on the usuarios table
CREATE OR REPLACE FUNCTION prevent_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'No se puede eliminar usuarios';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_prevent_delete
BEFORE DELETE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION prevent_delete();

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
