-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jan 2025 pada 06.24
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
-- Dumping data untuk tabel `agendas`
--

INSERT INTO `agendas` (`agenda_id`, `judul`, `meeting_time`, `lokasi`, `user_id`, `participants`, `deskripsi_rapat`, `status`, `kesimpulan_rapat`, `follow_up_actions`, `created_at`, `updated_at`, `deleted_at`) VALUES
('1226-eXL8ZhFYLgbwTVMdvojn', 'pertemuan 1', '2025-01-15 13:30:58', 'Jl. Raya Jakarta Bogor, cilodong', '9473-lfR5Rm9GcEzLiWeyver4', 'Fariandi, Hafizh', 'membahas Project Management', 'pending', '', '', '2025-01-12 22:30:58', '2025-01-12 20:30:58', NULL),
('5935-KCq0LYDtd5zQjaYcEwE2', 'pertemuan 2', '2025-01-14 13:30:58', 'Jl. Raya Jakarta Bogor, cilodong', '8660-Lfa89K8otpU0WJ9yx2K7', 'Akbar, Anto', 'membahas Database development', 'succeed', 'Kerjasama dilanjutkan', 'Menambahkan staff yang dibutuhkan, memenuhi kebutuhan rapat', '2025-01-12 20:30:58', '2025-01-12 20:30:58', NULL),
('8433-Fv4XdKykW6wlhrFItLLh', 'pertemuan 2', '2025-01-15 13:30:58', 'Jl. Raya Jakarta Bogor, cilodong', '9473-lfR5Rm9GcEzLiWeyver4', 'Akbar, Anto', 'membahas Project Management', 'pending', '', '', '2025-01-12 20:30:58', '2025-01-12 20:30:58', NULL),
('8728-g5HKNkrFKPjnRtK49NPu', 'Rizz party', '2024-01-01 01:30:00', 'Baz, 123 Street', '8660-Lfa89K8otpU0WJ9yx2K7', 'foo, bar, baz', 'lorem ipsum dolor sit amet', 'succeed', 'Be Yourself and Never Surrender', 'She&#039;s beautiful like always', '2025-01-12 20:30:58', '2025-01-13 03:47:08', NULL),
('8955-YefPlTeWetqnR6rc7O4v', 'pertemuan 3', '2025-01-15 13:30:58', 'Jl. Raya Jakarta Bogor, cilodong', '8660-Lfa89K8otpU0WJ9yx2K7', 'Fariandi, Hafizh', 'membahas Project Management', 'cancelled', '', '', '2025-01-12 20:30:58', '2025-01-12 18:23:31', '2025-01-12 18:23:31');

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
(5, '2025-01-11-151548', 'App\\Database\\Migrations\\Users', 'default', 'App', 1736688241, 1),
(6, '2025-01-11-151602', 'App\\Database\\Migrations\\Agendas', 'default', 'App', 1736688241, 1);

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
('3705-G54yMlrnwPKSLlynrf9Q', 'Peter', '$2y$10$O4EL5xaorP5jXpSw3x3QoOWMypXBgzLjFsD3sLfrCgD4Mfk5FJsB6'),
('8660-Lfa89K8otpU0WJ9yx2K7', 'admin', '$2y$10$3X0twoDwtdwHe9YILOpamexKBQZYjhxviCx/Un7OzEKkpm4WrgGDS'),
('9473-lfR5Rm9GcEzLiWeyver4', 'admin2', '$2y$10$Ds6KfbiFIqCKV.AHrHPfMeQYN13vJlnuKvkI43.yX2W/S3ROsQIHG'),
('9492-JdOebG0pjSh2d98usfMR', 'Sieghart', '$2y$10$W6jcDKC27C/F5RQd9mx28Ou77TBF92mWKklYwtYXBCYuefu.5mbsK');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`agenda_id`),
  ADD KEY `fk_user` (`user_id`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `agendas`
--
ALTER TABLE `agendas`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
