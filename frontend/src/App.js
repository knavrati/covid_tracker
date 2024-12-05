import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import City from './components/City';
import Country from './components/Country';
import Vaccine from './components/Vaccine';
import Person from './components/Person';
import Hospital from './components/Hospital';
import Precaution from './components/Precaution';
import Case from './components/Case';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>COVID Tracker</h1>
        {/* Navigation Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <Link to="/cities"><button>Cities</button></Link>
          <Link to="/countries"><button>Countries</button></Link>
          <Link to="/vaccines"><button>Vaccines</button></Link>
          <Link to="/people"><button>People</button></Link>
          <Link to="/hospitals"><button>Hospitals</button></Link>
          <Link to="/precautions"><button>Precautions</button></Link>
          <Link to="/cases"><button>Cases</button></Link>
        </div>
        {/* Page Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to the COVID Tracker! Use the buttons above to navigate.</h2>
                <img
                  src="/download.jpg"
                  alt="COVID-19"
                  style={{
                    width: '40%', 
                    marginTop: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </div>
            }
          />
          <Route path="/cities" element={<City />} />
          <Route path="/countries" element={<Country />} />
          <Route path="/vaccines" element={<Vaccine />} />
          <Route path="/people" element={<Person />} />
          <Route path="/hospitals" element={<Hospital />} />
          <Route path="/precautions" element={<Precaution />} />
          <Route path="/cases" element={<Case />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
