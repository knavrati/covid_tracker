import React, { useState, useEffect } from 'react';

function Country() {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({
    name: '',
    population: '',
    recovery_rate: '',
    vaccination_rate: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry({ ...newCountry, [name]: value });
  };

  const handleAddCountry = () => {
    if (!newCountry.name || !newCountry.population || !newCountry.recovery_rate || !newCountry.vaccination_rate) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCountry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add country');
        }
        return response.json();
      })
      .then((addedCountry) => {
        setCountries([...countries, addedCountry]);
        setNewCountry({ name: '', population: '', recovery_rate: '', vaccination_rate: '' });
      })
      .catch((error) => console.error('Error adding country:', error));
  };

  const handleDeleteCountry = (id) => {
    fetch(`http://localhost:5000/countries/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete country with ID ${id}`);
        }
        setCountries(countries.filter((country) => country.countryid !== id));
      })
      .catch((error) => console.error('Error deleting country:', error));
  };

  return (
    <div>
      <h2>Countries</h2>
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
          {countries.map((country) => (
            <tr key={country.countryid}>
              <td>{country.countryid}</td>
              <td>{country.name}</td>
              <td>{country.population}</td>
              <td>{country.vaccination_rate}%</td>
              <td>{country.recovery_rate}%</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCountry(country.countryid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Country</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={newCountry.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="population"
            placeholder="Population"
            value={newCountry.population}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="vaccination_rate"
            placeholder="Vaccination Rate (%)"
            value={newCountry.vaccination_rate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="recovery_rate"
            placeholder="Recovery Rate (%)"
            value={newCountry.recovery_rate}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddCountry}>
          Add Country
        </button>
      </form>
    </div>
  );
}

export default Country;
