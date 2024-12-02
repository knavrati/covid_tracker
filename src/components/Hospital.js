import React, { useEffect, useState } from 'react';

function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/hospitals')
      .then((response) => response.json())
      .then((data) => setHospitals(data))
      .catch((error) => console.error('Error fetching hospitals:', error));
  }, []);

  return (
    <div>
      <h2>Hospitals</h2>
      {hospitals.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.hospitalid}>
                <td>{hospital.hospitalid}</td>
                <td>{hospital.name}</td>
                <td>{hospital.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading hospital data...</p>
      )}
    </div>
  );
}

export default Hospital;
