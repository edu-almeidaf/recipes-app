import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const recipeURL = '/drinks/178319/in-progress';
const recipeMealURL = '/meals/52771/in-progress';
const doneRecipesURL = '/done-recipes';

const recipeDone = {
  inProgressMeals: {
    52771: ['0', '1', '2', '3', '4', '5', '6', '7'],
  },
  inProgressDrinks: {
    178319: ['0', '1', '2'],
  },
};

const arrayDoneRecipes = [{
  alcoholicOrNot: '',
  category: 'Vegetarian',
  doneDate: '2023-05-12T16:03:18.417Z',
  id: '52771',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  name: 'Spicy Arrabiata Penne',
  nationality: 'Italian',
  tags: ['Pasta', 'Curry'],
  type: 'meal',
}];

const recipeInProgress = {
  inProgressDrinks: {
    178319: ['0'],
  },
};

jest.mock('clipboard-copy');

describe('Testes da página recipeInProgress na rota /drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });
  test('Verifica se os componentes são renderizados corretamente e se o botão está desabilidato', async () => {
    renderWithRouter(<App />, recipeURL);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /aquamarine/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /finish/i })).toBeDisabled();

    const firstIngredient = screen.getByTestId('0-ingredient-input');
    userEvent.click(firstIngredient);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toStrictEqual(recipeInProgress);
  });

  test('Verifica se ao entrar na página com as receitas feitas, o botão é habilitado', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeDone));
    const { history } = renderWithRouter(<App />, recipeURL);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /aquamarine/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    });
    console.log(localStorage.getItem('inProgressRecipes'));
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesURL);
  });

  test('Verifica se ao entrar na página com o localStorage setado, a receita atual é concatenada', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeDone));
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    const { history } = renderWithRouter(<App />, recipeURL);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /aquamarine/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    });

    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesURL);
  });

  test('Verifica se ao entrar na página com o localStorage setado na tela de meals, a receita atual é concatenada', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeDone));
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
    const { history } = renderWithRouter(<App />, recipeMealURL);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /finish/i })).toBeEnabled();
    });

    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(history.location.pathname).toBe(doneRecipesURL);
  });

  test('Verifica a funcionalidade do botão de favoritar na rota meals', async () => {
    copy.mockImplementation(() => true);
    renderWithRouter(<App />, recipeMealURL);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    });

    expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);

    expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
});
