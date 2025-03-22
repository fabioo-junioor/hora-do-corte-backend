-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 22/03/2025 às 05:33
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
  `pkPlan` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `price` varchar(5) NOT NULL,
  `time` varchar(5) NOT NULL,
  `description` varchar(255) NOT NULL,
  `benefits` mediumtext NOT NULL,
  PRIMARY KEY (`pkPlan`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Despejando dados para a tabela `plans`
--

INSERT INTO `plans` (`pkPlan`, `name`, `price`, `time`, `description`, `benefits`) VALUES
(1, 'Free', '0', '30', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '[\'30 dias de uso grátis\', \'Suporte diário\']'),
(2, 'Basic', '25', '30', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '[\'30 dias de uso\', \'Suporte diário\']'),
(3, 'Pro', '135', '180', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '[\'180 dias de uso\', \'Suporte diário\']');

-- --------------------------------------------------------

--
-- Estrutura para tabela `professional`
--

DROP TABLE IF EXISTS `professional`;
CREATE TABLE IF NOT EXISTS `professional` (
  `pkProfessional` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `isUnavailable` tinyint NOT NULL,
  `isActive` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
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
  `schedules` mediumtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
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
  `services` mediumtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fkProfessional` int NOT NULL,
  PRIMARY KEY (`pkProfessionalServices`),
  KEY `fkProfessional` (`fkProfessional`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

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
  `namePlan` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `pricePlan` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `timePlan` varchar(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `descriptionPlan` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `benefitsPlan` mediumtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `fkUser` int NOT NULL,
  PRIMARY KEY (`pkPurchasePlanUser`),
  KEY `fkUser` (`fkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `pkReservation` int NOT NULL AUTO_INCREMENT,
  `nameCustomer` varchar(100) NOT NULL,
  `emailCustomer` varchar(100) DEFAULT NULL,
  `phoneCustomer` varchar(15) NOT NULL,
  `observationCustomer` varchar(255) DEFAULT NULL,
  `dateReservation` varchar(15) NOT NULL,
  `timeReservation` varchar(10) NOT NULL,
  `services` mediumtext NOT NULL,
  `price` varchar(5) NOT NULL,
  `duration` varchar(5) NOT NULL,
  `isReservation` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fkUser` int NOT NULL,
  `fkProfessional` int NOT NULL,
  PRIMARY KEY (`pkReservation`),
  KEY `fkProfessional` (`fkProfessional`),
  KEY `fkUser` (`fkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `pkUser` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL,
  `isBlocked` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura para tabela `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
CREATE TABLE IF NOT EXISTS `userdetails` (
  `pkUserDetails` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `cep` varchar(15) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` varchar(20) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fkUser` int NOT NULL,
  PRIMARY KEY (`pkUserDetails`),
  KEY `fkUser` (`fkUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
