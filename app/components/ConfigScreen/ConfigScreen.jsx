import React from 'react'
import * as styles from './styles.css'

const buttons = ['A', 'B', 'C', 'D']
const actions = ['Jump', 'Run', 'Shoot', 'Slide']

/**
 * [loopButtons description]
 * @param  {[type]} buttonsData       [description]
 * @param  {[type]} handleButtonClick [description]
 * @param  {[type]} selectedBtns      [description]
 * @return {[type]}                   [description]
 */
function loopButtons(buttonsData, handleButtonClick, selectedBtns) {
  return (
    buttonsData.map((elem) => (
      <div
        key={Math.random()}
        className={selectedBtns[elem] ? `${styles.key} ${styles[selectedBtns[elem]]}` : styles.key}
        id={elem}
        onClick={handleButtonClick}
        role={'button'}
        tabIndex={'0'}
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
 * @param  {[type]} selectedActions   [description]
 * @return {[type]}                   [description]
 */
function loopActions(actionsData, handleActionClick, selectedActions){
  return (
    actionsData.map((elem) => (
      <div
        className={selectedActions && selectedActions[elem] ? `${styles.key} ${styles[selectedActions[elem]]}` : styles.key}
        id={elem}
        onClick={handleActionClick}
        key={Math.random()}
        role={'button'}
        tabIndex={'-1'}
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
  updateUser,
  userToEdit,
  selectedBtns,
  selectedActions,
  showSubmitError
}) {
  const userId = Object.keys(userToEdit)[0] || null

  return (
    <div className={styles.container}>
      <h1>{'Please map keys for user'}</h1>
      <p className={styles.subtext}>{'click on a key and then select respective action'}</p>
      {Object.keys(userToEdit).length > 0
        ? <div>{`UserId : ${Object.keys(userToEdit)}`}</div> : null}
      <div>
        {loopButtons(buttons, handleButtonClick, selectedBtns)}
      </div>
      <div>
        {loopActions(actions, handleActionClick, selectedActions)}
      </div>
      <button className={styles.btn} onClick={() => updateUser(userId)} id={userId}>{'Add User'}</button>
      <p className={styles.error}>{showSubmitError ? 'please select all actions first!' : ''}</p>
    </div>
  )
}
