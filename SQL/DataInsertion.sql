INSERT INTO especialidades(nombre) VALUES('Medicina General');
INSERT INTO especialidades(nombre) VALUES('Cardiología');
INSERT INTO especialidades(nombre) VALUES('Neurología');
INSERT INTO especialidades(nombre) VALUES('Pediatría');
INSERT INTO especialidades(nombre) VALUES('Ginecología');
INSERT INTO especialidades(nombre) VALUES('Oftalmología');
INSERT INTO especialidades(nombre) VALUES('Otorrinolaringología');
INSERT INTO especialidades(nombre) VALUES('Psiquiatría');
INSERT INTO especialidades(nombre) VALUES('Dermatología');
INSERT INTO especialidades(nombre) VALUES('Traumatología');
INSERT INTO especialidades(nombre) VALUES('Urología');
INSERT INTO especialidades(nombre) VALUES('Gastroenterología');
INSERT INTO especialidades(nombre) VALUES('Endocrinología');
INSERT INTO especialidades(nombre) VALUES('Neumología');
INSERT INTO especialidades(nombre) VALUES('Reumatología');
INSERT INTO especialidades(nombre) VALUES('Nefrología');
INSERT INTO especialidades(nombre) VALUES('Oncología');
INSERT INTO especialidades(nombre) VALUES('Anestesiología');
INSERT INTO especialidades(nombre) VALUES('Cirugía General');
INSERT INTO especialidades(nombre) VALUES('Cirugía Plástica');
INSERT INTO especialidades(nombre) VALUES('Cirugía Maxilofacial');
INSERT INTO especialidades(nombre) VALUES('Cirugía Cardiovascular');
INSERT INTO especialidades(nombre) VALUES('Cirugía Torácica');
INSERT INTO especialidades(nombre) VALUES('Cirugía Vascular');

INSERT INTO departamentos(nombre) VALUES('Guatemala');
INSERT INTO departamentos(nombre) VALUES('El Progreso');
INSERT INTO departamentos(nombre) VALUES('Sacatepéquez');
INSERT INTO departamentos(nombre) VALUES('Chimaltenango');
INSERT INTO departamentos(nombre) VALUES('Escuintla');
INSERT INTO departamentos(nombre) VALUES('Santa Rosa');
INSERT INTO departamentos(nombre) VALUES('Sololá');
INSERT INTO departamentos(nombre) VALUES('Totonicapán');
INSERT INTO departamentos(nombre) VALUES('Quetzaltenango');
INSERT INTO departamentos(nombre) VALUES('Suchitepéquez');

INSERT INTO lugares(nombre, direccion, tipo, departamento_id) VALUES('Hospital Roosevelt', 'Zona 1', 'Hospital', 1);
INSERT INTO lugares(nombre, direccion, tipo, departamento_id) VALUES('Hospital San Juan de Dios', 'Zona 1', 'Hospital', 1);

INSERT INTO insumos(nombre, tipo) VALUES('Paracetamol', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Ibuprofeno', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Aspirina', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Dipirona', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Acetaminofén', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Ácido acetilsalicílico', 'Medicinas');
INSERT INTO insumos(nombre, tipo) VALUES('Bisturi', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Pinzas', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Tijeras', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Cinta adhesiva', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Gasas', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Alcohol', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Agua oxigenada', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Algodón', 'Utensilios');
INSERT INTO insumos(nombre, tipo) VALUES('Vendas', 'Utensilios');

-- The tratamientos table contains the names of the treatments
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Cirugía', 'Procedimiento', '-');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Cirugía de Cataratas', 'Procedimiento', '-');

-- Inserts medicines in the tratamientos table
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Paracetamol', 'Medicina', '1 tableta cada 8 horas');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Ibuprofeno', 'Medicina', '1 tableta cada 8 horas');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Aspirina', 'Medicina', '1 tableta cada 8 horas');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Dipirona', 'Medicina', '1 tableta cada 8 horas');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Acetaminofén', 'Medicina', '1 tableta cada 8 horas');
INSERT INTO tratamientos(nombre, tipo, dosis) VALUES('Ácido acetilsalicílico', 'Medicina', '1 tableta cada 8 horas');

INSERT INTO examenes(nombre) VALUES('Rayos X');
INSERT INTO examenes(nombre) VALUES('Rayos Gamma');
INSERT INTO examenes(nombre) VALUES('Rayos Ultravioleta');
INSERT INTO examenes(nombre) VALUES('Rayos Infrarrojos');

INSERT INTO enfermedades(nombre) VALUES('Cataratas');
INSERT INTO enfermedades(nombre) VALUES('Glaucoma');
INSERT INTO enfermedades(nombre) VALUES('Retinopatía diabética');
INSERT INTO enfermedades(nombre) VALUES('Insuficiencia Renal');

INSERT INTO status(status) VALUES('Fallecido'), ('Enfermo'), ('Recuperado');
