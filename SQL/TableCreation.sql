CREATE TABLE IF NOT EXISTS bitacora (
    id SERIAL PRIMARY KEY,
    tabla VARCHAR(50),
    accion VARCHAR(10),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valores_viejos JSON,
    valores_nuevos JSON
);

CREATE TABLE IF NOT EXISTS usuarios(
	id SERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	rol VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS pacientes(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	telefono VARCHAR(15) DEFAULT '-',
	direccion VARCHAR(100) DEFAULT '-',
	imc numeric(5,2) DEFAULT -1,
	altura_en_metros numeric(5,2) DEFAULT -1,
	peso_en_kg numeric(5,2) DEFAULT -1,
	adicciones text DEFAULT 'Sin adicciones'
);
CREATE INDEX IF NOT EXISTS idx_pacientes_id ON pacientes(id);

CREATE TABLE IF NOT EXISTS medicos(
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios,
	nombre VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	telefono VARCHAR(15) DEFAULT '-',
	direccion VARCHAR(100) DEFAULT '-',
	num_colegiado VARCHAR(25) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_medicos_id ON medicos(id);

CREATE TABLE IF NOT EXISTS especialidades(
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_especialidades_id ON especialidades(id);

CREATE TABLE IF NOT EXISTS especializados(
	medico_id INTEGER REFERENCES medicos,
	especialidad_id INTEGER REFERENCES especialidades
);
CREATE INDEX IF NOT EXISTS idx_especializados_id ON especializados(medico_id);

CREATE TABLE IF NOT EXISTS departamentos(
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL
);
-- The departamentos table contains the names of the departments in Guatemala


CREATE TABLE IF NOT EXISTS lugares(
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	direccion varchar(250) DEFAULT '-',
	tipo varchar(10) DEFAULT 'Hospital',
	departamento_id INTEGER REFERENCES departamentos
);
CREATE INDEX IF NOT EXISTS idx_lugares_id ON lugares(id);
-- The lugares table contains the names of the hospitals in Guatemala


CREATE TABLE IF NOT EXISTS trabajos(
	medico_id INTEGER references medicos,
	lugar_id INTEGER references lugares,
	fecha_inicio timestamp DEFAULT CURRENT_TIMESTAMP ,
	fecha_final timestamp DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS insumos(
	id SERIAL PRIMARY KEY,
	nombre varchar(25) default '-',
	tipo varchar(10) default 'Insumos'
);
CREATE INDEX IF NOT EXISTS idx_insumos_id ON insumos(id);
-- The insumos tables contains names of medicines


CREATE TABLE IF NOT EXISTS insumos_del_lugar(
    lugar_id INTEGER REFERENCES lugares,
    material_id INTEGER REFERENCES insumos,
    cantidad_actual INTEGER DEFAULT 0,
    cantidad_inicial INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_insumos_del_lugar ON insumos_del_lugar(lugar_id, material_id);

CREATE TABLE IF NOT EXISTS tratamientos(
    id SERIAL PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    tipo text DEFAULT '-', -- Medicina / Procedimiento
    dosis text DEFAULT '-'
);

CREATE TABLE IF NOT EXISTS examenes(
    id SERIAL PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS enfermedades(
    id SERIAL PRIMARY KEY,
    nombre varchar(50) NOT NULL
);



CREATE TABLE IF NOT EXISTS enfermedades_heredadas(
    paciente_id INTEGER REFERENCES pacientes,
    enfermedad_id INTEGER REFERENCES enfermedades
);
CREATE INDEX IF NOT EXISTS idx_enfermedades_heredadas ON enfermedades_heredadas(paciente_id, enfermedad_id);

CREATE TABLE IF NOT EXISTS status(
    id SERIAL PRIMARY KEY,
    status varchar(25) NOT NULL -- Murio / Sigue enfermo / Recuperado
);

CREATE TABLE IF NOT EXISTS consultas(
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes,
    lugar_id INTEGER REFERENCES lugares,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,
    observaciones text DEFAULT '-',
    status_id INTEGER REFERENCES status
);
CREATE INDEX IF NOT EXISTS idx_consultas_paciente_id ON consultas(paciente_id);

CREATE TABLE IF NOT EXISTS tratamientos_aplicados(
    consulta_id INTEGER REFERENCES consultas,
    tratamiento_id INTEGER REFERENCES tratamientos
);
CREATE INDEX IF NOT EXISTS idx_tratamientos_aplicados ON tratamientos_aplicados(consulta_id, tratamiento_id);

CREATE TABLE IF NOT EXISTS examenes_aplicados(
    consulta_id INTEGER REFERENCES consultas,
    examen_id INTEGER REFERENCES examenes
);
CREATE INDEX IF NOT EXISTS idx_examenes_aplicados ON examenes_aplicados(consulta_id, examen_id);

CREATE TABLE IF NOT EXISTS enfermedades_diagnosticadas(
    consulta_id INTEGER REFERENCES consultas,
    enfermedad_id INTEGER REFERENCES enfermedades
);
CREATE INDEX IF NOT EXISTS idx_enfermedades_diagnosticadas ON enfermedades_diagnosticadas(consulta_id, enfermedad_id);

CREATE TABLE IF NOT EXISTS medicos_tratantes(
    consulta_id INTEGER REFERENCES consultas,
    medico_id INTEGER REFERENCES medicos
);
CREATE INDEX IF NOT EXISTS idx_medicos_tratantes ON medicos_tratantes(consulta_id, medico_id);