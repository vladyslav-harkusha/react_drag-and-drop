import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/NavBar.scss';

export const NavBar: FC = () => {
  return (
    <div className='navbar'>
      <div className='navbar__logo'>Drug&Drop</div>

      <ul className='navbar__links'>
        <li className='navbar__link'>
          <NavLink 
            to="/react_drag-and-drop/sort_cards" 
            className={({ isActive }) => "navbar__link" + (isActive ? "--is-active" : "")}
          >
            Sort Cards
          </NavLink>
        </li>

        <li className='navbar__link'>
          <NavLink 
            to="/react_drag-and-drop/xx_page"
            className={({ isActive }) => "navbar__link" + (isActive ? "--is-active" : "")}
          >
            Sort Cards
          </NavLink>
        </li>

        <li className='navbar__link'>
          <Link to="/react_d">Sort Cards</Link>
        </li>
      </ul>
    </div>
  )
};
