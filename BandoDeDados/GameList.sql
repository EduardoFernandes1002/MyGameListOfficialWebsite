-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gamelist
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `t_avaliacao`
--

DROP TABLE IF EXISTS `t_avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_avaliacao`
--

LOCK TABLES `t_avaliacao` WRITE;
/*!40000 ALTER TABLE `t_avaliacao` DISABLE KEYS */;
INSERT INTO `t_avaliacao` VALUES (4,NULL,'2024-11-27',2.0,1,1),(5,NULL,'2024-11-27',10.0,1,2),(6,NULL,'2024-11-28',10.0,3,2),(7,NULL,'2024-11-28',10.0,5,2),(8,NULL,'2024-11-28',10.0,14,2),(9,NULL,'2024-11-29',7.7,7,2),(10,NULL,'2024-11-29',10.0,6,2);
/*!40000 ALTER TABLE `t_avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_desenvolvedora`
--

DROP TABLE IF EXISTS `t_desenvolvedora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_desenvolvedora` (
  `id_desenvolvedora` int(11) NOT NULL AUTO_INCREMENT,
  `nm_desenvolvedora` varchar(100) NOT NULL,
  PRIMARY KEY (`id_desenvolvedora`),
  UNIQUE KEY `nm_desenvolvedora_UNIQUE` (`nm_desenvolvedora`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_desenvolvedora`
--

LOCK TABLES `t_desenvolvedora` WRITE;
/*!40000 ALTER TABLE `t_desenvolvedora` DISABLE KEYS */;
INSERT INTO `t_desenvolvedora` VALUES (5,'Bethesda Game Studios'),(10,'Bungie'),(2,'CD Projekt Red'),(8,'Epic Games'),(3,'FromSoftware'),(11,'Mojang Studios'),(1,'Naughty Dog'),(13,'Pocket Pair'),(12,'Re-Logic'),(4,'Rockstar North'),(9,'Square Enix'),(7,'Ubisoft Montreal'),(6,'Valve Corporation');
/*!40000 ALTER TABLE `t_desenvolvedora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_distribuidora`
--

DROP TABLE IF EXISTS `t_distribuidora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_distribuidora` (
  `id_distribuidora` int(11) NOT NULL AUTO_INCREMENT,
  `nm_distribuidora` varchar(100) NOT NULL,
  PRIMARY KEY (`id_distribuidora`),
  UNIQUE KEY `nm_distribuidora_UNIQUE` (`nm_distribuidora`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_distribuidora`
--

LOCK TABLES `t_distribuidora` WRITE;
/*!40000 ALTER TABLE `t_distribuidora` DISABLE KEYS */;
INSERT INTO `t_distribuidora` VALUES (11,'Activision'),(2,'Bandai Namco Entertainment'),(6,'Bethesda Softworks'),(4,'CD Projekt'),(9,'Epic Games'),(3,'Microsoft'),(13,'Pocket Pair'),(12,'Re-Logic'),(1,'Sony Interactive Entertainment'),(10,'Square Enix'),(5,'Take-Two Interactive'),(8,'Ubisoft'),(7,'Valve');
/*!40000 ALTER TABLE `t_distribuidora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_genero`
--

DROP TABLE IF EXISTS `t_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `t_genero_do_jogo` VALUES (1,2),(1,4),(1,8),(1,9),(1,10),(2,2),(2,4),(2,8),(2,9),(2,10),(3,2),(3,4),(3,8),(3,9),(3,10),(4,2),(4,4),(4,8),(4,9),(4,10),(5,5),(5,10),(6,4),(6,6),(6,8),(6,10),(7,9),(7,10),(7,11),(8,1),(8,7),(8,10),(8,11),(9,8),(9,9),(9,10),(10,2),(10,4),(10,9),(11,2),(11,7),(11,9),(11,10),(12,2),(12,7),(12,9),(12,10),(13,7),(13,10),(14,2),(14,7),(14,10);
/*!40000 ALTER TABLE `t_genero_do_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_jogo`
--

DROP TABLE IF EXISTS `t_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_jogo`
--

LOCK TABLES `t_jogo` WRITE;
/*!40000 ALTER TABLE `t_jogo` DISABLE KEYS */;
INSERT INTO `t_jogo` VALUES (1,'Dark Souls 3','Dark Souls III é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',6.0,'2016-04-12','Lançado','https://store-images.s-microsoft.com/image/apps.61214.71827372323164480.6e97c7d2-899a-404f-8660-d622a7fc9162.740b1351-e659-486b-9d1c-948e0d928ead?q=90&w=480&h=270',2,3,1),(2,'Dark Souls 2','Dark Souls II é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',0.0,'2014-03-11','Lançado','https://gaming-cdn.com/images/products/7053/orig/dark-souls-ii-scholar-of-the-first-sin-xbox-one-xbox-series-x-s-xbox-one-xbox-series-x-s-spiel-microsoft-store-europe-cover.jpg?v=1703155912',2,3,1),(3,'Dark Souls Remastered','Dark Souls é um RPG de ação desafiador, focado em combate tático e exploração, onde o jogador enfrenta inimigos implacáveis.',10.0,'2018-05-25','Lançado','https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570940/capsule_616x353.jpg?t=1726158603',2,3,1),(4,'Elden Ring','Elden Ring, um RPG de ação em mundo aberto, mistura exploração e combate desafiador com uma narrativa de fantasia profunda.',1.1,'2022-02-25','Lançado','https://tm.ibxk.com.br/2022/02/22/22174750463524.jpg?ims=1200xorig',2,3,1),(5,'League of Legends','League of Legends é um jogo de estratégia em que duas equipes de cinco poderosos Campeões se enfrentam para destruir a base uma da outra. Escolha entre mais de 140 Campeões para realizar jogadas épicas, assegurar abates e destruir torres conforme você luta até a vitória.',10.0,'2009-10-27','Lançado','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeC1uKp0j6xioC28xIyWD6_SbborjdvwI7Gw&s',9,8,1),(6,'Grand Theft Auto V',' O jogo se passa no estado ficcional de San Andreas, com a história da campanha um jogador seguindo três criminosos e seus esforços para realizarem assaltos sob a pressão de uma agência governamental. O mundo aberto permite que os jogadores naveguem livremente pelas áreas rurais e urbanas de San Andreas.',10.0,'2013-08-17','Lançado','https://img.odcdn.com.br/wp-content/uploads/2021/05/gta-v-scaled.jpg',9,4,1),(7,'Rayman Legends','Rayman, Globox e os Teensies estão vagando por uma floresta encantada quando descobrem uma tenda misteriosa repleta com uma série de pinturas cativantes. Quando olham mais de perto, percebem que cada pintura conta a história de um mundo mítico.',7.7,'2013-08-29','Lançado','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkvQTdYhtNLqTG10C5wQETsF5muMYxuCm1A&s',8,7,1),(8,'Fortnite','Em Fortnite, o objetivo é bem simples, ao menos no modo Battle Royale: você seleciona seu personagem, que é aleatório em cada partida, mas utiliza os equipamentos pré-configurados. Depois, você é lançado no mapa com outras 99 pessoas, que caem em uma ilha com paraquedas. A partir daí, apenas um sobrevive.',0.0,'2017-07-21','Lançado','https://cdn.sortiraparis.com/images/80/66131/1033405-fortnite-mythes-et-mortels-map-skins-passe-de-combat-le-point-sur-les-nouveautes.jpg',9,8,1),(9,'Final Fantasy','No ano de 2065, o caos e destruição rondam a Terra. Um meteoro atingiu o planeta e lançou ao longo da superfície milhões de alienígenas, cujo objetivo é extinguir toda a vida terrestre. A Dra. Aki Ross é uma cientista que foi infectada de forma letal pelos invasores, mas tem a chave para descobrir o ponto fraco de seu oponente. Agora, com a orientação de seu mentor, Dr. Sid, e a ajuda do esquadrão militar Deep Eyes, a Dra. Ross busca salvar não apenas o planeta Terra, mas também a si mesma.',0.0,'1978-12-18','Lançado','https://blog.phonehouse.es/wp-content/uploads/2024/03/Final-Fantasy.png',10,9,1),(10,'Minecraft','Minecraft é um jogo eletrônico lançado em 2009 que consiste em sobreviver em um mundo formado (majoritariamente) por blocos cúbicos. Steve, o personagem controlado pelo jogador, inicia o jogo em um ambiente repleto de árvores, montanhas, rios.',0.0,'2011-11-18','Lançado','https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a',3,11,1),(11,'The Last of Us Part I','Joel, um sobrevivente solitário e que perdeu sua filha adolescente no início do apocalipse, recebe a missão de levar para fora de uma zona de quarentena uma menina de 14 anos, chamada Ellie. A jovem é a única humana conhecida que é imune ao fungo e se torna a esperança de uma cura.',0.0,'2013-06-14','Lançado','https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png',1,1,1),(12,'The Last of Us Part II','Cinco anos depois de uma jornada perigosa pelos Estados Unidos num cenário pós-pandêmico, Ellie e Joel foram morar em Jackson, Wyoming. A vida numa comunidade próspera de sobreviventes lhes trouxe paz e estabilidade, apesar da ameaça constante dos infectados e de outros sobreviventes mais desesperados.',0.0,'2020-06-19','Lançado','https://upload.wikimedia.org/wikipedia/pt/9/96/The_Last_of_Us_2_capa.png',1,1,1),(13,'Counter-Strike 2','Counter-Strike 2 (CS2) é a nova versão do famoso jogo de tiro em primeira pessoa, desenvolvido pela Valve. Baseado no sucesso de CS:GO, CS2 traz melhorias gráficas com o motor Source 2, novos mapas, modos de jogo e ajustes no balanceamento de armas. A jogabilidade clássica de equipes de terroristas e contra-terroristas permanece, com o foco em estratégia e trabalho em equipe. Com um sistema de matchmaking melhorado e maior realismo visual, CS2 mantém a essência competitiva da série, atraindo novos jogadores enquanto mantém os veteranos engajados.',0.0,'2023-08-27','Lançado','https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1729703045',7,6,1),(14,'Left 4 Dead 2','Como Left 4 Dead, a sequência envolve uma pandemia apocalíptica. Um misterioso patógeno começou a se espalhar pelo sul dos Estados Unidos levando os humanos infectados a se tornarem zumbis. Os quatro sobreviventes devem lutar contra a horda de infectados.',10.0,'2009-11-17','Lançado','https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/550/header.jpg?t=1731457037',7,6,1),(15,'Terraria','Terraria é um jogo eletrônico RPG de ação-aventura independente produzido pela desenvolvedora de jogos Re-Logic. Possui como características a exploração, artesanato, construção de estruturas e combate a monstros perigosos em um mundo 2D gerado de forma procedural.',0.0,'2011-05-16','Lançado','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsE6QTLHQLq5uKutjSuD_uDMMup9ivSdtXOQ&s',12,12,1),(16,'Palword','Nele você reúne criaturas fantásticas conhecidas como \"Pals\" em um vasto mundo e as usa em batalhas ou para trabalhos em construção, fazendas ou fábricas.',0.0,'2024-01-19','Lançado','https://www.internetmatters.org/wp-content/uploads/2024/02/what-is-palworld-safe-guide-social.jpg',13,13,1);
/*!40000 ALTER TABLE `t_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_jogo_adicionado`
--

DROP TABLE IF EXISTS `t_jogo_adicionado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `t_jogo_adicionado` VALUES (1,1),(1,3),(2,1),(2,2),(4,1),(4,4),(6,4);
/*!40000 ALTER TABLE `t_jogo_adicionado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_lista`
--

DROP TABLE IF EXISTS `t_lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `t_lista_usuario` VALUES (1,1),(2,1),(3,1),(4,1),(4,2),(5,1);
/*!40000 ALTER TABLE `t_lista_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_modo`
--

DROP TABLE IF EXISTS `t_modo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `t_modo_de_jogo` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(2,1),(2,2),(2,3),(2,4),(2,5),(3,1),(3,2),(3,3),(3,4),(3,5),(4,1),(4,2),(4,3),(4,4),(4,5),(5,2),(5,3),(5,4),(6,1),(6,2),(6,4),(7,1),(7,3),(8,2),(8,3),(8,4),(8,5),(9,1),(9,5),(10,1),(10,2),(10,3),(10,4),(10,5),(11,1),(11,5),(12,1),(12,5),(13,2),(13,4),(14,1),(14,2),(14,3),(14,4),(14,5);
/*!40000 ALTER TABLE `t_modo_de_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_permissao`
--

DROP TABLE IF EXISTS `t_permissao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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

-- Dump completed on 2024-11-29 21:29:28
