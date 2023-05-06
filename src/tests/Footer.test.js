import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './RenderWithRouter/renderWithRouter';
import Footer from '../components/Footer';

describe('teste do Footer', () => {
  it('testando as rota drink', () => {
    const { history } = renderWithRouter(<Footer />, { initialEntries: ['meals'] });

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();

    act(() => {
      userEvent.click(drinksButton);
    });

    expect(history.location.pathname).toBe('/drinks');
  });

  it('testando as rota meals', () => {
    const { history } = renderWithRouter(<Footer />, { initialEntries: ['/drinks'] });

    const foodButton = screen.getByTestId('meals-bottom-btn');
    expect(foodButton).toBeInTheDocument();

    act(() => {
      userEvent.click(foodButton);
    });

    expect(history.location.pathname).toBe('/meals');
  });
});
