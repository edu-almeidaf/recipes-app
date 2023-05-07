import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { mealsLinkVerification, drinksLinkVerification } from './helpers/fetchRecipesVerification';

const cardName0 = '0-card-name';
const cardName11 = '11-card-name';
const cardName12 = '12-card-name';

describe('Testes do componente Recipes', () => {
  describe('Testa as funcionalidades do componente Recipes na rota /meals', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(mealsLinkVerification);
    });
    test('Ao renderizar o componente, os cards dos produtos aparecem na tela', async () => {
      renderWithRouter(<App />, '/meals');

      const cardNameEl1 = await screen.findByTestId(cardName0);
      expect(cardNameEl1).toHaveTextContent('Corba');

      const cardNameEl12 = await screen.findByTestId(cardName11);
      expect(cardNameEl12).toHaveTextContent('Kafteji');

      expect(screen.queryByTestId(cardName12)).not.toBeInTheDocument();
    });

    test('Ao clicar no primeiro botão, os componentes mudam, e ao clicar novamente, o filtro é resetado', async () => {
      renderWithRouter(<App />, '/meals');

      const beefBtn1 = await screen.findByRole('button', { name: 'Beef' });
      userEvent.click(beefBtn1);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('Beef and Mustard Pie');
      });

      const beefBtn2 = await screen.findByRole('button', { name: 'Beef' });
      userEvent.click(beefBtn2);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('Corba');
      });
    });

    test('Ao clicar na categoria Beef, os componentes mudam, e ao clicar no botão All, o filtro é resetado', async () => {
      renderWithRouter(<App />, '/meals');

      const beefBtn = await screen.findByRole('button', { name: 'Beef' });
      userEvent.click(beefBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('Beef and Mustard Pie');
      });

      const AllBtn = await screen.findByRole('button', { name: 'All' });
      userEvent.click(AllBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('Corba');
      });
    });

    test('Ao clicar no card da receita, ele redireciona para a página de detalhes', async () => {
      const { history } = renderWithRouter(<App />, '/meals');

      const cardEL = await screen.findByTestId(cardName0);
      userEvent.click(cardEL);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/meals/52977');
      });
    });
  });

  describe('Testa as funcionalidades do componente Recipes na rota /drinks', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(drinksLinkVerification);
    });
    test('Ao renderizar o componente, os cards dos produtos aparecem na tela', async () => {
      renderWithRouter(<App />, '/drinks');

      const cardNameEl1 = await screen.findByTestId(cardName0);
      expect(cardNameEl1).toHaveTextContent('GG');

      const cardNameEl12 = await screen.findByTestId(cardName11);
      expect(cardNameEl12).toHaveTextContent('B-52');

      expect(screen.queryByTestId(cardName12)).not.toBeInTheDocument();
    });

    test('Ao clicar no primeiro botão, os componentes mudam, e ao clicar novamente, o filtro é resetado', async () => {
      renderWithRouter(<App />, '/drinks');

      const ordinaryDrinkBtn1 = await screen.findByRole('button', { name: 'Cocktail' });
      userEvent.click(ordinaryDrinkBtn1);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('155 Belmont');
      });

      const ordinaryDrinkBtn2 = await screen.findByRole('button', { name: 'Cocktail' });
      userEvent.click(ordinaryDrinkBtn2);

      await waitFor(() => {
        expect(screen.getByTestId(cardName0)).toHaveTextContent('GG');
      });
    });
  });
});
