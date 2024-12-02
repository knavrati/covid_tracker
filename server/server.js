const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Route
app.get('/', (req, res) => {
  res.send('COVID Tracker Backend is running!');
});

// API Route Example
app.get('/cities', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM City');
      res.json(result.rows); // Send rows from the City table to the frontend
    } catch (error) {
      console.error('Error fetching cities:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all countries
app.get('/countries', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.country');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all vaccines
  app.get('/vaccines', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.vaccine');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching vaccines:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all people
  app.get('/people', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.person');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching people:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all hospitals
  app.get('/hospitals', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.hospital');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching hospitals:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all precautions
  app.get('/precautions', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.precaution');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching precautions:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Fetch all cases
  app.get('/cases', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.covidcase');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching cases:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.post('/cities', async (req, res) => {
    const { name, population, vaccination_rate, recovery_rate } = req.body;
    try {
      await pool.query(
        'INSERT INTO public.city (name, population, vaccination_rate, recovery_rate) VALUES ($1, $2, $3, $4)',
        [name, population, vaccination_rate, recovery_rate]
      );
      res.status(201).send('City added.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding city.');
    }
  });
app.delete('/cities/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM public.city WHERE cityid = $1', [id]);
      res.status(200).send(`City with ID ${id} deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting city.');
    }
  });
  
  
 
    

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
