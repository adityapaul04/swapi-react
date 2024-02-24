import React, { useState, useEffect } from 'react';
import { fetchPlanets, fetchResidents } from '../services/swapiService';
import './PlanetsPage.css';
import Modal from '../components/Modal';

const PlanetsPage = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [residentData, setResidentData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResidents, setNoResidents] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  const fetchData = async (url) => {
    try {
      const { planets, nextPage, prevPage } = await fetchPlanets(url);
      setPlanets(planets);
      setNextPage(nextPage);
      setPrevPage(prevPage);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handlePlanetClick = async (planet) => {
    setSelectedPlanet(planet);
    const residentsData = await fetchResidents(planet.residents);
    setResidentData(residentsData);
    setIsModalOpen(true);
    setNoResidents(residentsData.length === 0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchData(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchData(prevPage);
    }
  };

  return (
    <div className='container'>
      <div className="planets-container">
        <div className="planet-cards">
          {planets.map((planet) => (
            <div key={planet.name} className="planet-card" onClick={() => handlePlanetClick(planet)}>
              <h2 className="planet-name">{planet.name}</h2>
              <div className="planet-info">
                <p><strong>Climate:</strong> {planet.climate}</p>
                <p><strong>Population:</strong> {planet.population}</p>
                <p><strong>Terrain:</strong> {planet.terrain}</p>
                <p><strong>Diameter:</strong> {planet.diameter}</p>
                <p><strong>Gravity:</strong> {planet.gravity}</p>
                <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
                <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
                <p><strong>Surface Water:</strong> {planet.surface_water}</p>
                {planet.films && planet.films.length > 0 && (
                  <p><strong>Featured Films:</strong> {planet.films.length}</p>
                )}
                {planet.species && planet.species.length > 0 && (
                  <div>
                    <strong>Featured Species:</strong>
                    <ul>
                      {planet.species.map((species, index) => (
                        <li key={index}>
                          <a href={species}>{species}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} closeModal={closeModal} residents={residentData} noResidents={noResidents} />
      </div>
      <div className="button-container">
          <button className="page-button prev-page-button" onClick={handlePrevPage} disabled={!prevPage}>Previous</button>
          <button className="page-button next-page-button" onClick={handleNextPage} disabled={!nextPage}>Next</button>
        </div>
    </div>
  );
};

export default PlanetsPage;
