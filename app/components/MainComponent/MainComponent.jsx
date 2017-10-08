import React from 'react'
import * as styles from './styles.css'

/**
 * Main app Component: Handles application DOM.
 * @param {Object} props passed children components
 * @returns {DOM}                       DOM of application content.
 */
export default function MainComponent({ children }) {
  return (
    <div className={''}>
      {children}
    </div>
  )
}
