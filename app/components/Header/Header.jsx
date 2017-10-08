import React from 'react'
import { NavLink } from 'react-router-dom'
import * as styles from './styles.css'

/**
 * Generate Check box options for filters
 *
 * @return {JSX} Rendered checkbox group
 */
export default function Header() {
  return (
    <div className={styles.header}>
      <ul className='right'>
        <li className={styles['nav-links']}>
          <NavLink to='/'>{'Browse'}</NavLink>
        </li>
        <li className={styles['nav-links']}>
          <NavLink to='/cart'>{'cart'}</NavLink>
        </li>
      </ul>
    </div>
  )
}
