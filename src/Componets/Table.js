import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './Table.css';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const [filterByName, setName] = useState({
    name: '',
  });
  const [filterByNumericValues, setNumericValues] = useState([
    {
      column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  ]);
  const [colunas, setColunas] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [aplyFilter, setAplyFilter] = useState(planets);
  const [view, setView] = useState(true);

  useEffect(() => {
    setAplyFilter(planets);
  }, [planets]);

  const handleChange = (event) => {
    const { value } = event.target;
    setName((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleSelect = (event) => {
    const { value, name } = event.target;
    if (name === 'coluna') {
      setNumericValues(() => ([{

        column: value,
        comparison: filterByNumericValues[0].comparison,
        value: filterByNumericValues[0].value,
      }]));
    }
    if (name === 'condition') {
      setNumericValues(() => ([{
        column: filterByNumericValues[0].column,
        comparison: value,
        value: filterByNumericValues[0].value,
      }]));
    }
    if (name === 'valor') {
      setNumericValues(() => ([{
        column: filterByNumericValues[0].column,
        comparison: filterByNumericValues[0].comparison,
        value,
      }]));
    }
  };

  const filterName = planets.filter(
    (planeta) => planeta.name.includes(filterByName.name),
  );
  const filterInput = () => {
    setView(false);
    const column = colunas.filter((coluna) => coluna !== filterByNumericValues[0].column);
    setColunas(column);
    if (filterByNumericValues[0].comparison === 'maior que') {
      const filterNumeric = aplyFilter.filter(
        (planeta) => Number(planeta[filterByNumericValues[0].column])
        > Number(filterByNumericValues[0].value),
      );
      console.log('entrei no maior');
      setAplyFilter(filterNumeric);
    }
    if (filterByNumericValues[0].comparison === 'menor que') {
      const filterNumeric = aplyFilter.filter(
        (planeta) => Number(planeta[filterByNumericValues[0].column])
        < Number(filterByNumericValues[0].value),
      );
      console.log('entrei no menor');
      setAplyFilter(filterNumeric);
    }
    if (filterByNumericValues[0].comparison === 'igual a') {
      const filterNumeric = aplyFilter.filter(
        (planeta) => planeta[filterByNumericValues[0].column]
        === filterByNumericValues[0].value,
      );
      console.log('entrei no igual');
      setAplyFilter(filterNumeric);
    }
    setNumericValues(() => ([{

      column: colunas[0],
      comparison: filterByNumericValues[0].comparison,
      value: filterByNumericValues[0].value,
    }]));
  };
  const condition = ['maior que', 'menor que', 'igual a'];

  return (
    <div className="container">
      <div className="input-container">
        <input
          data-testid="name-filter"
          type="text"
          name="pesquisa"
          value={ filterByName.name }
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          name="coluna"
          value={ filterByNumericValues[0].column }
          onChange={ handleSelect }
        >
          {
            colunas.map((valor, key) => (
              <option key={ key }>{ valor }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="condition"
          value={ filterByNumericValues[0].comparison }
          onChange={ handleSelect }
        >
          {
            condition.map((valor, key) => (
              <option key={ key }>{ valor }</option>
            ))
          }
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="valor"
          value={ filterByNumericValues[0].value }
          onChange={ handleSelect }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterInput }
        >
          Filtrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        { view
          ? filterName.map((planeta) => (
            <tbody key={ planeta.name }>
              <tr>
                <td>{planeta.name}</td>
                <td>{planeta.rotation_period}</td>
                <td>{planeta.orbital_period}</td>
                <td>{planeta.diameter}</td>
                <td>{planeta.climate}</td>
                <td>{planeta.gravity}</td>
                <td>{planeta.terrain}</td>
                <td>{planeta.surface_water}</td>
                <td>{planeta.population}</td>
                <td>{planeta.films}</td>
                <td>{planeta.created}</td>
                <td>{planeta.edited}</td>
                <td>{planeta.url}</td>
              </tr>
            </tbody>
          ))
          : aplyFilter.map((planet) => (
            <tbody key={ planet.name }>
              <tr>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default Table;
