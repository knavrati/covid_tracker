import React, { useState, useEffect } from 'react';

function Person() {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    age: '',
    sex: '',
  });

  // Fetch all people
  useEffect(() => {
    fetch('http://localhost:5000/people')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching people:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  // Add a new person
  const handleAddPerson = () => {
    if (!newPerson.name || !newPerson.age || !newPerson.sex) {
      alert('Please fill in all fields.');
      return;
    }

    fetch('http://localhost:5000/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPerson),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add person');
        }
        return response.json();
      })
      .then((addedPerson) => {
        setPeople([...people, addedPerson]);
        setNewPerson({ name: '', age: '', sex: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding person:', error));
  };

  // Delete a person
  const handleDeletePerson = (id) => {
    fetch(`http://localhost:5000/people/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete person with ID ${id}`);
        }
        setPeople(people.filter((person) => person.personid !== id)); // Update state
      })
      .catch((error) => console.error('Error deleting person:', error));
  };

  return (
    <div>
      <h2>People</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.personid}>
              <td>{person.personid}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.sex}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeletePerson(person.personid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Person</h3>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={newPerson.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="age"
            placeholder="Age"
            value={newPerson.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            name="sex"
            value={newPerson.sex}
            onChange={handleInputChange}
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddPerson}>
          Add Person
        </button>
      </form>
    </div>
  );
}

export default Person;
