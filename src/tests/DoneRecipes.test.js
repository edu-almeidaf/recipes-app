import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const doneRecipesURL = '/done-recipes';

const arrayDoneRecipes = [
  {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    doneDate: '2023-05-12T16:03:18.417Z',
    id: '52771',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    name: 'Spicy Arrabiata Penne',
    nationality: 'Italian',
    tags: ['Pasta', 'Curry'],
    type: 'meal',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: '2023-05-12T16:03:18.427Z',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    tags: ['Soup'],
    type: 'meal',
  },
  {
    alcoholicOrNot: 'Optional Alcohol',
    category: 'Ordinary Drink',
    doneDate: '2023-05-12T16:03:18.437Z',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    tags: [],
    type: 'drink',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Punch / Party Drink',
    doneDate: '2023-05-12T16:03:18.447Z',
    id: '17141',
    image: 'https://www.thecocktaildb.com/images/media/drink/rx8k8e1504365812.jpg',
    name: 'Smut',
    nationality: '',
    tags: [],
    type: 'drink',
  },
];

const imagemDaReceita = 'imagem da receita';

jest.mock('clipboard-copy');

describe('', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  test('Testa se todas as receitas aparecem na tela', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    renderWithRouter(<App />, doneRecipesURL);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(4);

    const AllFilterBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(AllFilterBtn);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(4);
  });

  test('Testa o filtro de Meals', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    renderWithRouter(<App />, doneRecipesURL);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(4);
    const AllFilterBtn = screen.getByRole('button', { name: /meals/i });
    userEvent.click(AllFilterBtn);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
  });

  test('Testa o filtro de Drinks', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    renderWithRouter(<App />, doneRecipesURL);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(4);
    const AllFilterBtn = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(AllFilterBtn);
    expect(screen.getAllByAltText(imagemDaReceita)).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /gg/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /smut/i })).toBeInTheDocument();
  });

  test('Verifica a funcionalidade do botão de favoritar na rota DoneRecipes', async () => {
    copy.mockImplementation(() => true);
    renderWithRouter(<App />, doneRecipesURL);

    expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();

    const shareBtn = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareBtn);

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  test('Verifica se ao clicar no link da receita, ele é redirecionado para a rota correspondente', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    const { history } = renderWithRouter(<App />, doneRecipesURL);
    expect(history.location.pathname).toBe('/done-recipes');

    const linkEl = screen.getByRole('heading', { name: /gg/i });
    userEvent.click(linkEl);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
});
