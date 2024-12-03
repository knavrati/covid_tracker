import React, { useState, useEffect } from 'react';

function Hospital() {
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({
    name: '',
    address: '',
  });

  // Fetch all hospitals
  useEffect(() => {
    fetch('http://localhost:5000/hospitals')
      .then((response) => response.json())
      .then((data) => setHospitals(data))
      .catch((error) => console.error('Error fetching hospitals:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHospital({ ...newHospital, [name]: value });
  };

  // Add a new hospital
  const handleAddHospital = () => {
    if (!newHospital.name || !newHospital.address) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/hospitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHospital),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add hospital');
        }
        return response.json();
      })
      .then((addedHospital) => {
        setHospitals([...hospitals, addedHospital]);
        setNewHospital({ name: '', address: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding hospital:', error));
  };

  // Delete a hospital
  const handleDeleteHospital = (id) => {
    fetch(`http://localhost:5000/hospitals/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete hospital with ID ${id}`);
        }
        setHospitals(hospitals.filter((hospital) => hospital.hospitalid !== id)); // Update state
      })
      .catch((error) => console.error('Error deleting hospital:', error));
  };

  return (
    <div>
      <h2>Hospitals</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.hospitalid}>
              <td>{hospital.hospitalid}</td>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteHospital(hospital.hospitalid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Hospital</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={newHospital.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Address"
            value={newHospital.address}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddHospital}>
          Add Hospital
        </button>
      </form>
    </div>
  );
}

export default Hospital;
