-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 25, 2021 lúc 04:56 PM
-- Phiên bản máy phục vụ: 10.4.19-MariaDB
-- Phiên bản PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `citizenv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `caphuyen`
--

CREATE TABLE `caphuyen` (
  `maxa` varchar(6) NOT NULL,
  `tenxa` varchar(250) NOT NULL,
  `mahuyen` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `capquyen`
--

CREATE TABLE `capquyen` (
  `tsd` varchar(8) NOT NULL,
  `finish` date NOT NULL,
  `start` date NOT NULL,
  `moquyen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `captinh`
--

CREATE TABLE `captinh` (
  `mahuyen` varchar(4) NOT NULL,
  `tenhuyen` varchar(250) NOT NULL,
  `matinh` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `capxa`
--

CREATE TABLE `capxa` (
  `mathon` varchar(8) NOT NULL,
  `tenthon` varchar(250) NOT NULL,
  `maxa` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dan`
--

CREATE TABLE `dan` (
  `cccd` varchar(12) NOT NULL,
  `dctamtru` varchar(250) NOT NULL,
  `gioitinh` varchar(250) NOT NULL,
  `mathon` varchar(8) NOT NULL,
  `ngaysinh` date NOT NULL,
  `nghenghiep` varchar(250) NOT NULL,
  `quequan` varchar(250) NOT NULL,
  `ten` varchar(250) NOT NULL,
  `tongiao` varchar(250) NOT NULL,
  `trinhdovh` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyensd`
--

CREATE TABLE `quyensd` (
  `tsd` varchar(8) NOT NULL,
  `quyen` varchar(250) NOT NULL,
  `tainguyen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tongcucacc`
--

CREATE TABLE `tongcucacc` (
  `tsd` varchar(8) NOT NULL,
  `name` varchar(250) NOT NULL,
  `pass` varchar(250) NOT NULL,
  `quyen` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trunguong`
--

CREATE TABLE `trunguong` (
  `matinh` varchar(2) NOT NULL,
  `moquyen` varchar(250) NOT NULL,
  `sodan` varchar(250) NOT NULL,
  `tentinh` varchar(250) NOT NULL,
  `tiendo` varchar(250) NOT NULL,
  `tsd` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `caphuyen`
--
ALTER TABLE `caphuyen`
  ADD PRIMARY KEY (`maxa`),
  ADD KEY `fk_huyen` (`mahuyen`);

--
-- Chỉ mục cho bảng `capquyen`
--
ALTER TABLE `capquyen`
  ADD PRIMARY KEY (`tsd`);

--
-- Chỉ mục cho bảng `captinh`
--
ALTER TABLE `captinh`
  ADD PRIMARY KEY (`mahuyen`),
  ADD KEY `fk_tinh` (`matinh`);

--
-- Chỉ mục cho bảng `capxa`
--
ALTER TABLE `capxa`
  ADD PRIMARY KEY (`mathon`),
  ADD KEY `fk_xa` (`maxa`);

--
-- Chỉ mục cho bảng `dan`
--
ALTER TABLE `dan`
  ADD PRIMARY KEY (`cccd`),
  ADD KEY `fk_thon` (`mathon`);

--
-- Chỉ mục cho bảng `quyensd`
--
ALTER TABLE `quyensd`
  ADD PRIMARY KEY (`tsd`);

--
-- Chỉ mục cho bảng `tongcucacc`
--
ALTER TABLE `tongcucacc`
  ADD PRIMARY KEY (`tsd`);

--
-- Chỉ mục cho bảng `trunguong`
--
ALTER TABLE `trunguong`
  ADD PRIMARY KEY (`matinh`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `caphuyen`
--
ALTER TABLE `caphuyen`
  ADD CONSTRAINT `fk_huyen` FOREIGN KEY (`mahuyen`) REFERENCES `captinh` (`mahuyen`);

--
-- Các ràng buộc cho bảng `captinh`
--
ALTER TABLE `captinh`
  ADD CONSTRAINT `fk_tinh` FOREIGN KEY (`matinh`) REFERENCES `trunguong` (`matinh`);

--
-- Các ràng buộc cho bảng `capxa`
--
ALTER TABLE `capxa`
  ADD CONSTRAINT `fk_xa` FOREIGN KEY (`maxa`) REFERENCES `caphuyen` (`maxa`);

--
-- Các ràng buộc cho bảng `dan`
--
ALTER TABLE `dan`
  ADD CONSTRAINT `fk_thon` FOREIGN KEY (`mathon`) REFERENCES `capxa` (`mathon`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
