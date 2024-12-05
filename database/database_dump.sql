--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-05 12:47:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16546)
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    cityid integer,
    name character varying(32),
    population integer,
    vaccination_rate double precision,
    recovery_rate double precision
);


ALTER TABLE public.city OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16543)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    countryid integer,
    name character varying(32),
    population integer,
    recovery_rate double precision,
    vaccination_rate double precision
);


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16537)
-- Name: covidcase; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.covidcase (
    caseid integer,
    status character varying(16),
    casedate character varying(32)
);


ALTER TABLE public.covidcase OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16549)
-- Name: hospital; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital (
    hospitalid integer,
    name character varying(64),
    address character varying(100)
);


ALTER TABLE public.hospital OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16540)
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    personid integer,
    name character varying(64),
    age integer,
    sex character varying(16)
);


ALTER TABLE public.person OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16552)
-- Name: precaution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.precaution (
    description character varying(100),
    duration integer
);


ALTER TABLE public.precaution OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16534)
-- Name: vaccine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vaccine (
    vaccineid integer,
    name character varying(100),
    manufacturer character varying(100),
    number_of_uses integer
);


ALTER TABLE public.vaccine OWNER TO postgres;

--
-- TOC entry 4804 (class 0 OID 16546)
-- Dependencies: 219
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (cityid, name, population, vaccination_rate, recovery_rate) FROM stdin;
1	Phoenix	1680992	80.5	88.5
2	Los Angeles	3979576	70.8	90
3	New York City	8804190	72.5	91.3
4	Chicago	2716000	69.3	89
5	Houston	2304580	66.5	87.5
6	Miami	439890	71.2	90.8
7	Dallas	1356780	68	88.9
8	Atlanta	498715	67.8	89.1
9	Denver	711463	70	89.8
\.


--
-- TOC entry 4803 (class 0 OID 16543)
-- Dependencies: 218
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (countryid, name, population, recovery_rate, vaccination_rate) FROM stdin;
1	United States	335893238	94.8	68.9
2	Canada	38930000	96.3	80.2
3	Mexico	129940228	90.5	62.7
4	United Kingdom	68265209	95.7	74
5	France	68513000	95.8	75.3
6	Germany	84708010	95.9	76.4
7	Russia	146150789	89.7	50.8
8	China	1409670000	98.5	91.4
9	Japan	123780000	97.3	81
10	Australia	27122411	97	85.6
\.


--
-- TOC entry 4801 (class 0 OID 16537)
-- Dependencies: 216
-- Data for Name: covidcase; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.covidcase (caseid, status, casedate) FROM stdin;
1	Recovered	2024-01-10
2	Active	2024-01-15
3	Recovered	2024-01-18
4	Deceased	2024-01-20
5	Active	2024-01-22
6	Recovered	2024-01-25
7	Active	2024-01-27
8	Recovered	2024-02-01
\.


--
-- TOC entry 4805 (class 0 OID 16549)
-- Dependencies: 220
-- Data for Name: hospital; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hospital (hospitalid, name, address) FROM stdin;
1	NYC Hospital	123 10th Ave, New York City, NY
2	Toronto General Hospital	857 Maryland Ave, Toronto, ON
3	St. Thomas Hospital	20 Westminster Bridge Road, London, UK
4	Arizona Clinic	500 W Southern Ave, Phoenix, AZ
5	Ohio Clinic	12 Color Ave, Columbus, OH
6	Massachusetts Hospital	55 Fruit St, Boston, MA
7	Johns Hopkins Hospital	1800 Orleans St, Baltimore, MD
8	ASU Hospital	758 College Ave, Phoenix, AZ
9	London Hospital	Queen Elizabeth Rd, London, UK
10	Stanford Health Care	300 Pasteur Dr, Stanford, CA
\.


--
-- TOC entry 4802 (class 0 OID 16540)
-- Dependencies: 217
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.person (personid, name, age, sex) FROM stdin;
1	John Doe	45	Male
2	Jane Smith	21	Female
3	Jack Johnson	30	Male
4	Dominic Caruso	40	Male
5	Alexander Raffaele	32	Male
6	Archie Wagner	80	Male
7	Francesca Reid	97	Female
8	Kennedy Peterson	16	Female
9	Leila Mueller	27	Female
10	Elise Graves	67	Female
\.


--
-- TOC entry 4806 (class 0 OID 16552)
-- Dependencies: 221
-- Data for Name: precaution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.precaution (description, duration) FROM stdin;
Wear Masks	30
Social Distancing	60
Hand Sanitizing	90
Avoid Large Gatherings	45
Quarantine for Close Contacts	14
Work from Home	120
Limit Non-Essential Travel	90
Ventilate Indoor Spaces	60
Stay Home if Symptomatic	14
Testing Before Events	7
\.


--
-- TOC entry 4800 (class 0 OID 16534)
-- Dependencies: 215
-- Data for Name: vaccine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccine (vaccineid, name, manufacturer, number_of_uses) FROM stdin;
1	Pfizer-BioNTech	Pfizer Inc.	200000
2	Moderna	Moderna Inc.	150000
3	Oxford-AstraZeneca	AstraZeneca	90000
4	Janssen	Janssen Vaccines	25000
5	Sputnik V	Gamaleya Institute	16000
6	Sputnik Light	Gamaleya Institute	15000
7	Convidecia	CanSino Biologics	10000
8	iNCOVACC	Bharat Biotech	9000
9	CoronaVac	Sinovac Biotech	8000
10	Covaxin	Bharat Biotech	7500
\.


-- Completed on 2024-12-05 12:47:29

--
-- PostgreSQL database dump complete
--

