CREATE TABLE `plans` (
	`pkPlan` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(10) NOT NULL,
	`price` VARCHAR(5) NOT NULL,
	`time` VARCHAR(5) NOT NULL,
	`description` VARCHAR(255) NOT NULL,
	`benefits` TEXT(65535) NOT NULL,
	PRIMARY KEY(`pkPlan`)
);


CREATE TABLE `professional` (
	`pkProfessional` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255) NOT NULL,
	`image` VARCHAR(50) DEFAULT NULL,
	`instagram` VARCHAR(100) DEFAULT NULL,
	`isUnavailable` TINYINT NOT NULL,
	`isActive` TINYINT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`fkUser` INTEGER NOT NULL,
	PRIMARY KEY(`pkProfessional`)
);


CREATE TABLE `professionalschedules` (
	`pkProfessionalSchedules` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`schedules` TEXT(65535) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`fkProfessional` INTEGER NOT NULL UNIQUE,
	PRIMARY KEY(`pkProfessionalSchedules`)
);


CREATE TABLE `professionalservices` (
	`pkProfessionalServices` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`services` TEXT(65535) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`fkProfessional` INTEGER NOT NULL UNIQUE,
	PRIMARY KEY(`pkProfessionalServices`)
);


CREATE TABLE `purchaseplanuser` (
	`pkPurchasePlanUser` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`purchaseDate` VARCHAR(15) NOT NULL,
	`purchaseTime` VARCHAR(10) NOT NULL,
	`purchaseValidity` VARCHAR(15) NOT NULL,
	`namePlan` VARCHAR(10) NOT NULL,
	`pricePlan` VARCHAR(5) NOT NULL,
	`timePlan` VARCHAR(5) NOT NULL,
	`descriptionPlan` VARCHAR(255) NOT NULL,
	`benefitsPlan` TEXT(65535) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`fkUser` INTEGER NOT NULL,
	PRIMARY KEY(`pkPurchasePlanUser`)
);


CREATE TABLE `reservation` (
	`pkReservation` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`nameCustomer` VARCHAR(100) NOT NULL,
	`emailCustomer` VARCHAR(100) DEFAULT NULL,
	`phoneCustomer` VARCHAR(15) NOT NULL,
	`observationCustomer` VARCHAR(255),
	`dateReservation` VARCHAR(15) NOT NULL,
	`timeReservation` VARCHAR(10) NOT NULL,
	`services` TEXT(65535) NOT NULL,
	`price` VARCHAR(5) NOT NULL,
	`duration` VARCHAR(5) NOT NULL,
	`isReservation` TINYINT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`fkUser` INTEGER NOT NULL,
	`fkProfessional` INTEGER NOT NULL,
	PRIMARY KEY(`pkReservation`)
);


CREATE TABLE `user` (
	`pkUser` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`email` VARCHAR(100) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`isActive` TINYINT NOT NULL,
	`isBlocked` TINYINT NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY(`pkUser`)
);


CREATE TABLE `userdetails` (
	`pkUserDetails` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(100) NOT NULL,
	`slug` VARCHAR(50) NOT NULL,
	`phone` VARCHAR(15) NOT NULL,
	`instagram` VARCHAR(100) DEFAULT NULL,
	`image` VARCHAR(50) DEFAULT NULL,
	`cep` VARCHAR(15) NOT NULL,
	`state` VARCHAR(100) NOT NULL,
	`city` VARCHAR(100) NOT NULL,
	`street` VARCHAR(100) NOT NULL,
	`number` VARCHAR(20) DEFAULT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	`fkUser` INTEGER NOT NULL UNIQUE,
	PRIMARY KEY(`pkUserDetails`)
);


ALTER TABLE `userdetails`
ADD FOREIGN KEY(`fkUser`) REFERENCES `user`(`pkUser`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `purchaseplanuser`
ADD FOREIGN KEY(`fkUser`) REFERENCES `user`(`pkUser`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `professional`
ADD FOREIGN KEY(`fkUser`) REFERENCES `user`(`pkUser`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `professionalschedules`
ADD FOREIGN KEY(`fkProfessional`) REFERENCES `professional`(`pkProfessional`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `reservation`
ADD FOREIGN KEY(`fkProfessional`) REFERENCES `professional`(`pkProfessional`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `reservation`
ADD FOREIGN KEY(`fkUser`) REFERENCES `user`(`pkUser`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `professionalservices`
ADD FOREIGN KEY(`fkProfessional`) REFERENCES `professional`(`pkProfessional`)
ON UPDATE NO ACTION ON DELETE NO ACTION;