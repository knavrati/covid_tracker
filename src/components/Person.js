import React, { useEffect, useState } from 'react';

function Person() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/people')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching people:', error));
  }, []);

  return (
    <div>
      <h2>People</h2>
      {people.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Sex</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.personid}>
                <td>{person.personid}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.sex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading people data...</p>
      )}
    </div>
  );
}

export default Person;
