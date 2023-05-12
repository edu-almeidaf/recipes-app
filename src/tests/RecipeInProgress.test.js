import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const recipeURL = '/drinks/178319/in-progress';

const recipeDone = {
  inProgressDrinks: {
    178319: ['0', '1', '2'],
  },
};

const recipeInProgress = {
  inProgressDrinks: {
    178319: ['0'],
  },
};

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
    userEvent.click(screen.getByRole('button', { name: /finish/i }));
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
