import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';

const recipeDrinksURL = '/drinks/178319';
const recipeMealsURL = '/meals/52771';
const firstingredient = '0-ingredient-name-and-measure';
const drinkRecipe = 'Hpnotiq 2 oz';
const mealRecipe = 'penne rigate 1 pound';
const favoriteTestid = 'favorite-btn';
const favoriteRecipeMeals = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
];

const favoriteRecipeDrinks = [
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
jest.mock('clipboard-copy');

describe('teste do RecipeDetails drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('Verifica se ao entrar na rota drinks, os componentes aparecem na tela ', async () => {
    renderWithRouter(<App />, recipeDrinksURL);
    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(drinkRecipe);
    });

    expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
  });

  it('testando se ao clicar no botão Start Recipe, a rota é alterada e o texto do botão é alterado para Continue Recipe', async () => {
    const { history } = renderWithRouter(<App />, recipeDrinksURL);

    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(drinkRecipe);
    });

    expect(screen.queryByRole('button', { name: /continue recipe/i })).not.toBeInTheDocument();
    const btnStart = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(btnStart);

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');

    history.push(recipeDrinksURL);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue recipe/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
    });
  });

  it('testando se ao entrar na página com a receita já em andamento, o botão entra como Continue Recipe', async () => {
    const inProgressRecipes = {
      drinks: {
        15997: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRouter(<App />, recipeDrinksURL);

    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(drinkRecipe);
    });

    const btnStart = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(btnStart);

    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
});

describe('teste do RecipeDatails meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
  });

  it('Verifica se ao entrar na rota meals, os componentes aparecem na tela ', async () => {
    renderWithRouter(<App />, recipeMealsURL);
    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(mealRecipe);
    });

    expect(screen.getByRole('button', { name: /start recipe/i })).toBeInTheDocument();
  });

  it('testando se ao clicar no botão Start Recipe, a rota é alterada e o texto do botão é alterado para Continue Recipe', async () => {
    const { history } = renderWithRouter(<App />, recipeMealsURL);

    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(mealRecipe);
    });

    expect(screen.queryByRole('button', { name: /continue recipe/i })).not.toBeInTheDocument();
    const btnStart = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(btnStart);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    history.push(recipeMealsURL);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue recipe/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
    });
  });

  it('testando se ao entrar na página com a receita já já em andamento, o botão entra como Continue Recipe', async () => {
    const inProgressRecipes = {
      meals: {
        52997: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    const { history } = renderWithRouter(<App />, recipeMealsURL);

    await waitFor(() => {
      expect(screen.getByTestId(firstingredient)).toHaveTextContent(mealRecipe);
    });

    const btnStart = screen.getByRole('button', { name: /start recipe/i });

    userEvent.click(btnStart);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('testando se ao entrar na página com a receita finalizada, o botão não aparece', async () => {
    const doneRecipes = [
      {
        id: 52771,
      },
    ];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderWithRouter(<App />, recipeMealsURL);

    expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
  });

  describe('teste dos componentes FavoriteButton e ShareButton', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    });

    it('testando a funcionalidade do botão share', async () => {
      copy.mockImplementation(() => true);
      renderWithRouter(<App />, recipeMealsURL);

      await waitFor(() => {
        expect(screen.getByTestId(firstingredient)).toHaveTextContent(mealRecipe);
      });
      expect(screen.queryByText('Link copied!')).not.toBeInTheDocument();

      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);

      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    });

    it('testando se a receita é favoritada e desfavoritada na rota meals', async () => {
      renderWithRouter(<App />, recipeMealsURL);

      await waitFor(() => {
        expect(screen.getByTestId(firstingredient)).toHaveTextContent(mealRecipe);
      });

      userEvent.click(screen.getByTestId(favoriteTestid));
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual(favoriteRecipeMeals);

      userEvent.click(screen.getByTestId(favoriteTestid));
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual([]);
    });

    it('testando se a receita é favoritada e desfavoritada na rota drinks', async () => {
      renderWithRouter(<App />, recipeDrinksURL);

      await waitFor(() => {
        expect(screen.getByTestId(firstingredient)).toHaveTextContent(drinkRecipe);
      });

      userEvent.click(screen.getByTestId(favoriteTestid));
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual(favoriteRecipeDrinks);

      userEvent.click(screen.getByTestId(favoriteTestid));
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual([]);
    });

    it('testando se a receita é favoritada entra favoritada na rota drinks', async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipeDrinks));
      renderWithRouter(<App />, recipeDrinksURL);

      await waitFor(() => {
        expect(screen.getByTestId(firstingredient)).toHaveTextContent(drinkRecipe);
      });

      await waitFor(() => {
        expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual(favoriteRecipeDrinks);
        const favoriteBtn = screen.getByAltText('favorite button');
        expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');
      });
    });
  });
});
