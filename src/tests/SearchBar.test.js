import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { drinksLinkVerification, mealsLinkVerification } from './helpers/fetchRecipesVerification';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const ingredientSearchRadio = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const execSearchBtn = 'exec-search-btn';
const firstLetterSearchRadio = 'first-letter-search-radio';

const cardTestIds = {
  cardName0: '0-card-name',
  cardName1: '1-card-name',
  cardName11: '11-card-name',
  cardName12: '12-card-name',
};

describe('Testes do componente SearchBar', () => {
  describe('Testando todas as funcionalidades da SearchBar na rota /meals', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(mealsLinkVerification);
    });
    it('Verifica se ao pesquisar uma receita pelo ingrediente, são renderizadas 12 receitas na tela', async () => {
      renderWithRouter(<App />, '/meals');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(ingredientSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'garlic');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      const title1El = await screen.findByTestId(cardTestIds.cardName0);
      expect(title1El).toHaveTextContent('Baingan Bharta');

      const title12El = screen.getByTestId(cardTestIds.cardName11);
      expect(title12El).toHaveTextContent('Cevapi Sausages');

      expect(screen.queryByTestId(cardTestIds.cardName12)).not.toBeInTheDocument();
    });

    it('Verifica se ao pesquisar uma receita pelo nome, se o array tiver somente 1 elemento, ele redireciona para a página de detalhes da receita', async () => {
      const { history } = renderWithRouter(<App />, '/meals');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(nameSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'arrabiata');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/meals/52771');
      });
    });

    it('Verifica se ao pesquisar uma receita pela primeira letra, as receitas aparecem na tela', async () => {
      renderWithRouter(<App />, '/meals');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(firstLetterSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'a');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      const title1El = await screen.findByTestId(cardTestIds.cardName0);
      expect(title1El).toHaveTextContent('Apple Frangipan Tart');

      const title12El = screen.getByTestId(cardTestIds.cardName1);
      expect(title12El).toHaveTextContent('Apple & Blackberry Crumble');
    });
  });

  describe('Testando as chamadas dos alerts (válido para as duas páginas)', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(mealsLinkVerification);
    });

    it('Verifica se ao pesquisar uma receita e ela retornar um array vazio, é exibido um alert na tela', async () => {
      const spy = jest.spyOn(window, 'alert');
      renderWithRouter(<App />, '/meals');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(ingredientSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'xablau');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      });
    });

    it('Verifica se ao pesquisar uma receita pela primeira letra, mas com 2 letras no input, um alert é exibido na tela', async () => {
      const spy = jest.spyOn(window, 'alert');
      renderWithRouter(<App />, '/meals');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(firstLetterSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'as');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      expect(spy).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    });
  });

  describe('Testando todas as funcionalidades da SearchBar na rota /drinks', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(drinksLinkVerification);
    });
    it('Verifica se ao pesquisar uma receita pelo ingrediente, são renderizadas 12 receitas na tela', async () => {
      renderWithRouter(<App />, '/drinks');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(ingredientSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'gin');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      const title1El = await screen.findByTestId(cardTestIds.cardName0);
      expect(title1El).toHaveTextContent('3-Mile Long Island Iced Tea');

      const title12El = screen.getByTestId(cardTestIds.cardName11);
      expect(title12El).toHaveTextContent('Angel Face');

      expect(screen.queryByTestId(cardTestIds.cardName12)).not.toBeInTheDocument();
    });

    it('Verifica se ao pesquisar uma receita pelo nome, se o array tiver somente 1 elemento, ele redireciona para a página de detalhes da receita', async () => {
      const { history } = renderWithRouter(<App />, '/drinks');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(nameSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'moscow');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/drinks/11009');
      });
    });

    it('Verifica se ao pesquisar uma receita pela primeira letra, as receitas aparecem na tela', async () => {
      renderWithRouter(<App />, '/drinks');

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(firstLetterSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'a');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      const title1El = await screen.findByTestId(cardTestIds.cardName0);
      expect(title1El).toHaveTextContent('A1');

      const title12El = screen.getByTestId(cardTestIds.cardName1);
      expect(title12El).toHaveTextContent('ABC');
    });
  });
});
