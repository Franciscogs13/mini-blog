import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={Styles.navbar}>
      <div className={Styles.navbar_container}>
        <NavLink to="/" className={Styles.brand}>
          Mini <span className={Styles.blog}>Blog</span>
        </NavLink>
        <div className={Styles.menu_icon} onClick={toggleMenu}>
          <div className={Styles.menu_line}></div>
          <div className={Styles.menu_line}></div>
          <div className={Styles.menu_line}></div>
        </div>
      </div>
      <ul className={`${Styles.links_list} ${menuOpen ? Styles.open : ''}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? Styles.active : ''}
            onClick={toggleMenu} // Fecha o menu ao clicar em um link
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
                onClick={toggleMenu} // Fecha o menu ao clicar em um link
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => isActive ? Styles.active : ''}
                onClick={toggleMenu} // Fecha o menu ao clicar em um link
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
                onClick={toggleMenu} // Fecha o menu ao clicar em um link
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? Styles.active : ''}
                onClick={toggleMenu} // Fecha o menu ao clicar em um link
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
            onClick={toggleMenu} // Fecha o menu ao clicar em um link
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
