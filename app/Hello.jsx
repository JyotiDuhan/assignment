import React from 'react'

/**
 * Test hello world function
 *
 * @returns {DOM} Hello World Component
 */
function Hello({ path }) {
  return (
    <p>{'Hello guys'}{path && `, we are at ${path}`}</p>
  )
}

export default Hello
