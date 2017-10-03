import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Test Nav Bar
 * 
 * @returns {DOM} Nav Fregement
 */
function Nav() {
  return (
    <ul>
      <li>
        <NavLink activeClassName='active' to='/'>
          {'link 1'}
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/link-2'>
          {'link 2'}
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/link-3'>
          {'link 3'}
        </NavLink>
      </li>
    </ul>
  )
}

export default Nav
