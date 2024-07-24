// src/Components/UpdateCarForm.jsx
import React, { useState, useEffect } from 'react';

const UpdateCarForm = ({ carId, onUpdate }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (carId) {
      fetch(`/api/cars/${carId}`)
        .then(response => response.json())
        .then(data => {
          setMake(data.make);
          setModel(data.model);
          setYear(data.year);
          setPrice(data.price);
        })
        .catch(error => console.error('Error fetching car:', error));
    }
  }, [carId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/cars/${carId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ make, model, year: parseInt(year), price: parseFloat(price) }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Car updated:', data);
        onUpdate();  // Notify parent component about the update
      })
      .catch(error => console.error('Error updating car:', error));
  };

  return (
    <div>
      <h1>Update Car</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" required />
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCarForm;
