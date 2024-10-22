-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mygamelist
-- ------------------------------------------------------
-- Server version	11.1.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `developer`
--

DROP TABLE IF EXISTS `developer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `developer` (
  `id_developer` int(11) NOT NULL AUTO_INCREMENT,
  `nm_developer` varchar(45) NOT NULL,
  PRIMARY KEY (`id_developer`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developer`
--

LOCK TABLES `developer` WRITE;
/*!40000 ALTER TABLE `developer` DISABLE KEYS */;
INSERT INTO `developer` VALUES (1,'Naughty Dog'),(2,'FromSoftware'),(3,'CD Projekt Red'),(4,'Rockstar Games'),(5,'Bungie'),(6,'Respawn Entertainment'),(7,'Ubisoft Montreal'),(8,'Bethesda Game Studios'),(9,'Valve Corporation'),(10,'BioWare'),(11,'Insomniac Games'),(12,'Blizzard Entertainment'),(13,'Epic Games'),(14,'Square Enix'),(15,'Capcom'),(16,'Sega'),(17,'Bandai Namco Entertainment'),(18,'Riot Games'),(19,'Arc System Works'),(20,'Team Ninja'),(21,'Atlus'),(22,'Kojima Productions'),(23,'Tango Gameworks'),(24,'PlatinumGames'),(25,'Larian Studios'),(26,'Supergiant Games'),(27,'Obsidian Entertainment'),(28,'Double Fine Productions'),(29,'Remedy Entertainment'),(30,'Hello Games'),(31,'Sucker Punch Productions'),(32,'Aksys Games'),(33,'Level-5'),(34,'Keen Games'),(35,'GSC Game World'),(36,'The Behemoth'),(37,'Nexon Games'),(38,'Housemarque'),(39,'Gaijin Entertainment'),(40,'Mediatonic'),(41,'Eidos-Montreal'),(42,'Vicarious Visions'),(43,'DICE'),(44,'Mojang Studios'),(45,'Infinity Ward'),(46,'Crytek'),(47,'Guerilla Games'),(48,'Croteam'),(49,'Red Barrels'),(50,'Ghost Games'),(51,'Treyarch'),(52,'Digital Extremes'),(53,'Piranha Bytes'),(54,'Arcane Studios'),(55,'Night School Studio'),(56,'Telltale Games'),(57,'Dreadbit'),(58,'Ryu ga Gotoku Studio'),(59,'Bluehole Studio'),(60,'Nimble Giant Entertainment'),(61,'Funcom'),(62,'Vlambeer'),(63,'Sparklite Games'),(64,'Panic Button Games'),(65,'Gearbox Software'),(66,'Giant Squid Studios'),(67,'Sierra Entertainment'),(68,'Red Storm Entertainment'),(69,'Firesprite'),(70,'Obsidian Entertainment'),(71,'Nimble Giant Entertainment'),(72,'Keen Games'),(73,'Thunder Lotus Games'),(74,'Alderon Games'),(75,'Wargaming'),(76,'Fatshark'),(77,'Kojima Productions'),(78,'SokoBan Team'),(79,'Bossa Studios'),(80,'Innersloth'),(81,'Giant Sparrow'),(82,'Puppy Games'),(83,'A44'),(84,'Witblit'),(85,'Team17'),(86,'DigiPen Game Gallery'),(87,'The Game Bakers'),(88,'Moonsprout Games'),(89,'Funky Lab'),(90,'Firesprite'),(91,'Wizards of the Coast'),(92,'Zynga'),(93,'Hollow Tree Games');
/*!40000 ALTER TABLE `developer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `nm_game` varchar(405) NOT NULL,
  `ds_sinopse` varchar(800) NOT NULL,
  `vl_price` decimal(10,2) NOT NULL,
  `nr_rate` decimal(3,1) NOT NULL,
  `tp_category` varchar(50) NOT NULL,
  `dt_release` date NOT NULL,
  `st_game` varchar(45) NOT NULL,
  `Developer_id_developer` int(11) NOT NULL,
  `Publisher_id_publisher` int(11) NOT NULL,
  `Plataform_id_plataform` int(11) NOT NULL,
  PRIMARY KEY (`id_game`),
  KEY `fk_Game_Developer_idx` (`Developer_id_developer`),
  KEY `fk_Game_Publisher1_idx` (`Publisher_id_publisher`),
  KEY `fk_Game_Plataform1_idx` (`Plataform_id_plataform`),
  CONSTRAINT `fk_Game_Developer` FOREIGN KEY (`Developer_id_developer`) REFERENCES `developer` (`id_developer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Game_Plataform1` FOREIGN KEY (`Plataform_id_plataform`) REFERENCES `plataform` (`id_plataform`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Game_Publisher1` FOREIGN KEY (`Publisher_id_publisher`) REFERENCES `publisher` (`id_publisher`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_has_genre`
--

DROP TABLE IF EXISTS `game_has_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_has_genre` (
  `Genre_id_genre` int(11) NOT NULL,
  `Game_id_game` int(11) NOT NULL,
  PRIMARY KEY (`Genre_id_genre`,`Game_id_game`),
  KEY `fk_Genre_has_Game_Game1_idx` (`Game_id_game`),
  KEY `fk_Genre_has_Game_Genre1_idx` (`Genre_id_genre`),
  CONSTRAINT `fk_Genre_has_Game_Game1` FOREIGN KEY (`Game_id_game`) REFERENCES `game` (`id_game`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Genre_has_Game_Genre1` FOREIGN KEY (`Genre_id_genre`) REFERENCES `genre` (`id_genre`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_has_genre`
--

LOCK TABLES `game_has_genre` WRITE;
/*!40000 ALTER TABLE `game_has_genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_has_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_in_list`
--

DROP TABLE IF EXISTS `game_in_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_in_list` (
  `Game_id_game` int(11) NOT NULL,
  `List_id_List` int(11) NOT NULL,
  PRIMARY KEY (`Game_id_game`,`List_id_List`),
  KEY `fk_Game_has_UserList_UserList1_idx` (`List_id_List`),
  KEY `fk_Game_has_UserList_Game1_idx` (`Game_id_game`),
  CONSTRAINT `fk_Game_has_UserList_Game1` FOREIGN KEY (`Game_id_game`) REFERENCES `game` (`id_game`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Game_has_UserList_UserList1` FOREIGN KEY (`List_id_List`) REFERENCES `list` (`id_UserList`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_in_list`
--

LOCK TABLES `game_in_list` WRITE;
/*!40000 ALTER TABLE `game_in_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_in_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamemode`
--

DROP TABLE IF EXISTS `gamemode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gamemode` (
  `idGameMode` int(11) NOT NULL AUTO_INCREMENT,
  `nm_Mode` varchar(70) NOT NULL,
  PRIMARY KEY (`idGameMode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamemode`
--

LOCK TABLES `gamemode` WRITE;
/*!40000 ALTER TABLE `gamemode` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamemode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamemode_has_game`
--

DROP TABLE IF EXISTS `gamemode_has_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gamemode_has_game` (
  `GameMode_idGameMode` int(11) NOT NULL,
  `Game_id_game` int(11) NOT NULL,
  PRIMARY KEY (`GameMode_idGameMode`,`Game_id_game`),
  KEY `fk_GameMode_has_Game_Game1_idx` (`Game_id_game`),
  KEY `fk_GameMode_has_Game_GameMode1_idx` (`GameMode_idGameMode`),
  CONSTRAINT `fk_GameMode_has_Game_Game1` FOREIGN KEY (`Game_id_game`) REFERENCES `game` (`id_game`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_GameMode_has_Game_GameMode1` FOREIGN KEY (`GameMode_idGameMode`) REFERENCES `gamemode` (`idGameMode`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamemode_has_game`
--

LOCK TABLES `gamemode_has_game` WRITE;
/*!40000 ALTER TABLE `gamemode_has_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamemode_has_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `nm_genre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Aventura'),(2,'Ação'),(3,'RPG'),(4,'Simulação'),(5,'Estratégia'),(6,'Esportes'),(7,'Tiro em primeira pessoa'),(8,'Tiro em terceira pessoa'),(9,'Plataforma'),(10,'Quebra-cabeça'),(11,'Horror'),(12,'Survival'),(13,'Aventura Gráfica'),(14,'MMORPG'),(15,'Roguelike'),(16,'Battle Royale'),(17,'Cartas'),(18,'Tabuleiro'),(19,'Plataforma 2D'),(20,'Plataforma 3D'),(21,'Música/Ritmo'),(22,'Construção e Gestão'),(23,'Simulador de Vida'),(24,'Hack and Slash'),(25,'Metroidvania'),(26,'Visual Novel'),(27,'Idle Game'),(28,'Text Adventure'),(29,'Torre de Defesa'),(30,'Luta'),(31,'Festa'),(32,'Aventura em Texto'),(33,'Simulador de Vôo'),(34,'Simulador de Tráfego'),(35,'Simulador de Agricultura'),(36,'Simulador de Cidades'),(37,'Aventura em Mundo Aberto'),(38,'Exploração'),(39,'Tiro Tático'),(40,'Sobrevivência em Mundo Aberto'),(41,'Plataforma de Roda'),(42,'RPG de Ação'),(43,'RPG Tático'),(44,'Quebra-Cabeça em 3D'),(45,'Aventura Interativa'),(46,'Estratégia em Tempo Real'),(47,'Estratégia por Turno'),(48,'Aventura Point-and-Click'),(49,'Simulação Espacial');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `id_UserList` int(11) NOT NULL AUTO_INCREMENT,
  `nr_games` int(11) NOT NULL,
  `nm_list` varchar(45) NOT NULL,
  `User_id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_UserList`),
  KEY `fk_List_User1_idx` (`User_id_user`),
  CONSTRAINT `fk_List_User1` FOREIGN KEY (`User_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissao`
--

DROP TABLE IF EXISTS `permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissao` (
  `idPermissao` int(11) NOT NULL AUTO_INCREMENT,
  `cdPermissao` int(2) NOT NULL,
  `dsPermissao` varchar(105) NOT NULL,
  `nmPermissao` varchar(45) NOT NULL,
  PRIMARY KEY (`idPermissao`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissao`
--

LOCK TABLES `permissao` WRITE;
/*!40000 ALTER TABLE `permissao` DISABLE KEYS */;
INSERT INTO `permissao` VALUES (1,99,'Boss','Donos'),(2,90,'ADM','Admin'),(3,2,'User','Usuario'),(4,1,'Guest','Visita');
/*!40000 ALTER TABLE `permissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataform`
--

DROP TABLE IF EXISTS `plataform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plataform` (
  `id_plataform` int(11) NOT NULL AUTO_INCREMENT,
  `nm_plataform` varchar(45) NOT NULL,
  PRIMARY KEY (`id_plataform`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataform`
--

LOCK TABLES `plataform` WRITE;
/*!40000 ALTER TABLE `plataform` DISABLE KEYS */;
INSERT INTO `plataform` VALUES (1,'Microsoft Windows'),(2,'Linux'),(3,'MacOS'),(4,'PlayStation4'),(5,'PlayStation5'),(6,'Xbox X/S'),(7,'Xbox One'),(8,'NintendoSwitch'),(9,'Android'),(10,'IOS');
/*!40000 ALTER TABLE `plataform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publisher` (
  `id_publisher` int(11) NOT NULL AUTO_INCREMENT,
  `nm_publisher` varchar(100) NOT NULL,
  PRIMARY KEY (`id_publisher`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Activision'),(2,'Electronic Arts'),(3,'Ubisoft'),(4,'Nintendo'),(5,'Sony Interactive Entertainment'),(6,'Bethesda Softworks'),(7,'Square Enix'),(8,'Capcom'),(9,'SEGA'),(10,'Bandai Namco Entertainment'),(11,'Riot Games'),(12,'Epic Games'),(13,'Valve Corporation'),(14,'2K Games'),(15,'THQ Nordic'),(16,'Paradox Interactive'),(17,'Gearbox Software'),(18,'Warner Bros. Interactive Entertainment'),(19,'Activision Blizzard'),(20,'Devolver Digital'),(21,'Frontier Developments'),(22,'Humble Games'),(23,'Team17'),(24,'Focus Entertainment'),(25,'CD Projekt'),(26,'Bloober Team'),(27,'Microsoft Studios'),(28,'Level-5'),(29,'Nacon'),(30,'Embracer Group'),(31,'505 Games'),(32,'Paradox Interactive'),(33,'THQ'),(34,'PlayStation Studios'),(35,'Curve Digital'),(36,'Larian Studios'),(37,'Zenimax Media'),(38,'Ubisoft Montreal'),(39,'Supergiant Games'),(40,'1C Company'),(41,'Daedalic Entertainment'),(42,'Digital Extremes'),(43,'2K Sports'),(44,'IO Interactive'),(45,'Riot Forge'),(46,'Paradox Development Studio'),(47,'White Owls'),(48,'PlayWay'),(49,'SQUARE ENIX Europe'),(50,'Rebellion Developments'),(51,'KOEI TECMO Games'),(52,'Thunder Lotus Games'),(53,'NIS America'),(54,'XSEED Games'),(55,'SNK Corporation'),(56,'Ratalaika Games'),(57,'Okomotive'),(58,'The Game Bakers'),(59,'Aksys Games'),(60,'Asmodee Digital'),(61,'Iceberg Interactive'),(62,'Funcom'),(63,'Headup Games'),(64,'The Astronauts'),(65,'Ysbryd Games'),(66,'Hideo Kojima Productions'),(67,'Ryu ga Gotoku Studio'),(68,'Tango Gameworks'),(69,'The Behemoth'),(70,'Studio MDHR'),(71,'Deconstructeam'),(72,'Annapurna Interactive'),(73,'Devolver Digital'),(74,'Raw Fury'),(75,'Curve Digital'),(76,'Smilegate Entertainment'),(77,'Croteam'),(78,'Wargaming'),(79,'GSC Game World'),(80,'Coffee Stain Studios'),(81,'FISHLABS'),(82,'PixelOpus'),(83,'Sprocket Games'),(84,'Muro Studios'),(85,'Scavengers Studio'),(86,'JoySeed'),(87,'Feral Interactive'),(88,'Dreadbit'),(89,'Untold Tales'),(90,'Ragnarsmottakeren'),(91,'Midnight City'),(92,'Telltale Games'),(93,'Frogwares'),(94,'The Indie Development Fund'),(95,'Firesprite'),(96,'Ocellus Media'),(97,'Studio MDHR'),(98,'Good Shepherd Entertainment'),(99,'Grumpyface Studios'),(100,'Another Indie');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id_review` int(11) NOT NULL,
  `tx_coment` varchar(45) DEFAULT NULL,
  `dt_reviewdate` date NOT NULL,
  `nr_rateuser` decimal(3,1) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_review`),
  KEY `fk_Review_Game1_idx` (`id_game`),
  KEY `fk_Review_User1_idx` (`id_user`),
  CONSTRAINT `fk_Review_Game1` FOREIGN KEY (`id_game`) REFERENCES `game` (`id_game`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Review_User1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nm_nickname` varchar(30) NOT NULL,
  `ds_email` varchar(205) NOT NULL,
  `cdSenha` varchar(45) NOT NULL,
  `nr_phone` int(11) DEFAULT NULL,
  `dt_birthday` date DEFAULT NULL,
  `Permissao_idPermissao` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_User_Permissao1_idx` (`Permissao_idPermissao`),
  CONSTRAINT `fk_User_Permissao1` FOREIGN KEY (`Permissao_idPermissao`) REFERENCES `permissao` (`idPermissao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 21:45:48
