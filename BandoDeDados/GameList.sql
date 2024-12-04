-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gamelist
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_avaliacao`
--

DROP TABLE IF EXISTS `t_avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_avaliacao` (
  `id_avaliacao` int(11) NOT NULL AUTO_INCREMENT,
  `tx_comentario` varchar(800) DEFAULT NULL,
  `dt_envio` varchar(45) NOT NULL,
  `nr_usuario_nota` decimal(3,1) NOT NULL,
  `id_jogo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_avaliacao`),
  KEY `fk_T_AVALIACAO_T_JOGO1_idx` (`id_jogo`),
  KEY `fk_T_AVALIACAO_T_USUARIO1_idx` (`id_usuario`),
  CONSTRAINT `fk_T_AVALIACAO_T_JOGO1` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_AVALIACAO_T_USUARIO1` FOREIGN KEY (`id_usuario`) REFERENCES `t_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `t_avaliacao_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `t_usuario` (`id_usuario`),
  CONSTRAINT `t_avaliacao_ibfk_2` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`),
  CONSTRAINT `t_avaliacao_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `t_usuario` (`id_usuario`),
  CONSTRAINT `t_avaliacao_ibfk_4` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_avaliacao`
--

LOCK TABLES `t_avaliacao` WRITE;
/*!40000 ALTER TABLE `t_avaliacao` DISABLE KEYS */;
INSERT INTO `t_avaliacao` VALUES (4,NULL,'2024-12-04',9.5,1,1),(5,NULL,'2024-12-04',6.5,1,2),(6,NULL,'2024-12-04',8.5,6,1),(7,NULL,'2024-12-04',7.7,6,2),(8,NULL,'2024-12-04',9.1,3,1),(10,NULL,'2024-12-04',9.7,7,1),(11,NULL,'2024-12-04',0.0,11,1);
/*!40000 ALTER TABLE `t_avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_desenvolvedora`
--

DROP TABLE IF EXISTS `t_desenvolvedora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_desenvolvedora` (
  `id_desenvolvedora` int(11) NOT NULL AUTO_INCREMENT,
  `nm_desenvolvedora` varchar(100) NOT NULL,
  PRIMARY KEY (`id_desenvolvedora`),
  UNIQUE KEY `nm_desenvolvedora_UNIQUE` (`nm_desenvolvedora`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_desenvolvedora`
--

LOCK TABLES `t_desenvolvedora` WRITE;
/*!40000 ALTER TABLE `t_desenvolvedora` DISABLE KEYS */;
INSERT INTO `t_desenvolvedora` VALUES (5,'Bethesda Game Studios'),(10,'Bungie'),(2,'CD Projekt Red'),(8,'Epic Games'),(3,'FromSoftware'),(1,'Naughty Dog'),(11,'Re-Logic'),(4,'Rockstar North'),(12,'Santa Monica Studio'),(9,'Square Enix'),(7,'Ubisoft Montreal'),(6,'Valve Corporation');
/*!40000 ALTER TABLE `t_desenvolvedora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_distribuidora`
--

DROP TABLE IF EXISTS `t_distribuidora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_distribuidora` (
  `id_distribuidora` int(11) NOT NULL AUTO_INCREMENT,
  `nm_distribuidora` varchar(100) NOT NULL,
  PRIMARY KEY (`id_distribuidora`),
  UNIQUE KEY `nm_distribuidora_UNIQUE` (`nm_distribuidora`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_distribuidora`
--

LOCK TABLES `t_distribuidora` WRITE;
/*!40000 ALTER TABLE `t_distribuidora` DISABLE KEYS */;
INSERT INTO `t_distribuidora` VALUES (11,'Activision'),(2,'Bandai Namco Entertainment'),(6,'Bethesda Softworks'),(4,'CD Projekt'),(9,'Epic Games'),(3,'Microsoft'),(12,'Re-Logic'),(1,'Sony Interactive Entertainment'),(10,'Square Enix'),(5,'Take-Two Interactive'),(8,'Ubisoft'),(7,'Valve');
/*!40000 ALTER TABLE `t_distribuidora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_genero`
--

DROP TABLE IF EXISTS `t_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_genero` (
  `id_genero` int(11) NOT NULL AUTO_INCREMENT,
  `nm_genero` varchar(100) NOT NULL,
  PRIMARY KEY (`id_genero`),
  UNIQUE KEY `nm_genero_UNIQUE` (`nm_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_genero`
--

LOCK TABLES `t_genero` WRITE;
/*!40000 ALTER TABLE `t_genero` DISABLE KEYS */;
INSERT INTO `t_genero` VALUES (10,'Ação'),(9,'Aventura'),(1,'Battle Royale'),(5,'Estratégia'),(7,'FPS'),(3,'Hack and Slash'),(4,'Mundo aberto'),(11,'Plataforma'),(8,'RPG'),(6,'Simulação'),(2,'Sobrevivencia');
/*!40000 ALTER TABLE `t_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_genero_do_jogo`
--

DROP TABLE IF EXISTS `t_genero_do_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_genero_do_jogo` (
  `id_jogo` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL,
  PRIMARY KEY (`id_jogo`,`id_genero`),
  KEY `fk_T_JOGO_has_T_GENERO_T_GENERO1_idx` (`id_genero`),
  KEY `fk_T_JOGO_has_T_GENERO_T_JOGO1_idx` (`id_jogo`),
  CONSTRAINT `fk_T_JOGO_has_T_GENERO_T_GENERO1` FOREIGN KEY (`id_genero`) REFERENCES `t_genero` (`id_genero`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_JOGO_has_T_GENERO_T_JOGO1` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_genero_do_jogo`
--

LOCK TABLES `t_genero_do_jogo` WRITE;
/*!40000 ALTER TABLE `t_genero_do_jogo` DISABLE KEYS */;
INSERT INTO `t_genero_do_jogo` VALUES (1,2),(1,4),(1,8),(1,9),(1,10),(2,2),(2,4),(2,8),(2,9),(2,10),(3,2),(3,4),(3,8),(3,9),(3,10),(4,2),(4,4),(4,8),(4,9),(4,10),(6,10),(7,2),(7,8),(7,9),(8,9),(8,10),(9,9),(9,10),(10,2),(10,8),(10,9),(11,2),(11,8),(11,9);
/*!40000 ALTER TABLE `t_genero_do_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_jogo`
--

DROP TABLE IF EXISTS `t_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_jogo` (
  `id_jogo` int(11) NOT NULL AUTO_INCREMENT,
  `nm_jogo` varchar(200) NOT NULL,
  `ds_sinopse` varchar(800) NOT NULL,
  `nr_nota` decimal(3,1) NOT NULL,
  `dt_lancamento` date NOT NULL,
  `st_game` varchar(45) NOT NULL,
  `ds_imagem` varchar(255) NOT NULL,
  `id_distribuidora` int(11) NOT NULL,
  `id_desenvolvedora` int(11) NOT NULL,
  `id_plataforma` int(11) NOT NULL,
  PRIMARY KEY (`id_jogo`),
  UNIQUE KEY `nm_jogo_UNIQUE` (`nm_jogo`),
  UNIQUE KEY `ds_imagem_UNIQUE` (`ds_imagem`),
  KEY `fk_T_JOGO_T_DISTRIBUIDORA1_idx` (`id_distribuidora`),
  KEY `fk_T_JOGO_T_DESENVOLVEDORA1_idx` (`id_desenvolvedora`),
  KEY `fk_T_JOGO_T_PLATAFORMA1_idx` (`id_plataforma`),
  CONSTRAINT `fk_T_JOGO_T_DESENVOLVEDORA1` FOREIGN KEY (`id_desenvolvedora`) REFERENCES `t_desenvolvedora` (`id_desenvolvedora`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_JOGO_T_DISTRIBUIDORA1` FOREIGN KEY (`id_distribuidora`) REFERENCES `t_distribuidora` (`id_distribuidora`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_JOGO_T_PLATAFORMA1` FOREIGN KEY (`id_plataforma`) REFERENCES `t_plataforma` (`id_plataforma`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_jogo`
--

LOCK TABLES `t_jogo` WRITE;
/*!40000 ALTER TABLE `t_jogo` DISABLE KEYS */;
INSERT INTO `t_jogo` VALUES (1,'Dark Souls 3','Dark Souls III é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',8.0,'2016-04-12','Lançado','https://store-images.s-microsoft.com/image/apps.61214.71827372323164480.6e97c7d2-899a-404f-8660-d622a7fc9162.740b1351-e659-486b-9d1c-948e0d928ead?q=90&w=480&h=270',2,3,1),(2,'Dark Souls 2','Dark Souls II é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',0.0,'2014-03-11','Lançado','https://gaming-cdn.com/images/products/7053/orig/dark-souls-ii-scholar-of-the-first-sin-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-spiel-microsoft-store-europe-cover.jpg?v=1703155912',2,3,1),(3,'Dark Souls Remastered','Dark Souls é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',9.1,'2018-05-25','Lançado','https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570940/capsule_616x353.jpg?t=1726158603',2,3,1),(4,'Elden Ring','Elden Ring, um RPG de ação em mundo aberto, mistura exploração e combate desafiador com uma narrativa de fantasia profunda.',1.1,'2022-02-25','Lançado','https://tm.ibxk.com.br/2022/02/22/22174750463524.jpg?ims=1200xorig',2,3,1),(5,'League of Legends','League of Legends é um jogo de estratégia em que duas equipes de cinco poderosos Campeões se enfrentam para destruir a base uma da outra. Escolha entre mais de 140 Campeões para realizar jogadas épicas, assegurar abates e destruir torres conforme você luta até a vitória.',0.0,'2009-10-27','Lançado','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeC1uKp0j6xioC28xIyWD6_SbborjdvwI7Gw&s',9,8,1),(6,'Grand Theft Auto V',' O jogo se passa no estado ficcional de San Andreas, com a história da campanha um jogador seguindo três criminosos e seus esforços para realizarem assaltos sob a pressão de uma agência governamental. O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas.',8.1,'2013-08-17','Lançado','https://img.odcdn.com.br/wp-content/uploads/2021/05/gta-v-scaled.jpg',9,4,1),(7,'Terraria','Escave, lute, explore, construa! Nada é impossível neste jogo de aventura cheio de ação.',9.7,'0000-00-00','Lançado','https://store-images.s-microsoft.com/image/apps.15385.70406876433810089.4beffaca-3fee-4154-a21f-ecd9b3bedbb3.14eef101-5fe5-4892-bc4f-c290d9d50d7c?q=90&w=480&h=270',12,11,1),(8,'The Last of Us™ Part I','Descubra o jogo premiado que inspirou o programa de televisão aclamado pela crítica. Guie Joel e Ellie por uma América pós-apocalíptica e encontre aliados e inimigos inesquecíveis em The Last of Us™.',0.0,'2014-07-29','Lançado','https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/0kRqUeSBIbQzz7cen3c989c6.jpg',1,1,4),(9,'The Last of Us™ Part II','Cinco anos após os eventos anteriores, Ellie busca vingança após um ato brutal abalar sua paz em Jackson. The Last of Us Part II explora ódio, amor e as consequências da violência em uma jornada intensa por justiça e sobrevivência.',0.0,'2020-06-19','Lançado','https://image.api.playstation.com/vulcan/img/rnd/202010/2618/itbSm3suGHSSHIpmu9CCPBRy.jpg',1,1,4),(10,'God of War Ragnarök','Kratos e Atreus embarcam em uma jornada mítica em busca de respostas antes da chegada de Ragnarök',0.0,'2022-12-09','Lançado','https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg?resize=1&w=480&h=270&quality=medium',1,12,5),(11,'God of War 2018','Com sua vingança contra os Deuses do Olimpo anos atrás, Kratos agora vive como um homem no reino dos Deuses e monstros nórdicos. É neste mundo cruel e implacável que ele deve lutar para sobreviver... e ensinar seu filho a fazer o mesmo.',0.0,'2018-03-20','Lançado','https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png',1,12,4);
/*!40000 ALTER TABLE `t_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_jogo_adicionado`
--

DROP TABLE IF EXISTS `t_jogo_adicionado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_jogo_adicionado` (
  `id_jogo` int(11) NOT NULL,
  `id_lista` int(11) NOT NULL,
  PRIMARY KEY (`id_jogo`,`id_lista`),
  KEY `fk_T_JOGO_has_T_LISTA_T_LISTA1_idx` (`id_lista`),
  KEY `fk_T_JOGO_has_T_LISTA_T_JOGO1_idx` (`id_jogo`),
  CONSTRAINT `fk_T_JOGO_has_T_LISTA_T_JOGO1` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_JOGO_has_T_LISTA_T_LISTA1` FOREIGN KEY (`id_lista`) REFERENCES `t_lista` (`id_lista`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_jogo_adicionado`
--

LOCK TABLES `t_jogo_adicionado` WRITE;
/*!40000 ALTER TABLE `t_jogo_adicionado` DISABLE KEYS */;
INSERT INTO `t_jogo_adicionado` VALUES (1,1),(1,6),(2,1),(2,2),(3,1),(3,6),(4,1),(4,4),(6,1),(6,4),(7,1),(7,4),(11,1),(11,2);
/*!40000 ALTER TABLE `t_jogo_adicionado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_lista`
--

DROP TABLE IF EXISTS `t_lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_lista` (
  `id_lista` int(11) NOT NULL AUTO_INCREMENT,
  `nr_jogos` int(11) NOT NULL,
  `nm_lista` varchar(45) NOT NULL,
  PRIMARY KEY (`id_lista`),
  UNIQUE KEY `nm_lista_UNIQUE` (`nm_lista`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_lista`
--

LOCK TABLES `t_lista` WRITE;
/*!40000 ALTER TABLE `t_lista` DISABLE KEYS */;
INSERT INTO `t_lista` VALUES (1,0,'Todos'),(2,0,'Desejo'),(3,0,'Jogando'),(4,0,'Pausado'),(5,0,'Abandonado'),(6,0,'Completo');
/*!40000 ALTER TABLE `t_lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_lista_usuario`
--

DROP TABLE IF EXISTS `t_lista_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_lista_usuario` (
  `id_lista` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_lista`,`id_usuario`),
  KEY `fk_usuario` (`id_usuario`),
  CONSTRAINT `fk_lista` FOREIGN KEY (`id_lista`) REFERENCES `t_lista` (`id_lista`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `t_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_lista_usuario`
--

LOCK TABLES `t_lista_usuario` WRITE;
/*!40000 ALTER TABLE `t_lista_usuario` DISABLE KEYS */;
INSERT INTO `t_lista_usuario` VALUES (1,1),(1,2),(2,1),(2,2),(3,1),(3,2),(4,1),(4,2),(5,1),(5,2),(6,1),(6,2);
/*!40000 ALTER TABLE `t_lista_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_modo`
--

DROP TABLE IF EXISTS `t_modo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_modo` (
  `id_modo` int(11) NOT NULL AUTO_INCREMENT,
  `nm_modo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_modo`),
  UNIQUE KEY `nm_modo_UNIQUE` (`nm_modo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_modo`
--

LOCK TABLES `t_modo` WRITE;
/*!40000 ALTER TABLE `t_modo` DISABLE KEYS */;
INSERT INTO `t_modo` VALUES (3,'Cooperativo'),(2,'Multiplayer'),(5,'PvE'),(4,'PvP'),(1,'Um Jogador');
/*!40000 ALTER TABLE `t_modo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_modo_de_jogo`
--

DROP TABLE IF EXISTS `t_modo_de_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_modo_de_jogo` (
  `id_jogo` int(11) NOT NULL,
  `id_modo` int(11) NOT NULL,
  PRIMARY KEY (`id_jogo`,`id_modo`),
  KEY `fk_T_JOGO_has_T_MODO_JOGO_T_MODO_JOGO1_idx` (`id_modo`),
  KEY `fk_T_JOGO_has_T_MODO_JOGO_T_JOGO1_idx` (`id_jogo`),
  CONSTRAINT `fk_T_JOGO_has_T_MODO_JOGO_T_JOGO1` FOREIGN KEY (`id_jogo`) REFERENCES `t_jogo` (`id_jogo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_T_JOGO_has_T_MODO_JOGO_T_MODO_JOGO1` FOREIGN KEY (`id_modo`) REFERENCES `t_modo` (`id_modo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_modo_de_jogo`
--

LOCK TABLES `t_modo_de_jogo` WRITE;
/*!40000 ALTER TABLE `t_modo_de_jogo` DISABLE KEYS */;
INSERT INTO `t_modo_de_jogo` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(2,1),(2,2),(2,3),(2,4),(2,5),(3,1),(3,2),(3,3),(3,4),(3,5),(4,1),(4,2),(4,3),(4,4),(4,5),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1);
/*!40000 ALTER TABLE `t_modo_de_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_permissao`
--

DROP TABLE IF EXISTS `t_permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_permissao` (
  `id_permissao` int(11) NOT NULL AUTO_INCREMENT,
  `nm_permissao` varchar(45) NOT NULL,
  PRIMARY KEY (`id_permissao`),
  UNIQUE KEY `nmPermissao_UNIQUE` (`nm_permissao`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_permissao`
--

LOCK TABLES `t_permissao` WRITE;
/*!40000 ALTER TABLE `t_permissao` DISABLE KEYS */;
INSERT INTO `t_permissao` VALUES (2,'Admin'),(1,'Usuario');
/*!40000 ALTER TABLE `t_permissao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_plataforma`
--

DROP TABLE IF EXISTS `t_plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_plataforma` (
  `id_plataforma` int(11) NOT NULL AUTO_INCREMENT,
  `nm_plataforma` varchar(100) NOT NULL,
  PRIMARY KEY (`id_plataforma`),
  UNIQUE KEY `nm_plataforma_UNIQUE` (`nm_plataforma`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_plataforma`
--

LOCK TABLES `t_plataforma` WRITE;
/*!40000 ALTER TABLE `t_plataforma` DISABLE KEYS */;
INSERT INTO `t_plataforma` VALUES (9,'Nintendo DS'),(6,'Nintendo Switch'),(11,'Nintendo Switch Lite'),(1,'PC'),(7,'Play Station 3'),(4,'Play Station 4'),(5,'Play Station 5'),(10,'PlayStation Vita'),(8,'Xbox 360'),(2,'Xbox One'),(3,'Xbox X/S');
/*!40000 ALTER TABLE `t_plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_usuario`
--

DROP TABLE IF EXISTS `t_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nm_apelido` varchar(30) NOT NULL,
  `ds_email` varchar(200) NOT NULL,
  `nr_telefone` int(11) DEFAULT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `id_permissao` int(11) NOT NULL,
  `ds_senha` varchar(40) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nm_apelido_UNIQUE` (`nm_apelido`),
  UNIQUE KEY `ds_email_UNIQUE` (`ds_email`),
  UNIQUE KEY `nr_telefone_UNIQUE` (`nr_telefone`),
  KEY `fk_T_USUARIO_T_PERMISSAO1_idx` (`id_permissao`),
  CONSTRAINT `fk_T_USUARIO_T_PERMISSAO1` FOREIGN KEY (`id_permissao`) REFERENCES `t_permissao` (`id_permissao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_usuario`
--

LOCK TABLES `t_usuario` WRITE;
/*!40000 ALTER TABLE `t_usuario` DISABLE KEYS */;
INSERT INTO `t_usuario` VALUES (1,'Aoki','duduzebas@gmail.com',NULL,NULL,2,'Aoki+Bra'),(2,'Sr_Xurineio','thiagodossantos461@gmail.com',NULL,NULL,2,'Thiago121'),(3,'teste','teste@teste',NULL,NULL,1,'teste0321');
/*!40000 ALTER TABLE `t_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 12:18:28
