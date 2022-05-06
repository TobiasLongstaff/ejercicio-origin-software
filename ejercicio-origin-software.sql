-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-05-2022 a las 22:47:16
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ejercicio-origin-software`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acciones_favoritas`
--

DROP TABLE IF EXISTS `acciones_favoritas`;
CREATE TABLE IF NOT EXISTS `acciones_favoritas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `simbolo` varchar(200) COLLATE utf16_spanish_ci NOT NULL,
  `nombre` varchar(200) COLLATE utf16_spanish_ci NOT NULL,
  `moneda` varchar(3) COLLATE utf16_spanish_ci NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla `acciones_favoritas`
--

INSERT INTO `acciones_favoritas` (`id`, `simbolo`, `nombre`, `moneda`, `id_usuario`) VALUES
(1, 'TSLA/NASDAQ', 'Tesla Inc', 'USD', 1),
(2, 'NTFAX/NASDAQ', 'Aberdeen Intermediate Municipal Income Fund Class A', 'USD', 1),
(3, 'AAPL/NASDAQ', 'Apple Inc', 'USD', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_apellido` varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  `mail` varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  `password` varchar(100) COLLATE utf16_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_apellido`, `mail`, `password`) VALUES
(1, 'Tobias Longstaff', 'tobiaslongstaff@gmail.com', '$2b$10$0NCscxuX6OfSIJ8TfMw/Ve/XUuIol/Ji.BYkShsI82n3MFns3z98W');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acciones_favoritas`
--
ALTER TABLE `acciones_favoritas`
  ADD CONSTRAINT `acciones_favoritas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
