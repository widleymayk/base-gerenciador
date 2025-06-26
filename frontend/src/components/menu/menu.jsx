import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

function Menu() {
  return (
    <nav className="menu" aria-label="Menu Principal">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
        aria-current={({ isActive }) => isActive ? 'page' : undefined}
      >
        Tarefas
      </NavLink>
      <NavLink 
        to="/criar-tarefa" 
        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
        aria-current={({ isActive }) => isActive ? 'page' : undefined}
      >
        Criar tarefa
      </NavLink>
    </nav>
  );
}

export default Menu;
