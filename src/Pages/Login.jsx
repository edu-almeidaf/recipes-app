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
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('meals');
  };
  return (
    <form className="flex items-center justify-center w-full">
      <input
        className="input input-bordered input-info w-full max-w-xs mr-4"
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        className="input input-bordered input-info w-full max-w-xs"
        type="password"
        data-testid="password-input"
        value={ password }
        maxLength="15"
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        className="btn btn-primary m-2"
        data-testid="login-submit-btn"
        disabled={ enable }
        onClick={ handleClick }
      >
        Enter

      </button>
    </form>
  );
}
