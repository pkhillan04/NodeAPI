const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read the data.json file into memory
const dataFilePath = './data.json'; // Ensure the path is correct relative to server.js
let data = {};

fs.readFile(dataFilePath, (err, fileData) => {
    if (err) {
        console.error("Failed to read data.json file:", err);
        return;
    }
    data = JSON.parse(fileData.toString());
});

// Endpoint to get all exercises
app.get('/api/exercises', (req, res) => {
    res.json(data.exercises || []);
});

// Endpoint to get all body parts
app.get('/api/bodyparts', (req, res) => {
    res.json(data.bodyParts || []);
});

// Endpoint to get details for a specific exercise
app.get('/api/exercise/detail/:id', (req, res) => {
    const exerciseDetail = data.exerciseDetails[req.params.id];
    if (exerciseDetail) {
        res.json(exerciseDetail);
    } else {
        res.status(404).send('Exercise detail not found');
    }
});

// Endpoint to serve the complete data.json for other miscellaneous needs
app.get('/api/data', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
