-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jan 2025 pada 01.25
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

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
-- Struktur dari tabel `agendas`
--

CREATE TABLE `agendas` (
  `agenda_id` varchar(25) NOT NULL,
  `judul` varchar(100) NOT NULL,
  `meeting_time` datetime NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `participants` text NOT NULL,
  `deskripsi_rapat` text NOT NULL,
  `status` enum('cancelled','pending','succeed') NOT NULL DEFAULT 'pending',
  `kesimpulan_rapat` text NOT NULL DEFAULT '',
  `follow_up_actions` text NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
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
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2025-01-11-151548', 'App\\Database\\Migrations\\Users', 'default', 'App', 1736611145, 1),
(2, '2025-01-11-151602', 'App\\Database\\Migrations\\Agendas', 'default', 'App', 1736611145, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_id` varchar(25) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
('7509-kuV7GjPqtRMRPRgyGiSM', 'admin2', '$2y$10$tgTZ0Cy32kdDGFRClOsExOFY4m5urdWsIr40AzH4lq6RWIHxzZSoG'),
('7581-nS961QgwAjDS2l0Sd3E2', 'admin', '$2y$10$6KTSLyKc67dqOuqXpEwEWeWwpYL1qwbc.lSh1ETCKTLZLAuOp7Avq');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`agenda_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
