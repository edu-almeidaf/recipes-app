import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const idPassword = 'password-input';
const idEmail = 'email-input';
const mailFalso = 'mail@mail.com';
const idButton = 'login-submit-btn';

describe('Testa componente Login e seus campos', () => {
  it('Testa se é exibido na tela de Login os campos de email, senha e o botão de Enter', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(idEmail);
    const password = screen.getByTestId(idPassword);
    const button = screen.getByTestId(idButton);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe('Testa componente Login se o botão é habilitado', () => {
  it('Testa se o botão de Entrar só é habilitado quando é digitado um email válido e senha qualquer', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(idEmail);
    const password = screen.getByTestId(idPassword);
    const button = screen.getByTestId(idButton);

    expect(button).not.toBeEnabled();

    userEvent.type(email, mailFalso);
    userEvent.type(password, '12345678');
    expect(button).toBeEnabled();
  });
});

describe('Testa componente Login salvando dados na LocalStorage', () => {
  it('Testa se ao realizar o login, o email é salvo no LocalStorage', async () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(idEmail);
    const password = screen.getByTestId(idPassword);
    const button = screen.getByTestId(idButton);

    expect(button).not.toBeEnabled();

    userEvent.type(email, mailFalso);
    userEvent.type(password, '12345678');
    act(() => {
      userEvent.click(button);
    });

    expect(JSON.parse(localStorage.getItem('user'))).toStrictEqual({
      email: mailFalso,
    });
  });
});
