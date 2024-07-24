
import React, { useEffect, useState } from 'react';
import AddCarForm from './AddCarForm';
import UpdateCarForm from './UpdateCarForm';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/cars/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCars(cars.filter(car => car._id !== id));
      })
      .catch(error => console.error('Error deleting car:', error));
  };

  const handleUpdate = () => {
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  };

  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} ({car.year}) - ${car.price}
            <button onClick={() => setSelectedCarId(car._id)}>Update</button>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedCarId && <UpdateCarForm carId={selectedCarId} onUpdate={handleUpdate} />}
    </div>
  );
};

export default CarList;
