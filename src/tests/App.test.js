import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('fazendo testes do Star Wars', () => {
  test('testa se é renderizado a tabalea na tela com os planetas', async () => {
    render(<App />);
    const planet2 = await screen.findByText(/Alderaan/i);
    expect(planet2).toBeInTheDocument();
  });

  test('verificando se é possível pesquisar pelo nome do planeta', async () => {
    render(<App />);
    const nome = screen.getByTestId('name-filter');
    userEvent.type(nome, 'Tatooine');
    const planeta = await screen.findByText(/Tatooine/i);
    expect(planeta).toBeInTheDocument();
  });

  test('verificando se é possível pesquisar pelo filtro de population', async () => {
    render(<App />);
    const coluna = screen.getByTestId('column-filter');
    expect(screen.getAllByRole('option').length).toBe(8);
    userEvent.selectOptions(coluna, 'population');
    const optionPopulation = screen.getByRole('option', { name: 'population' }).selected;
    expect(optionPopulation).toBe(true);
    const comparacao = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparacao, 'menor que');
    const number = screen.getByTestId('value-filter');
    userEvent.type(number, '1000000');
    const btn = screen.getByRole('button', {  name: /filtrar/i});
    userEvent.click(btn);
    expect(screen.getAllByRole('option').length).toBe(7);
  });
}); 

