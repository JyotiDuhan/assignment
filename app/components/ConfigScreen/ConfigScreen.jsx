import React from 'react'
import * as styles from './styles.css'

const buttons = ['A', 'B', 'C', 'D']
const actions = ['Jump', 'Run', 'Shoot', 'Slide']
const colors = ['red', 'green', 'yellow', 'orange']

/**
 * [loopButtons description]
 * @param  {[type]} buttonsData       [description]
 * @param  {[type]} handleButtonClick [description]
 * @return {[type]}                   [description]
 */
function loopButtons(buttonsData, handleButtonClick) {
  return (
    buttonsData.map((elem) => (
      <div
        key={Math.random()}
        className={styles.key}
        id={elem}
        onClick={handleButtonClick}
      >
        <kbd>{`${elem}`}</kbd><br />
      </div>
    ))
  )
}

/**
 * [loopActions description]
 * @param  {[type]} actionsData       [description]
 * @param  {[type]} handleActionClick [description]
 * @return {[type]}                   [description]
 */
function loopActions(actionsData, handleActionClick){
  return (
    actionsData.map((elem) => (
      <div
        className={styles.key}
        id={elem}
        onClick={handleActionClick}
        key={Math.random()}
      >
        <kbd>{`${elem}`}</kbd>
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
export default function ConfigScreen({
  handleButtonClick,
  handleActionClick,
  buttonsInfo,
  updateUser,
  userToEdit
}) {
  const userButtons = Object.keys(userToEdit).length > 0 ?
    Object.keys(Object.values(userToEdit)[0]) : buttons
  const userActions = Object.keys(userToEdit).length > 0 ?
    Object.values(Object.values(userToEdit)[0]) : actions
  const userId = Object.keys(userToEdit)[0] || null

  return (
    <div className={styles.container}>
      {Object.keys(userToEdit).length > 0
        ? <div>{`UserId : ${Object.keys(userToEdit)}`}</div> : null}
      <div>
        {loopButtons(buttons, handleButtonClick)}
      </div>
      <div>
        {loopActions(actions, handleActionClick)}
      </div>
      <button className={styles.btn} onClick={() => updateUser(userId)} id={userId}>{'Add User'}</button>
    </div>
  )
}
