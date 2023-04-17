DROP TABLE consultas cascade;
DROP TABLE departamentos cascade;
DROP TABLE enfermedades cascade;
DROP TABLE enfermedades_diagnosticadas cascade;
DROP TABLE enfermedades_heredadas cascade;
DROP TABLE especialidades cascade;
DROP TABLE especializados cascade;
DROP TABLE examenes cascade;
DROP TABLE examenes_aplicados cascade;
DROP TABLE insumos cascade;
DROP TABLE insumos_del_lugar cascade;
DROP TABLE lugares cascade;
DROP TABLE medicos cascade;
DROP TABLE medicos_tratantes cascade;
DROP TABLE pacientes cascade;
DROP TABLE status cascade;
DROP TABLE trabajos cascade;
DROP TABLE tratamientos cascade;
DROP TABLE tratamientos_aplicados cascade;
DROP TABLE bitacora_consultas;
DROP TABLE bitacora_medicos;

CREATE TABLE IF NOT EXISTS pacientes
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombres
    VARCHAR
(
    50
) NOT NULL,
    apellidos VARCHAR
(
    50
) NOT NULL,
    telefono VARCHAR
(
    15
) DEFAULT '-',
    direccion VARCHAR
(
    100
) DEFAULT '-',
    imc numeric
(
    5,
    2
) DEFAULT -1,
    altura_en_cm numeric
(
    5,
    2
) DEFAULT -1,
    peso_en_kg numeric
(
    5,
    2
) DEFAULT -1,
    adicciones text DEFAULT 'Sin adicciones'
    );

CREATE INDEX IF NOT EXISTS idx_pacientes_id ON pacientes(id);

CREATE TABLE IF NOT EXISTS medicos
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombres
    VARCHAR
(
    50
) NOT NULL,
    apellidos VARCHAR
(
    50
) NOT NULL,
    telefono VARCHAR
(
    15
) DEFAULT '-',
    direccion VARCHAR
(
    100
) DEFAULT '-',
    num_colegiado VARCHAR
(
    25
) NOT NULL,
    correo VARCHAR
(
    50
) DEFAULT '-',
    rol VARCHAR
(
    25
) DEFAULT 'user'
    );

CREATE INDEX IF NOT EXISTS idx_medicos_id ON medicos(id);

CREATE TABLE IF NOT EXISTS especialidades
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL
    );

CREATE INDEX IF NOT EXISTS idx_especialidades_id ON especialidades(id);

CREATE TABLE IF NOT EXISTS especializados
(
    medico_id
    INTEGER
    REFERENCES
    medicos,
    especialidad_id
    INTEGER
    REFERENCES
    especialidades
);

CREATE INDEX IF NOT EXISTS idx_especializados_id ON especializados(medico_id);

CREATE TABLE IF NOT EXISTS departamentos
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL
    );

-- The departamentos table contains the names of the departments in Guatemala
CREATE TABLE IF NOT EXISTS lugares
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL,
    direccion varchar
(
    250
) DEFAULT '-',
    tipo varchar
(
    10
) DEFAULT 'Hospital',
    departamento_id INTEGER REFERENCES departamentos
    );

CREATE INDEX IF NOT EXISTS idx_lugares_id ON lugares(id);

-- The lugares table contains the names of the hospitals in Guatemala
CREATE TABLE IF NOT EXISTS trabajos
(
    medico_id
    INTEGER
    references
    medicos,
    lugar_id
    INTEGER
    references
    lugares
);

CREATE TABLE IF NOT EXISTS insumos
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    25
) default '-',
    -- Medicinas / Utensilios / Materiales
    tipo varchar
(
    10
) default 'Materiales'
    );

CREATE INDEX IF NOT EXISTS idx_insumos_id ON insumos(id);

CREATE TABLE IF NOT EXISTS insumos_del_lugar
(
    lugar_id
    INTEGER
    REFERENCES
    lugares,
    insumo_id
    INTEGER
    REFERENCES
    insumos,
    cantidad_actual
    INTEGER
    DEFAULT
    0,
    cantidad_inicial
    INTEGER
    DEFAULT
    0
);

CREATE INDEX IF NOT EXISTS insumos_del_lugar_idx ON insumos_del_lugar(lugar_id, insumo_id);

CREATE TABLE IF NOT EXISTS tratamientos
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL,
    tipo text DEFAULT '-',
    -- Medicina / Procedimiento
    dosis text DEFAULT '-'
    );

CREATE TABLE IF NOT EXISTS examenes
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL
    );

CREATE TABLE IF NOT EXISTS enfermedades
(
    id
    SERIAL
    PRIMARY
    KEY,
    nombre
    varchar
(
    50
) NOT NULL
    );

CREATE TABLE IF NOT EXISTS enfermedades_heredadas
(
    paciente_id
    INTEGER
    REFERENCES
    pacientes,
    enfermedad_id
    INTEGER
    REFERENCES
    enfermedades
);

CREATE INDEX IF NOT EXISTS idx_enfermedades_heredadas ON enfermedades_heredadas(paciente_id, enfermedad_id);

CREATE TABLE IF NOT EXISTS status
(
    id
    SERIAL
    PRIMARY
    KEY,
    status
    varchar
(
    25
) NOT NULL -- Murio / Sigue enfermo / Recuperado
    );

CREATE TABLE IF NOT EXISTS consultas
(
    id
    SERIAL
    PRIMARY
    KEY,
    paciente_id
    INTEGER
    REFERENCES
    pacientes,
    lugar_id
    INTEGER
    REFERENCES
    lugares,
    fecha
    timestamp
    DEFAULT
    CURRENT_TIMESTAMP,
    observaciones
    text
    DEFAULT
    '-',
    status_id
    INTEGER
    REFERENCES
    status
);

CREATE INDEX IF NOT EXISTS idx_consultas_paciente_id ON consultas(paciente_id);

CREATE TABLE IF NOT EXISTS tratamientos_aplicados
(
    consulta_id
    INTEGER
    REFERENCES
    consultas,
    tratamiento_id
    INTEGER
    REFERENCES
    tratamientos
);

CREATE INDEX IF NOT EXISTS idx_tratamientos_aplicados ON tratamientos_aplicados(consulta_id, tratamiento_id);

CREATE TABLE IF NOT EXISTS examenes_aplicados
(
    consulta_id
    INTEGER
    REFERENCES
    consultas,
    examen_id
    INTEGER
    REFERENCES
    examenes
);

CREATE INDEX IF NOT EXISTS idx_examenes_aplicados ON examenes_aplicados(consulta_id, examen_id);

CREATE TABLE IF NOT EXISTS enfermedades_diagnosticadas
(
    consulta_id
    INTEGER
    REFERENCES
    consultas,
    enfermedad_id
    INTEGER
    REFERENCES
    enfermedades
);

CREATE INDEX IF NOT EXISTS idx_enfermedades_diagnosticadas ON enfermedades_diagnosticadas(consulta_id, enfermedad_id);

CREATE TABLE IF NOT EXISTS medicos_tratantes
(
    consulta_id
    INTEGER
    REFERENCES
    consultas,
    medico_id
    INTEGER
    REFERENCES
    medicos
);

CREATE INDEX IF NOT EXISTS idx_medicos_tratantes ON medicos_tratantes(consulta_id, medico_id);


CREATE TABLE IF NOT EXISTS bitacora_consultas
(
    id
    SERIAL
    PRIMARY
    KEY,
    id_doctor
    INTEGER
    REFERENCES
    medicos,
    id_consultas
    INTEGER
    REFERENCES
    consultas,
    paciente_id_consulta
    INT,
    lugar_id_consulta
    INT,
    fecha_consulta
    TIMESTAMP,
    observaciones_consulta
    TEXT,
    status_id_consulta
    INT
);

CREATE TABLE IF NOT EXISTS bitacora_medicos
(
    id
    SERIAL
    PRIMARY
    KEY,
    id_doctor
    INTEGER
    REFERENCES
    medicos,
    nombres
    varchar
(
    50
),
    apellidos varchar
(
    50
),
    teléfono varchar
(
    15
),
    dirección varchar
(
    100
),
    num_colegiado_medicos varchar
(
    25
),
    correo_medicos varchar
(
    50
),
    rol_medicos varchar
(
    25
)
    );

--tablas modificadas para el funcionamiento de la bitacora
ALTER TABLE consultas
    ADD id_medico INTEGER;
ALTER TABLE consultas
    ADD CONSTRAINT fk_id_medico FOREIGN KEY (id_medico) REFERENCES medicos (id);

CREATE
OR REPLACE FUNCTION prevent_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE
EXCEPTION 'No se puede eliminar usuarios';
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_prevent_delete
    BEFORE DELETE
    ON medicos
    FOR EACH ROW
    EXECUTE FUNCTION prevent_delete();

--Trigger para la tabla medicos que registra los cambios en la tabla bitacora_medicos
CREATE
OR REPLACE FUNCTION bitacora_medicos_change_log()
RETURNS TRIGGER AS $$
BEGIN
INSERT INTO bitacora_medicos(id_doctor, nombres, apellidos, teléfono, dirección, num_colegiado_medicos, correo_medicos,
                             rol_medicos)
VALUES (NEW.id, NEW.nombres, NEW.apellidos, NEW.telefono, NEW.direccion, NEW.num_colegiado, NEW.correo, NEW.rol);

RAISE
NOTICE 'log exitoso en tabla bitacora_medicos';
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER bitacora_medicos_change_log_trigger
    AFTER INSERT OR
UPDATE OR
DELETE
ON medicos
    FOR EACH ROW
    EXECUTE FUNCTION bitacora_medicos_change_log();

INSERT INTO pacientes (nombres, apellidos, telefono, direccion, imc, altura_en_cm, peso_en_kg, adicciones)
VALUES ('Ana', 'García', '555-1234', 'Av. Insurgentes #456', 21.5, 170, 65.0, 'Sin adicciones'),
       ('Juan', 'Martínez', '555-5678', 'Calle Cuauhtémoc #789', 22.0, 175, 70.0, 'Fuma ocasionalmente'),
       ('María', 'Hernández', '-', 'Calle Reforma #321', 25.5, 168, 80.0, 'Bebe alcohol regularmente'),
       ('Luis', 'Pérez', '555-9012', 'Calle 5 de Mayo #101', 28.0, 185, 90.0, 'Sin adicciones'),
       ('Karla', 'Ramírez', '555-3456', 'Calle Hidalgo #567', 24.5, 160, 60.0, 'Fuma diariamente'),
       ('Pedro', 'Sánchez', '-', 'Calle Juárez #910', 29.0, 180, 85.0, 'Bebe alcohol regularmente'),
       ('Sofía', 'Gómez', '555-7890', 'Av. Revolución #111', 20.0, 155, 50.0, 'Sin adicciones'),
       ('Jorge', 'López', '555-2345', 'Calle Independencia #222', 26.0, 172, 75.0, 'Fuma ocasionalmente'),
       ('Ana', 'Martínez', '555-6789', 'Calle Morelos #333', 31.0, 190, 100.0, 'Bebe alcohol regularmente'),
       ('José', 'González', '-', 'Calle Guerrero #444', 23.0, 178, 70.0, 'Sin adicciones');

INSERT INTO especialidades (nombre)
VALUES ('Cardiología'),
       ('Dermatología'),
       ('Endocrinología'),
       ('Gastroenterología'),
       ('Hematología'),
       ('Neumología'),
       ('Neurología'),
       ('Oftalmología'),
       ('Oncología'),
       ('Pediatría');

INSERT INTO departamentos (nombre)
VALUES ('Alta Verapaz'),
       ('Baja Verapaz'),
       ('Chimaltenango'),
       ('Chiquimula'),
       ('El Progreso'),
       ('Escuintla'),
       ('Guatemala'),
       ('Huehuetenango'),
       ('Izabal'),
       ('Jalapa'),
       ('Jutiapa'),
       ('Petén'),
       ('Quetzaltenango'),
       ('Quiché'),
       ('Retalhuleu'),
       ('Sacatepéquez'),
       ('San Marcos'),
       ('Santa Rosa'),
       ('Sololá'),
       ('Suchitepéquez'),
       ('Totonicapán'),
       ('Zacapa');

INSERT INTO lugares (nombre, direccion, tipo, departamento_id)
VALUES ('Hospital Roosevelt', '12 Avenida 6-17, zona 11', 'Hospital', 7),
       ('Hospital General San Juan de Dios', '8a Calle 7-59, zona 1', 'Hospital', 1),
       ('Hospital Universitario Esperanza', '15 Avenida 14-01, zona 10', 'Hospital', 7),
       ('Hospital Regional de Zacapa', 'Barrio El Calvario, Zacapa', 'Hospital', 22),
       ('Hospital Nacional de Chiquimula', '1a Avenida 5-13, zona 2', 'Hospital', 4),
       ('Hospital de Retalhuleu', 'Barrio El Centro, Retalhuleu', 'Hospital', 15),
       ('Hospital Regional de Occidente', '8a Avenida A 6-16, zona 2, Quetzaltenango', 'Hospital', 13),
       ('Hospital Infantil Juan Pablo II', '7a Avenida 6-01, zona 2', 'Hospital', 1),
       ('Hospital Nacional de Jutiapa', '5a Calle y 2a Avenida Esquina, zona 1', 'Hospital', 11),
       ('Hospital General de Cobán', '3a Calle 5-54, zona 1, Cobán', 'Hospital', 1);

INSERT INTO insumos (nombre, tipo)
VALUES ('Guantes', 'Utensilios'),
       ('Jeringas', 'Utensilios'),
       ('Algodón', 'Materiales'),
       ('Vendas', 'Materiales'),
       ('Mascarillas', 'Utensilios'),
       ('Agua Oxigenada', 'Medicinas'),
       ('Alcohol', 'Materiales'),
       ('Gasas', 'Materiales'),
       ('Termómetros', 'Utensilios'),
       ('Suero Fisiológico', 'Medicinas');

INSERT INTO tratamientos (nombre, tipo, dosis)
VALUES ('Aspirina', 'Medicina', '100mg'),
       ('Ibuprofeno', 'Medicina', '400mg'),
       ('Paracetamol', 'Medicina', '500mg'),
       ('Inyección de Insulina', 'Medicina', '10 unidades'),
       ('Radiografía de Torax', 'Procedimiento', '-'),
       ('Cirugía de Hernia Inguinal', 'Procedimiento', '-'),
       ('Tratamiento de Quimioterapia', 'Procedimiento', '-'),
       ('Terapia de Oxigeno', 'Procedimiento', '-'),
       ('Extracción de Muela', 'Procedimiento', '-'),
       ('Vacuna contra la Influenza', 'Medicina', '-');

INSERT INTO examenes (nombre)
VALUES ('Análisis de Sangre'),
       ('Radiografía de Torax'),
       ('Tomografía Computarizada'),
       ('Electrocardiograma'),
       ('Resonancia Magnética'),
       ('Examen de Orina'),
       ('Colonoscopía'),
       ('Endoscopía'),
       ('Mamografía'),
       ('Examen de la Vista');

INSERT INTO enfermedades (nombre)
VALUES ('Gripe'),
       ('Neumonía'),
       ('Dengue'),
       ('Hipertensión'),
       ('Cáncer'),
       ('Diabetes'),
       ('VIH/SIDA'),
       ('Enfermedad de Alzheimer'),
       ('Artritis'),
       ('Asma');

INSERT INTO status (status)
VAlUES ('Enfermo'),
       ('Recuperado'),
       ('Fallecido');