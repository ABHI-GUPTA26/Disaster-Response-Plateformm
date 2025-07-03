 const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const { supabase } = require('./supabaseClient'); // Import Supabase client

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const io = socketIO(server);

// Example of disaster CRUD route
app.post('/disasters', async (req, res) => {
    const { title, location_name, description, tags, owner_id } = req.body;
    const { data, error } = await supabase
        .from('disasters')
        .insert([{ title, location_name, description, tags, owner_id }]);

    if (error) return res.status(400).send(error.message);
    io.emit('disaster_updated', data); // WebSocket event on data change
    res.status(201).json(data);
});

// Add other routes (resources, social media, etc.)
