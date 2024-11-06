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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `developer`
--

LOCK TABLES `developer` WRITE;
/*!40000 ALTER TABLE `developer` DISABLE KEYS */;
INSERT INTO `developer` VALUES (1,'Naughty Dog'),(2,'FromSoftware'),(3,'CD Projekt Red'),(4,'Rockstar Games'),(5,'Bungie'),(6,'Respawn Entertainment'),(7,'Ubisoft Montreal'),(8,'Bethesda Game Studios'),(9,'Valve Corporation'),(10,'BioWare'),(11,'Insomniac Games'),(12,'Blizzard Entertainment'),(13,'Epic Games'),(14,'Square Enix'),(15,'Capcom'),(16,'Sega'),(17,'Bandai Namco Entertainment'),(18,'Riot Games'),(19,'Arc System Works'),(20,'Team Ninja'),(21,'Atlus'),(22,'Kojima Productions'),(23,'Tango Gameworks'),(24,'PlatinumGames'),(25,'Larian Studios'),(26,'Supergiant Games'),(27,'Obsidian Entertainment'),(28,'Double Fine Productions'),(29,'Remedy Entertainment'),(30,'Hello Games'),(31,'Sucker Punch Productions'),(32,'Aksys Games'),(33,'Level-5'),(34,'Keen Games'),(35,'GSC Game World'),(36,'The Behemoth'),(37,'Nexon Games'),(38,'Housemarque'),(39,'Gaijin Entertainment'),(40,'Mediatonic'),(41,'Eidos-Montreal'),(42,'Vicarious Visions'),(43,'DICE'),(44,'Mojang Studios'),(45,'Infinity Ward'),(46,'Crytek'),(47,'Guerilla Games'),(48,'Croteam'),(49,'Red Barrels'),(50,'Ghost Games'),(51,'Treyarch'),(52,'Digital Extremes'),(53,'Piranha Bytes'),(54,'Arcane Studios'),(55,'Night School Studio'),(56,'Telltale Games'),(57,'Dreadbit'),(58,'Ryu ga Gotoku Studio'),(59,'Bluehole Studio'),(60,'Nimble Giant Entertainment'),(61,'Funcom'),(62,'Vlambeer'),(63,'Sparklite Games'),(64,'Panic Button Games'),(65,'Gearbox Software'),(66,'Giant Squid Studios'),(67,'Sierra Entertainment'),(68,'Red Storm Entertainment'),(69,'Firesprite'),(70,'Obsidian Entertainment'),(71,'Nimble Giant Entertainment'),(72,'Keen Games'),(73,'Thunder Lotus Games'),(74,'Alderon Games'),(75,'Wargaming'),(76,'Fatshark'),(77,'Kojima Productions'),(78,'SokoBan Team'),(79,'Bossa Studios'),(80,'Innersloth'),(81,'Giant Sparrow'),(82,'Puppy Games'),(83,'A44'),(84,'Witblit'),(85,'Team17'),(86,'DigiPen Game Gallery'),(87,'The Game Bakers'),(88,'Moonsprout Games'),(89,'Funky Lab'),(90,'Firesprite'),(91,'Wizards of the Coast'),(92,'Zynga'),(93,'Hollow Tree Games'),(94,'Nintendo Entertainment Planning & Development'),(95,'Rockstar North'),(96,'Santa Monica Studio'),(97,'343 Industries'),(98,'id Software');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'The Legend of Zelda: Breath of the Wild','Aventure-se em um vasto mundo aberto e descubra segredos enquanto salva o reino de Hyrule.',59.99,0.0,'2017-03-03','Lancado',94,4,6),(2,'The Witcher 3: Wild Hunt','Jogue como Geralt de Rivia, um caçador de monstros, em um vasto mundo aberto com uma narrativa profunda.',49.99,0.0,'2015-05-19','Lancado',3,25,1),(3,'Minecraft','Um jogo de construção em blocos onde você pode explorar, minerar e criar em um mundo infinito.',26.95,0.0,'2011-11-18','Lancado',44,27,1),(4,'Grand Theft Auto V','Explore o mundo aberto de Los Santos, completando missões e causando o caos em um dos maiores jogos de ação.',29.99,0.0,'2013-09-17','Lancado',95,102,1),(5,'Fortnite','Um battle royale onde você luta para ser o último jogador sobrevivente enquanto constrói estruturas e coleta recursos.',0.00,0.0,'2017-07-21','Lancado',13,12,1),(6,'Red Dead Redemption 2','Um jogo de faroeste épico em mundo aberto, onde você vive como um fora da lei nos últimos dias do Velho Oeste.',59.99,0.0,'2018-10-26','Lancado',95,102,2),(7,'Super Mario Odyssey','Junte-se a Mario em uma jornada de exploração por diversos reinos coloridos para salvar a Princesa Peach.',59.99,0.0,'2017-10-27','Lancado',94,4,6),(8,'The Last of Us Part II','Uma história emocionante de sobrevivência em um mundo pós-apocalíptico, com uma jogabilidade imersiva e narrativa poderosa.',59.99,0.0,'2020-06-19','Lancado',1,5,2),(9,'Overwatch','Um jogo de tiro em equipe com heróis únicos, onde você deve trabalhar em equipe para completar objetivos.',39.99,0.0,'2016-05-24','Lançado',12,19,1),(10,'Dark Souls','Um jogo de RPG de ação conhecido por sua dificuldade desafiadora e combate tático, ambientado em um mundo sombrio.',39.99,0.0,'2011-09-22','Lancado',2,10,1),(11,'God of War','Kratos e seu filho Atreus embarcam em uma jornada épica na mitologia nórdica, enfrentando deuses e monstros.',59.99,0.0,'2018-04-20','Lancado',96,5,4),(12,'Halo: Infinite','A saga de Master Chief continua em um vasto mundo aberto, enfrentando o Banished para salvar a humanidade.',59.99,0.0,'2021-12-08','Lancado',97,103,1),(13,'Animal Crossing: New Horizons','Construa sua ilha dos sonhos e interaja com personagens adoráveis em um jogo de simulação relaxante.',59.99,0.0,'2020-03-20','Lancado',94,4,6),(14,'Cyberpunk 2077','Explore uma megalópole futurista, com personalização extrema de personagens e narrativa imersiva.',59.99,0.0,'2020-12-10','Lancado',3,25,1),(15,'Sekiro: Shadows Die Twice','Um intenso jogo de ação onde você é um shinobi em busca de vingança no Japão feudal.',59.99,0.0,'2019-03-22','Lancado',2,1,1),(16,'Hades','Um rogue-like em que você controla Zagreus, o príncipe do submundo, em sua fuga do inferno.',24.99,0.0,'2020-09-17','Lancado',26,39,1),(17,'Resident Evil Village','O oitavo título da série Resident Evil traz Ethan Winters de volta para enfrentar novos terrores em uma vila remota.',59.99,0.0,'2021-05-07','Lancado',15,8,3),(18,'Apex Legends','Um battle royale gratuito com heróis únicos, cada um com habilidades especiais, lutando pela vitória.',0.00,0.0,'2019-02-04','Lancado',6,2,1),(19,'Call of Duty: Modern Warfare','Um reboot da série Modern Warfare, com uma campanha intensa e multijogador competitivo.',59.99,0.0,'2019-10-25','Lancado',45,1,2),(20,'DOOM Eternal','Derrote hordas de demônios em batalhas frenéticas e sangrentas neste shooter em primeira pessoa.',59.99,0.0,'2020-03-20','Lancado',98,6,1);
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
INSERT INTO `game_has_genre` VALUES (1,1),(2,1),(1,2),(3,2),(1,3),(12,3),(2,4),(8,4),(2,5),(16,5),(1,6),(2,6),(9,7),(10,7),(2,8),(3,8),(2,9),(7,9),(3,10),(30,10),(2,11),(3,11),(2,12),(8,12),(1,13),(22,13),(1,14),(2,14),(2,15),(3,15),(15,16),(24,16),(2,17),(7,17),(2,18),(16,18),(2,19),(7,19),(2,20),(24,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamemode`
--

LOCK TABLES `gamemode` WRITE;
/*!40000 ALTER TABLE `gamemode` DISABLE KEYS */;
INSERT INTO `gamemode` VALUES (1,'Multiplayer'),(2,'Singleplayer'),(3,'PVE'),(4,'PVP'),(5,'Cooperativo');
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
INSERT INTO `gamemode_has_game` VALUES (2,1),(3,1),(2,2),(3,2),(1,3),(2,3),(3,4),(4,4),(1,5),(4,5),(2,6),(3,6),(2,7),(3,7),(2,8),(3,8),(1,9),(4,9),(2,10),(3,10),(2,11),(3,11),(1,12),(4,12),(2,13),(3,13),(2,14),(3,14),(2,15),(3,15),(2,16),(3,16),(2,17),(3,17),(1,18),(4,18),(1,19),(2,19),(2,20),(3,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Aventura'),(2,'Ação'),(3,'RPG'),(4,'Simulação'),(5,'Estratégia'),(6,'Esportes'),(7,'Tiro em primeira pessoa'),(8,'Tiro em terceira pessoa'),(9,'Plataforma'),(10,'Quebra-cabeça'),(11,'Horror'),(12,'Survival'),(13,'Aventura Gráfica'),(14,'MMORPG'),(15,'Roguelike'),(16,'Battle Royale'),(17,'Cartas'),(18,'Tabuleiro'),(19,'Plataforma 2D'),(20,'Plataforma 3D'),(21,'Música/Ritmo'),(22,'Construção e Gestão'),(23,'Simulador de Vida'),(24,'Hack and Slash'),(25,'Metroidvania'),(26,'Visual Novel'),(27,'Idle Game'),(28,'Text Adventure'),(29,'Torre de Defesa'),(30,'Luta'),(31,'Festa'),(32,'Aventura em Texto'),(33,'Simulador de Vôo'),(34,'Simulador de Tráfego'),(35,'Simulador de Agricultura'),(36,'Simulador de Cidades'),(37,'Aventura em Mundo Aberto'),(38,'Exploração'),(39,'Tiro Tático'),(40,'Sobrevivência em Mundo Aberto'),(41,'Plataforma de Roda'),(42,'RPG de Ação'),(43,'RPG Tático'),(44,'Quebra-Cabeça em 3D'),(46,'Estratégia em Tempo Real'),(47,'Estratégia por Turno'),(48,'Aventura Point-and-Click'),(49,'Simulação Espacial'),(50,'Corrida');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,0,'Desejo',1),(2,0,'Completos',1),(3,0,'Jogando',1),(4,0,'Abandonado',1),(5,0,'Pausado',1),(6,0,'Todos',1);
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
INSERT INTO `plataform` VALUES (1,'Computador'),(2,'PlayStation4'),(3,'PlayStation5'),(4,'Xbox X/S'),(5,'Xbox One'),(6,'NintendoSwitch'),(7,'Android'),(8,'IOS');
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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Activision'),(2,'Electronic Arts'),(3,'Ubisoft'),(4,'Nintendo'),(5,'Sony Interactive Entertainment'),(6,'Bethesda Softworks'),(7,'Square Enix'),(8,'Capcom'),(9,'SEGA'),(10,'Bandai Namco Entertainment'),(11,'Riot Games'),(12,'Epic Games'),(13,'Valve Corporation'),(14,'2K Games'),(15,'THQ Nordic'),(16,'Paradox Interactive'),(17,'Gearbox Software'),(18,'Warner Bros. Interactive Entertainment'),(19,'Activision Blizzard'),(20,'Devolver Digital'),(21,'Frontier Developments'),(22,'Humble Games'),(23,'Team17'),(24,'Focus Entertainment'),(25,'CD Projekt'),(26,'Bloober Team'),(27,'Microsoft Studios'),(28,'Level-5'),(29,'Nacon'),(30,'Embracer Group'),(31,'505 Games'),(32,'Paradox Interactive'),(33,'THQ'),(34,'PlayStation Studios'),(35,'Curve Digital'),(36,'Larian Studios'),(37,'Zenimax Media'),(38,'Ubisoft Montreal'),(39,'Supergiant Games'),(40,'1C Company'),(41,'Daedalic Entertainment'),(42,'Digital Extremes'),(43,'2K Sports'),(44,'IO Interactive'),(45,'Riot Forge'),(46,'Paradox Development Studio'),(47,'White Owls'),(48,'PlayWay'),(49,'SQUARE ENIX Europe'),(50,'Rebellion Developments'),(51,'KOEI TECMO Games'),(52,'Thunder Lotus Games'),(53,'NIS America'),(54,'XSEED Games'),(55,'SNK Corporation'),(56,'Ratalaika Games'),(57,'Okomotive'),(58,'The Game Bakers'),(59,'Aksys Games'),(60,'Asmodee Digital'),(61,'Iceberg Interactive'),(62,'Funcom'),(63,'Headup Games'),(64,'The Astronauts'),(65,'Ysbryd Games'),(66,'Hideo Kojima Productions'),(67,'Ryu ga Gotoku Studio'),(68,'Tango Gameworks'),(69,'The Behemoth'),(70,'Studio MDHR'),(71,'Deconstructeam'),(72,'Annapurna Interactive'),(73,'Devolver Digital'),(74,'Raw Fury'),(75,'Curve Digital'),(76,'Smilegate Entertainment'),(77,'Croteam'),(78,'Wargaming'),(79,'GSC Game World'),(80,'Coffee Stain Studios'),(81,'FISHLABS'),(82,'PixelOpus'),(83,'Sprocket Games'),(84,'Muro Studios'),(85,'Scavengers Studio'),(86,'JoySeed'),(87,'Feral Interactive'),(88,'Dreadbit'),(89,'Untold Tales'),(90,'Ragnarsmottakeren'),(91,'Midnight City'),(92,'Telltale Games'),(93,'Frogwares'),(94,'The Indie Development Fund'),(95,'Firesprite'),(96,'Ocellus Media'),(97,'Studio MDHR'),(98,'Good Shepherd Entertainment'),(99,'Grumpyface Studios'),(100,'Another Indie'),(102,'Rockstar Games'),(103,'Xbox Game Studios');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Eduardo','duduzebas@gmail.com','12345678',NULL,NULL,1),(2,'Thiago','thiagodossantos461@gmail.com','87654321',NULL,NULL,1);
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

-- Dump completed on 2024-10-30 19:24:06
