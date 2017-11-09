import React from 'react'
import * as styles from './styles.css'

/**
 * [loopActions description]
 * @param  {[type]} btnActionCombo [description]
 * @return {[type]}                [description]
 */
function loopBtnActions(btnActionCombo) {
  return (
    Object.keys(btnActionCombo).map((key, index) => (
      <div
        key={key}
        className={styles.key}
        id={key}
      >
        <kbd>{`${key}`}</kbd><br />
        <label htmlFor={key}>{`${btnActionCombo[key]}`}</label>
      </div>
    ))
  )
}

/**
 * [loopUsers description]
 * @param  {[type]} usersData [description]
 * @param  {function} editUserConfig [description]
 * @return {[type]}           [description]
 */
function loopUsers(usersData, editUserConfig) {
  return (
    Object.keys(usersData).map((key, index) => (
      <div key={key}>
        <p key={key}>{`${key}`}</p>
        {loopBtnActions(usersData[key])}
        <button className={styles.btn} onClick={() => editUserConfig(key)}>{'Edit User Config'}</button>
      </div>
    ))
  )
}

/**
 * Shared Component: Shows Loading Text.
 * @param   {Object}  options.pageName  Optional Param, pass the page name.
 *
 * @returns {DOM}                       DOM of loading content.
 */
export default function UsersScreen({ usersData, addUser, editUserConfig }) {
  return (
    <div className={styles['users-wrapper']}>
      {loopUsers(usersData, editUserConfig)}
      <button className={styles.btn} onClick={addUser}>{'Add User'}</button>
    </div>
  )
}
