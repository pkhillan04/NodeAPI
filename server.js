const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());

const dataFilePath = './data.json';
let data = [];

fs.readFile(dataFilePath, (err, fileData) => {
    if (err) {
        console.error("Failed to read data.json file:", err);
        return;
    }
    data = JSON.parse(fileData.toString());
});

app.get('/api/exercises/bodyPart/:bodyPart', (req, res) => {
    const bodyPart = req.params.bodyPart.toLowerCase();
    const exercisesByBodyPart = data.filter(exercise => exercise.bodyPart.toLowerCase() === bodyPart);
    res.json(exercisesByBodyPart);
});

app.get('/api/exercises/bodyPartList', (req, res) => {
    const bodyPartsList = Array.from(new Set(data.map(exercise => exercise.bodyPart)));
    res.json(bodyPartsList);
});

app.get('/api/exercises/equipmentList', (req, res) => {
    const equipmentList = Array.from(new Set(data.map(exercise => exercise.equipment)));
    res.json(equipmentList);
});

app.get('/api/exercises/targetList', (req, res) => {
    const targetList = Array.from(new Set(data.map(exercise => exercise.target)));
    res.json(targetList);
});

app.get('/api/exercises/equipment/:type', (req, res) => {
    const equipmentType = req.params.type.toLowerCase();
    const exercisesByEquipment = data.filter(exercise => exercise.equipment.toLowerCase() === equipmentType);
    res.json(exercisesByEquipment);
});

app.get('/api/exercises/target/:target', (req, res) => {
    const targetMuscle = req.params.target.toLowerCase();
    const exercisesByTarget = data.filter(exercise => exercise.target.toLowerCase() === targetMuscle);
    res.json(exercisesByTarget);
});

app.get('/api/exercises/exercise/:id', (req, res) => {
    const exerciseId = req.params.id;
    const exercise = data.find(exercise => exercise.id === exerciseId);
    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).send('Exercise not found');
    }
});

app.get('/api/exercises/name/:name', (req, res) => {
    const exerciseName = req.params.name.toLowerCase();
    const exercise = data.find(exercise => exercise.name.toLowerCase() === exerciseName);
    if (exercise) {
        res.json(exercise);
    } else {
        res.status(404).send('Exercise not found');
    }
});

app.get('/api/exercises', (req, res) => {
    res.json(data);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    console.log(`Frontend: ${process.env.FRONTEND_URL}`);
});
