-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-07-2025 a las 14:46:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bondi_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colectivos`
--

CREATE TABLE `colectivos` (
  `id` int(11) NOT NULL,
  `patente` varchar(20) NOT NULL,
  `id_linea` int(11) DEFAULT NULL,
  `id_colectivero` int(11) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'activo',
  `ultima_ubicacion_latitud` decimal(10,8) DEFAULT NULL,
  `ultima_ubicacion_longitud` decimal(11,8) DEFAULT NULL,
  `ultima_ubicacion_timestamp` timestamp NULL DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineas_colectivo`
--

CREATE TABLE `lineas_colectivo` (
  `id` int(11) NOT NULL,
  `nombre_linea` varchar(10) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `color_hex` varchar(7) DEFAULT NULL,
  `horario_operacion` varchar(255) DEFAULT NULL,
  `esta_activa` tinyint(1) DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paradas`
--

CREATE TABLE `paradas` (
  `id` int(11) NOT NULL,
  `nombre_parada` varchar(100) NOT NULL,
  `latitud` decimal(10,8) NOT NULL,
  `longitud` decimal(11,8) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `esta_activa` tinyint(1) DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paradas_ruta`
--

CREATE TABLE `paradas_ruta` (
  `id_ruta` int(11) NOT NULL,
  `id_parada` int(11) NOT NULL,
  `orden_parada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles_usuario`
--

CREATE TABLE `roles_usuario` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `id` int(11) NOT NULL,
  `id_linea` int(11) NOT NULL,
  `nombre_ruta` varchar(100) NOT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `tiempo_estimado_minutos` int(11) DEFAULT NULL,
  `esta_activa` tinyint(1) DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `hash_contrasena` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `numero_telefono` varchar(20) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `id_rol` int(11) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `esta_activo` tinyint(1) DEFAULT 1,
  `ultima_sesion_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `colectivos`
--
ALTER TABLE `colectivos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patente` (`patente`),
  ADD KEY `id_linea` (`id_linea`),
  ADD KEY `id_colectivero` (`id_colectivero`);

--
-- Indices de la tabla `lineas_colectivo`
--
ALTER TABLE `lineas_colectivo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_linea` (`nombre_linea`);

--
-- Indices de la tabla `paradas`
--
ALTER TABLE `paradas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paradas_ruta`
--
ALTER TABLE `paradas_ruta`
  ADD PRIMARY KEY (`id_ruta`,`id_parada`),
  ADD UNIQUE KEY `id_ruta` (`id_ruta`,`orden_parada`),
  ADD KEY `id_parada` (`id_parada`);

--
-- Indices de la tabla `roles_usuario`
--
ALTER TABLE `roles_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_linea` (`id_linea`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `colectivos`
--
ALTER TABLE `colectivos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lineas_colectivo`
--
ALTER TABLE `lineas_colectivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `paradas`
--
ALTER TABLE `paradas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles_usuario`
--
ALTER TABLE `roles_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colectivos`
--
ALTER TABLE `colectivos`
  ADD CONSTRAINT `colectivos_ibfk_1` FOREIGN KEY (`id_linea`) REFERENCES `lineas_colectivo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `colectivos_ibfk_2` FOREIGN KEY (`id_colectivero`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `paradas_ruta`
--
ALTER TABLE `paradas_ruta`
  ADD CONSTRAINT `paradas_ruta_ibfk_1` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `paradas_ruta_ibfk_2` FOREIGN KEY (`id_parada`) REFERENCES `paradas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD CONSTRAINT `rutas_ibfk_1` FOREIGN KEY (`id_linea`) REFERENCES `lineas_colectivo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles_usuario` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
