import PropTypes from 'prop-types';
import { createContext, useMemo, useState } from 'react';

export const recipeContext = createContext();

export default function RecipeProvider({ children }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const values = useMemo(() => ([
    recipe, setRecipe, ingredients, setIngredients,
  ]), [recipe, setRecipe, ingredients, setIngredients]);

  return (
    <recipeContext.Provider value={ values }>
      { children }
    </recipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
