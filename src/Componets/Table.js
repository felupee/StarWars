import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);
  const [filterByName, setName] = useState({
    name: '',
  });
  const handleChange = (event) => {
    const { value } = event.target;
    setName((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const filtro = planets.filter(
    (planeta) => planeta.name.includes(filterByName.name),
  );
  console.log(filtro);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        name="pesquisa"
        value={ filterByName.name }
        onChange={ handleChange }
      />
      <table border="10">
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
        {
          filtro.map((planeta) => (
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
        }
      </table>
    </div>
  );
}

export default Table;
