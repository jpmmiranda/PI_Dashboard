-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dashboardEventos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dashboardEventos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dashboardEventos` DEFAULT CHARACTER SET utf8 ;
USE `dashboardEventos` ;

-- -----------------------------------------------------
-- Table `dashboardEventos`.`Eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dashboardEventos`.`Eventos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(250) NOT NULL,
  `start` VARCHAR(45) NOT NULL,
  `end` VARCHAR(45) NOT NULL,
  `description` VARCHAR(2000) NULL DEFAULT NULL,
  `allDay` VARCHAR(45) NULL DEFAULT 'false',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;