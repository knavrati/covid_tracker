import React, { useState, useEffect } from 'react';

function Precaution() {
  const [precautions, setPrecautions] = useState([]);
  const [newPrecaution, setNewPrecaution] = useState({
    description: '',
    duration: '',
  });

  // Fetch all precautions
  useEffect(() => {
    fetch('http://localhost:5000/precautions')
      .then((response) => response.json())
      .then((data) => setPrecautions(data))
      .catch((error) => console.error('Error fetching precautions:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrecaution({ ...newPrecaution, [name]: value });
  };

  // Add a new precaution
  const handleAddPrecaution = () => {
    if (!newPrecaution.description || !newPrecaution.duration) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/precautions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPrecaution),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add precaution');
        }
        return response.json();
      })
      .then((addedPrecaution) => {
        setPrecautions([...precautions, addedPrecaution]);
        setNewPrecaution({ description: '', duration: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding precaution:', error));
  };

  // Delete a precaution
  const handleDeletePrecaution = (description) => {
    fetch(`http://localhost:5000/precautions/${description}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete precaution "${description}"`);
        }
        setPrecautions(precautions.filter((p) => p.description !== description)); // Update state
      })
      .catch((error) => console.error('Error deleting precaution:', error));
  };

  return (
    <div>
      <h2>Precautions</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Description</th>
            <th>Duration (Days)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {precautions.map((p) => (
            <tr key={p.description}>
              <td>{p.description}</td>
              <td>{p.duration}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeletePrecaution(p.description)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Precaution</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description"
            value={newPrecaution.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="duration"
            placeholder="Duration (Days)"
            value={newPrecaution.duration}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddPrecaution}>
          Add Precaution
        </button>
      </form>
    </div>
  );
}

export default Precaution;
