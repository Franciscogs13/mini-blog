import { dataBase, app } from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAutenticacao = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanUp
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  //vem do firebase e da pa pegar as autenticações quando for preciso
  const auth = getAuth(app);

  //isso aqui será o cleanup para evitar vazamento de memória
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //É uma função assíncrona porque é oq está indo para o banco de dados
  const createUser = async (dados) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        dados.email,
        dados.password,
      );
      //fazer a atualização para colocar o nome
      await updateProfile(user, {
        displayName: dados.displayName,
      });
      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha deve conter pelos menos 6 caracteres.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login - sign in
  const login = async (dados) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, dados.email, dados.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage

      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Algo deu errado ao tentar fazer o login, por favor verifique seu e-mail e senha ou tente mais tarde.";
      }
      
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //executa o cancelled como true assim que sair dessa página para evitar o memory leak
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
