import React, { useState, useEffect } from 'react';

function Case() {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({
    status: '',
    case_date: '',
  });

  // Fetch cases from the backend
  useEffect(() => {
    fetch('http://localhost:5000/cases') // Backend endpoint for cases
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/cases/${id}`, {
      method: 'DELETE',
    })
      .then(() => setCases(cases.filter((c) => c.caseid !== id)))
      .catch((error) => console.error('Error deleting case:', error));
  };

  // Handle input changes for adding a new case
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase({ ...newCase, [name]: value });
  };

  // Handle adding a new case
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
        return response.json(); // Return the added case
      })
      .then((addedCase) => {
        setCases([...cases, addedCase]); // Update the state with the new case
        setNewCase({ status: '', case_date: '' }); // Reset the form
      })
      .catch((error) => console.error('Error adding case:', error));
  };

  // Function to format the casedate string
  function formatDate(dateString) {
    if (!dateString) return 'N/A'; // Handle empty or invalid dates
    const date = new Date(dateString); // Parse the string as a Date
    return date.toLocaleDateString(); // Format it for display (e.g., MM/DD/YYYY)
  }

  return (
    <div>
      <h2>Cases</h2>
      <table className="table">
        <thead>
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
              <td>{formatDate(c.casedate)}</td>
              <td>
                <button onClick={() => handleDelete(c.caseid)}>Delete</button>
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
            placeholder="Status"
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
