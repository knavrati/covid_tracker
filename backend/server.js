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
      const result = await pool.query(
        'INSERT INTO public.city (name, population, vaccination_rate, recovery_rate) VALUES ($1, $2, $3, $4) RETURNING cityid',
        [name, population, vaccination_rate, recovery_rate]
      );
      res.status(201).json(result.rows[0]); // Return the new city's ID
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

// Add a country
app.post('/countries', async (req, res) => {
  const { name, population, recovery_rate, vaccination_rate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.country (name, population, recovery_rate, vaccination_rate) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, population, recovery_rate, vaccination_rate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding country:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a country
app.delete('/countries/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.country WHERE countryid = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.status(200).send(`Country with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting country:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/vaccines', async (req, res) => {
  const { name, manufacturer, number_of_uses } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.vaccine (name, manufacturer, number_of_uses) VALUES ($1, $2, $3) RETURNING *',
      [name, manufacturer, number_of_uses]
    );
    res.status(201).json(result.rows[0]); // Return the newly added vaccine
  } catch (error) {
    console.error('Error adding vaccine:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/vaccines/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.vaccine WHERE vaccineid = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Vaccine not found' });
    }
    res.status(200).send(`Vaccine with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting vaccine:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/people/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.person WHERE personid = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).send(`Person with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting person:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/people', async (req, res) => {
  const { name, age, sex } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.person (name, age, sex) VALUES ($1, $2, $3) RETURNING *',
      [name, age, sex]
    );
    res.status(201).json(result.rows[0]); // Return the newly added person
  } catch (error) {
    console.error('Error adding person:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/hospitals', async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.hospital (name, address) VALUES ($1, $2) RETURNING *',
      [name, address]
    );
    res.status(201).json(result.rows[0]); // Return the newly added hospital
  } catch (error) {
    console.error('Error adding hospital:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.hospital WHERE hospitalid = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Hospital not found' });
    }
    res.status(200).send(`Hospital with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting hospital:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/cases/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.covidcase WHERE caseid = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.status(200).send(`Case with ID ${id} deleted.`);
  } catch (error) {
    console.error('Error deleting case:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cases', async (req, res) => {
  const { status, case_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.covidcase (status, case_date) VALUES ($1, $2) RETURNING *',
      [status, case_date]
    );
    res.status(201).json(result.rows[0]); // Return the newly added case
  } catch (error) {
    console.error('Error adding case:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/precautions', async (req, res) => {
  const { description, duration } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO public.precaution (description, duration) VALUES ($1, $2) RETURNING *',
      [description, duration]
    );
    res.status(201).json(result.rows[0]); // Return the newly added precaution
  } catch (error) {
    console.error('Error adding precaution:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/precautions/:description', async (req, res) => {
  const { description } = req.params;
  try {
    const result = await pool.query('DELETE FROM public.precaution WHERE description = $1', [description]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Precaution not found' });
    }
    res.status(200).send(`Precaution "${description}" deleted.`);
  } catch (error) {
    console.error('Error deleting precaution:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
