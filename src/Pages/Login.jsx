import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnabled] = useState(true);
  useEffect(() => {
    const validator = () => {
      const regularExpression = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minLimit = 7;
      setEnabled(!(regularExpression.test(email) && password.length >= minLimit));
    };
    validator();
  }, [email, password]);
  console.log(email);
  console.log(password);
  console.log(enable);
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('Meals');
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
