import React from 'react';
import { NavLink } from 'react-router-dom';
//css
import Styles from './NavBar.module.css';
//hook
import { useAutenticacao } from '../hooks/useAutenticacao';
//context
import { useAuthValue } from '../context/authContext';

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAutenticacao();

  return (
    <nav className={Styles.navbar}>
      <NavLink to="/" className={Styles.brand}>
        Mini <span className={Styles.blog}>Blog</span>
      </NavLink>
      <ul className={Styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? Styles.active : ''}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => isActive ? Styles.active : ''}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => isActive ? Styles.active : ''}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => isActive ? Styles.active : ''}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? Styles.active : ''}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? Styles.active : ''}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
