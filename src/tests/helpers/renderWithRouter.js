import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../Context/Provider';
import SearchBarProvider from '../../Context/SearchBarProvider';
import RecipeProvider from '../../Context/RecipeProvider';

const renderWithRouter = (component, initialRoute = '/') => {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });
  return {
    ...render(
      <Provider>
        <SearchBarProvider>
          <RecipeProvider>
            <Router history={ history }>{component}</Router>
          </RecipeProvider>
        </SearchBarProvider>
      </Provider>,
    ),
    history,
  };
};
export default renderWithRouter;
