// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const Car = require('./models/Car');
const app = express();
const port = 3001;
const cors = require('cors');


app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase');

// Middleware to parse JSON
app.use(express.json());

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get car by ID
app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).send('Car not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Create a new car
app.post('/api/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

// Update a car
app.put('/api/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCar) {
      res.json(updatedCar);
    } else {
      res.status(404).send('Car not found');
    }
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

// Delete a car
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (deletedCar) {
      res.json(deletedCar);
    } else {
      res.status(404).send('Car not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
