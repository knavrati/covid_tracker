import React, { useState, useEffect } from 'react';

function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    manufacturer: '',
    number_of_uses: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/vaccines')
      .then((response) => response.json())
      .then((data) => setVaccines(data))
      .catch((error) => console.error('Error fetching vaccines:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine({ ...newVaccine, [name]: value });
  };

  const handleAddVaccine = () => {
    if (!newVaccine.name || !newVaccine.manufacturer || !newVaccine.number_of_uses) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/vaccines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVaccine),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add vaccine');
        }
        return response.json();
      })
      .then((addedVaccine) => {
        setVaccines([...vaccines, addedVaccine]);
        setNewVaccine({ name: '', manufacturer: '', number_of_uses: '' });
      })
      .catch((error) => console.error('Error adding vaccine:', error));
  };

  const handleDeleteVaccine = (id) => {
    fetch(`http://localhost:5000/vaccines/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete vaccine with ID ${id}`);
        }
        setVaccines(vaccines.filter((vaccine) => vaccine.vaccineid !== id));
      })
      .catch((error) => console.error('Error deleting vaccine:', error));
  };

  return (
    <div>
      <h2>Vaccines</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Number of Uses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine) => (
            <tr key={vaccine.vaccineid}>
              <td>{vaccine.vaccineid}</td>
              <td>{vaccine.name}</td>
              <td>{vaccine.manufacturer}</td>
              <td>{vaccine.number_of_uses}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteVaccine(vaccine.vaccineid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Vaccine</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={newVaccine.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="manufacturer"
            placeholder="Manufacturer"
            value={newVaccine.manufacturer}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="number_of_uses"
            placeholder="Number of Uses"
            value={newVaccine.number_of_uses}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddVaccine}>
          Add Vaccine
        </button>
      </form>
    </div>
  );
}

export default Vaccine;
