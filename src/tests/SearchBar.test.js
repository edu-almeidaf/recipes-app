import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import { firstLetterVerification } from './mocks/firstLetterMock';

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const ingredientSearchRadio = 'ingredient-search-radio';
const nameSearchRadio = 'name-search-radio';
const execSearchBtn = 'exec-search-btn';
const firstLetterSearchRadio = 'first-letter-search-radio';

const cardTestIds = {
  cardName0: '0-card-name',
  cardName1: '1-card-name',
  cardName9: '9-card-name',
  cardName12: '12-card-name',
};

describe('Testes do componente SearchBar', () => {
  describe('Testando todas as funcionalidades da SearchBar na rota /meals', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    });
    it('Verifica se ao pesquisar uma receita pelo ingrediente, são renderizadas as receitas na tela', async () => {
      renderWithRouter(<App />, '/meals');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Corba');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(ingredientSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'Chicken');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Brown Stew Chicken');
        expect(screen.getByTestId(cardTestIds.cardName9)).toHaveTextContent('Thai Green Curry');
      });
    });

    it('Verifica se ao pesquisar uma receita pelo nome, se o array tiver somente 1 elemento, ele redireciona para a página de detalhes da receita', async () => {
      const { history } = renderWithRouter(<App />, '/meals');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Corba');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(nameSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'Arrabiata');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/meals/52771');
      });
    });
  });

  describe('Testando as chamadas dos alerts (válido para as duas páginas)', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    });

    it('Verifica se ao pesquisar uma receita e ela retornar um array vazio, é exibido um alert na tela', async () => {
      const spy = jest.spyOn(window, 'alert');
      renderWithRouter(<App />, '/meals');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Corba');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(nameSearchRadio);
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

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Corba');
      });

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
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
    });
    it('Verifica se ao pesquisar uma receita pelo ingrediente, são renderizadas 12 receitas na tela', async () => {
      renderWithRouter(<App />, '/drinks');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('GG');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(ingredientSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'Light rum');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('151 Florida Bushwacker');
        expect(screen.getByTestId(cardTestIds.cardName9)).toHaveTextContent('Between The Sheets');
      });
    });

    it('Verifica se ao pesquisar uma receita pelo nome, se o array tiver somente 1 elemento, ele redireciona para a página de detalhes da receita', async () => {
      const { history } = renderWithRouter(<App />, '/drinks');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('GG');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(nameSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'Aquamarine');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(history.location.pathname).toBe('/drinks/178319');
      });
    });
  });

  describe('Testando todas as funcionalidades da SearchBar na rota /drinks', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation(firstLetterVerification);
    });

    it('Verifica se ao pesquisar uma receita pela primeira letra, as receitas aparecem na tela', async () => {
      renderWithRouter(<App />, '/drinks');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('GG');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(firstLetterSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'a');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('A1');
        expect(screen.getByTestId(cardTestIds.cardName1)).toHaveTextContent('ABC');
      });
    });

    it('Verifica se ao pesquisar uma receita pela primeira letra, as receitas aparecem na tela', async () => {
      renderWithRouter(<App />, '/meals');

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Corba');
      });

      const searchButton = screen.getByTestId(searchTopBtn);
      userEvent.click(searchButton);

      const inputSearchEl = screen.getByTestId(searchInput);
      const radioOption = screen.getByTestId(firstLetterSearchRadio);
      const searchBtn = screen.getByTestId(execSearchBtn);

      userEvent.type(inputSearchEl, 'a');
      fireEvent.click(radioOption);
      userEvent.click(searchBtn);

      await waitFor(() => {
        expect(screen.getByTestId(cardTestIds.cardName0)).toHaveTextContent('Apple Frangipan Tart');
        expect(screen.getByTestId(cardTestIds.cardName1)).toHaveTextContent('Apple & Blackberry Crumble');
      });
    });
  });
});
