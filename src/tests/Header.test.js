import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa se o componente Header:', () => {
  it('renderiza corretamente;', () => {
    const PROPS = {
      title: 'title',
      showSearchIcon: true,
    };

    render(<Header title={ PROPS.title } showSearchIcon />);

    const buttons = screen.getAllByRole('button');
    const title = screen.getByRole('heading', { name: /title/i });
    expect(buttons).toHaveLength(2);
    expect(title).toBeInTheDocument();
  });

  it('redireciona para a página de perfil ao clicar no botão correspondente;', () => {
    const PROPS = {
      title: 'title',
      showSearchIcon: true,
    };

    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <Header title={ PROPS.title } showSearchIcon />
      </Router>,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(history.location.pathname).toBe('/profile');
  });

  it('mostra e esconde o search input ao clicar no botão correspondente.', () => {
    renderWithRouter(<App />, '/meals');

    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeVisible();

    fireEvent.click(searchButton);
    expect(searchInput).not.toBeVisible();
  });
});
