/*
SQLyog Enterprise v12.15 (64 bit)
MySQL - 5.6.21 : Database - se1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`se1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `se1`;

/*Table structure for table `age_summary` */

DROP TABLE IF EXISTS `age_summary`;

CREATE TABLE `age_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL,
  PRIMARY KEY (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `bmi_summary` */

DROP TABLE IF EXISTS `bmi_summary`;

CREATE TABLE `bmi_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `datastore_errors` */

DROP TABLE IF EXISTS `datastore_errors`;

CREATE TABLE `datastore_errors` (
  `pkey` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `error` text COLLATE utf8mb4_unicode_ci,
  `func` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pkey`)
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `dia_summary` */

DROP TABLE IF EXISTS `dia_summary`;

CREATE TABLE `dia_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `ethnicities` */

DROP TABLE IF EXISTS `ethnicities`;

CREATE TABLE `ethnicities` (
  `ethnicity_id` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ethnicity` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ethnicity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `ethnicity_summary` */

DROP TABLE IF EXISTS `ethnicity_summary`;

CREATE TABLE `ethnicity_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whitenonhisp` float(7,5) DEFAULT NULL,
  `navam` float(7,5) DEFAULT NULL,
  `hisp` float(7,5) DEFAULT NULL,
  `other` float(7,5) DEFAULT NULL,
  `mixed` float(7,5) DEFAULT NULL,
  `asian` float(7,5) DEFAULT NULL,
  `black` float(7,5) DEFAULT NULL,
  `pacis` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `food` */

DROP TABLE IF EXISTS `food`;

CREATE TABLE `food` (
  `userfood_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `food` int(10) unsigned NOT NULL,
  `serving` decimal(4,2) DEFAULT NULL,
  `meal` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `food_timestamp` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person` int(11) unsigned NOT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userfood_id`),
  KEY `food` (`food`),
  KEY `person` (`person`),
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`food`) REFERENCES `food_list` (`food_id`),
  CONSTRAINT `food_ibfk_2` FOREIGN KEY (`person`) REFERENCES `people` (`pkey`)
) ENGINE=InnoDB AUTO_INCREMENT=319 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `food_list` */

DROP TABLE IF EXISTS `food_list`;

CREATE TABLE `food_list` (
  `food_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `food_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `serving_size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serving_size_normalized` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`food_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `gender_summary` */

DROP TABLE IF EXISTS `gender_summary`;

CREATE TABLE `gender_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `male` float(7,5) DEFAULT NULL,
  `female` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `hdl_summary` */

DROP TABLE IF EXISTS `hdl_summary`;

CREATE TABLE `hdl_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `height_summary` */

DROP TABLE IF EXISTS `height_summary`;

CREATE TABLE `height_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(5,2) DEFAULT NULL,
  `max` float(5,2) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `hr_summary` */

DROP TABLE IF EXISTS `hr_summary`;

CREATE TABLE `hr_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `ldl_summary` */

DROP TABLE IF EXISTS `ldl_summary`;

CREATE TABLE `ldl_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `people` */

DROP TABLE IF EXISTS `people`;

CREATE TABLE `people` (
  `pkey` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mi` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwd` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` int(10) unsigned DEFAULT NULL COMMENT 'inches',
  `height` int(10) unsigned DEFAULT NULL COMMENT 'pounds',
  `birth_date` char(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waist_size` int(11) DEFAULT NULL COMMENT 'inches',
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ethnicity` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pkey`),
  UNIQUE KEY `email` (`email`),
  KEY `ethnicity` (`ethnicity`),
  CONSTRAINT `people_ibfk_1` FOREIGN KEY (`ethnicity`) REFERENCES `ethnicities` (`ethnicity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `population_summary` */

DROP TABLE IF EXISTS `population_summary`;

CREATE TABLE `population_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `population` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `session` */

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `pkey` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `authtoken` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person` int(11) DEFAULT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pkey`)
) ENGINE=InnoDB AUTO_INCREMENT=431 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/*Table structure for table `sys_summary` */

DROP TABLE IF EXISTS `sys_summary`;

CREATE TABLE `sys_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `tri_summary` */

DROP TABLE IF EXISTS `tri_summary`;

CREATE TABLE `tri_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `waist_summary` */

DROP TABLE IF EXISTS `waist_summary`;

CREATE TABLE `waist_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `weight_summary` */

DROP TABLE IF EXISTS `weight_summary`;

CREATE TABLE `weight_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(8,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `workout` */

DROP TABLE IF EXISTS `workout`;

CREATE TABLE `workout` (
  `workout_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `workout_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distance` decimal(6,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `workout_timestamp` varchar(24) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `person` int(11) unsigned NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`workout_id`),
  KEY `person` (`person`),
  CONSTRAINT `workout_ibfk_1` FOREIGN KEY (`person`) REFERENCES `people` (`pkey`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `wthr_summary` */

DROP TABLE IF EXISTS `wthr_summary`;

CREATE TABLE `wthr_summary` (
  `state` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `average` float(7,5) DEFAULT NULL,
  `std` float(7,5) DEFAULT NULL,
  `min` float(3,1) DEFAULT NULL,
  `max` float(4,1) DEFAULT NULL,
  `bin1` float(7,5) DEFAULT NULL,
  `bin2` float(7,5) DEFAULT NULL,
  `bin3` float(7,5) DEFAULT NULL,
  `bin4` float(7,5) DEFAULT NULL,
  `bin5` float(7,5) DEFAULT NULL,
  `bin6` float(7,5) DEFAULT NULL,
  `bin7` float(7,5) DEFAULT NULL,
  `bin8` float(7,5) DEFAULT NULL,
  `bin9` float(7,5) DEFAULT NULL,
  `bin10` float(7,5) DEFAULT NULL,
  `bin11` float(7,5) DEFAULT NULL,
  `bin12` float(7,5) DEFAULT NULL,
  `bin13` float(7,5) DEFAULT NULL,
  `bin14` float(7,5) DEFAULT NULL,
  `bin15` float(7,5) DEFAULT NULL,
  `bin16` float(7,5) DEFAULT NULL,
  `bin17` float(7,5) DEFAULT NULL,
  `bin18` float(7,5) DEFAULT NULL,
  `bin19` float(7,5) DEFAULT NULL,
  `bin20` float(7,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/*Table structure for table `getfoodview` */

DROP TABLE IF EXISTS `getfoodview`;

/*!50001 DROP VIEW IF EXISTS `getfoodview` */;
/*!50001 DROP TABLE IF EXISTS `getfoodview` */;

/*!50001 CREATE TABLE  `getfoodview`(
 `userfood_id` int(10) unsigned ,
 `food` int(10) unsigned ,
 `serving` decimal(4,2) ,
 `meal` varchar(25) ,
 `food_timestamp` varchar(24) ,
 `comments` varchar(255) ,
 `email` varchar(100) ,
 `food_name` varchar(100) ,
 `calories_per_serving` int(11) ,
 `serving_size` varchar(50) ,
 `serving_size_normalized` decimal(6,2) ,
 `total_calories` decimal(14,2) ,
 `total_mass` decimal(10,4) 
)*/;

/*Table structure for table `getworkoutview` */

DROP TABLE IF EXISTS `getworkoutview`;

/*!50001 DROP VIEW IF EXISTS `getworkoutview` */;
/*!50001 DROP TABLE IF EXISTS `getworkoutview` */;

/*!50001 CREATE TABLE  `getworkoutview`(
 `workout_id` int(10) unsigned ,
 `email` varchar(100) ,
 `workout_type` varchar(100) ,
 `distance` decimal(6,2) ,
 `duration` int(11) ,
 `calories` int(11) ,
 `comments` varchar(255) ,
 `workout_timestamp` varchar(24) ,
 `pace` decimal(15,2) 
)*/;

/*View structure for view getfoodview */

/*!50001 DROP TABLE IF EXISTS `getfoodview` */;
/*!50001 DROP VIEW IF EXISTS `getfoodview` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`ntaylor`@`%` SQL SECURITY DEFINER VIEW `getfoodview` AS (select `food`.`userfood_id` AS `userfood_id`,`food`.`food` AS `food`,`food`.`serving` AS `serving`,`food`.`meal` AS `meal`,`food`.`food_timestamp` AS `food_timestamp`,`food`.`comments` AS `comments`,`people`.`email` AS `email`,`food_list`.`food_name` AS `food_name`,`food_list`.`calories` AS `calories_per_serving`,`food_list`.`serving_size` AS `serving_size`,`food_list`.`serving_size_normalized` AS `serving_size_normalized`,(`food_list`.`calories` * `food`.`serving`) AS `total_calories`,(`food`.`serving` * `food_list`.`serving_size_normalized`) AS `total_mass` from ((`food` join `people` on((`food`.`person` = `people`.`pkey`))) join `food_list` on((`food_list`.`food_id` = `food`.`food`)))) */;

/*View structure for view getworkoutview */

/*!50001 DROP TABLE IF EXISTS `getworkoutview` */;
/*!50001 DROP VIEW IF EXISTS `getworkoutview` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`ntaylor`@`%` SQL SECURITY DEFINER VIEW `getworkoutview` AS (select `workout`.`workout_id` AS `workout_id`,`people`.`email` AS `email`,`workout`.`workout_type` AS `workout_type`,`workout`.`distance` AS `distance`,`workout`.`duration` AS `duration`,`workout`.`calories` AS `calories`,`workout`.`comments` AS `comments`,`workout`.`workout_timestamp` AS `workout_timestamp`,round((`workout`.`duration` / `workout`.`distance`),2) AS `pace` from (`workout` join `people` on((`people`.`pkey` = `workout`.`person`)))) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
