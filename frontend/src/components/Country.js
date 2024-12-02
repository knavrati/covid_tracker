import React, { useEffect, useState } from 'react';

function Country() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div>
      <h2>Countries</h2>
      {countries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Population</th>
              <th>Recovery Rate</th>
              <th>Vaccination Rate</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.countryid}>
                <td>{country.countryid}</td>
                <td>{country.name}</td>
                <td>{country.population}</td>
                <td>{country.recovery_rate}%</td>
                <td>{country.vaccination_rate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading country data...</p>
      )}
    </div>
  );
}

export default Country;
