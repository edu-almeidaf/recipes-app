import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const doneButton = 'profile-done-btn';
const favoriteButton = 'profile-favorite-btn';
const logoutButton = 'profile-logout-btn';
localStorage.setItem('user', JSON.stringify({ email: 'aaaa@gmail.com' }));

describe('Testa se clica nos botões e muda de rota', () => {
  it('Testa se vai pra rota das receitas feitas', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const button = screen.getByTestId(doneButton);
    userEvent.click(button);
    expect(history.location.pathname).toContain('/done-recipes');
  });
  it('Testa se vai pra rota das receitas favoritas', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const buttonFavorite = screen.getByTestId(favoriteButton);
    userEvent.click(buttonFavorite);
    expect(history.location.pathname).toContain('/favorite-recipes');
  });
  it('Testa se faz logout e limpa localStorage', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const buttonlogout = screen.getByTestId(logoutButton);
    userEvent.click(buttonlogout);
    expect(history.location.pathname).toContain('/');
    const storageData = JSON.parse(localStorage.getItem('user'));
    expect(storageData).toStrictEqual(null);
  });
});
