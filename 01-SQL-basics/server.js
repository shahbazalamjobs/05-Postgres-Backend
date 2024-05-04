
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

// Create Express app
const app = express();
const port = 3000;

// Parse request bodies as JSON
app.use(bodyParser.json());

// Configure database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'basic_db',
    password: 'admin',
    port: 5432, // or your PostgreSQL port
});


app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'root.html'));

    } catch (error) {
        console.error('Error serving root html file', error);
        res.status(500).send('Internal server error');
    }
});

// Routes for Countries
app.get('/countries', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Country');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/countries', async (req, res) => {
    const { name, population, area } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO Country (name, population, area) VALUES ($1, $2, $3) RETURNING *', [name, population, area]);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Routes for Cities
app.get('/cities', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM City');
        // console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/cities', async (req, res) => {
    const { name, country_id, population, rating } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO City (name, country_id, population, rating) VALUES ($1, $2, $3, $4) RETURNING *', [name, country_id, population, rating]);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
