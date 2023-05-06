import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../Context/Provider';

const renderWithRouter = (component, initialRoute = '/') => {
  const history = createMemoryHistory({ initialEntries: [initialRoute] });
  return {
    ...render(
      <Provider>
        <Router history={ history }>{component}</Router>
      </Provider>,
    ),
    history,
  };
};
export default renderWithRouter;
