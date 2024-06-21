import React from 'react';

//css
import Styles from './Login.module.css';

import { useState, useEffect } from 'react';

//hook
import { useAutenticacao } from '../../hooks/useAutenticacao';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAutenticacao();

  const handleSubmit = async (element) => {
    element.preventDefault();

    setError('');

    const user = {
      email: email,
      password: password,
    };

    const resposta = await login(user);

    
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={Styles.login}>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(email) => setEmail(email.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(senha) => setPassword(senha.target.value)}
          />
        </label>

        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Entrar
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
