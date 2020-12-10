-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql.metropolia.fi
-- Generation Time: Dec 10, 2020 at 11:20 PM
-- Server version: 10.1.48-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `patricsu`
--

-- --------------------------------------------------------

--
-- Table structure for table `Blocking`
--

CREATE TABLE `Blocking` (
  `blocker_id` int(11) NOT NULL,
  `blocking_id` int(11) NOT NULL,
  `blocked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unblocked_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Blocking`
--

INSERT INTO `Blocking` (`blocker_id`, `blocking_id`, `blocked_at`, `unblocked_at`) VALUES
(90, 95, '2020-12-10 20:41:47', NULL),
(95, 94, '2020-12-10 14:53:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `commented_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Comments`
--

INSERT INTO `Comments` (`comment_id`, `user_id`, `post_id`, `content`, `commented_at`, `edited_at`, `deleted_at`) VALUES
(121, 77, 139, 'what a picture!', '2020-12-09 23:25:51', NULL, NULL),
(122, 97, 166, 'first comment', '2020-12-10 12:45:37', NULL, NULL),
(123, 97, 140, 'comment on other posts', '2020-12-10 12:46:10', NULL, NULL),
(124, 98, 184, 'I like her personality', '2020-12-10 14:55:39', NULL, NULL),
(125, 90, 165, 'Indeed!', '2020-12-10 21:03:56', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Following`
--

CREATE TABLE `Following` (
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_at` timestamp NULL DEFAULT NULL,
  `canceled_at` timestamp NULL DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Following`
--

INSERT INTO `Following` (`follower_id`, `following_id`, `requested_at`, `approved_at`, `canceled_at`, `approved`) VALUES
(73, 76, '2020-12-09 12:27:17', NULL, '2020-12-09 12:36:00', NULL),
(73, 76, '2020-12-09 12:36:03', NULL, '2020-12-09 12:36:04', NULL),
(73, 76, '2020-12-09 12:36:05', NULL, '2020-12-09 12:36:08', NULL),
(73, 76, '2020-12-09 12:36:09', NULL, '2020-12-09 12:57:00', NULL),
(73, 76, '2020-12-09 19:42:32', NULL, '2020-12-09 19:42:33', NULL),
(73, 76, '2020-12-09 19:42:37', NULL, '2020-12-09 19:42:40', NULL),
(73, 76, '2020-12-09 19:42:38', NULL, '2020-12-09 19:42:40', NULL),
(73, 76, '2020-12-09 19:44:44', NULL, '2020-12-09 20:02:30', NULL),
(73, 77, '2020-12-09 19:00:13', NULL, '2020-12-09 19:00:19', NULL),
(73, 77, '2020-12-09 19:00:32', NULL, NULL, NULL),
(73, 78, '2020-12-09 13:00:01', NULL, '2020-12-09 13:00:03', NULL),
(73, 78, '2020-12-09 13:00:03', NULL, '2020-12-09 21:51:14', NULL),
(73, 79, '2020-12-09 12:19:50', NULL, '2020-12-09 12:20:42', NULL),
(73, 79, '2020-12-09 12:22:30', NULL, '2020-12-09 12:22:50', NULL),
(73, 79, '2020-12-09 19:03:01', NULL, '2020-12-09 19:03:07', NULL),
(73, 79, '2020-12-09 19:03:23', NULL, '2020-12-09 19:04:26', NULL),
(73, 79, '2020-12-09 19:04:33', NULL, NULL, NULL),
(75, 73, '2020-12-08 15:30:25', NULL, NULL, 1),
(75, 74, '2020-12-08 14:22:21', '2020-12-08 14:22:21', NULL, 1),
(75, 76, '2020-12-08 14:22:21', '2020-12-08 14:22:21', '2020-12-09 12:57:00', 1),
(76, 73, '2020-12-09 07:17:25', NULL, NULL, NULL),
(76, 77, '2020-12-09 08:12:47', NULL, NULL, NULL),
(76, 78, '2020-12-08 21:20:48', NULL, NULL, 1),
(76, 78, '2020-12-09 08:57:54', NULL, '2020-12-09 12:49:20', NULL),
(76, 79, '2020-12-08 21:05:52', NULL, '2020-12-09 09:02:36', 1),
(76, 79, '2020-12-08 21:06:52', NULL, '2020-12-09 09:02:36', 1),
(76, 79, '2020-12-09 08:47:28', NULL, '2020-12-09 09:02:36', NULL),
(76, 79, '2020-12-09 16:00:26', NULL, '2020-12-09 22:35:21', NULL),
(77, 73, '2020-12-08 15:46:12', NULL, '2020-12-09 11:30:06', 1),
(77, 73, '2020-12-08 23:04:46', NULL, '2020-12-09 11:30:06', NULL),
(77, 73, '2020-12-09 11:16:09', NULL, '2020-12-09 11:30:06', NULL),
(77, 73, '2020-12-09 12:41:57', NULL, '2020-12-09 12:42:02', NULL),
(77, 73, '2020-12-09 12:42:04', NULL, '2020-12-09 12:42:06', NULL),
(77, 73, '2020-12-09 12:49:25', NULL, '2020-12-09 12:49:35', NULL),
(77, 73, '2020-12-09 12:51:39', NULL, '2020-12-09 12:51:46', NULL),
(77, 76, '2020-12-08 15:41:50', NULL, '2020-12-09 08:19:26', 1),
(77, 76, '2020-12-08 23:04:39', NULL, '2020-12-09 08:19:26', NULL),
(77, 76, '2020-12-09 01:03:17', NULL, '2020-12-09 08:19:26', NULL),
(77, 76, '2020-12-09 01:08:46', NULL, '2020-12-09 08:19:26', NULL),
(77, 76, '2020-12-09 08:19:05', NULL, '2020-12-09 08:19:26', NULL),
(77, 76, '2020-12-09 11:50:37', NULL, '2020-12-09 12:24:48', NULL),
(77, 76, '2020-12-09 12:25:08', NULL, '2020-12-09 12:25:20', NULL),
(77, 76, '2020-12-09 12:41:16', NULL, '2020-12-09 12:41:40', NULL),
(77, 76, '2020-12-09 13:34:32', NULL, '2020-12-09 23:26:11', NULL),
(77, 76, '2020-12-09 23:26:26', NULL, NULL, NULL),
(77, 78, '2020-12-08 17:39:57', NULL, '2020-12-09 08:20:48', 1),
(77, 78, '2020-12-08 23:04:21', NULL, '2020-12-09 08:20:48', NULL),
(77, 78, '2020-12-09 11:16:24', NULL, '2020-12-09 12:55:49', NULL),
(77, 78, '2020-12-09 12:56:02', NULL, '2020-12-09 13:01:28', NULL),
(77, 78, '2020-12-09 14:27:27', NULL, NULL, NULL),
(77, 79, '2020-12-08 19:20:06', NULL, '2020-12-09 12:36:07', 1),
(77, 79, '2020-12-09 12:58:33', NULL, '2020-12-09 13:01:28', NULL),
(77, 80, '2020-12-08 23:07:33', NULL, '2020-12-08 23:49:50', NULL),
(77, 91, '2020-12-10 15:06:31', NULL, NULL, NULL),
(78, 76, '2020-12-09 21:46:59', NULL, NULL, NULL),
(79, 77, '2020-12-08 17:14:31', NULL, '2020-12-09 12:58:18', NULL),
(79, 78, '2020-12-08 17:14:31', NULL, NULL, NULL),
(80, 77, '2020-12-08 17:26:02', NULL, '2020-12-08 23:49:50', NULL),
(80, 79, '2020-12-08 17:16:56', NULL, NULL, NULL),
(81, 77, '2020-12-08 17:37:09', NULL, '2020-12-09 13:01:28', NULL),
(85, 76, '2020-12-09 23:31:48', NULL, '2020-12-09 23:35:06', NULL),
(85, 76, '2020-12-09 23:35:26', NULL, '2020-12-09 23:37:54', NULL),
(85, 77, '2020-12-09 23:31:55', NULL, '2020-12-09 23:32:24', NULL),
(85, 77, '2020-12-09 23:37:39', NULL, NULL, NULL),
(87, 77, '2020-12-10 11:44:40', NULL, NULL, NULL),
(87, 78, '2020-12-10 11:44:31', NULL, NULL, NULL),
(87, 96, '2020-12-10 11:44:23', NULL, NULL, NULL),
(90, 77, '2020-12-10 11:54:31', NULL, NULL, NULL),
(90, 87, '2020-12-10 11:54:21', NULL, NULL, NULL),
(90, 94, '2020-12-10 20:41:35', NULL, NULL, NULL),
(91, 90, '2020-12-10 12:13:47', NULL, NULL, NULL),
(92, 90, '2020-12-10 12:54:55', NULL, NULL, NULL),
(92, 91, '2020-12-10 12:54:33', NULL, NULL, NULL),
(93, 90, '2020-12-10 13:55:02', NULL, NULL, NULL),
(93, 92, '2020-12-10 13:54:43', NULL, NULL, NULL),
(94, 92, '2020-12-10 14:10:28', NULL, NULL, NULL),
(94, 93, '2020-12-10 14:10:19', NULL, NULL, NULL),
(95, 93, '2020-12-10 14:18:24', NULL, NULL, NULL),
(95, 94, '2020-12-10 14:18:17', NULL, '2020-12-10 14:53:17', NULL),
(97, 76, '2020-12-10 12:46:38', NULL, '2020-12-10 12:46:51', NULL),
(97, 77, '2020-12-10 12:46:19', NULL, NULL, NULL),
(98, 95, '2020-12-10 14:55:44', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Moderator`
--

CREATE TABLE `Moderator` (
  `moderator_id` int(11) NOT NULL,
  `moderator_since` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `moderator_until` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Moderator`
--

INSERT INTO `Moderator` (`moderator_id`, `moderator_since`, `moderator_until`) VALUES
(73, '2020-12-08 14:16:24', NULL),
(74, '2020-12-08 14:16:24', NULL),
(77, '2020-12-08 14:48:07', NULL),
(82, '2020-12-08 14:48:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `imgfilename` varchar(255) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `banned_at` timestamp NULL DEFAULT NULL,
  `banned_by` int(11) DEFAULT NULL,
  `banned_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`post_id`, `user_id`, `caption`, `created_at`, `deleted_at`, `imgfilename`, `views`, `banned_at`, `banned_by`, `banned_reason`) VALUES
(138, 77, 'Test post', '2020-12-09 23:18:11', NULL, '4251988a3491c2ac1fa0ebd393c77e1d', 20, NULL, NULL, NULL),
(139, 76, 'my test for server\r\n:)', '2020-12-09 23:21:23', NULL, '412d0ac770470d8b7cf6bd96fa343065', 26, NULL, NULL, NULL),
(140, 77, 'test', '2020-12-09 23:40:41', NULL, 'a7c0bb03341f51fd77926e66f24f41a0', 6, NULL, NULL, NULL),
(141, 86, 'tset', '2020-12-09 23:52:11', NULL, 'bb0f5d54740441978a271e882fb4f200', 2, NULL, NULL, NULL),
(142, 78, 'Test post', '2020-12-10 09:47:19', NULL, '8bd1374262566c8cff0facde1bb18149', 2, NULL, NULL, NULL),
(143, 78, 'Another post', '2020-12-10 09:48:10', NULL, '6223046f60f0c394ccc6e2211229a12f', 2, NULL, NULL, NULL),
(144, 79, 'Caption goes here', '2020-12-10 09:51:05', NULL, '3055adab0ac2c13f68f9877b0ae23644', 1, NULL, NULL, NULL),
(145, 84, 'boss down!', '2020-12-10 09:54:00', NULL, 'a922c16d54bc39817a18071e5054f2dd', 1, NULL, NULL, NULL),
(146, 96, 'test post', '2020-12-10 09:59:36', NULL, 'a07251032339a029aa2f262ae231c937', 2, NULL, NULL, NULL),
(147, 87, 'Best moments', '2020-12-10 10:01:26', '2020-12-10 11:30:46', 'eec25ca3e53ccca80c1a0382844a04f8', 3, NULL, NULL, NULL),
(148, 76, 'new post', '2020-12-10 10:07:33', NULL, '6ec61df3a268ee8ac6d82cf82b7bed61', 3, NULL, NULL, NULL),
(149, 77, 'test', '2020-12-10 10:30:30', '2020-12-10 10:34:10', 'd705dae1a53d56abfac1e3f9f5f1d77c', 3, NULL, NULL, NULL),
(150, 77, 'test', '2020-12-10 10:34:21', '2020-12-10 10:37:57', 'df97049b62ef325cc4dbe771e7cdda27', 3, NULL, NULL, NULL),
(151, 77, 'test', '2020-12-10 10:38:12', '2020-12-10 10:38:17', 'f43778d3102e360812afc9d3dc9c3725', 3, NULL, NULL, NULL),
(152, 87, 'Best moments', '2020-12-10 11:34:17', '2020-12-10 11:38:52', 'fa20d80790470214f27e906665c2984d', 4, NULL, NULL, NULL),
(153, 87, 'Best moments', '2020-12-10 11:40:37', NULL, '3ca775e73b3fb96fc36c519894c11be2', 2, NULL, NULL, NULL),
(154, 87, 'Best moments', '2020-12-10 11:41:26', NULL, '2f8299a4539b97014ef5603ac03370e9', 2, NULL, NULL, NULL),
(155, 87, 'Best moments', '2020-12-10 11:41:49', NULL, '06d24624c98b426d561f8292f82df758', 2, NULL, NULL, NULL),
(156, 87, 'Best moments', '2020-12-10 11:42:18', NULL, 'e37e0fdf003d04815c954d3c04702ebe', 2, NULL, NULL, NULL),
(157, 90, 'Best moments', '2020-12-10 11:52:19', NULL, '33d998d3c5507f7887bc97904622010c', 2, NULL, NULL, NULL),
(158, 90, 'Best moments', '2020-12-10 11:52:41', NULL, 'e98e2e56587feaad9337f173f367bf9d', 1, NULL, NULL, NULL),
(159, 90, 'Best moments', '2020-12-10 11:52:57', NULL, 'f3afaab4231c266ce0f8b5cfefb3a071', 1, NULL, NULL, NULL),
(160, 90, 'Best moments', '2020-12-10 11:53:19', NULL, '8a1159ab8055d43e25e1d4c3023d3f91', 3, NULL, NULL, NULL),
(161, 91, 'Best moments', '2020-12-10 11:56:25', NULL, '11ab9b06abd67dfa171e81e43850b407', 2, NULL, NULL, NULL),
(162, 91, 'Best moments', '2020-12-10 11:56:58', NULL, '03929a89ef244b560fcb5a46435e5fed', 1, NULL, NULL, NULL),
(163, 91, 'Best Moments', '2020-12-10 12:15:11', '2020-12-10 12:16:21', 'a752307f2bd582dc04ac2e93c390040d', 3, NULL, NULL, NULL),
(164, 91, 'Best moments', '2020-12-10 12:16:00', NULL, '8ad676e50f1c387f31dd2550dd7b69dc', 2, NULL, NULL, NULL),
(165, 91, 'Best moments', '2020-12-10 12:16:47', NULL, 'b7bcfa064c9c8e88d072aae758fecb61', 5, NULL, NULL, NULL),
(166, 97, 'Shadow of the colossus', '2020-12-10 12:45:24', NULL, '8b56e251bbd31782a00b7866b2886fe2', 3, NULL, NULL, NULL),
(167, 92, 'best moments', '2020-12-10 12:51:00', NULL, '3886d28b2e820092b46e4e71f9aabdd8', 1, NULL, NULL, NULL),
(168, 92, 'BETS MOMENTS', '2020-12-10 12:52:05', NULL, 'a5f8cc1fc896fbe99d3f3e95028a563f', 1, NULL, NULL, NULL),
(169, 92, 'Best moments', '2020-12-10 12:53:05', NULL, '7d2d551b5ca95c5b32d462b9cb7f35ac', 2, NULL, NULL, NULL),
(170, 92, 'e05915 431c5d46 c5c8d8', '2020-12-10 12:54:07', NULL, '7ad2c4721c074d9f7744c080c986d215', 2, NULL, NULL, NULL),
(171, 93, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:52:44', NULL, '5eee437dbd28b500ea7de37794c4ce7d', 1, NULL, NULL, NULL),
(172, 93, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:53:04', NULL, '1e281bfa35bde7769d32593dbc635b36', 1, NULL, NULL, NULL),
(173, 93, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:54:18', NULL, '28555050c6c0dea59e7320c14e848a4c', 2, NULL, NULL, NULL),
(174, 93, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:54:35', NULL, '9e7bc78b9aa031988b131b3de760986d', 2, NULL, NULL, NULL),
(175, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:58:30', NULL, 'a5bff52e7d4f6767a0835aa6428d9773', 2, NULL, NULL, NULL),
(176, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:58:43', '2020-12-10 13:59:31', 'bdc0dcaa7d0b16e1825db8030e72f62f', 3, NULL, NULL, NULL),
(177, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:58:56', '2020-12-10 13:59:25', '23f6fd2c2062282f53201b484b1ff365', 3, NULL, NULL, NULL),
(178, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 13:59:09', '2020-12-10 13:59:19', '03cf6d70105673db1361977727b98f8b', 3, NULL, NULL, NULL),
(179, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 14:00:28', NULL, '02e5f4c41ac5e9cba027617678a2d79a', 1, NULL, NULL, NULL),
(180, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 14:00:41', NULL, '9f8c983bec1d947c128978292d8d2921', 2, NULL, NULL, NULL),
(181, 94, 'e6e9f0 cbf6e7 e05915 e059156c', '2020-12-10 14:01:13', NULL, '254cb485ceaceb1a4f005c88a5e1228b', 3, NULL, NULL, NULL),
(182, 95, '2020', '2020-12-10 14:17:14', NULL, '3337aa1cdbc2cc639a3f16048d58a6f8', 1, NULL, NULL, NULL),
(183, 95, '2020', '2020-12-10 14:17:31', NULL, 'c3e7d3f22e9113b519443c93114ee398', 4, NULL, NULL, NULL),
(184, 95, '2020', '2020-12-10 14:17:48', NULL, 'c416ca9d75bc832006a4acd57c97391d', 4, NULL, NULL, NULL),
(185, 95, '2020', '2020-12-10 14:18:05', NULL, '4c851807fe3b1ba92eea03f48586db98', 2, NULL, NULL, NULL),
(186, 98, 'testingsfdfsdadasas', '2020-12-10 14:42:25', '2020-12-10 15:04:27', 'e297f474136ed8cdd6535582ecd8e1c5', 3, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `PostTag`
--

CREATE TABLE `PostTag` (
  `post_id` int(11) DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `tagged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `untagged_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `PostTag`
--

INSERT INTO `PostTag` (`post_id`, `tag`, `tagged_at`, `untagged_at`) VALUES
(138, 'tigersGames', '2020-12-09 23:18:11', NULL),
(139, 'no', '2020-12-09 23:21:23', NULL),
(139, 'tags', '2020-12-09 23:21:23', NULL),
(140, 'test', '2020-12-09 23:40:41', NULL),
(141, 'ar', '2020-12-09 23:52:11', NULL),
(142, 'GameTag', '2020-12-10 09:47:19', NULL),
(143, 'gamer', '2020-12-10 09:48:10', NULL),
(143, 'test', '2020-12-10 09:48:10', NULL),
(144, 'gamerTag', '2020-12-10 09:51:05', NULL),
(144, 'winning', '2020-12-10 09:51:05', NULL),
(145, 'gg', '2020-12-10 09:54:00', NULL),
(145, 'phatLootz', '2020-12-10 09:54:00', NULL),
(146, 'gg', '2020-12-10 09:59:36', NULL),
(146, 'gamerVibe', '2020-12-10 09:59:36', NULL),
(148, 'few', '2020-12-10 10:07:33', NULL),
(148, 'tags', '2020-12-10 10:07:33', NULL),
(148, 'here', '2020-12-10 10:07:33', NULL),
(149, 'tag', '2020-12-10 10:30:30', NULL),
(150, 'test', '2020-12-10 10:34:21', NULL),
(151, 'test', '2020-12-10 10:38:12', NULL),
(152, 'tigersGames%0A%0Atags%0A%0Atest%0A%0AGameTag%0A%0AgamerTag%0A%0AphatLootz%0A%0Atag', '2020-12-10 11:34:17', NULL),
(153, 'tags', '2020-12-10 11:40:37', NULL),
(153, 'test', '2020-12-10 11:40:37', NULL),
(153, 'GameTag', '2020-12-10 11:40:37', NULL),
(153, 'gamerTag', '2020-12-10 11:40:37', NULL),
(153, 'game', '2020-12-10 11:40:37', NULL),
(153, 'adventure', '2020-12-10 11:40:37', NULL),
(154, 'tags', '2020-12-10 11:41:26', NULL),
(154, 'test', '2020-12-10 11:41:26', NULL),
(154, 'GameTag', '2020-12-10 11:41:26', NULL),
(154, 'gamerTag', '2020-12-10 11:41:26', NULL),
(154, 'game', '2020-12-10 11:41:26', NULL),
(154, 'adventure', '2020-12-10 11:41:26', NULL),
(155, 'tags', '2020-12-10 11:41:49', NULL),
(155, 'test', '2020-12-10 11:41:49', NULL),
(155, 'GameTag', '2020-12-10 11:41:49', NULL),
(155, 'gamerTag', '2020-12-10 11:41:49', NULL),
(155, 'game', '2020-12-10 11:41:49', NULL),
(155, 'adventure', '2020-12-10 11:41:49', NULL),
(156, 'tags', '2020-12-10 11:42:18', NULL),
(156, 'test', '2020-12-10 11:42:18', NULL),
(156, 'GameTag', '2020-12-10 11:42:18', NULL),
(156, 'gamerTag', '2020-12-10 11:42:18', NULL),
(156, 'game', '2020-12-10 11:42:18', NULL),
(156, 'adventure', '2020-12-10 11:42:18', NULL),
(157, 'Instagram', '2020-12-10 11:52:19', NULL),
(157, 'for', '2020-12-10 11:52:19', NULL),
(157, 'gamers', '2020-12-10 11:52:19', NULL),
(158, 'Instagram', '2020-12-10 11:52:41', NULL),
(158, 'for', '2020-12-10 11:52:41', NULL),
(158, 'gamers', '2020-12-10 11:52:41', NULL),
(159, 'Instagram', '2020-12-10 11:52:57', NULL),
(159, 'for', '2020-12-10 11:52:57', NULL),
(159, 'gamers', '2020-12-10 11:52:57', NULL),
(160, 'Instagram', '2020-12-10 11:53:19', NULL),
(160, 'for', '2020-12-10 11:53:19', NULL),
(160, 'gamers', '2020-12-10 11:53:19', NULL),
(161, 'games', '2020-12-10 11:56:25', NULL),
(161, 'for', '2020-12-10 11:56:25', NULL),
(161, 'gamers', '2020-12-10 11:56:25', NULL),
(162, 'games', '2020-12-10 11:56:58', NULL),
(162, 'for', '2020-12-10 11:56:58', NULL),
(162, 'gamers', '2020-12-10 11:56:58', NULL),
(163, 'games', '2020-12-10 12:15:11', NULL),
(163, 'for', '2020-12-10 12:15:11', NULL),
(163, 'gamers', '2020-12-10 12:15:11', NULL),
(164, 'game', '2020-12-10 12:16:00', NULL),
(164, 'win', '2020-12-10 12:16:00', NULL),
(165, 'tag', '2020-12-10 12:16:47', NULL),
(165, 'test', '2020-12-10 12:16:47', NULL),
(165, 'game', '2020-12-10 12:16:47', NULL),
(166, 'Gamer', '2020-12-10 12:45:24', NULL),
(167, 'e05915', '2020-12-10 12:51:00', NULL),
(168, 'e05915', '2020-12-10 12:52:05', NULL),
(168, '431c5d46', '2020-12-10 12:52:05', NULL),
(169, 'e05915', '2020-12-10 12:53:05', NULL),
(169, '431c5d46', '2020-12-10 12:53:05', NULL),
(169, 'c5c8d8', '2020-12-10 12:53:05', NULL),
(170, 'e05915', '2020-12-10 12:54:07', NULL),
(170, '431c5d46', '2020-12-10 12:54:07', NULL),
(170, 'c5c8d8', '2020-12-10 12:54:07', NULL),
(171, 'e6e9f0', '2020-12-10 13:52:44', NULL),
(171, 'cbf6e7', '2020-12-10 13:52:44', NULL),
(171, 'e05915', '2020-12-10 13:52:44', NULL),
(171, 'e059156c', '2020-12-10 13:52:44', NULL),
(172, 'e6e9f0', '2020-12-10 13:53:04', NULL),
(172, 'cbf6e7', '2020-12-10 13:53:04', NULL),
(172, 'e05915', '2020-12-10 13:53:04', NULL),
(172, 'e059156c', '2020-12-10 13:53:04', NULL),
(173, 'e6e9f0', '2020-12-10 13:54:18', NULL),
(173, 'cbf6e7', '2020-12-10 13:54:18', NULL),
(173, 'e05915', '2020-12-10 13:54:18', NULL),
(173, 'e059156c', '2020-12-10 13:54:18', NULL),
(174, 'e6e9f0', '2020-12-10 13:54:35', NULL),
(174, 'cbf6e7', '2020-12-10 13:54:35', NULL),
(174, 'e05915', '2020-12-10 13:54:35', NULL),
(174, 'e059156c', '2020-12-10 13:54:35', NULL),
(175, 'e6e9f0', '2020-12-10 13:58:30', NULL),
(175, 'cbf6e7', '2020-12-10 13:58:30', NULL),
(175, 'e05915', '2020-12-10 13:58:30', NULL),
(175, 'e059156c', '2020-12-10 13:58:30', NULL),
(176, 'e6e9f0', '2020-12-10 13:58:43', NULL),
(176, 'cbf6e7', '2020-12-10 13:58:43', NULL),
(176, 'e05915', '2020-12-10 13:58:43', NULL),
(176, 'e059156c', '2020-12-10 13:58:43', NULL),
(177, 'e6e9f0', '2020-12-10 13:58:56', NULL),
(177, 'cbf6e7', '2020-12-10 13:58:56', NULL),
(177, 'e05915', '2020-12-10 13:58:56', NULL),
(177, 'e059156c', '2020-12-10 13:58:56', NULL),
(178, 'e6e9f0', '2020-12-10 13:59:09', NULL),
(178, 'cbf6e7', '2020-12-10 13:59:09', NULL),
(178, 'e05915', '2020-12-10 13:59:09', NULL),
(178, 'e059156c', '2020-12-10 13:59:09', NULL),
(179, 'e6e9f0', '2020-12-10 14:00:28', NULL),
(179, 'cbf6e7', '2020-12-10 14:00:28', NULL),
(179, 'e05915', '2020-12-10 14:00:28', NULL),
(179, 'e059156c', '2020-12-10 14:00:28', NULL),
(180, 'e6e9f0', '2020-12-10 14:00:41', NULL),
(180, 'cbf6e7', '2020-12-10 14:00:41', NULL),
(180, 'e05915', '2020-12-10 14:00:41', NULL),
(180, 'e059156c', '2020-12-10 14:00:41', NULL),
(181, 'e6e9f0', '2020-12-10 14:01:13', NULL),
(181, 'cbf6e7', '2020-12-10 14:01:13', NULL),
(181, 'e05915', '2020-12-10 14:01:13', NULL),
(181, 'e059156c', '2020-12-10 14:01:13', NULL),
(182, 'Copyright', '2020-12-10 14:17:14', NULL),
(182, 'WebDev', '2020-12-10 14:17:14', NULL),
(182, 'Team', '2020-12-10 14:17:14', NULL),
(183, 'Copyright', '2020-12-10 14:17:31', NULL),
(183, 'WebDev', '2020-12-10 14:17:31', NULL),
(183, 'Team', '2020-12-10 14:17:31', NULL),
(184, 'Copyright', '2020-12-10 14:17:48', NULL),
(184, 'WebDev', '2020-12-10 14:17:48', NULL),
(184, 'Team', '2020-12-10 14:17:48', NULL),
(185, 'Copyright', '2020-12-10 14:18:05', NULL),
(185, 'WebDev', '2020-12-10 14:18:05', NULL),
(185, 'Team', '2020-12-10 14:18:05', NULL),
(186, '', '2020-12-10 14:42:25', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Upvote`
--

CREATE TABLE `Upvote` (
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `liked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unliked_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Upvote`
--

INSERT INTO `Upvote` (`user_id`, `post_id`, `liked_at`, `unliked_at`) VALUES
(77, 139, '2020-12-09 23:25:40', NULL),
(97, 140, '2020-12-10 12:45:58', NULL),
(98, 184, '2020-12-10 14:55:25', NULL),
(90, 165, '2020-12-10 21:03:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `passwd` varchar(255) DEFAULT NULL,
  `imagename` varchar(255) DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `discord` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `twitch` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `private_acc` tinyint(1) DEFAULT '0',
  `banned_at` timestamp NULL DEFAULT NULL,
  `banned_by` int(11) DEFAULT NULL,
  `banned_reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `username`, `fname`, `lname`, `email`, `passwd`, `imagename`, `theme`, `discord`, `youtube`, `twitch`, `created_at`, `deleted_at`, `private_acc`, `banned_at`, `banned_by`, `banned_reason`) VALUES
(73, 'testmod', NULL, NULL, 'mod@test.com', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', 'default.png', NULL, NULL, NULL, NULL, '2020-12-08 14:13:29', NULL, 0, NULL, NULL, NULL),
(74, 'testprivamod', NULL, NULL, 'privamod@test.com', '$2a$10$8c203aEmH5oLeihM7vvzweH1Hs32EPeKeVJhxS2w80UJADUwibY0.', 'default.png', NULL, NULL, NULL, NULL, '2020-12-08 14:17:37', NULL, 0, NULL, NULL, NULL),
(75, 'testpriva', NULL, NULL, 'priva@test.com', '$2a$10$lT9GtzufmzESZt70iqTHh.CZBBohtTM3klaSBRk2SY2K7UFgEIzyu', 'default.png', NULL, NULL, NULL, NULL, '2020-12-08 14:19:03', NULL, 0, NULL, NULL, NULL),
(76, 'testpublic', NULL, NULL, 'public@test.com', '$2a$10$6WSu5ZO1Wfzla94xUSweV.uZnUsyvJRWK7M0Jr1b/4e3V9lnU3omG', 'default.png', NULL, NULL, NULL, NULL, '2020-12-08 14:23:28', NULL, 0, NULL, NULL, NULL),
(77, 'MikeTheMod', 'Mike', 'Carter', 'mike@moderator.fi', '$2a$10$qzm5EOTZ99dKw5W.0cfQrujDVr8Hkj4G1T3Y1a3LJ/GnN8NzJmXyW', 'ff0668f90cdc9cc4329d3012b94a44fa', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-08 14:32:12', NULL, 0, NULL, NULL, NULL),
(78, 'PublicUser1', 'Barney', 'Rubble', 'publicuser1@test.com', '$2a$10$UPbEor72/49pcH2SKw3PGO1SF.EHK3XiZPXEhrE3kQ77lWwXnAs4C', 'c6d14a4dc008d1f0af6d8a1b86a2754a', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-08 16:57:07', NULL, 0, NULL, NULL, NULL),
(79, 'PublicUser2', 'Jane', 'Doe', 'publicuser2@test.com', '$2a$10$Ta7qrX.qsZw3bpjhmYdCvum4I42KrOvYCVOJyS/EoCqFrLzjQrU0q', '15f7a3885e5955ad2e700d8d2e10424b', NULL, NULL, NULL, NULL, '2020-12-08 16:57:41', NULL, 0, NULL, NULL, NULL),
(80, 'PrivateUser1', 'Mary', 'Joseph', 'privateuser1@test.com', '$2a$10$6c6UTcJ7rccCd5Ps9WTmMen8hL4jfTSl0faPBMU.mJ2uPeZUq31M.', 'default.png', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-08 16:58:12', NULL, 0, NULL, NULL, NULL),
(81, 'PrivateUser2', 'Freddy', 'Flintoff', 'privateuser2@test.com', '$2a$10$WZSdwHt3LU5iZOabR.xwquasowrz0RIPQK3R2Fteu0qnsFFqDKWaG', 'default.png', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-08 16:58:46', NULL, 0, NULL, NULL, NULL),
(82, 'teacherMod', NULL, NULL, 'teacher@mod.fi', '$2a$10$yzxcX7Erh/s3SW/d0DMJkOWh0CuiZp6Tbw2Z5rpoMFYzRX1yr.EwC', 'default.png', NULL, NULL, NULL, NULL, '2020-12-08 19:55:40', NULL, 0, NULL, NULL, NULL),
(83, 'foo', NULL, NULL, 'bar@metropoloa.fi', '$2a$10$DiUAjgXm/2TPGgD4j4rBUOxcdBK22y8RljmgrbcMPIbZdXgNjXGQ6', 'default.png', NULL, NULL, NULL, NULL, '2020-12-09 08:43:15', NULL, 0, NULL, NULL, NULL),
(84, 'PublicUser3', 'Willma', 'Flintstone', 'publicuser3@test.com', '$2a$10$46YBicTHb21b57yTIlG6BOB.wQ1aATaLW65Yk6lQGjJt78DIR0zpK', '4de52085224d54fde86bf9866cae6a86', NULL, NULL, NULL, NULL, '2020-12-09 15:37:44', NULL, 0, NULL, NULL, NULL),
(85, 'username', NULL, NULL, 'user@user.fi', '$2a$10$qelEQW1isbIiByGFM0e6j.FC1i/5hkzR/b8/I/0HDkC1X4d2VJnAS', 'default.png', NULL, NULL, NULL, NULL, '2020-12-09 23:31:30', NULL, 0, NULL, NULL, NULL),
(86, 'publicRandom', NULL, NULL, 'public@random.com', '$2a$10$iidQ299MhUBLRTNCQT8hj.qiVQp1yzeb3gLJ1CVKSJ2nMqr/J5jNe', 'default.png', NULL, NULL, NULL, NULL, '2020-12-09 23:51:58', NULL, 0, NULL, NULL, NULL),
(87, 'Test1', NULL, NULL, 'test1@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '186d34cfd295d34054e7ac003941c53b', '', NULL, NULL, NULL, '2010-05-05 09:00:00', NULL, 0, NULL, NULL, ''),
(90, 'Test2', NULL, NULL, 'test2@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '7288fe3bd49718e5482e73870a5ff4b7', '', NULL, NULL, NULL, '2010-05-05 09:00:00', NULL, 0, NULL, NULL, ''),
(91, 'Test3', NULL, NULL, 'test3@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '489ac56e19347d95c1b2112030c5c102', '', NULL, NULL, NULL, '2010-05-05 09:00:01', NULL, 0, NULL, NULL, ''),
(92, 'Test4', NULL, NULL, 'test4@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '65d6d4075350f42c122a88c69d40b57b', '', NULL, NULL, NULL, '2010-05-05 09:00:02', NULL, 0, NULL, NULL, ''),
(93, 'Test5', NULL, NULL, 'test5@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', 'e1be7d52bd6ea67594310d22568d59d5', '', NULL, NULL, NULL, '2010-05-05 09:00:03', NULL, 0, NULL, NULL, ''),
(94, 'Test6', 'Tester', 'User5', 'test6@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '', '', '', '', '', '2010-05-05 09:00:04', NULL, 0, NULL, NULL, ''),
(95, 'Test7', 'Tester', 'User6', 'test7@test.fi', '$2a$10$2./F8fH8msh6GT.HogpS3OgW3ZdqgKLBWXcJEYkoi4vZs0DvOYID2', '', '', '', '', '', '2010-05-05 09:00:05', NULL, 0, NULL, NULL, ''),
(96, 'publicUser4', 'Bruce', 'Wayne', 'publicuser4@test.com', '$2a$10$Awlok6VCb5ppxwTucumnY.DtU/Erykkf3t3.aRB3YR1MXWsbJ6oJ2', 'c7988fdb38a677e3aeea7c4a52172c4b', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-10 09:56:42', NULL, 0, NULL, NULL, NULL),
(97, 'publicUser5', 'Clark', 'Kent', 'publicuser5@test.com', '$2a$10$YgrHILARYLyiEYjoFgpV1uGIA24IP7wmPX5Tl0WniKC9CEy4VT9J2', '27e1506993078f544ebdb1f2c6e57ff5', NULL, 'https:&#x2F;&#x2F;discord.com&#x2F;', 'https:&#x2F;&#x2F;www.youtube.com&#x2F;', 'https:&#x2F;&#x2F;www.twitch.tv&#x2F;', '2020-12-10 12:42:57', NULL, 0, NULL, NULL, NULL),
(98, 'onemoretest', NULL, NULL, 'test12@test.com', '$2a$10$lFctKmH8g3AmzphbEFCP/ue2mUeEwGm6R5K48mLuwnzeecgM1ie4u', 'default.png', NULL, NULL, NULL, NULL, '2020-12-10 14:35:51', NULL, 0, NULL, NULL, NULL),
(101, 'Test8', NULL, NULL, 'test8@test.fi', '$2a$10$1V7dLO.3DH5dIbhQ6kcQ1u.gljqMGD6ElCrnMjWmkox3h/vYesVdq', 'default.png', NULL, NULL, NULL, NULL, '2020-12-10 14:41:41', NULL, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserTag`
--

CREATE TABLE `UserTag` (
  `comment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `tagged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `untagged_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Blocking`
--
ALTER TABLE `Blocking`
  ADD PRIMARY KEY (`blocker_id`,`blocking_id`,`blocked_at`),
  ADD KEY `blocking_id` (`blocking_id`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `Following`
--
ALTER TABLE `Following`
  ADD PRIMARY KEY (`follower_id`,`following_id`,`requested_at`),
  ADD KEY `following_id` (`following_id`);

--
-- Indexes for table `Moderator`
--
ALTER TABLE `Moderator`
  ADD PRIMARY KEY (`moderator_id`,`moderator_since`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `FK_PostUser` (`user_id`),
  ADD KEY `banned_by` (`banned_by`);

--
-- Indexes for table `PostTag`
--
ALTER TABLE `PostTag`
  ADD UNIQUE KEY `unique_index` (`post_id`,`tag`);

--
-- Indexes for table `Upvote`
--
ALTER TABLE `Upvote`
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `banned_by` (`banned_by`);

--
-- Indexes for table `UserTag`
--
ALTER TABLE `UserTag`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `comment_id` (`comment_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Blocking`
--
ALTER TABLE `Blocking`
  ADD CONSTRAINT `Blocking_ibfk_1` FOREIGN KEY (`blocker_id`) REFERENCES `User` (`user_id`),
  ADD CONSTRAINT `Blocking_ibfk_2` FOREIGN KEY (`blocking_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`);

--
-- Constraints for table `Following`
--
ALTER TABLE `Following`
  ADD CONSTRAINT `Following_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `User` (`user_id`),
  ADD CONSTRAINT `Following_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Moderator`
--
ALTER TABLE `Moderator`
  ADD CONSTRAINT `Moderator_ibfk_1` FOREIGN KEY (`moderator_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `FK_PostUser` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  ADD CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `Moderator` (`moderator_id`);

--
-- Constraints for table `PostTag`
--
ALTER TABLE `PostTag`
  ADD CONSTRAINT `PostTag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`);

--
-- Constraints for table `Upvote`
--
ALTER TABLE `Upvote`
  ADD CONSTRAINT `Upvote_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
  ADD CONSTRAINT `Upvote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `Moderator` (`moderator_id`);

--
-- Constraints for table `UserTag`
--
ALTER TABLE `UserTag`
  ADD CONSTRAINT `UserTag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  ADD CONSTRAINT `UserTag_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `Comments` (`comment_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
