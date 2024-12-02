import React, { useEffect, useState } from 'react';

function Case() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cases')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  return (
    <div>
      <h2>Cases</h2>
      {cases.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => (
              <tr key={caseItem.caseid}>
                <td>{caseItem.caseid}</td>
                <td>{caseItem.status}</td>
                <td>{caseItem.casedate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading case data...</p>
      )}
    </div>
  );
}

export default Case;
