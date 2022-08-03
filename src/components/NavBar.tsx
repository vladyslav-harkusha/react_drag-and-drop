import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.scss';

export const NavBar: FC = () => {
  const navbarLinks = ['Sort_Cards', 'Task_Board', 'Drop_Files'];

  return (
    <div className='navbar'>
      <div className='navbar__logo'>Drug&Drop</div>

      <ul className='navbar__links'>
        {navbarLinks.map((link, index) => 
          <li className='navbar__item' key={index}>
            <NavLink
              to={`/react_drag-and-drop/${link}`}
              className={({ isActive }) => "navbar__link " + (isActive ? "is-active" : "")}
            >
              {link}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
};
