import React from 'react'

import { useState, useEffect } from 'react'


//css
import Styles from "./Registro.module.css"
//hook
import { useAutenticacao } from '../../hooks/useAutenticacao'

const Registro = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAutenticacao();

  const handleSubmit = async (element) =>{
    element.preventDefault()

    setError("")

    const user = {
      displayName: displayName,
      email: email,
      password: password
    };

    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais.");
      return
    };

    const resposta = await createUser(user);

    console.log(resposta)
  }

  useEffect(()=>{

    if(authError){
      setError(authError);
    }

  },[authError]);

  return (
    <div className={Styles.registro}>
      <h1>Crie sua conta</h1>
      <p>Crie sua conta e compartilhe suas histórias.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" 
          name='displayName' 
          required 
          placeholder='Nome do usuário'
          value={displayName}
          onChange={(nome) => setDisplayName(nome.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email" 
          name="email" 
          required 
          placeholder='E-mail do usuário'
          value={email}
          onChange={(email) => setEmail(email.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" 
          name="password" 
          required 
          placeholder='Insira sua senha' 
          value={password}
          onChange={(senha) => setPassword(senha.target.value)}
          />
        </label>
        <label>
          <span>Confirmar senha:</span>
          <input type="password" 
          name="password" 
          required 
          placeholder='Confirme sua senha' 
          value={confirmPassword}
          onChange={(confirmSenha) => setConfirmPassword(confirmSenha.target.value)}
          />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Cadastrar</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Registro