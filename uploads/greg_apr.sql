-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 26, 2024 at 12:38 AM
-- Server version: 8.0.36-cll-lve
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greg_apr`
--

-- --------------------------------------------------------

--
-- Table structure for table `abouts`
--

CREATE TABLE `abouts` (
  `id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'about'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `abouts`
--

INSERT INTO `abouts` (`id`, `image`, `name`, `descriptions`, `created_at`, `updated_at`, `page_name`) VALUES
(12, 'uploads/image-1727107371254-491241674.jpg', 'About', '<p>AP Ranch is a transformative sports facility and community dedicated to cultivating and empowering students athletes of all backgrounds and abilities.</p><p></p><p>We strive to provide a nurturing environment where athletes can explore their passions, develop skills, and unlock their true potential. Through relentless dedication, innovative teaching techniques, and a commitment to fostering character development, and personal growth we aim to inspire our team to push boundaries, overcome challenges, and achieve their highest performance.</p><p></p><p>Together, we aspire to build a community that celebrates diversity, fosters teamwork, and instills lifelong values of discipline, resilience, and sportsmanship.</p><p></p><p>At AP Ranch, we empower athletes to new heights and define their limits to leave a lasting impact on the world.</p>', '2024-09-18 06:41:47', '2024-09-25 07:40:33', 'about');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `email`, `name`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin@gmail.com', 'Admin', '$2b$10$QiRILgaoEBPRoMmQLpkgVOP6EJq4z/NAXE0J0i1VWcIDl28HZNfbi', '2024-09-09 09:23:15', '2024-09-09 09:23:15'),
(2, 'testUser@gmail.com', 'Test', '$2b$10$xjQV260rlNCnjv/C1xE5GOJBuxMA/lIAfyFNnMm7D1rQlDD/9glR6', '2024-09-09 12:49:05', '2024-09-09 12:49:05'),
(3, 'info@apranch.org', 'Admin', '$2b$10$MHaYBhPJe6is.nfyQ024vOT94gzTzOQSYOaQUAJBvzmi7ZqyxqxY.', '2024-09-25 16:45:20', '2024-09-25 16:45:20');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int NOT NULL,
  `bannerImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logoImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'home'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `bannerImage`, `logoImage`, `descriptions`, `created_at`, `updated_at`, `page_name`) VALUES
(20, 'uploads/image-1726809622596-900605443.mp4', 'uploads/image-1727180030222-21863360.png', '<span></span><span></span><span>Our mission at AP Ranch is to create a transformative sports facility and community dedicated to cultivating and empowering student-athletes of all backgrounds and abilities. We strive to provide a nurturing environment where INDIVIDUALS can explore their passions, develop skills, and unlock their true potential.</span><br>', '2024-09-13 13:57:43', '2024-09-24 12:13:53', 'home');

-- --------------------------------------------------------

--
-- Table structure for table `collaborates`
--

CREATE TABLE `collaborates` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descriptions` text COLLATE utf8mb4_unicode_ci,
  `headerImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'collaborate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collaborates`
--

INSERT INTO `collaborates` (`id`, `name`, `descriptions`, `headerImage`, `image`, `createdAt`, `updatedAt`, `page_name`) VALUES
(7, 'Collaborate', '<h3>Who is it for?</h3><p>Any student entering fifth through twelfth grade is welcome to apply. We are looking for students who demonstrate a strong commitment to academic excellence.</p><p></p><h3>What does it look like?</h3><p></p><p><strong>Accountability</strong></p><p>Students who are accepted to AP Ranch Collaborate will be assigned a partner for the duration of the school year. This fellow student will be a teammate, ally, and accountability partner. Both students will navigate this journey together along with the help and coaching of the Academic Coordinator.</p><p><strong>Monthly Checkpoints</strong></p><p>Students will meet once a month for a touch-base with the Academic Coordinator. This will be a small group accountability session with only one or two other students and is intended to provide the student with accountability and guidance. It is important that the student attend every session and come ready to be honest and be challenged in their academic performance.</p><p><strong>Monthly Skills Development</strong></p><p>All students will also participate in monthly group sessions on highly practical topics brought to you by the Academic Coordinator and visiting guest specialists. There will be separate sessions for middle and high school students. These training sessions are intended to help you grow in study skills, time management, goal setting, personal discipline, public speaking, and other practical life skills that are essential to your success.</p><p><strong>Bi-Semester Parent Sessions</strong></p><p>Parent(s) and/or guardian(s) will be expected to participate in one group session per semester as well as one individual session. The group session will focus on a practical topic such as college admissions, adolescent development, or financial aid. The second session will be scheduled with the parent(s) and/or guardian(s) of both student partners so that all parties will have the opportunity to meet with the Academic Coordinator and (for older grades) the College Advisor to discuss the individual needs of their children.</p>', 'uploads/image-1726656117894-989677307.png', 'uploads/image-1726656118056-959183912.png', '2024-09-18 07:28:29', '2024-09-25 18:18:21', 'collaborate');

-- --------------------------------------------------------

--
-- Table structure for table `contactDetailForms`
--

CREATE TABLE `contactDetailForms` (
  `id` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `contact` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'contact'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contactDetailForms`
--

INSERT INTO `contactDetailForms` (`id`, `description`, `contact`, `image`, `created_at`, `updated_at`, `page_name`) VALUES
(6, '<h2>Directions to the Athletic Performance Ranch </h2><p><strong>From Downtown Fort Worth</strong></p><p></p><p>Take I-30 West and continue for approximately 10 miles. Take Exit FM 2871 and turn left (south) onto FM 2871. After passing under the I-20 overpass, the entrance to the ranch is a few hundred feet ahead on your right.</p><p><strong>From South Fort Worth</strong></p><p>Travel west on I-20. Take Exit FM 2871 and turn left (south) onto FM 2871. The entrance to the ranch is a few hundred feet ahead on your right.</p><pre data-language=\"true\">\n\n</pre>', '<p><a href=\"https://www.google.com/\" rel=\"noopener noreferrer\" target=\"_blank\">1590 FM 2871</a></p><p>Fort Worth,Texas 76126</p><p></p><p>Phone : (214) 538-9086</p><p></p><p>Football : Foster@apranch.org</p><p>Track : Greg@apranch.org</p><p>Basketball : Coachkae@apranch.org</p><p>Event: Marquette@apranch.org</p>', 'uploads/image-1726654571235-244072930.png', '2024-09-18 09:16:15', '2024-09-26 07:32:53', 'contact');

-- --------------------------------------------------------

--
-- Table structure for table `contactForms`
--

CREATE TABLE `contactForms` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contactForms`
--

INSERT INTO `contactForms` (`id`, `name`, `email`, `phoneNumber`, `reason`, `comments`, `created_at`, `updated_at`) VALUES
(14, 'Test Name', 'test@example.com', '88888888', 'Testing ', 'Testing 123', '2024-09-09 19:58:22', '2024-09-09 19:58:22'),
(24, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 10:16:51', '2024-09-12 10:16:51'),
(27, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 10:26:00', '2024-09-12 10:26:00'),
(32, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 10:57:13', '2024-09-12 10:57:13'),
(33, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:04:51', '2024-09-12 11:04:51'),
(34, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:06:40', '2024-09-12 11:06:40'),
(35, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:08:40', '2024-09-12 11:08:40'),
(36, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:10:24', '2024-09-12 11:10:24'),
(37, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:11:54', '2024-09-12 11:11:54'),
(38, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:12:40', '2024-09-12 11:12:40'),
(39, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:14:46', '2024-09-12 11:14:46'),
(40, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:15:19', '2024-09-12 11:15:19'),
(41, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:17:31', '2024-09-12 11:17:31'),
(42, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:18:04', '2024-09-12 11:18:04'),
(43, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:18:45', '2024-09-12 11:18:45'),
(44, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:19:30', '2024-09-12 11:19:30'),
(45, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:21:59', '2024-09-12 11:21:59'),
(46, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:24:15', '2024-09-12 11:24:15'),
(47, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:28:38', '2024-09-12 11:28:38'),
(48, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:38:21', '2024-09-12 11:38:21'),
(49, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:40:16', '2024-09-12 11:40:16'),
(50, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:40:47', '2024-09-12 11:40:47'),
(51, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:57:34', '2024-09-12 11:57:34'),
(52, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 11:59:24', '2024-09-12 11:59:24'),
(53, 'Anil', 'anniat44@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-12 12:02:33', '2024-09-12 12:02:33'),
(54, 'Test Message', 'obo.ideas@gmail.com', '8188181888', 'Testing About', 'Testing Comments', '2024-09-12 15:04:04', '2024-09-12 15:04:04'),
(55, 'Another Test', 'mark@oboideas.com', '1232341234', 'Test #2', 'Testing only', '2024-09-12 19:07:53', '2024-09-12 19:07:53'),
(57, 'Tester', 'anniat44@gmail.com', '8847222222', 'For testing purpose', 'ds sdsd sdsd dsd s rssdfsd sd sdsd sd sdsd sdsd', '2024-09-17 10:00:28', '2024-09-17 10:00:28'),
(58, 'Test2', 'anniat44@gmail.com', '8843272252', 'ew ew ewewewew wew ewewew', ' ewe ew wewewewew ewewe w', '2024-09-17 10:05:51', '2024-09-17 10:05:51'),
(59, 'dsd', 'anniat44@gmail.com', '32323223232', 'ere rerer ee ere rer ', 'r er ere erere rerer er', '2024-09-17 10:09:21', '2024-09-17 10:09:21'),
(60, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:08:33', '2024-09-17 11:08:33'),
(61, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:09:54', '2024-09-17 11:09:54'),
(62, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:11:01', '2024-09-17 11:11:01'),
(63, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:12:11', '2024-09-17 11:12:11'),
(64, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:18:30', '2024-09-17 11:18:30'),
(65, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:20:32', '2024-09-17 11:20:32'),
(66, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:22:16', '2024-09-17 11:22:16'),
(67, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:23:56', '2024-09-17 11:23:56'),
(68, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:31:48', '2024-09-17 11:31:48'),
(69, 'Antonio chism', 'achism52@gmail.com', '6823629883', 'indoor track/off-season training', 'looking to sign my daughter and son up for off-season training and indoor track', '2024-09-17 11:37:08', '2024-09-17 11:37:08'),
(70, 'Antonio chism', 'achism52@gmail.com', '6823629883', 'indoor track/off-season training', 'looking to sign my daughter and son up for off-season training and indoor track', '2024-09-17 11:37:08', '2024-09-17 11:37:08'),
(71, 'Antonio chism', 'achism52@gmail.com', '6823629883', 'indoor track/off-season training', 'looking to sign my daughter and son up for off-season training and indoor track', '2024-09-17 11:37:08', '2024-09-17 11:37:08'),
(72, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:37:25', '2024-09-17 11:37:25'),
(73, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:41:06', '2024-09-17 11:41:06'),
(74, 'Sanjay Doe', 'sanjaynabha7@gmail.com', '+11234567890', 'General Inquiry', 'I would like to know more about your services.', '2024-09-17 11:44:37', '2024-09-17 11:44:37'),
(75, 'Sal Salinsski', 'mark@email.com', '8888888', 'Testing', 'Testing 2', '2024-09-17 12:10:12', '2024-09-17 12:10:12'),
(76, 'Peter Rabit', 'some@there.com', '99', 'Testing this thing out.', 'No comment today.', '2024-09-17 13:12:12', '2024-09-17 13:12:12'),
(79, 'Mark Medina', 'marmed2062@gmail.com', '8175018620', 'Testing form', 'Test from mobile', '2024-09-19 18:26:01', '2024-09-19 18:26:01'),
(80, 'Destinie Agosto', 'destinieagosto2@gmail.com', '6822970323', 'track', 'get back to me asap', '2024-09-20 02:14:34', '2024-09-20 02:14:34'),
(81, 'Jayci Stone', 'jaycis@uark.edu', '8179481852', 'Arkansas WBB staying at the ranch (prior to scrimmage at TCU) on October 27th). ', 'Would love to find out about availability, and cost. ', '2024-09-20 15:57:40', '2024-09-20 15:57:40'),
(82, 'Jasmine Johnson', 'jasminejohnson@student.hebisd.edu', '8175856616', 'registering, payment ', 'Im Jasmine I’m 16 years old and I have been struggling with track. I can’t find the right team. It’s my junior year this year and I just really want to get better. I love this sport very much but I can’t get better without the right training. I’ve been training myself by going to the gym and running at my local track and that will help me get faster but not drastically. I’m commited to this sport , I just need to be a part of a team that will help me and support me. Please call or email me. 8175856616, jasminejohnson@student.hd.edu', '2024-09-21 15:48:04', '2024-09-21 15:48:04'),
(83, 'Tania Gray', 'tbrooks_04@yahoo.com', '8176833980', 'Track and field', 'I am interested in your track and field program. I would like more information about this. Thank you ', '2024-09-21 19:07:48', '2024-09-21 19:07:48'),
(84, 'Tania Gray', 'tbrooks_04@yahoo.com', '8176833980', 'Track and field', 'I am interested in your track and field program. I would like more information about this. Thank you ', '2024-09-21 19:07:49', '2024-09-21 19:07:49'),
(85, 'Melvin Berry', 'Chasberry@msn.com', '8173196654', 'Running Back Coach', 'I’m looking for a running back coach for my son, and you guys came recommended on Facebook.', '2024-09-23 04:47:05', '2024-09-23 04:47:05'),
(86, 'Delanie Schmidt ', 'delanie.schmidt@gmail.com', '6825570926', 'Lessons for basketball, football, and track for a 10 year old. ', '10 year old with 5 years experience of basketball, and flag football. Would like to work and improve skill set. Interested in track in the future. ', '2024-09-23 15:08:54', '2024-09-23 15:08:54'),
(87, 'Test ContactUs', 'mark.oboideas@gmail.com', '8175018620', 'Test to info@', 'Let me know if you receive this test. -Mark', '2024-09-23 15:09:43', '2024-09-23 15:09:43'),
(88, 'Mark Medina', 'obo.ideas@gmail.com', '8175018620', 'Test Contact Form', 'Let me know when you receive this? mark.medina@avdec.com\n', '2024-09-23 15:19:34', '2024-09-23 15:19:34'),
(89, 'Test', 'testing@gmail.com', '2351689721', 'Help', 'None', '2024-09-24 05:14:08', '2024-09-24 05:14:08'),
(90, 'test', 'testing@gmail.com', '3456789642', 'fbbbbbbbbbbbbbbb', 'asdfasd', '2024-09-24 05:28:33', '2024-09-24 05:28:33'),
(91, 'test', '1@1.com', '5555555555', 'asdfasd', 'asdfasd', '2024-09-24 05:31:40', '2024-09-24 05:31:40'),
(92, 'amarjeet', 'asdfa@af.gdf', '4444444444', 'asdfasdfsa', 'sdfas', '2024-09-24 05:33:16', '2024-09-24 05:33:16'),
(93, 'asdfasd', 'trest@sdf.gfs', '1234456789', 'asdf', 'asdf', '2024-09-24 05:39:09', '2024-09-24 05:39:09'),
(94, 'asdfas', 'asdf@sdfg.fff', '1234567899', 'asdf', 'asdfasdf', '2024-09-24 05:40:08', '2024-09-24 05:40:08'),
(95, 'Abhishek Negi', 'asdf@asdf.ddf', '1234567890', 'asdfa', 'asdfas', '2024-09-24 05:43:48', '2024-09-24 05:43:48'),
(96, 'Mark Medina', 'marmed2062@gmail.com', '8175018620', 'Test from Mark', 'Did this come through? mark.medina@avdec.com', '2024-09-24 14:57:11', '2024-09-24 14:57:11'),
(97, 'Heather Figueroa ', 'Hfig0804@gmail.com', '6834201625', 'Football', 'My son is 9 hoping he’s old enough to start. We homeschool ', '2024-09-24 15:53:41', '2024-09-24 15:53:41'),
(98, 'Shaina rigsby', 'Rigsby.shaina@gmail.com', '8173171314', 'Track', 'I need to know how to sign my son up so that he can access the track and gym', '2024-09-24 16:17:36', '2024-09-24 16:17:36'),
(99, 'Misty Easterling', 'Mrm99a@yahoo.com', '3255182716', 'Offseason track training and summer track (girls ages 12 & 10)', 'Wondering about training days and times and pricing. And when offseason track training starts and ends.  Thank you!', '2024-09-24 20:13:15', '2024-09-24 20:13:15'),
(100, 'jggh', 'testUser@gmail.com', '85686', 'gfhgh', 'hghgfgf', '2024-09-25 05:06:17', '2024-09-25 05:06:17'),
(101, 'SAHIL SHARMA', 'sahilsg2000@gmail.com', '08219891347', 'vxcbv', 'dhfgfh', '2024-09-25 05:06:49', '2024-09-25 05:06:49'),
(102, 'saasd', 'asd@asdf.fgf', '1234567890', 'fbbbbbbbbbbbbbbb', 'asdf', '2024-09-25 07:17:49', '2024-09-25 07:17:49'),
(103, 'Kolten Bowles', 'koltenbowles112@gmail.com', '9407334418', '7v7 Team', 'Looking to join 15u 7v7 team upcoming spring as QB', '2024-09-26 02:34:53', '2024-09-26 02:34:53'),
(104, 'Kolten Bowles', 'koltenbowles112@gmail.com', '9407334418', '7v7 Team', 'Looking to join 15u 7v7 team upcoming spring as QB', '2024-09-26 02:34:54', '2024-09-26 02:34:54');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'US',
  `givenName` varchar(255) COLLATE utf8mb4_unicode_ci GENERATED ALWAYS AS (concat(`firstName`,_utf8mb4' ',`lastName`)) STORED,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customerId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstName`, `lastName`, `state`, `postalCode`, `country`, `email`, `phone`, `customerId`, `createdAt`, `updated_at`) VALUES
(3, 'Mark', 'Medina', 'TX', '76472', 'US', 'mark@oboideas.com', '8175018620', '3A0QSKYZS0PBX6PYT2AGCCKPP8', '2024-09-18 15:27:03', '2024-09-18 15:27:03'),
(4, 'alex', 'dry', 'TX', '76126', 'US', 'contact@alexdry.com', '8176882220', 'EKGFYDE5FH14DN4C3SJ2DBDEXC', '2024-09-18 16:26:28', '2024-09-18 16:26:28'),
(5, 'Test', 'Donation', 'TX', '76472', 'US', 'obo.ideas@gmail.com', '8175018620', '0WVC09AHW1QAMW4HB9C506FXQR', '2024-09-19 16:26:31', '2024-09-19 16:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `donates`
--

CREATE TABLE `donates` (
  `id` int NOT NULL,
  `bannerId` int DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci,
  `buttonText` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'home'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donates`
--

INSERT INTO `donates` (`id`, `bannerId`, `text`, `buttonText`, `image`, `created_at`, `updated_at`, `page_name`) VALUES
(20, 20, 'CLICK TO DONATE', 'Donate', 'uploads/image-1727169844463-438244731.png', '2024-09-13 13:57:43', '2024-09-24 09:24:10', 'home');

-- --------------------------------------------------------

--
-- Table structure for table `donateTabs`
--

CREATE TABLE `donateTabs` (
  `id` int NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'donate'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donateTabs`
--

INSERT INTO `donateTabs` (`id`, `logo`, `createdAt`, `updatedAt`, `page_name`) VALUES
(2, 'uploads/image-1726755087531-95525301.jpg', '2024-09-19 11:31:19', '2024-09-19 14:11:39', 'donate');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'the-facility'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`id`, `image`, `name`, `created_at`, `updated_at`, `page_name`) VALUES
(10, 'uploads/image-1726762704570-112227479.jpg', 'THE FACILITY', '2024-09-18 10:16:04', '2024-09-19 16:18:29', 'the-facility	');

-- --------------------------------------------------------

--
-- Table structure for table `facilityDetails`
--

CREATE TABLE `facilityDetails` (
  `id` int NOT NULL,
  `facilityId` int DEFAULT NULL,
  `facilityImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facilityName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'the-facility'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facilityDetails`
--

INSERT INTO `facilityDetails` (`id`, `facilityId`, `facilityImage`, `facilityName`, `created_at`, `updated_at`, `page_name`) VALUES
(82, 10, 'uploads/image-1726768740348-528209884.webp', 'Basketball', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility'),
(83, 10, 'uploads/image-1726768803374-941159630.webp', 'Football', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility'),
(84, 10, 'uploads/image-1726768867263-88378478.webp', 'Track', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility'),
(85, 10, 'uploads/image-1726769013315-446196112.webp', 'Gym', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility'),
(86, 10, 'uploads/image-1726768940185-693787822.webp', 'Bunk Room', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility'),
(87, 10, 'uploads/image-1726769115857-148654723.webp', 'Juice Bar', '2024-09-19 18:05:33', '2024-09-19 18:05:33', 'the-facility');

-- --------------------------------------------------------

--
-- Table structure for table `footers`
--

CREATE TABLE `footers` (
  `id` int NOT NULL,
  `footerLogo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footerTxt` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footers`
--

INSERT INTO `footers` (`id`, `footerLogo`, `footerTxt`, `createdAt`, `updatedAt`) VALUES
(2, 'uploads/image-1726753315133-74694594.png', 'Copyright © 2024 AP Ranch', '2024-09-19 12:17:31', '2024-09-22 14:54:07');

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'form'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `page_name`) VALUES
(7, 'Forms', '<p>Explore our available forms for scholarships, grants, and special events at AP Ranch. Whether you&#39;re seeking financial assistance for your educational pursuits or planning a special event, you&#39;ll find the necessary forms here. Simply click the buttons on the right to download and complete your application.</p>', '2024-09-18 06:56:37', '2024-09-25 07:58:08', 'form');

-- --------------------------------------------------------

--
-- Table structure for table `formsButtons`
--

CREATE TABLE `formsButtons` (
  `id` int NOT NULL,
  `buttonTxt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` text COLLATE utf8mb4_unicode_ci,
  `formId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'form'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `formsButtons`
--

INSERT INTO `formsButtons` (`id`, `buttonTxt`, `link`, `formId`, `createdAt`, `updatedAt`, `page_name`) VALUES
(218, 'Special Events Application', 'pdf/pdf-1726658697733-512772243.pdf', 7, '2024-09-25 07:58:08', '2024-09-25 07:58:08', 'form'),
(219, 'Scholarship Application', 'pdf/pdf-1726658732532-268939444.pdf', 7, '2024-09-25 07:58:08', '2024-09-25 07:58:08', 'form'),
(220, 'Grant Application', 'pdf/pdf-1726658742987-217317552.pdf', 7, '2024-09-25 07:58:08', '2024-09-25 07:58:08', 'form');

-- --------------------------------------------------------

--
-- Table structure for table `formsButtonStatus`
--

CREATE TABLE `formsButtonStatus` (
  `id` int NOT NULL,
  `buttonTxt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hidden` tinyint(1) DEFAULT '0',
  `formId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `formsButtonStatus`
--

INSERT INTO `formsButtonStatus` (`id`, `buttonTxt`, `hidden`, `formId`, `createdAt`, `updatedAt`) VALUES
(49, 'Indemnity Agreement', 1, 7, '2024-09-25 07:58:08', '2024-09-25 07:58:08'),
(50, 'Parent\'s Code of Conduct Agreement', 1, 7, '2024-09-25 07:58:08', '2024-09-25 07:58:08');

-- --------------------------------------------------------

--
-- Table structure for table `headers`
--

CREATE TABLE `headers` (
  `id` int NOT NULL,
  `headerLogo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `headers`
--

INSERT INTO `headers` (`id`, `headerLogo`, `createdAt`, `updatedAt`) VALUES
(2, 'uploads/image-1726753331164-105336907.png', '2024-09-19 11:33:37', '2024-09-19 15:12:35');

-- --------------------------------------------------------

--
-- Table structure for table `indemnityAgreements`
--

CREATE TABLE `indemnityAgreements` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instructor` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateSigned` date NOT NULL,
  `sign` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'indemnity-agreement'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `indemnityAgreements`
--

INSERT INTO `indemnityAgreements` (`id`, `name`, `activity`, `courseNumber`, `instructor`, `destination`, `semester`, `email`, `dateSigned`, `sign`, `createdAt`, `updatedAt`, `page_name`) VALUES
(3, 'Cassidi Snider ', 'Track', '123', 'Coach Greg', 'Ap Ranch ', 'Off Season', 'candi10.cc@gmail.com', '2024-09-17', 'Candice Clemmons ', '2024-09-17 15:43:51', '2024-09-19 13:52:13', 'indemnity-agreement	'),
(4, 'Antonio chism', 'Indoor track ', '1', 'N/a', 'N/a', 'N/a', 'achism52@gmail.com', '2024-09-17', 'Antonio chism', '2024-09-17 16:03:30', '2024-09-19 13:52:19', 'indemnity-agreement	'),
(5, 'Jacoriyan Hudson', 'Off Season Track', '00000', 'AP Ranch', 'TBD', '09/2024 - 02/2025', 'shandrekathomas@gmail.com', '2024-09-17', 'Shandreka Hall', '2024-09-17 16:04:39', '2024-09-19 13:52:24', 'indemnity-agreement	'),
(6, 'Ishan Girisha', 'off season track', '001', 'Coach Greg', 'benbroke', 'Monday, Thursday', 'girishas@hotmail.com', '2024-09-18', 'girisha siddappa', '2024-09-18 13:03:57', '2024-09-19 13:52:35', 'indemnity-agreement	'),
(7, 'Camila Flores', 'Basketball', '1', 'Coach Kae ', 'Fort Worth', 'Fall ', 'griceldaflores@me.com', '2024-09-18', 'Gricelda Flores', '2024-09-18 16:20:32', '2024-09-19 13:52:40', 'indemnity-agreement	'),
(8, 'Test Indemnity', 'Test', '0', 'Mark', 'AP', '2nd', 'obo.ideas@gmail.com', '2024-09-18', 'Test Signature', '2024-09-18 16:33:18', '2024-09-19 13:52:43', 'indemnity-agreement	'),
(9, 'Test name', 'Test', '0', 'Test', 'Home', '2st', 'obo.ideas@gmail.com', '2024-09-19', 'Signed by me.', '2024-09-19 18:43:03', '2024-09-19 18:43:03', 'indemnity-agreement'),
(10, 'Macaiah Franklin', 'Track and field ', '0', 'Athletic Performance Ranch', 'Fort worth', 'September-August', 'Macaiahfranklin@yahoo.com', '2024-09-20', 'Keturah Franklin ', '2024-09-20 12:19:23', '2024-09-20 12:19:23', 'indemnity-agreement'),
(11, 'Tristan Rolland ', 'N/a', '1', 'N/a', 'Any', 'N/a', 'achism52@gmail.com', '2024-09-20', 'Antonio chism ', '2024-09-20 14:10:14', '2024-09-20 14:10:14', 'indemnity-agreement'),
(12, 'Jacques Alphonce', 'Basketball', '00', 'Coach Kae', 'N/A', 'Fall', 'jacquesalphonce14@gmail.com', '2024-09-23', 'Peter Alphonce ', '2024-09-23 22:28:09', '2024-09-23 22:28:09', 'indemnity-agreement'),
(13, 'Jacques Alphonce', 'Basketball', '00', 'Coach Kae', 'N/A', 'Fall', 'jacquesalphonce14@gmail.com', '2024-09-23', 'Peter Alphonce ', '2024-09-23 22:28:09', '2024-09-23 22:28:09', 'indemnity-agreement'),
(14, 'Augustin Nsengimana', 'Basketball ', '000', 'Coach Kae', 'Ap ranch ', '10/192024', 'augustinensengimana6@gmail.com', '2024-09-23', 'Augustin Nsengimana', '2024-09-23 22:28:14', '2024-09-23 22:28:14', 'indemnity-agreement'),
(15, 'Abraham Ninnis', 'Basketball open gym fall ', '1', 'Coach Kae ', '1', '9/24/2024', 'ninnishomeinspection@gmail.com', '2024-09-24', 'Kevin Ninnis ', '2024-09-25 01:41:20', '2024-09-25 01:41:20', 'indemnity-agreement'),
(16, 'Logan Eubanks ', 'Off Season Track', '2024', 'N/A', 'N/a', 'Oct 2024 to August 2025', 'jeubanks@estaffingagency.com', '2024-09-25', 'Jackie Eubanks ', '2024-09-25 23:44:33', '2024-09-25 23:44:33', 'indemnity-agreement');

-- --------------------------------------------------------

--
-- Table structure for table `mediaLinks`
--

CREATE TABLE `mediaLinks` (
  `id` int NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `footerId` int DEFAULT NULL,
  `link` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mediaLinks`
--

INSERT INTO `mediaLinks` (`id`, `logo`, `footerId`, `link`, `createdAt`, `updatedAt`) VALUES
(29, 'uploads/image-1726753217024-944547989.jpg', 2, 'https://www.instagram.com/ap_ranch/', '2024-09-22 14:54:07', '2024-09-22 14:54:07'),
(30, 'uploads/image-1726753222160-689880674.png', 2, 'https://www.facebook.com/people/AP-Ranch/pfbid02S5zo59b7DqHtxCUi39r5gHWGgYhEhAL7dbBEudFiS6oMSo8sZzY4jXEXpwciX3V5l/', '2024-09-22 14:54:07', '2024-09-22 14:54:07'),
(31, 'uploads/image-1726753227234-991040849.png', 2, 'https://x.com/apranch2014', '2024-09-22 14:54:07', '2024-09-22 14:54:07');

-- --------------------------------------------------------

--
-- Table structure for table `missions`
--

CREATE TABLE `missions` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'our-mission'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `missions`
--

INSERT INTO `missions` (`id`, `name`, `description`, `image`, `createdAt`, `updatedAt`, `page_name`) VALUES
(13, 'Our Mission', '<p>As a society, wisdom and experience has taught us to view education as the great equalizer. To succeed as individuals and as a nation in an ever-changing and highly-technical world, we believe all youth should aspire to obtaining a college degree. Most people have seen or experienced first-hand that the “one size fits all” approach to success is resulting in far too many youth falling between the cracks, with the majority being youth of all ethnic backgrounds of low socio-economic status. Positive youth development theorists speak about the value of providing youth a voice. We believe that it is equally important to provide them choice. For youth who have access to fewer resources, fewer engaged adults in their lives and less confidence in their capacity to positively influence their environment, the introduction of choice can have a powerful and positive impact on both engagement and retention. The chances of increasing retention and achievement among high school and college students are significantly improved by individual relationships with caring adults who have great expectations and high standards, a sense of membership and positive peer culture and an opportunity to develop academic and athletic skills. Success also depends on attention to the time youth are not in school and recognition of the important role that community-based organizations play in creating a sense of connectedness for them and their families by offering structure for and interest in, their athletic and academic success. </p><p>Accordingly, we have designed and implemented program strategies that ensure equal access to post- secondary achievement that will increase the number of socio-economically disadvantaged youth enter and flourish in college. We support the creation of alternative learning environments that offer early exposure to the world of work, that combine academic support, and those that bridge secondary and post-secondary educational systems. By expanding the landscape of substantive and rewarding options available to our community’s youth, they will be better equipped with the skills and experience to make informed choices about their future. </p><p>The scope of this plan is ambitious and broad. As with any planning document, the strategies and actions that have been set out to accomplish our organization’s goals will require constant monitoring and revisions. Revisions will be based on objective and comprehensive assessment of progress and participant needs. This Plan is much more complex than a traditional organizational strategic plan, as we are attempting to provide programming at a level of service like no other; focusing both on academic enrichment and athletic skill development which will positively impact on our entire community. The vision is compelling and the stakes are high. Our young people and our community members deserve nothing less.</p>', 'uploads/image-1727107392512-221335568.jpg', '2024-09-18 09:16:00', '2024-09-25 07:50:25', 'our-mission');

-- --------------------------------------------------------

--
-- Table structure for table `parentsAgreements`
--

CREATE TABLE `parentsAgreements` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ageDivision` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateSigned` date NOT NULL,
  `sign` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'code-of-conduct'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parentsAgreements`
--

INSERT INTO `parentsAgreements` (`id`, `name`, `ageDivision`, `dateSigned`, `sign`, `createdAt`, `updatedAt`, `page_name`) VALUES
(2, 'SAHIL SHARMA', 'dghdh', '2024-09-23', 'fhfh', '2024-09-12 09:52:13', '2024-09-12 09:52:13', 'code-of-conduct');

-- --------------------------------------------------------

--
-- Table structure for table `partnerLogos`
--

CREATE TABLE `partnerLogos` (
  `id` int NOT NULL,
  `bannerId` int DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partnerLogos`
--

INSERT INTO `partnerLogos` (`id`, `bannerId`, `logo`, `created_at`, `updated_at`) VALUES
(271, 20, 'uploads/image-1726235573278-84357905.png', '2024-09-24 12:13:53', '2024-09-24 12:13:53'),
(272, 20, 'uploads/image-1726235610045-763897916.png', '2024-09-24 12:13:53', '2024-09-24 12:13:53'),
(273, 20, 'uploads/image-1726235642346-807204415.png', '2024-09-24 12:13:53', '2024-09-24 12:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `paymentId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('PENDING','COMPLETED','FAILED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `paymentId`, `firstName`, `lastName`, `phone`, `email`, `state`, `amount`, `status`, `createdAt`) VALUES
(1, 'tIjDh1ceskF7nP9ExE5vDu1xAxZZY', 'Mark', 'Medina', '8175018620', 'mark@oboideas.com', 'TX', 1.00, 'COMPLETED', '2024-09-18 15:27:04'),
(2, 'f5Z2ktN55LSOFtdkauVpkIRZY4eZY', 'alex', 'dry', '8176882220', 'contact@alexdry.com', 'TX', 1000.00, 'COMPLETED', '2024-09-18 16:26:29'),
(3, '7ZMtvgWnfwsGZg3871t79XwOuUUZY', 'Test', 'Donation', '8175018620', 'obo.ideas@gmail.com', 'TX', 1.00, 'COMPLETED', '2024-09-19 16:26:32');

-- --------------------------------------------------------

--
-- Table structure for table `serviceImages`
--

CREATE TABLE `serviceImages` (
  `id` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `serviceImages`
--

INSERT INTO `serviceImages` (`id`, `serviceId`, `image`, `created_at`, `updated_at`) VALUES
(120, 19, 'uploads/image-1726677949503-224777712.jpg', '2024-09-18 16:46:17', '2024-09-18 16:46:17'),
(121, 19, 'uploads/image-1726677964960-373104670.jpg', '2024-09-18 16:46:17', '2024-09-18 16:46:17'),
(122, 19, 'uploads/image-1726677975072-280115554.jpg', '2024-09-18 16:46:17', '2024-09-18 16:46:17'),
(135, 16, 'uploads/image-1726687121640-445964397.jpg', '2024-09-19 17:56:25', '2024-09-19 17:56:25'),
(136, 16, 'uploads/image-1726687132835-502341733.jpg', '2024-09-19 17:56:25', '2024-09-19 17:56:25'),
(137, 16, 'uploads/image-1726687143050-36259309.jpg', '2024-09-19 17:56:25', '2024-09-19 17:56:25'),
(141, 15, 'uploads/image-1726686030992-581120335.jpg', '2024-09-25 09:07:20', '2024-09-25 09:07:20'),
(142, 15, 'uploads/image-1726686039011-805847631.jpg', '2024-09-25 09:07:20', '2024-09-25 09:07:20'),
(143, 15, 'uploads/image-1726686043290-517452027.jpg', '2024-09-25 09:07:20', '2024-09-25 09:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `serviceProvided`
--

CREATE TABLE `serviceProvided` (
  `id` int NOT NULL,
  `serviceId` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sports'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `serviceProvided`
--

INSERT INTO `serviceProvided` (`id`, `serviceId`, `title`, `descriptions`, `created_at`, `updated_at`, `page_name`) VALUES
(152, 19, 'Off Season Training (September-January)', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectati</span><font face=\"Arial\">ons</font>', '2024-09-18 16:46:17', '2024-09-19 13:53:27', 'sports'),
(153, 19, 'Indoor Track (January)', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectati</span><font face=\"Arial\">ons</font>', '2024-09-18 16:46:17', '2024-09-19 13:53:30', 'sports'),
(154, 19, 'Summer Track (April-August)', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectati</span><font face=\"Arial\">ons</font>', '2024-09-18 16:46:17', '2024-09-19 13:53:35', 'sports'),
(183, 16, 'Private sessions', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(184, 16, 'team sessions', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(185, 16, 'large group skill sessions/camps', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(186, 16, 'private & open hoops sessions/runs', '<span></span><span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span><br>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(187, 16, 'Private/Small Group Film Breakdown', '<span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(188, 16, 'Mentorship & Mental Performance Coaching ', '<span></span><span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(189, 16, 'Closed Pre/Post Season Scrimmages ', '<span></span><span>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</span><br><span>Pre-Post Snap Reads</span><font face=\"Arial\">&#160;| Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font><span>ntal Toughness, Calm Confidence | Leadership/ QB Expectations</span>', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(190, 16, 'Team Retreats', 'Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making<br>Pre-Post Snap Reads<font face=\"Arial\"> | Enhancing Arm Strength | Mastering Offensive Fundamentals | Me</font>ntal Toughness, Calm Confidence | Leadership/ QB Expectations<br>&#8232;', '2024-09-19 17:56:25', '2024-09-19 17:56:25', 'sports'),
(195, 15, 'Private One On One Training', '<p>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</p><p>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectations</p>', '2024-09-25 09:07:20', '2024-09-25 09:07:20', 'sports'),
(196, 15, 'small group training', '<p>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</p><p>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectations</p>', '2024-09-25 09:07:20', '2024-09-25 09:07:20', 'sports'),
(197, 15, 'offensive mentorship & consulting', '<p>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</p><p>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectations</p>', '2024-09-25 09:07:20', '2024-09-25 09:07:20', 'sports'),
(198, 15, 'film breakdown and game analysis', '<p>Field Work, Throwing Mechanics, Footwork Drills | Accuracy, Timing, Touch | Quick Delivery | Decision Making</p><p>Pre-Post Snap Reads | Enhancing Arm Strength | Mastering Offensive Fundamentals | Mental Toughness, Calm Confidence | Leadership/ QB Expectations</p>', '2024-09-25 09:07:20', '2024-09-25 09:07:20', 'sports');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `servicesImage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `servicesName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serviceDescriptions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sports'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `servicesImage`, `servicesName`, `serviceDescriptions`, `created_at`, `updated_at`, `page_name`) VALUES
(15, 'uploads/image-1726663159538-169217106.png', 'Football', '<p>At <strong>AP Ranch,</strong> we believe that football is more than just a game; it’s an opportunity to develop important life skills like teamwork, leadership, and perseverance. By providing a supportive and inclusive environment, we aim to help our student athletes grsdow into confident and well-rounded individuals who are prepared to succeed in all aspects of life.</p>', '2024-09-17 12:38:14', '2024-09-25 09:07:20', 'sports'),
(16, 'uploads/image-1726768580473-112196069.webp', 'basketball', '<span></span><span></span><span>Our basketball program offers everything you need - being a one stop shop to success. Working with individual athletes and teams at all levels from beginner to professional. We value &amp; preach accountability, respect, teamwork, skillwork, and the benefit of hard work, both on and off the court - Everything that goes into performing at the highest level in every aspect of life. Our goal and mission is to create the complete student athlete, one player at a time!<br></span>', '2024-09-17 14:06:04', '2024-09-19 17:56:25', 'sports'),
(19, 'uploads/image-1726657295835-660164739.png', 'Track', '<span></span><span></span><span></span><span>AP Ranch is proud to offer a world-class track club and training, coached by three-time NCAA National Champion Greg Sholars and his team of professional coaches. Athletes will receive an elite-level of training and an unprecedented opportunity to achieve at a level they may have only have dreamed of. We teach our athletes the importance of hard work, dedication, determination and perseverance both in the classroom and on the track.</span><br>', '2024-09-18 11:04:27', '2024-09-19 13:54:27', 'sports');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descriptions` text COLLATE utf8mb4_unicode_ci,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortIndex` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `page_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'team'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `image`, `name`, `descriptions`, `role`, `sortIndex`, `created_at`, `updated_at`, `page_name`) VALUES
(9, 'uploads/image-1726581773315-359920731.png', 'GREG SHOLARS', '<span></span><span></span><span>Greg Sholars is a Fort Worth native who attended Southwest High School and went on to become a legendary Flyin Frog at Texas Christian University.&#160; Greg is a collegiate and national record holder in 4/100m relay&#160; in which while at TCU he ran on 3 national titles teams in that event&#160; In high school he held the state of Texas record in the 100m for over two decades, is an 8-time NCAA All American and 3-time NCAA National Champion.&#160; He has coached collegiately at prestigious Division I programs including the University of Florida, the University of Texas and Texas Tech.&#160; He since transitioned to the corporate world, where he was a financial coach (professionally known as Vice President/Financial Consultant) at Charles Schwab and Merrill Lynch and is now currently fulfilling his life-long dream of helping children in his current role as Director of Operations at AP Ranch.</span>', 'Director, Head of Track', 2, '2024-09-17 14:02:57', '2024-09-23 15:41:21', 'team'),
(10, 'uploads/image-1726581918016-468511091.png', 'foster sawyer', '<span></span><span></span><span></span><span>Foster Sawyer, a Fort Worth native, discovered his love for football at a young age. He excelled in multiple sports growing up&#160; but found his true passion on the football field.Foster\'s dedication and leadership skills helped his team achieve two undefeated state championships and was rewarded 2013 Texas Built Ford Tough Player of the Year. He then received multiple scholarship offers from Division 1 programs and chose to play at TCU where he lettered and served on the leadership council the 2016 season. Later on he then transferred to SFA to finish his collegiate career.<br><br>Beyond his playing days, Foster developed a passion for coaching and mentoring young athletes. He believes in helping them pursue their dreams both on and off the field.Foster Sawyer is committed to making a positive impact in the lives of young athletes, using his experience and guidance to inspire them to reach their full potential.<br>&#8232;</span><br>', 'Football', 3, '2024-09-17 14:03:38', '2024-09-20 09:43:10', 'team'),
(11, 'uploads/image-1726581904660-960116206.png', 'Kieran Hayward', '<span></span><span></span><span>Kieran Hayward was born and raised in Sydney, Australia. He is a former NCAA Division 1 and NBA G-League guard whose love for the game has lead him to coaching and mentoring. His passion is to help guide and develop players to reach their full potential on and off the court. </span>', 'Basketball', 4, '2024-09-17 14:05:07', '2024-09-20 09:43:14', 'team'),
(12, 'uploads/image-1726656900880-541041738.png', 'LaToska Johnson', '<span></span><p><span></span><span></span><span>Latoska is a Fort Worth native and mother of four. She graduated from Crowley High School and went on to receive a full scholarship for track and field at the University of Houston. Prior to becoming a part of the AP Ranch family, she spent 15 years as a manager in the mortgage industry, all while volunteering as a summer track coach. She is very passionate about her community and believes in humility in service. She is very passionate about always reaching out to others with a helping hand.</span><br></p>', 'Operations Administrator', 6, '2024-09-17 14:05:53', '2024-09-23 15:48:12', 'team'),
(13, 'uploads/image-1726666493583-998643536.png', 'marquette miller', '<span></span><span></span><span>Marquette Miller brings over 25 years of multifaceted experience in event planning, project management, and design to her role as Facility Coordinator at A P Ranch. With an extensive background in orchestrating successful events and overseeing complex projects, Marquette is adept at ensuring every detail is meticulously executed to perfection. Her passion for giving back and empowering others drives her commitment to creating environments where individuals can thrive and achieve their goals. Marquette\'s exceptional organizational skills, combined with her creative vision and dedication to excellence, make her an invaluable leader at A P Ranch, shaping transformative experiences for athletes, staff, and <br>visitors alike.</span>', 'Events Coordinator', 7, '2024-09-17 14:06:26', '2024-09-20 09:43:20', 'team'),
(14, 'uploads/image-1727106408269-469220516.png', 'Johnathan Gray', '<p>Johnathan Gray is the Head Strength &amp; Conditioning Coach for APR, bringing a wealth of knowledge and expertise to the team. A former standout Running Back at the University of Texas, Johnathan excelled both on the field and in the classroom, earning his B.S. in Kinesiology. His passion for fitness and athletic performance led him to pursue a career in strength and conditioning, where he has now accumulated over eight years of experience.</p><p>Johnathan is a certified Strength and Conditioning Specialist through the International Sports Sciences Association (ISSA), showcasing his dedication to staying at the forefront of sports science and training methodologies. His hands-on experience as a collegiate athlete, combined with his academic background and professional certification, uniquely positions him to develop customized training programs that enhance performance, reduce injury risk, and maximize athletic potential for athletes of all levels.</p><p>At APR, Johnathan is known for his motivating coaching style and his commitment to helping athletes achieve peak performance, both on and off the field.</p>', 'Strength & Conditioning', 5, '2024-09-17 16:15:57', '2024-09-23 15:46:50', 'team'),
(16, 'uploads/image-1726756381162-54645774.png', 'Mike Dry', '<p>Michael Dry is an American business investor with diverse real estate, gas and other&#160;<span>various business holdings in Fort Worth, Texas. He is CEO of Av-Dec (Aviation Devices&#160;</span><span>and Electronic Components) also based in Fort Worth.</span></p><p>Mr. Dry is the founder of A.P. Ranch (APR), a non-profit foundation that is located on a&#160;<span>ranch in west Fort Worth. The primary aim of the foundation is to expand education,&#160;</span><span>athletic, and artistic opportunities for youth by procuring scholarships for advance.</span></p>', 'Founder', 1, '2024-09-19 14:34:23', '2024-09-20 09:43:25', 'team');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collaborates`
--
ALTER TABLE `collaborates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactDetailForms`
--
ALTER TABLE `contactDetailForms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactForms`
--
ALTER TABLE `contactForms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donates`
--
ALTER TABLE `donates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bannerId` (`bannerId`);

--
-- Indexes for table `donateTabs`
--
ALTER TABLE `donateTabs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilityDetails`
--
ALTER TABLE `facilityDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facilityId` (`facilityId`);

--
-- Indexes for table `footers`
--
ALTER TABLE `footers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formsButtons`
--
ALTER TABLE `formsButtons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formId` (`formId`);

--
-- Indexes for table `formsButtonStatus`
--
ALTER TABLE `formsButtonStatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formId` (`formId`);

--
-- Indexes for table `headers`
--
ALTER TABLE `headers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indemnityAgreements`
--
ALTER TABLE `indemnityAgreements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediaLinks`
--
ALTER TABLE `mediaLinks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `footerId` (`footerId`);

--
-- Indexes for table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parentsAgreements`
--
ALTER TABLE `parentsAgreements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partnerLogos`
--
ALTER TABLE `partnerLogos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bannerId` (`bannerId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `serviceImages`
--
ALTER TABLE `serviceImages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceId` (`serviceId`);

--
-- Indexes for table `serviceProvided`
--
ALTER TABLE `serviceProvided`
  ADD PRIMARY KEY (`id`),
  ADD KEY `serviceId` (`serviceId`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `collaborates`
--
ALTER TABLE `collaborates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contactDetailForms`
--
ALTER TABLE `contactDetailForms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contactForms`
--
ALTER TABLE `contactForms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `donates`
--
ALTER TABLE `donates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `donateTabs`
--
ALTER TABLE `donateTabs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `facilityDetails`
--
ALTER TABLE `facilityDetails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `footers`
--
ALTER TABLE `footers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `formsButtons`
--
ALTER TABLE `formsButtons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `formsButtonStatus`
--
ALTER TABLE `formsButtonStatus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `headers`
--
ALTER TABLE `headers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `indemnityAgreements`
--
ALTER TABLE `indemnityAgreements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `mediaLinks`
--
ALTER TABLE `mediaLinks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `parentsAgreements`
--
ALTER TABLE `parentsAgreements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `partnerLogos`
--
ALTER TABLE `partnerLogos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `serviceImages`
--
ALTER TABLE `serviceImages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `serviceProvided`
--
ALTER TABLE `serviceProvided`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donates`
--
ALTER TABLE `donates`
  ADD CONSTRAINT `donates_ibfk_1` FOREIGN KEY (`bannerId`) REFERENCES `banners` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `facilityDetails`
--
ALTER TABLE `facilityDetails`
  ADD CONSTRAINT `facilityDetails_ibfk_1` FOREIGN KEY (`facilityId`) REFERENCES `facilities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `formsButtons`
--
ALTER TABLE `formsButtons`
  ADD CONSTRAINT `formsButtons_ibfk_1` FOREIGN KEY (`formId`) REFERENCES `forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `formsButtonStatus`
--
ALTER TABLE `formsButtonStatus`
  ADD CONSTRAINT `formsButtonStatus_ibfk_1` FOREIGN KEY (`formId`) REFERENCES `forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mediaLinks`
--
ALTER TABLE `mediaLinks`
  ADD CONSTRAINT `mediaLinks_ibfk_1` FOREIGN KEY (`footerId`) REFERENCES `footers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `partnerLogos`
--
ALTER TABLE `partnerLogos`
  ADD CONSTRAINT `partnerLogos_ibfk_1` FOREIGN KEY (`bannerId`) REFERENCES `banners` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `serviceImages`
--
ALTER TABLE `serviceImages`
  ADD CONSTRAINT `serviceImages_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `serviceProvided`
--
ALTER TABLE `serviceProvided`
  ADD CONSTRAINT `serviceProvided_ibfk_1` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
