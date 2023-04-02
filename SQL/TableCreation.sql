CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS usuarios(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password_hash VARCHAR(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);

CREATE TABLE IF NOT EXISTS bitacora (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios,
    tabla VARCHAR(50),
    accion VARCHAR(10),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valores_viejos JSON,
    valores_nuevos JSON
);

CREATE TABLE IF NOT EXISTS admins(
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios,
	nombre VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	telefono VARCHAR(15) DEFAULT '-',
	direccion VARCHAR(100) DEFAULT '-',
);

CREATE TABLE IF NOT EXISTS pacientes(
	id SERIAL PRIMARY KEY,
	usuario_id INTEGER REFERENCES usuarios,
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

-- Source: https://www.html-code-generator.com/mysql/country-name-table
CREATE TABLE IF NOT EXISTS continentes(
	codigo varchar(2) PRIMARY KEY,
	nombre varchar(30) DEFAULT '-'
);

CREATE TABLE IF NOT EXISTS paises(
	id SERIAL PRIMARY KEY,
	codigo varchar(2) DEFAULT '-',
	nombre varchar(100) DEFAULT '-',
	continente_codigo VARCHAR(2) REFERENCES continentes(codigo),
	alfa_3 VARCHAR(3) DEFAULT '-'
);
CREATE INDEX IF NOT EXISTS idx_paises_id ON paises(id);

CREATE TABLE IF NOT EXISTS lugares(
	id SERIAL PRIMARY KEY,
	nombre varchar(50) NOT NULL,
	direccion varchar(250) DEFAULT '-',
	pais_id INTEGER REFERENCES paises
);
CREATE INDEX IF NOT EXISTS idx_lugares_id ON lugares(id);

CREATE TABLE IF NOT EXISTS trabajos(
	medico_id INTEGER references medicos,
	lugar_id INTEGER references lugares,
	fecha_inicio timestamp DEFAULT CURRENT_TIMESTAMP ,
	fecha_final timestamp DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS materiales(
	id SERIAL PRIMARY KEY,
	nombre varchar(25) default '-',
	tipo varchar(10) default 'Materiales'
);
CREATE INDEX IF NOT EXISTS idx_materiales_id ON materiales(id);

CREATE TABLE IF NOT EXISTS materiales_del_lugar(
    lugar_id INTEGER REFERENCES lugares,
    material_id INTEGER REFERENCES materiales,
    cantidad INTEGER DEFAULT 0,
    cantidad_referencia INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_materiales_del_lugar ON materiales_del_lugar(lugar_id, material_id);

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


INSERT INTO continentes VALUES
('AF', 'Africa'),
('AN', 'Antarctica'),
('AS', 'Asia'),
('EU', 'Europe'),
('OC', 'Australia'),
('NA', 'North America'),
('SA', 'South America');

-- https://www.html-code-generator.com/mysql/country-name-table

INSERT INTO paises VALUES
(1, 'AF', 'Afganistán', 'AS', 'AFG'),
(2, 'AX', 'Islas Aland', 'EU', 'ALA'),
(3, 'AL', 'Albania', 'EU', 'ALB'),
(4, 'DZ', 'Argelia', 'AF', 'DZA'),
(5, 'AS', 'Samoa Americana', 'OC', 'ASM'),
(6, 'AD', 'Andorra', 'EU', 'AND'),
(7, 'AO', 'Angola', 'AF', 'AGO'),
(8, 'AI', 'Anguila', 'NA', 'AIA'),
(9, 'AQ', 'Antártida', 'AN', 'ATA'),
(10, 'AG', 'Antigua y Barbuda', 'NA', 'ATG'),
(11, 'AR', 'Argentina', 'SA', 'ARG'),
(12, 'AM', 'Armenia', 'AS', 'ARM'),
(13, 'AW', 'Aruba', 'NA', 'ABW'),
(14, 'AU', 'Australia', 'OC', 'AUS'),
(15, 'AT', 'Austria', 'EU', 'AUT'),
(16, 'AZ', 'Azerbaiyán', 'AS', 'AZE'),
(17, 'BS', 'Bahamas', 'NA', 'BHS'),
(18, 'BH', 'Bahréin', 'AS', 'BHR'),
(19, 'BD', 'Bangladesh', 'AS', 'BGD'),
(20, 'BB', 'Barbados', 'NA', 'BRB'),
(21, 'BY', 'Bielorrusia', 'EU', 'BLR'),
(22, 'BE', 'Bélgica', 'EU', 'BEL'),
(23, 'BZ', 'Belice', 'NA', 'BLZ'),
(24, 'BJ', 'Benin', 'AF', 'BEN'),
(25, 'BM', 'islas Bermudas', 'NA', 'BMU'),
(26, 'BT', 'Bután', 'AS', 'BTN'),
(27, 'BO', 'Bolivia', 'SA', 'BOL'),
(28, 'BQ', 'Bonaire, Sint Eustatius y Saba', 'NA', 'BES'),
(29, 'BA', 'Bosnia y Herzegovina', 'EU', 'BIH'),
(30, 'BW', 'Botswana', 'AF', 'BWA'),
(31, 'BV', 'Isla Bouvet', 'AN', 'BVT'),
(32, 'BR', 'Brasil', 'SA', 'BRA'),
(33, 'IO', 'Territorio Británico del Océano Índico', 'AS', 'IOT'),
(34, 'BN', 'Brunei Darussalam', 'AS', 'BRN'),
(35, 'BG', 'Bulgaria', 'EU', 'BGR'),
(36, 'BF', 'Burkina Faso', 'AF', 'BFA'),
(37, 'BI', 'Burundi', 'AF', 'BDI'),
(38, 'KH', 'Camboya', 'AS', 'KHM'),
(39, 'CM', 'Camerún', 'AF', 'CMR'),
(40, 'CA', 'Canadá', 'NA', 'CAN'),
(41, 'CV', 'Cabo Verde', 'AF', 'CPV'),
(42, 'KY', 'Islas Caimán', 'NA', 'CYM'),
(43, 'CF', 'República Centroafricana', 'AF', 'CAF'),
(44, 'TD', 'Chad', 'AF', 'TCD'),
(45, 'CL', 'Chile', 'SA', 'CHL'),
(46, 'CN', 'porcelana', 'AS', 'CHN'),
(47, 'CX', 'Isla de Navidad', 'AS', 'CXR'),
(48, 'CC', 'Islas Cocos (Keeling)', 'AS', 'CCK'),
(49, 'CO', 'Colombia', 'SA', 'COL'),
(50, 'KM', 'Comoras', 'AF', 'COM'),
(51, 'CG', 'Congo', 'AF', 'COG'),
(52, 'CD', 'Congo, República Democrática del Congo', 'AF', 'COD'),
(53, 'CK', 'Islas Cook', 'OC', 'COK'),
(54, 'CR', 'Costa Rica', 'NA', 'CRI'),
(55, 'CI', 'Costa de Marfil', 'AF', 'CIV'),
(56, 'HR', 'Croacia', 'EU', 'HRV'),
(57, 'CU', 'Cuba', 'NA', 'CUB'),
(58, 'CW', 'Curazao', 'NA', 'CUW'),
(59, 'CY', 'Chipre', 'AS', 'CYP'),
(60, 'CZ', 'Republica checa', 'EU', 'CZE'),
(61, 'DK', 'Dinamarca', 'EU', 'DNK'),
(62, 'DJ', 'Djibouti', 'AF', 'DJI'),
(63, 'DM', 'Dominica', 'NA', 'DMA'),
(64, 'DO', 'República Dominicana', 'NA', 'DOM'),
(65, 'EC', 'Ecuador', 'SA', 'ECU'),
(66, 'EG', 'Egipto', 'AF', 'EGY'),
(67, 'SV', 'El Salvador', 'NA', 'SLV'),
(68, 'GQ', 'Guinea Ecuatorial', 'AF', 'GNQ'),
(69, 'ER', 'Eritrea', 'AF', 'ERI'),
(70, 'EE', 'Estonia', 'EU', 'EST'),
(71, 'ET', 'Etiopía', 'AF', 'ETH'),
(72, 'FK', 'Islas Falkland (Malvinas)', 'SA', 'FLK'),
(73, 'FO', 'Islas Faroe', 'EU', 'FRO'),
(74, 'FJ', 'Fiyi', 'OC', 'FJI'),
(75, 'FI', 'Finlandia', 'EU', 'FIN'),
(76, 'FR', 'Francia', 'EU', 'FRA'),
(77, 'GF', 'Guayana Francesa', 'SA', 'GUF'),
(78, 'PF', 'Polinesia francés', 'OC', 'PYF'),
(79, 'TF', 'Territorios Franceses del Sur', 'AN', 'ATF'),
(80, 'GA', 'Gabón', 'AF', 'GAB'),
(81, 'GM', 'Gambia', 'AF', 'GMB'),
(82, 'GE', 'Georgia', 'AS', 'GEO'),
(83, 'DE', 'Alemania', 'EU', 'DEU'),
(84, 'GH', 'Ghana', 'AF', 'GHA'),
(85, 'GI', 'Gibraltar', 'EU', 'GIB'),
(86, 'GR', 'Grecia', 'EU', 'GRC'),
(87, 'GL', 'Groenlandia', 'NA', 'GRL'),
(88, 'GD', 'Granada', 'NA', 'GRD'),
(89, 'GP', 'Guadalupe', 'NA', 'GLP'),
(90, 'GU', 'Guam', 'OC', 'GUM'),
(91, 'GT', 'Guatemala', 'NA', 'GTM'),
(92, 'GG', 'Guernsey', 'EU', 'GGY'),
(93, 'GN', 'Guinea', 'AF', 'GIN'),
(94, 'GW', 'Guinea-Bissau', 'AF', 'GNB'),
(95, 'GY', 'Guayana', 'SA', 'GUY'),
(96, 'HT', 'Haití', 'NA', 'HTI'),
(97, 'HM', 'Islas Heard y McDonald', 'AN', 'HMD'),
(98, 'VA', 'Santa Sede (Estado de la Ciudad del Vaticano)', 'EU', 'VAT'),
(99, 'HN', 'Honduras', 'NA', 'HND'),
(100, 'HK', 'Hong Kong', 'AS', 'HKG'),
(101, 'HU', 'Hungría', 'EU', 'HUN'),
(102, 'IS', 'Islandia', 'EU', 'ISL'),
(103, 'IN', 'India', 'AS', 'IND'),
(104, 'ID', 'Indonesia', 'AS', 'IDN'),
(105, 'IR', 'Irán (República Islámica de', 'AS', 'IRN'),
(106, 'IQ', 'Irak', 'AS', 'IRQ'),
(107, 'IE', 'Irlanda', 'EU', 'IRL'),
(108, 'IM', 'Isla del hombre', 'EU', 'IMN'),
(109, 'IL', 'Israel', 'AS', 'ISR'),
(110, 'IT', 'Italia', 'EU', 'ITA'),
(111, 'JM', 'Jamaica', 'NA', 'JAM'),
(112, 'JP', 'Japón', 'AS', 'JPN'),
(113, 'JE', 'Jersey', 'EU', 'JEY'),
(114, 'JO', 'Jordán', 'AS', 'JOR'),
(115, 'KZ', 'Kazajstán', 'AS', 'KAZ'),
(116, 'KE', 'Kenia', 'AF', 'KEN'),
(117, 'KI', 'Kiribati', 'OC', 'KIR'),
(118, 'KP', 'República de Corea, Popular Democrática de', 'AS', 'PRK'),
(119, 'KR', 'Corea, república de', 'AS', 'KOR'),
(120, 'XK', 'Kosovo', 'EU', 'XKX'),
(121, 'KW', 'Kuwait', 'AS', 'KWT'),
(122, 'KG', 'Kirguistán', 'AS', 'KGZ'),
(123, 'LA', 'República Democrática Popular Lao', 'AS', 'LAO'),
(124, 'LV', 'Letonia', 'EU', 'LVA'),
(125, 'LB', 'Líbano', 'AS', 'LBN'),
(126, 'LS', 'Lesoto', 'AF', 'LSO'),
(127, 'LR', 'Liberia', 'AF', 'LBR'),
(128, 'LY', 'Jamahiriya Arabe Libia', 'AF', 'LBY'),
(129, 'LI', 'Liechtenstein', 'EU', 'LIE'),
(130, 'LT', 'Lituania', 'EU', 'LTU'),
(131, 'LU', 'Luxemburgo', 'EU', 'LUX'),
(132, 'MO', 'Macao', 'AS', 'MAC'),
(133, 'MK', 'Macedonia, la ex República Yugoslava de', 'EU', 'MKD'),
(134, 'MG', 'Madagascar', 'AF', 'MDG'),
(135, 'MW', 'Malawi', 'AF', 'MWI'),
(136, 'MY', 'Malasia', 'AS', 'MYS'),
(137, 'MV', 'Maldivas', 'AS', 'MDV'),
(138, 'ML', 'Mali', 'AF', 'MLI'),
(139, 'MT', 'Malta', 'EU', 'MLT'),
(140, 'MH', 'Islas Marshall', 'OC', 'MHL'),
(141, 'MQ', 'Martinica', 'NA', 'MTQ'),
(142, 'MR', 'Mauritania', 'AF', 'MRT'),
(143, 'MU', 'Mauricio', 'AF', 'MUS'),
(144, 'YT', 'Mayotte', 'AF', 'MYT'),
(145, 'MX', 'México', 'NA', 'MEX'),
(146, 'FM', 'Micronesia, Estados Federados de', 'OC', 'FSM'),
(147, 'MD', 'Moldavia, República de', 'EU', 'MDA'),
(148, 'MC', 'Mónaco', 'EU', 'MCO'),
(149, 'MN', 'Mongolia', 'AS', 'MNG'),
(150, 'ME', 'Montenegro', 'EU', 'MNE'),
(151, 'MS', 'Montserrat', 'NA', 'MSR'),
(152, 'MA', 'Marruecos', 'AF', 'MAR'),
(153, 'MZ', 'Mozambique', 'AF', 'MOZ'),
(154, 'MM', 'Myanmar', 'AS', 'MMR'),
(155, 'NA', 'Namibia', 'AF', 'NAM'),
(156, 'NR', 'Nauru', 'OC', 'NRU'),
(157, 'NP', 'Nepal', 'AS', 'NPL'),
(158, 'NL', 'Países Bajos', 'EU', 'NLD'),
(159, 'AN', 'Antillas Holandesas', 'NA', 'ANT'),
(160, 'NC', 'Nueva Caledonia', 'OC', 'NCL'),
(161, 'NZ', 'Nueva Zelanda', 'OC', 'NZL'),
(162, 'NI', 'Nicaragua', 'NA', 'NIC'),
(163, 'NE', 'Níger', 'AF', 'NER'),
(164, 'NG', 'Nigeria', 'AF', 'NGA'),
(165, 'NU', 'Niue', 'OC', 'NIU'),
(166, 'NF', 'Isla Norfolk', 'OC', 'NFK'),
(167, 'MP', 'Islas Marianas del Norte', 'OC', 'MNP'),
(168, 'NO', 'Noruega', 'EU', 'NOR'),
(169, 'OM', 'Omán', 'AS', 'OMN'),
(170, 'PK', 'Pakistán', 'AS', 'PAK'),
(171, 'PW', 'Palau', 'OC', 'PLW'),
(172, 'PS', 'Territorio Palestino, Ocupado', 'AS', 'PSE'),
(173, 'PA', 'Panamá', 'NA', 'PAN'),
(174, 'PG', 'Papúa Nueva Guinea', 'OC', 'PNG'),
(175, 'PY', 'Paraguay', 'SA', 'PRY'),
(176, 'PE', 'Perú', 'SA', 'PER'),
(177, 'PH', 'Filipinas', 'AS', 'PHL'),
(178, 'PN', 'Pitcairn', 'OC', 'PCN'),
(179, 'PL', 'Polonia', 'EU', 'POL'),
(180, 'PT', 'Portugal', 'EU', 'PRT'),
(181, 'PR', 'Puerto Rico', 'NA', 'PRI'),
(182, 'QA', 'Katar', 'AS', 'QAT'),
(183, 'RE', 'Reunión', 'AF', 'REU'),
(184, 'RO', 'Rumania', 'EU', 'ROM'),
(185, 'RU', 'Federación Rusa', 'AS', 'RUS'),
(186, 'RW', 'Ruanda', 'AF', 'RWA'),
(187, 'BL', 'San Bartolomé', 'NA', 'BLM'),
(188, 'SH', 'Santa elena', 'AF', 'SHN'),
(189, 'KN', 'Saint Kitts y Nevis', 'NA', 'KNA'),
(190, 'LC', 'Santa Lucía', 'NA', 'LCA'),
(191, 'MF', 'San Martín', 'NA', 'MAF'),
(192, 'PM', 'San Pedro y Miquelón', 'NA', 'SPM'),
(193, 'VC', 'San Vicente y las Granadinas', 'NA', 'VCT'),
(194, 'WS', 'Samoa', 'OC', 'WSM'),
(195, 'SM', 'San Marino', 'EU', 'SMR'),
(196, 'ST', 'Santo Tomé y Príncipe', 'AF', 'STP'),
(197, 'SA', 'Arabia Saudita', 'AS', 'SAU'),
(198, 'SN', 'Senegal', 'AF', 'SEN'),
(199, 'RS', 'Serbia', 'EU', 'SRB'),
(200, 'CS', 'Serbia y Montenegro', 'EU', 'SCG'),
(201, 'SC', 'Seychelles', 'AF', 'SYC'),
(202, 'SL', 'Sierra Leona', 'AF', 'SLE'),
(203, 'SG', 'Singapur', 'AS', 'SGP'),
(204, 'SX', 'San Martín', 'NA', 'SXM'),
(205, 'SK', 'Eslovaquia', 'EU', 'SVK'),
(206, 'SI', 'Eslovenia', 'EU', 'SVN'),
(207, 'SB', 'Islas Salomón', 'OC', 'SLB'),
(208, 'SO', 'Somalia', 'AF', 'SOM'),
(209, 'ZA', 'Sudáfrica', 'AF', 'ZAF'),
(210, 'GS', 'Georgia del sur y las islas Sandwich del sur', 'AN', 'SGS'),
(211, 'SS', 'Sudán del Sur', 'AF', 'SSD'),
(212, 'ES', 'España', 'EU', 'ESP'),
(213, 'LK', 'Sri Lanka', 'AS', 'LKA'),
(214, 'SD', 'Sudán', 'AF', 'SDN'),
(215, 'SR', 'Surinam', 'SA', 'SUR'),
(216, 'SJ', 'Svalbard y Jan Mayen', 'EU', 'SJM'),
(217, 'SZ', 'Swazilandia', 'AF', 'SWZ'),
(218, 'SE', 'Suecia', 'EU', 'SWE'),
(219, 'CH', 'Suiza', 'EU', 'CHE'),
(220, 'SY', 'República Árabe Siria', 'AS', 'SYR'),
(221, 'TW', 'Taiwan, provincia de China', 'AS', 'TWN'),
(222, 'TJ', 'Tayikistán', 'AS', 'TJK'),
(223, 'TZ', 'Tanzania, República Unida de', 'AF', 'TZA'),
(224, 'TH', 'Tailandia', 'AS', 'THA'),
(225, 'TL', 'Timor-Leste', 'AS', 'TLS'),
(226, 'TG', 'Para llevar', 'AF', 'TGO'),
(227, 'TK', 'Tokelau', 'OC', 'TKL'),
(228, 'TO', 'Tonga', 'OC', 'TON'),
(229, 'TT', 'Trinidad y Tobago', 'NA', 'TTO'),
(230, 'TN', 'Túnez', 'AF', 'TUN'),
(231, 'TR', 'pavo', 'AS', 'TUR'),
(232, 'TM', 'Turkmenistán', 'AS', 'TKM'),
(233, 'TC', 'Islas Turcas y Caicos', 'NA', 'TCA'),
(234, 'TV', 'Tuvalu', 'OC', 'TUV'),
(235, 'UG', 'Uganda', 'AF', 'UGA'),
(236, 'UA', 'Ucrania', 'EU', 'UKR'),
(237, 'AE', 'Emiratos Árabes Unidos', 'AS', 'ARE'),
(238, 'GB', 'Reino Unido', 'EU', 'GBR'),
(239, 'US', 'Estados Unidos', 'NA', 'USA'),
(240, 'UM', 'Islas menores alejadas de los Estados Unidos', 'NA', 'UMI'),
(241, 'UY', 'Uruguay', 'SA', 'URY'),
(242, 'UZ', 'Uzbekistan', 'AS', 'UZB'),
(243, 'VU', 'Vanuatu', 'OC', 'VUT'),
(244, 'VE', 'Venezuela', 'SA', 'VEN'),
(245, 'VN', 'Vietnam', 'AS', 'VNM'),
(246, 'VG', 'Islas Vírgenes Británicas', 'NA', 'VGB'),
(247, 'VI', 'Islas Vírgenes, EE. UU.', 'NA', 'VIR'),
(248, 'WF', 'Wallis y Futuna', 'OC', 'WLF'),
(249, 'EH', 'Sahara Occidental', 'AF', 'ESH'),
(250, 'YE', 'Yemen', 'AS', 'YEM'),
(251, 'ZM', 'Zambia', 'AF', 'ZMB'),
(252, 'ZW', 'Zimbabue', 'AF', 'ZWE');

CREATE TABLE IF NOT EXISTS test(
	id serial PRIMARY KEY,
	usuario varchar(25) DEFAULT 'Jhon Doe',
	texto varchar(255) NOT NULL
);

INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
INSERT INTO test(texto) VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit');