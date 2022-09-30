-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fulltrip_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fulltrip_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fulltrip_db` DEFAULT CHARACTER SET utf8 ;
USE `fulltrip_db` ;

-- -----------------------------------------------------
-- Table `fulltrip_db`.`type_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`type_user` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`type_user` (
  `type_user_id` INT NOT NULL AUTO_INCREMENT,
  `type_user` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`type_user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`user` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `date_birth` DATE NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `type_user_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `fk_user_type_user1_idx` (`type_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_type_user1`
    FOREIGN KEY (`type_user_id`)
    REFERENCES `fulltrip_db`.`type_user` (`type_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`hotel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`hotel` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`hotel` (
  `hotel_id` INT NOT NULL AUTO_INCREMENT,
  `hotel_name` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`hotel_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`car_rental`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`car_rental` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`car_rental` (
  `car_rental_id` INT NOT NULL AUTO_INCREMENT,
  `car_rental_name` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`car_rental_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`airline`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`airline` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`airline` (
  `airline_id` INT NOT NULL AUTO_INCREMENT,
  `airline_name` VARCHAR(100) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`airline_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`room` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `room_name` VARCHAR(45) NOT NULL,
  `amount_people` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `hotel_hotel_id` INT NOT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `fk_room_hotel1_idx` (`hotel_hotel_id` ASC) VISIBLE,
  CONSTRAINT `fk_room_hotel1`
    FOREIGN KEY (`hotel_hotel_id`)
    REFERENCES `fulltrip_db`.`hotel` (`hotel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`availability` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`availability` (
  `availability` INT NOT NULL AUTO_INCREMENT,
  `start_date` TIMESTAMP NOT NULL,
  `ending_date` TIMESTAMP NOT NULL,
  `room_id` INT NOT NULL,
  PRIMARY KEY (`availability`),
  INDEX `fk_availability_room1_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_availability_room1`
    FOREIGN KEY (`room_id`)
    REFERENCES `fulltrip_db`.`room` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`reservation_hotel`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`reservation_hotel` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`reservation_hotel` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `reservation_date` TIMESTAMP NULL,
  `date_reservation` DATE NOT NULL,
  `hotel_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`reservation_id`),
  INDEX `fk_reservation_hotel1_idx` (`hotel_id` ASC) VISIBLE,
  INDEX `fk_reservation_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_hotel1`
    FOREIGN KEY (`hotel_id`)
    REFERENCES `fulltrip_db`.`hotel` (`hotel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservation_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `fulltrip_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`car`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`car` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`car` (
  `car_id` INT NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(60) NOT NULL,
  `model` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `carcol` VARCHAR(45) NOT NULL,
  `placa` VARCHAR(45) NOT NULL,
  `car_rental_id` INT NOT NULL,
  PRIMARY KEY (`car_id`),
  INDEX `fk_car_car_rental1_idx` (`car_rental_id` ASC) VISIBLE,
  CONSTRAINT `fk_car_car_rental1`
    FOREIGN KEY (`car_rental_id`)
    REFERENCES `fulltrip_db`.`car_rental` (`car_rental_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`car_reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`car_reservation` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`car_reservation` (
  `car_reservation_id` INT NOT NULL AUTO_INCREMENT,
  `date_reservation` DATE NOT NULL,
  `user_id` INT NOT NULL,
  `car_rental_id` INT NOT NULL,
  PRIMARY KEY (`car_reservation_id`),
  INDEX `fk_car_reservation_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_car_reservation_car_rental1_idx` (`car_rental_id` ASC) VISIBLE,
  CONSTRAINT `fk_car_reservation_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `fulltrip_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_car_reservation_car_rental1`
    FOREIGN KEY (`car_rental_id`)
    REFERENCES `fulltrip_db`.`car_rental` (`car_rental_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`type_flight`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`type_flight` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`type_flight` (
  `type_fight_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`type_fight_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`detail_reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`detail_reservation` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`detail_reservation` (
  `hotel_reservation_id` INT NOT NULL,
  `room_room_id` INT NOT NULL,
  `number_rooms` INT NOT NULL,
  INDEX `fk_detail_reservation_reservation_hotel1_idx` (`hotel_reservation_id` ASC) VISIBLE,
  INDEX `fk_detail_reservation_room1_idx` (`room_room_id` ASC) VISIBLE,
  PRIMARY KEY (`hotel_reservation_id`, `room_room_id`),
  CONSTRAINT `fk_detail_reservation_reservation_hotel1`
    FOREIGN KEY (`hotel_reservation_id`)
    REFERENCES `fulltrip_db`.`reservation_hotel` (`reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_reservation_room1`
    FOREIGN KEY (`room_room_id`)
    REFERENCES `fulltrip_db`.`room` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`detail_car`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`detail_car` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`detail_car` (
  `car_reservation_id` INT NOT NULL,
  `car_id` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  INDEX `fk_detail_car_car_reservation1_idx` (`car_reservation_id` ASC) VISIBLE,
  INDEX `fk_detail_car_car1_idx` (`car_id` ASC) VISIBLE,
  PRIMARY KEY (`car_reservation_id`, `car_id`),
  CONSTRAINT `fk_detail_car_car_reservation1`
    FOREIGN KEY (`car_reservation_id`)
    REFERENCES `fulltrip_db`.`car_reservation` (`car_reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_car_car1`
    FOREIGN KEY (`car_id`)
    REFERENCES `fulltrip_db`.`car` (`car_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`flight`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`flight` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`flight` (
  `flight_id` INT NOT NULL AUTO_INCREMENT,
  `flight_date` DATE NOT NULL,
  `flight_destination` VARCHAR(100) NOT NULL,
  `origin_flight` VARCHAR(100) NOT NULL,
  `available_flight` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `airline_id` INT NOT NULL,
  PRIMARY KEY (`flight_id`),
  INDEX `fk_flight_airline1_idx` (`airline_id` ASC) VISIBLE,
  CONSTRAINT `fk_flight_airline1`
    FOREIGN KEY (`airline_id`)
    REFERENCES `fulltrip_db`.`airline` (`airline_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`reservation_flight`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`reservation_flight` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`reservation_flight` (
  `reservation_flight` INT NOT NULL,
  `date_reservation` DATE NULL,
  `airline_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`reservation_flight`),
  INDEX `fk_reservation_flight_airline1_idx` (`airline_id` ASC) VISIBLE,
  INDEX `fk_reservation_flight_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_flight_airline1`
    FOREIGN KEY (`airline_id`)
    REFERENCES `fulltrip_db`.`airline` (`airline_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservation_flight_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `fulltrip_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`type_service`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`type_service` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`type_service` (
  `type_service_id` INT NOT NULL AUTO_INCREMENT,
  `name_type` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`type_service_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`review` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(300) NULL,
  `type_service_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`review_id`),
  INDEX `fk_review_type_service1_idx` (`type_service_id` ASC) VISIBLE,
  INDEX `fk_review_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_review_type_service1`
    FOREIGN KEY (`type_service_id`)
    REFERENCES `fulltrip_db`.`type_service` (`type_service_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `fulltrip_db`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fulltrip_db`.`detail_flight`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fulltrip_db`.`detail_flight` ;

CREATE TABLE IF NOT EXISTS `fulltrip_db`.`detail_flight` (
  `flight_id` INT NOT NULL,
  `reservation_flight_id` INT NOT NULL,
  `type_fight_id` INT NOT NULL,
  `seat_number` INT NULL,
  INDEX `fk_detail_flight_flight1_idx` (`flight_id` ASC) VISIBLE,
  INDEX `fk_detail_flight_type_flight1_idx` (`type_fight_id` ASC) VISIBLE,
  INDEX `fk_detail_flight_reservation_flight1_idx` (`reservation_flight_id` ASC) VISIBLE,
  PRIMARY KEY (`flight_id`, `reservation_flight_id`),
  CONSTRAINT `fk_detail_flight_flight1`
    FOREIGN KEY (`flight_id`)
    REFERENCES `fulltrip_db`.`flight` (`flight_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_flight_type_flight1`
    FOREIGN KEY (`type_fight_id`)
    REFERENCES `fulltrip_db`.`type_flight` (`type_fight_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_flight_reservation_flight1`
    FOREIGN KEY (`reservation_flight_id`)
    REFERENCES `fulltrip_db`.`reservation_flight` (`reservation_flight`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
