-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2023 at 01:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eoms`
--

-- --------------------------------------------------------

--
-- Table structure for table `approvals`
--

CREATE TABLE `approvals` (
  `account_id` int(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `faculty_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` int(30) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(30) NOT NULL,
  `program_title` text NOT NULL,
  `date_time_start` datetime NOT NULL,
  `date_time_end` datetime NOT NULL,
  `place` text NOT NULL,
  `program_details` text NOT NULL,
  `program_lead` text NOT NULL,
  `program_members` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`program_members`)),
  `participants` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`participants`)),
  `program_flow` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`program_flow`)),
  `additional_details` int(11) NOT NULL,
  `partners` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`partners`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `account_id` int(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `faculty_id` int(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `account_type` varchar(30) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`account_id`, `username`, `password`, `first_name`, `last_name`, `faculty_id`, `email`, `account_type`, `position`) VALUES
(0, 'admin', 'admin', 'admin_fn', 'admin_ln', 0, 'admin@gmail.com', 'admin', 'admin'),
(1, 'leo', 'abuan', 'Jose Leo', 'Abuan', 12122, 'leoabuan112201@gmail.com', 'faculty', NULL),
(2, 'jason', 'escasinas', 'Jason', 'Escasinas', 21231, 'jason@gmail.com', 'faculty', NULL),
(29, 'ed01', 'edison', 'edison', 'tuazon', 232184, 'edison@gmail.com', 'faculty', NULL),
(30, 'ed01', 'edison', 'edison', 'tuazon', 232184, 'edison@gmail.com', 'faculty', NULL),
(31, 'noelc', 'noelc', 'noel', 'carpio', 374892, 'noel@gmail.com', 'faculty', NULL),
(32, 'ed01', 'edison', 'edison', 'tuazon', 232184, 'edison@gmail.com', 'faculty', NULL),
(33, 'ed01', 'edison', 'edison', 'tuazon', 232184, 'edison@gmail.com', 'faculty', NULL),
(34, 'ed01', 'edison', 'edison', 'tuazon', 232184, 'edison@gmail.com', 'faculty', NULL),
(35, 'noelc', 'noelc', 'noel', 'carpio', 374892, 'noel@gmail.com', 'faculty', NULL),
(36, 'dsadsa', 'asdads', 'dsadsa', 'dsadsa', 0, 'das@dawsd', 'faculty', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approvals`
--
ALTER TABLE `approvals`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approvals`
--
ALTER TABLE `approvals`
  MODIFY `account_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `account_id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
