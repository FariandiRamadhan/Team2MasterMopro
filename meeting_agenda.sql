-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 25, 2025 at 10:06 AM
-- Server version: 10.6.18-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meeting_agenda`
--

-- --------------------------------------------------------

--
-- Table structure for table `agendas`
--

CREATE TABLE `agendas` (
  `agenda_id` varchar(25) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `meeting_time` datetime NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `user_id` varchar(25) NOT NULL,
  `participants` text NOT NULL,
  `deskripsi_rapat` text NOT NULL,
  `status` enum('cancelled','pending','succeed') NOT NULL DEFAULT 'pending',
  `kesimpulan_rapat` text NOT NULL DEFAULT '',
  `follow_up_actions` text NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agendas`
--

INSERT INTO `agendas` (`agenda_id`, `judul`, `meeting_time`, `lokasi`, `user_id`, `participants`, `deskripsi_rapat`, `status`, `kesimpulan_rapat`, `follow_up_actions`, `created_at`, `updated_at`, `deleted_at`) VALUES
('4012-AQW9y1toIrks07Kc5IzH', 'Team2Meeting', '2025-01-23 19:00:00', 'Depok', '3779-FA3EK2kSdCTxTG2OBg1j', 'Fariandi,Andi,Akbar,Anto,Fauzi,Nasywa,Hafiz', 'Presentasi project', 'succeed', '', '', '2025-01-22 02:09:38', '2025-01-23 04:44:43', NULL),
('8624-HD77qZ0j6dOHUnMWiYr6', 'pertemuan 1', '2025-01-15 16:16:56', 'Jl. Raya Jakarta Bogor, cilodong', '3779-FA3EK2kSdCTxTG2OBg1j', 'Fauzi, Nasywa', 'membahas front-end development', 'pending', '', '', '2025-01-14 23:16:56', '2025-01-22 02:14:07', '2025-01-22 02:14:07'),
('9062-i0oNB66BT3aEEHhqonDZ', 'ok', '2025-01-10 20:20:00', 'ok', '3779-FA3EK2kSdCTxTG2OBg1j', 'ok', 'ok', 'pending', '', '', '2025-01-25 06:11:29', '2025-01-25 06:11:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2025-01-11-151548', 'App\\Database\\Migrations\\Users', 'default', 'App', 1736871385, 1),
(2, '2025-01-11-151602', 'App\\Database\\Migrations\\Agendas', 'default', 'App', 1736871385, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(25) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
('3779-FA3EK2kSdCTxTG2OBg1j', 'admin', '$2y$10$bmLC9p8IWfBMiXFIq5xJquzcogHrznv9xt3/JY5szI/ZZ1znBHrn.'),
('4214-7kS8qKoukXKtsVRUkwNW', 'Peter', '$2y$10$PzjmsAhOj795cbjSjHSZSOsnwOqNmL/nyFx6bhp/2BP.zkAumRvV.'),
('8384-ZzkAbOFqPxQKF1ZStGx0', 'admin2', '$2y$10$ZXKSsWqoRMo7LEgOwwFh2.s12uwKS93hd6JV597aU9jGmfKcaL7Sm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`agenda_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agendas`
--
ALTER TABLE `agendas`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
