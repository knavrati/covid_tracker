import React, { useEffect, useState } from 'react';

function Vaccine() {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/vaccines')
      .then((response) => response.json())
      .then((data) => setVaccines(data))
      .catch((error) => console.error('Error fetching vaccines:', error));
  }, []);

  return (
    <div>
      <h2>Vaccines</h2>
      {vaccines.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Number of Uses</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine) => (
              <tr key={vaccine.vaccineid}>
                <td>{vaccine.vaccineid}</td>
                <td>{vaccine.name}</td>
                <td>{vaccine.manufacturer}</td>
                <td>{vaccine.number_of_uses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading vaccine data...</p>
      )}
    </div>
  );
}

export default Vaccine;
