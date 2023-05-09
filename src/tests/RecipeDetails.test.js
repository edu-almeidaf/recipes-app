import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetailsDrinks from '../components/RecipeDetailsDrinks';
import RecipeDetailsMeals from '../components/RecipeDetailsMeals';

const recipeTitle = 'recipe-title';

describe('teste do RecipeDatails drinks', () => {
  it('testando as rota drink', async () => {
    const { history } = renderWithRouter(<RecipeDetailsDrinks />);
    history.push('/drinks');

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const img = screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();
    const catecory = screen.getByTestId('recipe-category');
    expect(catecory).toBeInTheDocument();

    await screen.findByTestId(recipeTitle);
    expect(screen.getByTestId(recipeTitle)).toBeInTheDocument();

    const ingredientsList = screen.getByRole('list');
    expect(ingredientsList).toBeInTheDocument();

    waitFor(() => {
      const ingredientsItems = screen.findByTestId('0-ingredient-name-and-measure');
      expect(ingredientsItems).toBeInTheDocument();
      expect(firstIngredient).toHaveTextContent('Ingredient 1');
      expect(firstIngredient).toHaveTextContent('1 measure 1');
    });

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('testando Start Recipe e Continue Recife', async () => {
    const { history } = renderWithRouter(<RecipeDetailsDrinks />);
    history.push('/drinks');

    waitFor(() => {
      const startRecipeBtn = screen.toHaveTextContent('Start Recipe');
      expect(startRecipeBtn).toBeInTheDocument();
      userEvent.click(startRecipeBtn);
    });
    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
  });
});

describe('teste do RecipeDatails drinks', () => {
  it('testando as rota meals', async () => {
    const { history } = renderWithRouter(<RecipeDetailsMeals />);
    history.push('/meals');

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const img = screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();
    const catecory = screen.getByTestId('recipe-category');
    expect(catecory).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const btnStart = screen.getByTestId('start-recipe-btn');
    expect(btnStart).toBeInTheDocument();

    await screen.findByTestId(recipeTitle);
    expect(screen.getByTestId(recipeTitle)).toBeInTheDocument();

    const ingredientsList = screen.getByRole('list');
    expect(ingredientsList).toBeInTheDocument();

    waitFor(() => {
      const ingredientsItems = screen.findByTestId('0-ingredient-name-and-measure');
      expect(ingredientsItems).toBeInTheDocument();
      expect(firstIngredient).toHaveTextContent('Ingredient 1');
      expect(firstIngredient).toHaveTextContent('1 measure 1');
    });
  });

  it('testando Start Recipe e Continue Recife', async () => {
    const { history } = renderWithRouter(<RecipeDetailsMeals />);
    history.push('/meals');

    waitFor(() => {
      const startRecipeBtn = screen.toHaveTextContent('Start Recipe');
      expect(startRecipeBtn).toBeInTheDocument();
      userEvent.click(startRecipeBtn);
    });
    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
  });
});
