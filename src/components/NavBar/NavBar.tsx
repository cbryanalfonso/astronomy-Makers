import React, { Component, useState } from "react";
import { menuItems } from "./MenuItems";
import './NavBar.css'



export function Navbar (){

  const [state, setState] = useState(false)

  const handleClick = () =>{
    setState(!state)
  }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Astronomy <i className="fab fa-brands fa-react"></i> </h1>
      <div className="menu-icon" onClick={handleClick} >
        <i className={state ? 'fas fa-times' : 'fas fa-bars'} ></i>
      </div>
      <ul className={state ? 'nav-menu active' : "nav-menu" } >
        {menuItems.map((item, index) => {
          return (
            <li>
              <a className={item.cName} href={item.url}>
                  {item.tittle}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

}