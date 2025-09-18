import React, { useState, useEffect } from 'react';
import './TennisCourts.css';
import { GiTennisRacket } from 'react-icons/gi'; 
import { FaStar } from 'react-icons/fa'; 
import { FaMapMarkerAlt } from 'react-icons/fa'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
const PAGE_SIZE = 10;

function CourtsList({ courts, onSelectCourt }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
    setCurrentPage(1);
   }, [searchTerm]);


  const filteredCourts = courts.filter(
    court =>
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourts.length / PAGE_SIZE);
  const currentCourts = filteredCourts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div style={{ maxWidth: 375, margin: 'auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center' }}>Tennis Courts</h2>
      <input
        type="search"
        placeholder="Search courts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: 8,
          fontSize: 16,
          marginBottom: 12,
          borderRadius: 5,
          border: '1px solid #ccc'
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentCourts.map(court => (
          <li key={court.id} className="court-card" onClick={() => onSelectCourt(court.id)}>
  <h3><GiTennisRacket style={{  color: '#8B5E3C',  marginRight: 6 ,verticalAlign: 'middle', 
    fontWeight: '900',           
    filter: 'drop-shadow(1px 0 0 #6B4531)'}} />{court.name}</h3>
  <p><FaMapMarkerAlt style={{ color: '#4CAF50', marginRight: 6, verticalAlign: 'middle' }} />{court.location} 
        <span style={{
  backgroundColor:
    court.surface === 'Hard' ? '#6A8EAE' :
    court.surface === 'Grass' ? '#4CAF50' :
    court.surface === 'Carpet' ? '#D2691E': 
    '#A1887F',
  color: '#fff',
  borderRadius: '8px',
  padding: '2px 8px',
  marginLeft: 8,
  fontSize: 12,
  fontWeight: '600',
  userSelect: 'none'
}}>
  {court.surface}
</span>
</p>
  
  <p><FaStar  color="#FFC107" /> Rating: {court.rating}</p>
</li>
        ))}
      </ul>
        <div className="pagination-wrapper">
            <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                style={{ marginRight: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <AiOutlineLeft size={20} />
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                style={{ marginLeft: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <AiOutlineRight size={20} />
            </button>
        </div>
    </div>
  );
}

export default CourtsList;
