import React, { useEffect, useState } from 'react';

function Precaution() {
  const [precautions, setPrecautions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/precautions')
      .then((response) => response.json())
      .then((data) => setPrecautions(data))
      .catch((error) => console.error('Error fetching precautions:', error));
  }, []);

  return (
    <div>
      <h2>Precautions</h2>
      {precautions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Duration (Days)</th>
            </tr>
          </thead>
          <tbody>
            {precautions.map((precaution) => (
              <tr key={precaution.precautionid}>
                <td>{precaution.precautionid}</td>
                <td>{precaution.description}</td>
                <td>{precaution.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading precaution data...</p>
      )}
    </div>
  );
}

export default Precaution;
