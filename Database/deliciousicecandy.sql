-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2024 at 06:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deliciousicecandy`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerNO` int(7) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `ContactPerson` varchar(50) NOT NULL,
  `CellphoneNO` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerNO`, `Name`, `Address`, `ContactPerson`, `CellphoneNO`) VALUES
(1, 'Allenzon Canteen and Sari Sari Store', '34 F Manalo St. Batis San Juan', 'Aileen Baldonaro', 9066834919),
(2, 'Homtuls Gen. Mdse.', '38 NBP Aurora Blvd cor F Roman St. San Juan', 'Josie Tan', 9493592091),
(3, 'JJN 1 Store', '108 N. Gonzales St. Harapin Ang Bukas Mandaluyong', 'Julius', 9100616987),
(4, 'JJN 2 Store', '62 Pinagtipunan St. Hagdang Bato, Mandaluyong', 'Julius', 9100650512),
(5, 'Merlyn Baterna Store', '218 N Gonzales St. Hagdang bato Itaas Mandaluyong', 'Merlyn', 9394202135),
(6, 'Rose Lynne Dumlao', 'LBC Express Maysilao Circle Brgy. Plainview Mandal', 'Rose Lynne Dumlao', 9296694623),
(7, 'Joan ', '127 Sayas Street Daop Palad Merville Pasay', 'Joan Ramis', 9567956913),
(8, 'Marigold Store', '2124 Alvarez St., Tramo Pasay city', 'Marigold Kim Jorique', 9063151226),
(9, 'Lucky Thess Minimart', '25 A Merville Access Rd Merville Pasay', 'Albert', 9209109772),
(10, 'Village', '\"Talon 2 Aventine Hills Vatican Dr. Italia 500 Bf ', 'Lilibeth Magdaluyo', 9353310095),
(11, 'Eat to Ten', '5A Lalaine Bennet St  BF Resort Vill Las Piñas', 'Zharon Almero', 9199344751),
(12, 'Anne', 'Blk 7 Lot 6 T.F. Legarda St. Bf Resort Vill Las Pi', 'Anne Ilagan', 9778101730),
(13, 'Atty Anya Delos Santos', '816 L20-A Chester Babst BF Resort Las Piñas', 'Anya Delos Santos', 9171382692),
(14, 'Santos Store', '1557 Tramo Street, Barangay Zapote, Las Piñas', 'Estrella Sy', 9195960309),
(15, 'Ayn Store', '619 Crm Avenue Goodyear Park Subd Almanza Uno Las ', 'Michael', 9437063004),
(16, 'Alice Store', '231 Marquez St. Gatchalian Subd. Phase 3 Las Pinas', 'Alice', 9163923102),
(17, 'Eigenn Jade Pascua', '8 Balagtas St Tuazon Pamplona Uno Las Piñas City', 'Eigenn Jade Pascua', 9367256814),
(18, 'Francille Convenience Store', '22 C Aurora Dr Vergonville Pulang Lupa 2, Las Piña', 'Lorena Solano Aguilar', 9175045844),
(19, 'SVJ Store', 'Bernabe Compound Pulang Lupa Uno Las Pinas', 'Sam Villaflor', 9164869716),
(20, 'Dan David Poultry Supplies', 'Poblacion Kawit Cavite', 'Arnold Mendoza', 9059003644),
(21, 'A. Eatery', 'San Sebastian kalayaan Rd Kawit Cavite', 'Angeline Ramirez', 9155413814),
(22, 'Angel Icas Store', '\"B 11-A Lot 1 Camella Lessandra Molino Subd. Molin', 'Angel Ica', 9472948876),
(23, 'MBT May Bakery', '68-B Mambog 2 Bacoor Cavite', 'MayTejero', 9672868794),
(24, 'Carol Magpili', '173 San Nicolas 1 Bacoor Cavite', 'Carol', 9156579928),
(25, 'Veronica Valenzona', 'Blk 22 L4B Elisa Homes Molina 4 Bacoor Cavite', 'Veronica ', 9214778704),
(26, 'Esperanza del Rosario', '177 Mambog 4 City of Bacoor Cavite', 'Esperanza Del Rosario Aquino', 9178392523),
(27, 'Jfroi Store', 'Jfroi Store', 'Edna Conde Pelimiano', 9194574988),
(28, 'Marischell Pharmacy', '245 Carsadang Bago Pag-asa Imus Cavite', 'Marischell Bautista', 9228025546),
(29, 'Edlyn Buenafe', 'Blk 5 Lot 5 Ph 2 Prima Rosa Vill Buhay Na Tubig Im', 'Edlyn Buenafe', 9569814209),
(30, 'Emy Store', 'Bukandala 2, Imus Cavite', 'Emerita Concepcion', 9433166829),
(31, 'FAJS Bakery and Store', 'Sauquillo Cmpd Buhay Na Tubig Imus Cavite', 'Ferdie Fernando', 9219370159),
(32, 'VBRJ', 'Blk 5 Lot 12-B Ph 1 ACM Subd Imus Cavite', 'Vicente Torrecumpo', 9993087065),
(33, 'Honesto', 'Blk 61 Lot 59 Jade Subdiv. Imus Cavite', 'Honesto', 9566816056),
(34, 'Nestor', 'B121 L17 P2 Golden Horizon Villas Trece Martirez C', 'Nestor', 9205633707),
(35, 'Carol Store', 'San Jose 2, Noveleta Cavite', 'Albert', 9167147322),
(36, 'Rolly And Mia Store', '5993 Tramo St Brgy San Dionisio Parañaque', 'Susan Mia Fuentes', 9771344555),
(37, 'Bart Domingo', '4390 Bluebell St, Sunvalley Subd. Parañaque', 'Bart Domingo', 9062360631),
(38, 'Maria Cristina Maranion', '4456 Scarlet St., Sun Valley Subd. Brgy. Sun Valle', 'Maria', 9257212079),
(39, 'Wellington Extra Minimart', 'Unit I E Benrosi Plaza Doña Soledad Ave Parañaque', 'Roan Ngo', 9958591090),
(40, 'Astro General Merchandise', 'Unit 106 Cluster I Isabelle Garden Condo E Rodrigu', 'Emma D Magbanua', 9288224687),
(41, 'Mich Coronel', 'Orchid St. Tahanan Village Sucat Parañaque', 'Mich Coronel', 9173852239),
(42, 'Allysa Sari-Sari Store', '558 Delpan street, Tondo Manila', 'Jun Armada', 9271415702),
(43, 'Lhog Sari-Sari Store', 'Blk 13 Lt 1 Quezon St. Tondo, Manila', 'Jennifer', 9236646279),
(44, 'Gay Sari-Sari Store', '1626 Antonio Rivera St. Tondo, Manila', 'Marvin', 9199741310),
(45, 'Jinky Store', '1204 Tambunting St. Sta. Cruz, Manila', 'Jinky', 9165782043),
(46, 'Vivian Store', 'Pritil Market, Tondo, Manila', 'Vivian', 9055365222),
(47, 'Mary Apple Store', '353 N Pilapil St. Tondo, Manila', 'Mary Apple', 9062272665),
(48, 'Boss DiDi Master Chef', '\"750 J Planas cor G Perfecto Sts. Gagalangin  Tond', 'Millette Sayson', 9756087959),
(49, 'Albano', 'Del Fiero St. Brgy 174 Tondo, Manila', 'Elisa', 9171050692),
(50, 'Rmae Drugstore ', '284 Herbosa St. Tondo, Manila ', 'May De Jesus', 9228768172),
(51, 'Sandoval Ice Cream House ', '574 Herbosa St. Tondo, Manila', 'Alex', 9054162648),
(52, 'Mary Grace Sari-Sari Store', 'Oroquieta St. cor Laguna St. Tondo, Manila', 'Mary Grace', 9970891335),
(53, 'Amiras Paluto', '90 Jacinto St cor Sta Maria St Tondo, Manila', 'Rowena Antonino', 9276232727),
(54, 'Lito\'s Store', '426 Dandan St Brgy 82 Tondo, Manila', 'Remelito Manala', 9398918094),
(55, 'Lilang Store', '1604 P. Guevarra St Tondo, Manila', 'Leonila Ramos', 9481522437),
(56, 'Jonnel\'s Store', '2004 Katamanan St Tondo Manila', 'Jonnel Jose', 9178792324),
(57, 'Katrina Savino', '1780 G. Santiago St. Sta. Cruz Manila', 'Katrina N. Savino', 9497778593),
(58, 'Aida\'s Store', '1337 J. Nolasco St. Tondo Manila', 'Susana Boncolino', 9770983762),
(59, 'Lifecheck South Mart', '323 Herbosa St. Tondo, Manila', 'Mary Anne Carol', 9090061641),
(60, 'Ma. Alyssa Cruzado', '3107 Pilar St. Tondo, Manila', 'Alyssa', 9171348887),
(61, 'A.V. Store', '1269 Tayuman St. Tondo, Manila', 'Anthony E. Paningbatan', 9266388660),
(62, 'Happy Tummy (Queenie)', '839 Tayuman St. Tondo, Manila', 'Queenie Chiu', 9183680836),
(63, 'Javal Store', '514 Perla St. Tondo, Manila', 'Javal Mike Reyes', 9226377014),
(64, 'Baker\'s Zone Baking Supply', '2014 Juan Luna St. Pritil Tondo, Manila', 'Michaela Pruna', 9615583240),
(65, 'Tiffany', '2348 Simion De Jesus St. Balut Tondo, Manila', 'Luisito Dela Cruz', 9306540390),
(66, 'Raffy Jugado', '1714 N. Zamora St. Tondo, Manila', 'Raffy Jugado', 9306250699),
(67, 'D\'s Store ', '2912 Orani St. Tondo, Manila', 'Jet T. Dakanay', 9219709559),
(68, 'Kuko Land Salon', '2524 Juan Luna St. Gagalangin Tondo, Manila', 'Caroline Corpuz', 9360549698),
(69, 'KMart Trading', '1606 F Varona St Tondo, Manila', 'Janica', 9770980418),
(70, 'Jhamsk Pharma Trading', '314 Moriones St Tondo, Manila', 'Lioba Cui', 9285540382),
(71, 'Pan De Buenas', '333 Sevilla St Moriones Tondo, Manila', 'Marilou Ingal', 9754846896),
(72, 'Ryan Luis', '818 Padilla St. San Miguel Quiapo Manila', 'Tomas Tecson', 9178592482),
(73, 'Kitana', '1006 Arlegui St Quiapo Manila', 'Estelita', 9175906784),
(74, 'Howell Store', '902 Bilibid Viejo Quiapo MAnila', 'Howell Santos', 9163536986),
(75, 'Mel Sharief Store', '320 Globo De Oro St. Quiapo Manila', 'Mel', 9663485694),
(76, 'Meren Store', '1209 Cruzada St Quiapo Manila', 'May Meren', 9472678101),
(77, 'City Canteen', 'Inner Court Manila City Hall', 'Rowena Cruz', 9193125235),
(78, 'Chicas', 'N Ramirez cor Sto Thomas (front United Doctors)', 'Gloria Siman', 9482704756),
(79, 'Lito Tan Store', '1265 Benavidez St Sta Cruz Manila', 'Lito ', 9081990188),
(80, 'El Cielo Bakery', '1722 Alvarez St Sta Cruz Manila', 'Timmy', 9177529578),
(81, 'Lunar Bakery', '1455 Maria Clara St. Sta Cruz, Manila', 'Yolly Magpantay', 9293771700),
(82, 'Ericka Store', '2824 A. M. Hizon St. Sta. Cruz, Manila', 'Rosana Nemez', 9957296083),
(83, 'Kate Store', '2718 Aurora Blvd. Sta. Cruz, Manila', 'Michael Ramos', 9326016664),
(84, 'Jocelyn Pasague', '1749 Tecson St. Sta. Cruz, Manila', 'Jocelyn Pasague', 9167604900),
(85, 'Den Den Bakery', '107 E Dela Paz St San Roque Marikina', 'Joy', 9511596888),
(86, 'David Store', '8 St Mary Ave Provident Village Marikina', 'David', 9233495702),
(87, 'Femas Bakery', '2 WC Paz St Sta Elena Marikina', 'Marife', 9175786119),
(88, 'Uno  Stopshop', '103 E Santos Concepcion Uno Marikina', 'Elmer ', 9483322965),
(89, 'Tañong Bakery', '196 Boni Avenue Tañong Marikina', 'Peggy Cuevas', 9067085744),
(90, 'RK Store', '188 A Bonifacio Ave Tañong Marikina', 'RK', 9166339912),
(91, 'Elvie\'s Store', '138 National Rd Looc Cardona Rizal', 'Elvira Valencia', 9753781944),
(92, 'Villafortuny Cafe', '8 Diamond St Marikina', 'may', 9055554055),
(93, 'Zandrick Store', '11 JP Rizal St Marikina', 'Michelle Santos', 9497289152),
(94, 'Mama Beth Store', '66 A Bonifacio Ave Barangka Marikina', 'Elizabeth Barredo', 9972964029),
(95, 'Intong Store', '96 P Burgos St. Sto Niño Marikina', 'Bryan Cansino', 9552259912),
(96, 'Dass Trading Mini Mart', '#3 M.A. Roxas St. Calumpang, Marikina', 'Deo Antonio S. Santos', 9955282274),
(97, 'J&E Minimart', 'National Rd Binangonan Rizal', 'Elaine', 9166466825),
(98, ' Cherry\'s Store', 'Lot 41 JP Rizal St. Binangonan Rizal', 'Cherry Calleja', 9175125983),
(99, 'Health Street Pharmacy', '46 Batingan Hiway Binangonan Rizal', 'May Barcelona', 9232599110),
(100, 'Maximus Pizza', 'San Roque Cardona Rizal', 'Aileen Lontoc', 9177720782),
(101, 'Candree Bakery', '42 Fisheries St. Vasra, Quezon City', 'Maria Fe', 9330311638),
(102, 'Belison Pharmacy', '14 Garovillas St San Jose Morong, Rizal', 'Cherry Belison', 9457954394),
(103, 'Mercy Buko', '54 Topaz Ibaba San Pedro Morong Rizal', 'Mercedita C. Villanto', 9533720710),
(104, 'Frank n\' Irene', 'National Road Brgy. Muzon TayTay Rizal', 'Irene Jacinto', 9397646533),
(105, 'Ruby Store', 'Blk 4 Apras Floodway San Juan, Cainta Rizal', 'Ruby Ybatay', 9664407304),
(106, 'Johanna Rose Store', 'G.M.C. Bagumbayan Teresa Rizal	Rom', 'Johanna Rose', 9235012453),
(107, 'Margaret Store', 'San Luis Bagumbayan Teresa Rizal', 'Fatima Condino', 9496796372),
(108, 'Jack N\' Jillianne', '23 M.L. Quezon St. Poblacion Teresa Rizal', 'Peachy Anne Santos', 9175035792),
(109, 'Xena Mae Store', 'Langka St. Cor. Guyabano St. AFP Housing S.M.R', 'Grace Fernandez', 9431361558),
(110, 'Pinky Store', 'B12 31 Lanzones St. AFP Village San Mateo Rizal', 'Esperanza', 9217030752),
(111, 'Azhanic', '48 Halcon St Sta. Teresita Quezon City', 'Mark Lester', 9354426675),
(112, 'Angel & Ashley Variety', 'Modesta San Mateo Rizal', 'Manate Tabaling', 9192002161),
(113, 'Lugaw Ni Bossing', 'J. Sumulong Rd. San Mateo Rizal', 'Melody Deguzman', 9264132609),
(114, 'J4IN1GEN. MDSE', 'BLK 11 LOT 4 AFP Village Brgy. Silangan S.M.R.', 'Renalyn P. Gilo', 9617586157),
(115, 'Jay Velasco Vargas', 'Purok Maligaya 2 Brgy Mambugan Antipolo', 'Jay VArgas', 9465562413),
(116, 'Rhiane and Rohar', '1 Bernardo St Mariblo San Francisco QC', 'Tessie Chua', 9053634011),
(117, 'Paul Cruz', '5 V. Luna Road QC', 'Paul Cruz', 9298021322),
(118, 'L&L', '6 K-E Kamuning Quezon City', 'Rose Dela Cruz', 9085701182),
(119, 'Nithel Drugstore ', '130 Old Samson Rd Apolonio Samson D6 QC', 'Thelma Salano Malibiran', 9092264672),
(120, 'Marvielle Drugstore', 'Bldg 5A2 Bahay Caridad Bayani St QC', 'Ching HIm Te', 9552093898),
(121, 'Jarl\'s Bakery', '87 Lantana St., Immaculate Concepcion, Q.C.', 'Jarl', 9175184051),
(122, 'Elvince', '1288 E Rodriguez Sr. cor Araneta Avenue Quezon Cit', 'Lorena', 9293837737),
(123, 'Lord\'s Blessings', 'B2 L1 Ph2 Science Ave Teachers Bliss Balonbato Bai', 'Maria Rosalie Sakdalan', 9167944888),
(124, 'E.L.M.', '31 La Salle St. Silangan Cubao, Quezon City', 'Cherry Liza Morales', 9564472361),
(125, 'Lolo Daddys', '75 B Xavierville Ave. Loyola Heights Quezon City', 'Anna ', 9469292267),
(126, 'Ryan Rumbaoa', '73 Camia St. Lower Hasmin Payatas QC', 'Ryan', 9279500730),
(127, 'KMYD', '43 Narra cor Akle Sts. Project 3 Quezon City', 'Susan', 9266420417),
(128, 'Jon Allan Buenaobra', '26 Road 8 Project 6 Quezon City', 'Sir Jon', 9162146170),
(129, 'Valerainne Lopez', '68 E Alley 2 Road 8 Project 6 Quezon City', 'Valerainne Lopez', 9272875237),
(130, 'Anarch Sari Sari Store', '1 Ofelia St. cor Rd 20 Project 8 QC', 'Virgie', 9234280380),
(131, 'M&J Store', '15-C Casal Bldg. Anonas St, Quirino 3A Quezon City', 'Josielyn Prestoza', 9199653661),
(132, 'Aleli', '10C Pres. Quezon St. Commonwealth QC', 'Aleli Valenzuela', 9499073551),
(133, 'Kajandra\'s Sari Sari Store', 'Stall #7 Soldiers mall 2nd floor Camp Aguinaldo Qu', 'Grace Marcos', 9167239771),
(134, '3Js Store', 'Mulawinan St. Brgy Lawang Bato Valenzuela', 'Cherry Dellomas', 9282450422),
(135, 'Zias Eating STN.', '70 p gregorio st. Lingunan valenzuela', 'Vicky Trinidad', 9553023362),
(136, 'Jennifer Gipanao', '151 P. Gregorio Street Ligunan Valenzuela', 'Jennifer Gipanao', 9994824202),
(137, 'Cherry Olaviaga Escarpe', '69 Samonte APT Gen Luis St. Bagbaguin Valenzuela', 'Madam Cherry', 9952803275),
(138, 'Dulce Bumatay Store', '351 F Francisco Sr Parada Valenzuela', 'Dulce', 9985801996),
(139, 'Divielyn Store', '233 S De Guzman Parada Valenzuela', 'Divielyn', 9381880073),
(140, 'Allen & Ken Bakery', '273 S De Guzman Impong Juana Parada Valenzuela', 'Joy Recto', 9333638015),
(141, 'ARV Store', '11 P De Guzman Cor Tata Erro St Parada Valenzuela', 'Vilma', 9505947617),
(142, 'Juvy Store', '87 Captain Cruz Parada Valenzuela', 'Juvy', 9393531898),
(143, 'Rovirich', '6120 Gen T De Leon Valenzuela', 'Lucina Pineda', 9236031663),
(144, 'Maleiden Store', '2063 Gen T De Leon Valenzuela', 'Maleiden', 9479791991),
(145, 'Gain Drugstore', '4030 Gen T De Leon Valenzuela', 'Joecy Miralin', 9222298088),
(146, '786/110 Store', '2133 A Angeles St Fortune Village Gen T De Leon Va', 'Madel Segosio', 9477113409),
(147, 'Artienda Store', '2208 Salvador St Fortune Village Gen T De Leon Val', 'Mary Grace De Leon', 9178384277),
(148, 'RM Store', '140 Rd Diam St Gen T De Leon Valenzuela', 'Rosemarie Cortez', 9224792098),
(149, 'Jess Lene Mdse ', '6144 Gen T De Leon Valenzuela', 'Jessie Liwanag', 9503914904),
(150, 'Ervin Eatery', '6029 Diverside Home Gen T De Leon Valenzuela', 'Rodalyn Taguifranca', 9283098214),
(151, 'Bogart Carwash', '108 P Valenzuela cor Deato St. Valenzuela City', 'Sir Arnel', 9999767688),
(152, 'Tapsi Nyu To - Pond Valenzuela', '2F Pond Bldg, 2 Phil Gun Club St Marulas Valenzuel', 'Jay Rosario', 9153416797),
(153, 'Lhadel Store', '69 Engracio St Elysian Marulas Valenzuela', 'Myrla', 9299604349),
(154, 'Mobear Store', '68 Violeta St Happysite Subd Marulas Valenzuela', 'Leunora Mendoza', 9056797138),
(155, 'Cathy Store', '19 Rd 5 San Miguel St Marulas Valenzuela', 'Bong Guzman', 9266768245),
(156, 'Rose Store', '4 Fausto St Manotoc Subdivision Marulas Valenzuela', 'Faith Marie Solano', 9157946402),
(157, 'Buena Fortuna Cafe', '34 Pio Valenzuela St Marulas Valenzuela', 'Divina Cabrera', 9952813148),
(158, 'Uy Silog', '60 A. Pablo St Karuhatan Valenzuela', 'Sarah Jane Dorado', 9171775226),
(159, 'Glycas Store', '28 Karuhatan Rd Valenzuela ', 'Grace Rina', 9215413865),
(160, 'Albert  Store', '59 Karuhatan Rd Karuhatan Valenzuela', 'Albert ', 9296419415),
(161, '', '', '', 0),
(162, 'KJC Store', '281 Mc Arthur Valenzuela', 'Lorna', 9222047738),
(163, 'Grocery Hub ', '247 Mc Arthur Highway Karuhatan Valenzuela', 'Narcisa Santos', 9422928275),
(164, 'Jimilas Catering', 'SM VAlenzuela Karuhatan', 'Rhey', 9174451846),
(165, 'Ronnie Barbershop', '10 Ilang Ilang St Karuhatan Valenzuela', 'Regina Daliwa', 9050614582),
(166, 'Am Baltazar', 'St Louis University Valenzuela', 'Alexander Baltazar ', 9276228912),
(167, 'Waboos Eatery', '14 P Gomez St. Maysan Valenzuela', 'Baby', 9291356704),
(168, 'Tm Myer Grocery', 'M Tonco St Maysan Valenzuela', 'Tm Myer', 9062640746),
(169, 'Mila Store', '23 Susana St Anville Subdivision Maysan Valenzuela', 'Mila', 9052862977),
(170, 'Irene Gutierrez Store', '403 Dulong Tangke St cor F Dela Cruz Malinta Valen', 'Irene Gutierrezv', 9339601035),
(171, 'Ruben Chua Store', '22 E Llenado Cmpd Maysan Rd Malinta Valenzuela', 'Ruben Chua', 9395757791),
(172, 'Ric Arellano Store', '381 Mc Arthur Hi Way Malinta Valenzuela', 'Ric Arellano', 9053279148),
(173, 'Sweet Cravings Chocolate Store', '768 A Pablo St Malinta Valenzuela', 'Lourdeliza Maquirang', 9456043621),
(174, 'Leolens Canteen', 'Maysan Rd. Malinta Valenzuela nr CMIC', 'Evelyn', 9304347692),
(175, 'Ngani Baya', '6 Danding Bldg CJ Santos St. Malinta VAlenzuela', 'Maricon Sosa', 9199141153),
(176, 'AMRC Pharmacy', '10 Balubaran Malinta Valenzuela', 'Len', 9174781328),
(177, 'Arevallo Store', '37 J San MIguel St Balubaran Valenzuela', 'mark', 9456688737),
(178, 'Gladiz Joy Cantor Store', '46 Doneza St Balubaran Malinta Valenzuela', 'Gladiz Joy ', 9078288905),
(179, 'Cathy Store', '808 A Pablo St Malinta Valenzuela', 'Erosaly', 9122751369),
(180, 'Alpha Care ', '15 Gov I Santiago St Malinta VAlenzuela', 'Jane', 9999980468),
(181, 'Laarni Nartea', '1370 Gov I Santiago St Malinta Valenzuela', 'Laarni', 9212933409),
(182, 'Mike Carenderia', '427 Santos CMPD. Malinta Bukid Valenzuela', 'Elizabeth Manaligod', 9611251543),
(183, 'Enerflex Gym', 'St Louis Cmpd Malinta Valenzuela', 'Joepet Abrigo', 9219959109),
(184, 'Kyle Store Store', '776 M. H. Del Pilar St Arkong Bato Valenzuela (nr ', 'Kyle', 9391468118),
(185, 'Yenzky Store', '1092 MH Del Pilar St Arkong Bato Valenzuela', 'Karen Amuran', 9208136683),
(186, 'Lynnie Store', '452 Dela Cruz Cmpd Paso De Blas Valenzuela', 'Louie Quibete', 9382642983),
(187, 'Alven Store', '39 B Dela Cruz Cmpd Paso De Blas Valenzuela', 'Alven Paham', 9515494222),
(188, 'Mary Beth Taton', '788 Door 1 San Jose Cmpd Paso De Blas Valenzuela ', 'Mary Beth', 93985643763),
(189, 'JB Medical', '024-A G Lazaro St. Dalandanan Valenzuela', 'Roselen Amazona', 9326227518),
(190, 'Samantha Store', '60 M Rincon Valenzuela', 'Anthony Santos', 9155649370),
(191, 'Rajia Store', '24 Rincon Rd cor Pascual St Rincon, Valenzuela', 'Rowena ', 9167525176),
(192, 'Candy Store', '16 E Antonio St Rincon Valenzuela', 'Candy', 9331661982),
(193, 'Zeny Store', '16 B Antonio St Rincon Valenzuela', 'Joni Villa', 9393091739),
(194, 'Diana Dinglasan ', '11 St Joseph STM LFS Vienta Reales Valenzuela', 'Diana', 9274479417),
(195, 'Franze Bakery', '59 c. Molina ventiriales Valenzuela city', 'Ferm Gamilong', 9174766060),
(196, 'Jeremy Store', '219 T Santiago St Viente Reales Valenzuela City', 'Daisy Oranga', 9479202798),
(197, 'Complete Line Pharmacy', '284 T. Santiago St. Viente Reales Valenzuela', 'Irene Mendoza', 9178831318),
(198, 'Kristel Tanteo Store', '414 Becona Cmpd Galas St Bignay, Valenzuela', 'Kristel', 9289794599),
(199, 'Mayen Store', '60 Pasolo Rd Valenzuela', 'Mayen', 9166705491),
(200, 'Charicar Store', '141 J Mercado Cmpd Pasolo Valenzueala', 'Charito', 96452328743);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductNO` int(7) NOT NULL,
  `ProductFlavor` varchar(20) NOT NULL,
  `Price` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductNO`, `ProductFlavor`, `Price`) VALUES
(1, 'Mango', 12),
(2, 'Cheese', 12),
(3, 'Pandan', 12),
(4, 'Buko', 12),
(5, 'Monggo', 12),
(6, 'Melon', 12),
(7, 'Fruit Salad', 12),
(8, 'Avocado', 12),
(9, 'Chocolate', 12),
(10, 'Cookies & Cream', 12),
(11, 'Cappuccino', 12),
(12, 'Rocky Road', 12),
(13, 'Dragon Fruit', 12);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(7) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`) VALUES
(0, 'perberto@gmail.com', 'perberto07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerNO`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductNO`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerNO` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductNO` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
