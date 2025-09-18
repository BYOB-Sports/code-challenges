import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import tennisCourts from "./data";
import DetailView from "./DetailView";
import './App.css';

function App() {
  const [mockData, setMockData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCourtId, setSelectedCourtId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setMockData(tennisCourts);
  }, []);

  const filteredCourts = mockData.filter((court) => {
    const searchTerm = searchItem.toLowerCase();
    return (
      court.name.toLowerCase().includes(searchTerm) ||
      court.location.toLowerCase().includes(searchTerm)
    );
  });
  const handleCourtClick = (id) => {
    setSelectedCourtId(id);
  };
  const selectedCourt = mockData.find((c) => c.id === selectedCourtId);
  

  return (
    <div className="App">
      {!selectedCourt ? (
        <div>
          <h1>Tennis Courts</h1>
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Search by name or location"
          />
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="courtList"
              onClick={() => handleCourtClick(court.id)}

            >
              <h2>{court.name}</h2>
              <h3>{court.location}</h3>
              <p>{court.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <DetailView
          court={selectedCourt}
          goBack={() => setSelectedCourtId(null)}
        />
      )}
    </div>
  );
}

export default App;
