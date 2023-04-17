INSERT INTO pacientes (nombre, apellidos, telefono, direccion, imc, altura_en_cm, peso_en_kg, adicciones) VALUES
('Ana', 'García', '555-1234', 'Av. Insurgentes #456', 21.5, 1.70, 65.0, 'Sin adicciones'),
('Juan', 'Martínez', '555-5678', 'Calle Cuauhtémoc #789', 22.0, 1.75, 70.0, 'Fuma ocasionalmente'),
('María', 'Hernández', '-', 'Calle Reforma #321', 25.5, 1.68, 80.0, 'Bebe alcohol regularmente'),
('Luis', 'Pérez', '555-9012', 'Calle 5 de Mayo #101', 28.0, 1.85, 90.0, 'Sin adicciones'),
('Karla', 'Ramírez', '555-3456', 'Calle Hidalgo #567', 24.5, 1.60, 60.0, 'Fuma diariamente'),
('Pedro', 'Sánchez', '-', 'Calle Juárez #910', 29.0, 1.80, 85.0, 'Bebe alcohol regularmente'),
('Sofía', 'Gómez', '555-7890', 'Av. Revolución #111', 20.0, 1.55, 50.0, 'Sin adicciones'),
('Jorge', 'López', '555-2345', 'Calle Independencia #222', 26.0, 1.72, 75.0, 'Fuma ocasionalmente'),
('Ana', 'Martínez', '555-6789', 'Calle Morelos #333', 31.0, 1.90, 100.0, 'Bebe alcohol regularmente'),
('José', 'González', '-', 'Calle Guerrero #444', 23.0, 1.78, 70.0, 'Sin adicciones');

INSERT INTO especialidades (nombre) VALUES
('Cardiología'),
('Dermatología'),
('Endocrinología'),
('Gastroenterología'),
('Hematología'),
('Neumología'),
('Neurología'),
('Oftalmología'),
('Oncología'),
('Pediatría');

INSERT INTO departamentos (nombre) VALUES
('Alta Verapaz'),
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

INSERT INTO lugares (nombre, direccion, tipo, departamento_id) VALUES
('Hospital Roosevelt', '12 Avenida 6-17, zona 11', 'Hospital', 7),
('Hospital General San Juan de Dios', '8a Calle 7-59, zona 1', 'Hospital', 1),
('Hospital Universitario Esperanza', '15 Avenida 14-01, zona 10', 'Hospital', 7),
('Hospital Regional de Zacapa', 'Barrio El Calvario, Zacapa', 'Hospital', 22),
('Hospital Nacional de Chiquimula', '1a Avenida 5-13, zona 2', 'Hospital', 4),
('Hospital de Retalhuleu', 'Barrio El Centro, Retalhuleu', 'Hospital', 15),
('Hospital Regional de Occidente', '8a Avenida A 6-16, zona 2, Quetzaltenango', 'Hospital', 13),
('Hospital Infantil Juan Pablo II', '7a Avenida 6-01, zona 2', 'Hospital', 1),
('Hospital Nacional de Jutiapa', '5a Calle y 2a Avenida Esquina, zona 1', 'Hospital', 11),
('Hospital General de Cobán', '3a Calle 5-54, zona 1, Cobán', 'Hospital', 1);

INSERT INTO insumos (nombre, tipo) VALUES
('Guantes', 'Utensilios'),
('Jeringas', 'Utensilios'),
('Algodón', 'Materiales'),
('Vendas', 'Materiales'),
('Mascarillas', 'Utensilios'),
('Agua Oxigenada', 'Medicinas'),
('Alcohol', 'Materiales'),
('Gasas', 'Materiales'),
('Termómetros', 'Utensilios'),
('Suero Fisiológico', 'Medicinas');

INSERT INTO tratamientos (nombre, tipo, dosis) VALUES
('Aspirina', 'Medicina', '100mg'),
('Ibuprofeno', 'Medicina', '400mg'),
('Paracetamol', 'Medicina', '500mg'),
('Inyección de Insulina', 'Medicina', '10 unidades'),
('Radiografía de Torax', 'Procedimiento', '-'),
('Cirugía de Hernia Inguinal', 'Procedimiento', '-'),
('Tratamiento de Quimioterapia', 'Procedimiento', '-'),
('Terapia de Oxigeno', 'Procedimiento', '-'),
('Extracción de Muela', 'Procedimiento', '-'),
('Vacuna contra la Influenza', 'Medicina', '-');

INSERT INTO examenes (nombre) VALUES
('Análisis de Sangre'),
('Radiografía de Torax'),
('Tomografía Computarizada'),
('Electrocardiograma'),
('Resonancia Magnética'),
('Examen de Orina'),
('Colonoscopía'),
('Endoscopía'),
('Mamografía'),
('Examen de la Vista');

INSERT INTO enfermedades (nombre) VALUES
('Gripe'),
('Neumonía'),
('Dengue'),
('Hipertensión'),
('Cáncer'),
('Diabetes'),
('VIH/SIDA'),
('Enfermedad de Alzheimer'),
('Artritis'),
('Asma');
