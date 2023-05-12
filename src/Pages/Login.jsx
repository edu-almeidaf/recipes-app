import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnabled] = useState(true);

  const doneRecipes = [{
    id: '52971',
    type: 'meal',
    nationality: 'British',
    category: '',
    alcoholicOrNot: 'non-alcoholic',
    name: 'Three Fish Pie',
    image: 'https:www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
    doneDate: '11-05-2023',
    tags: ['Fish', 'Seafood', 'Dairy', 'Pie'],
  }, {
    id: '17256',
    type: 'drink',
    nationality: 'uzbek',
    category: '',
    alcoholicOrNot: 'alcoholic',
    name: 'Arak',
    image: 'https:www.themealdb.com/images/media/meals/spswqs1511558697.jpg',
    doneDate: '11-05-2023',
    tags: ['Anis', 'numSeiIngredientesDoArak', 'Pinga'],
  }];
  useEffect(() => {
    const validator = () => {
      const regularExpression = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minLimit = 7;
      setEnabled(!(regularExpression.test(email) && password.length >= minLimit));
    };
    validator();
  }, [email, password]);
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('meals');
  };
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ password }
        maxLength="15"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ enable }
        onClick={ handleClick }
      >
        Enter

      </button>
    </div>
  );
}
