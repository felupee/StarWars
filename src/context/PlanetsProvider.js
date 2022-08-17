import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await response.json();
    const planetas = json.results;
    planetas.forEach((item) => {
      delete item.residents;
    });
    // const filterResidents = json.results.filter((item, i) => item[i] !== 'residents');
    setPlanets(planetas);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, getPlanets } }>
      {children}
    </PlanetsContext.Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(Object).isRequired,
};

export default PlanetsProvider;
