// src/Components/AddCarForm.jsx
import React, { useState } from 'react';

const AddCarForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ make, model, year: parseInt(year), price: parseFloat(price) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Car added:', data);
        setMake('');
        setModel('');
        setYear('');
        setPrice('');
      })
      .catch((error) => console.error('Error adding car:', error));
  };

  return (
    <div>
      <h1>Add a New Car</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Make" required />
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Model" required />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" required />
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm;
