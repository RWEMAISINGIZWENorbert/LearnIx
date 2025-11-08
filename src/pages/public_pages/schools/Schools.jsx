import React from 'react';
import './Schools.css';
import { Navbar } from '../../../components/public_components/navbar/navbar';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Schools = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('all');

  const schools = [
    {
      id: 1,
      name: 'Green Hills Academy',
      image: `${import.meta.env.BASE_URL}assets/greenhills.png`,
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'info@greenhills.ac.rw',
      students: '1,500+',
      description: 'Leading international school offering Cambridge and IB curriculum with state-of-the-art facilities.'
    },
    {
      id: 2,
      name: 'Lycée de Kigali',
      image: `${import.meta.env.BASE_URL}assets/LearnIx.png`,
      location: 'Nyarugenge, Kigali',
      phone: '+250 788 234 567',
      email: 'info@lyceekigali.rw',
      students: '2,000+',
      description: 'Prestigious public school known for academic excellence and strong STEM programs.'
    },
    {
      id: 3,
      name: 'Riviera High School',
      image: `${import.meta.env.BASE_URL}assets/LearnIx.png`,
      location: 'Kicukiro, Kigali',
      phone: '+250 788 345 678',
      email: 'contact@rivierahs.rw',
      students: '1,200+',
      description: 'Modern educational institution focusing on technology integration and holistic student development.'
    },
    {
      id: 1,
      name: 'Green Hills Academy',
      image: `${import.meta.env.BASE_URL}assets/greenhills.png`,
      location: 'Kigali, Rwanda',
      phone: '+250 788 123 456',
      email: 'info@greenhills.ac.rw',
      students: '1,500+',
      description: 'Leading international school offering Cambridge and IB curriculum with state-of-the-art facilities.'
    },
    {
      id: 2,
      name: 'Lycée de Kigali',
      image: `${import.meta.env.BASE_URL}assets/LearnIx.png`,
      location: 'Nyarugenge, Kigali',
      phone: '+250 788 234 567',
      email: 'info@lyceekigali.rw',
      students: '2,000+',
      description: 'Prestigious public school known for academic excellence and strong STEM programs.'
    },
    {
      id: 3,
      name: 'Ecole Secondaire Technique de Gisenyi',
      image: `${import.meta.env.BASE_URL}assets/LearnIx.png`,
      location: 'Rubavu, Gisenyi',
      phone: '+250 788 345 678',
      email: 'contact@estg.rw',
      students: '500+',
      description: 'Modern educational institution focusing on technology integration and holistic student development.'
    }
  ];

  const locations = ['all', ...new Set(schools.map(school => school.location))];
  
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          school.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || school.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <>
    <Navbar />
    <div className='schools-page'>
      <div className="gradient"></div>
      <div className="container">
        <div className="header">
          <h1>Partner Schools</h1>
          <p>Explore our network of educational institutions using LearnIx platform</p>
        </div>

        <div className="search-filter-section">
          <div className="search-box">
            <FaMapMarkerAlt className="icon" />
            <input 
              type="text" 
              placeholder="Search schools by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {locations.map(location => (
              <button
                key={location}
                className={selectedLocation === location ? 'active' : ''}
                onClick={() => setSelectedLocation(location)}
              >
                {location === 'all' ? 'All Locations' : location}
              </button>
            ))}
          </div>
        </div>

        <div className="schools-grid">
          {filteredSchools.length > 0 ? filteredSchools.map((school) => (
            <div className="school-card" key={school.id}>
              <div className="school-image">
                <img src={school.image} alt={school.name} />
              </div>
              <div className="school-content">
                <h2>{school.name}</h2>
                <p className="description">{school.description}</p>
                <div className="school-info">
                  <div className="info-item">
                    <FaMapMarkerAlt className="icon" />
                    <span>{school.location}</span>
                  </div>
                  <div className="info-item">
                    <FaPhone className="icon" />
                    <span>{school.phone}</span>
                  </div>
                  <div className="info-item">
                    <FaEnvelope className="icon" />
                    <span>{school.email}</span>
                  </div>
                  <div className="info-item">
                    <FaGraduationCap className="icon" />
                    <span>{school.students} Students</span>
                  </div>
                </div>
                <button 
                  className="visit-btn" 
                  onClick={() => navigate('/student-application', { state: { school } })}
                >
                  Apply Now
                </button>
              </div>
            </div>
          )) : (
            <div className="no-results">
              <p>No schools found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
};
