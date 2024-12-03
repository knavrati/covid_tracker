import React, { useState, useEffect } from 'react';

function City() {
  // State for storing city data
  const [cities, setCities] = useState([]);

  // State for storing the new city input
  const [newCity, setNewCity] = useState({
    name: '',
    population: '',
    vaccination_rate: '',
    recovery_rate: '',
  });

  // Fetch data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/cities') // Update this URL if necessary
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching cities:', error));
  }, []);

  // Handle input changes for the add city form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCity({ ...newCity, [name]: value });
  };

  // Handle adding a new city
  
  const handleAddCity = () => {
    if (!newCity.name || !newCity.population || !newCity.vaccination_rate || !newCity.recovery_rate) {
      alert('Please fill in all fields.');
      return;
    }
  
    fetch('http://localhost:5000/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add city');
        }
        return response.json(); // Get the city with its new ID
      })
      .then((addedCity) => {
        // Add the new city with its ID to the state
        setCities([...cities, addedCity]);
        setNewCity({ name: '', population: '', vaccination_rate: '', recovery_rate: '' });
      })
      .catch((error) => console.error('Error adding city:', error));
  };
  
  

  // Handle deleting a city
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/cities/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete city with ID ${id}`);
        }
        setCities(cities.filter((city) => city.cityid !== id)); // Update state to remove the city
      })
      .catch((error) => console.error('Error deleting city:', error));
  };
   

  return (
    <div>
      <h2>Cities</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Population</th>
            <th>Vaccination Rate</th>
            <th>Recovery Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.cityid}>
              <td>{city.cityid}</td>
              <td>{city.name}</td>
              <td>{city.population}</td>
              <td>{city.vaccination_rate}%</td>
              <td>{city.recovery_rate}%</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(city.cityid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New City</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={newCity.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="population"
            placeholder="Population"
            value={newCity.population}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="vaccination_rate"
            placeholder="Vaccination Rate (%)"
            value={newCity.vaccination_rate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="recovery_rate"
            placeholder="Recovery Rate (%)"
            value={newCity.recovery_rate}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddCity}>
          Add City
        </button>
      </form>
    </div>
  );
}

export default City;
