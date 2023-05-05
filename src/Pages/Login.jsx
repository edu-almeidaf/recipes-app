import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnabled] = useState(true);
  console.log(email);
  console.log(password);
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
      <button data-testid="login-submit-btn" disabled={ enable }>Enter</button>
    </div>
  );
}
