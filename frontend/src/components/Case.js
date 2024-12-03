import React, { useState, useEffect } from 'react';

function Case() {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({
    status: '',
    case_date: '',
  });

  // Fetch all cases
  useEffect(() => {
    fetch('http://localhost:5000/cases')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase({ ...newCase, [name]: value });
  };

  // Add a new case
  const handleAddCase = () => {
    if (!newCase.status || !newCase.case_date) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCase),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add case');
        }
        return response.json();
      })
      .then((addedCase) => {
        setCases([...cases, addedCase]);
        setNewCase({ status: '', case_date: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding case:', error));
  };

  // Delete a case
  const handleDeleteCase = (id) => {
    fetch(`http://localhost:5000/cases/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete case with ID ${id}`);
        }
        setCases(cases.filter((c) => c.caseid !== id)); // Update state
      })
      .catch((error) => console.error('Error deleting case:', error));
  };

  return (
    <div>
      <h2>Cases</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.caseid}>
              <td>{c.caseid}</td>
              <td>{c.status}</td>
              <td>{c.case_date}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCase(c.caseid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Case</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="status"
            placeholder="Status (e.g., Active, Recovered)"
            value={newCase.status}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            name="case_date"
            placeholder="Date"
            value={newCase.case_date}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddCase}>
          Add Case
        </button>
      </form>
    </div>
  );
}

export default Case;
