import React from 'react';
import Proptype from 'prop-types';
import Context from './Context';

function RecipesProvider({ children }) {
  return (
    <Context.Provider value="">
      { children }
    </Context.Provider>
  );
}

RecipesProvider.propTypes = {
  children: Proptype.node.isRequired,
};

export default RecipesProvider;
