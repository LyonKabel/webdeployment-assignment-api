// src/Components/App.jsx
import React from 'react';
import CarList from './CarList';
import AddCarForm from './AddCarForm';

const App = () => {
  return (
    <div>
      <h1>Car Management System</h1>
      <CarList />
      <AddCarForm />
      
    </div>
  );
};

export default App;
