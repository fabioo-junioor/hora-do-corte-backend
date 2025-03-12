-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 11/03/2025 às 00:34
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_horadocorte`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `plans`
--

DROP TABLE IF EXISTS `plans`;
CREATE TABLE IF NOT EXISTS `plans` (
  `pkPlans` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `time` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`pkPlans`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `plans`
--

INSERT INTO `plans` (`pkPlans`, `name`, `price`, `time`) VALUES
(1, 'Free', '0', '30'),
(2, 'Basic', '25', '30'),
(3, 'Pro', '135', '180');

-- --------------------------------------------------------

--
-- Estrutura para tabela `professional`
--

DROP TABLE IF EXISTS `professional`;
CREATE TABLE IF NOT EXISTS `professional` (
  `pkProfessional` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `instagram` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `isUnavailable` tinyint(1) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkUser` int NOT NULL,
  PRIMARY KEY (`pkProfessional`),
  KEY `fkUser` (`fkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professionalschedules`
--

DROP TABLE IF EXISTS `professionalschedules`;
CREATE TABLE IF NOT EXISTS `professionalschedules` (
  `pkProfessionalSchedules` int NOT NULL AUTO_INCREMENT,
  `schedules` text NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkProfessional` int NOT NULL,
  PRIMARY KEY (`pkProfessionalSchedules`),
  KEY `fkProfessional` (`fkProfessional`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professionalservices`
--

DROP TABLE IF EXISTS `professionalservices`;
CREATE TABLE IF NOT EXISTS `professionalservices` (
  `pkProfessionalServices` int NOT NULL AUTO_INCREMENT,
  `services` text NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkProfessional` int NOT NULL,
  PRIMARY KEY (`pkProfessionalServices`),
  KEY `fkProfessional` (`fkProfessional`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `purchaseplanuser`
--

DROP TABLE IF EXISTS `purchaseplanuser`;
CREATE TABLE IF NOT EXISTS `purchaseplanuser` (
  `pkPurchasePlanUser` int NOT NULL AUTO_INCREMENT,
  `purchaseDate` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `purchaseTime` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `purchaseValidity` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `time` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkPlans` int NOT NULL,
  `fkUser` int NOT NULL,
  PRIMARY KEY (`pkPurchasePlanUser`),
  KEY `fkUser` (`fkUser`),
  KEY `fkPlans` (`fkPlans`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `pkReservation` int NOT NULL AUTO_INCREMENT,
  `nameCustomer` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `emailCustomer` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phoneCustomer` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `observationCustomer` text,
  `dateReservation` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `timeReservation` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `services` text NOT NULL,
  `price` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `duration` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isReservation` tinyint(1) NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkUser` int NOT NULL,
  `fkProfessional` int NOT NULL,
  PRIMARY KEY (`pkReservation`),
  KEY `fkUser` (`fkUser`),
  KEY `fkProfessional` (`fkProfessional`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `pkUser` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  PRIMARY KEY (`pkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
CREATE TABLE IF NOT EXISTS `userdetails` (
  `pkUserDetails` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `slug` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `instagram` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `image` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `cep` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `state` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `city` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `street` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dateTimeRegistration` datetime NOT NULL,
  `fkUser` int NOT NULL,
  PRIMARY KEY (`pkUserDetails`),
  KEY `fkUser` (`fkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
