import React from 'react'

/**
 * Shared Component: Shows Loading Text. 
 * @param   {Object}  options.pageName  Optional Param, pass the page name.
 *
 * @returns {DOM}                       DOM of loading content. 
 */
export default function Loading({ pageName }) {
  return (
    <div>{`Loading ${pageName}...`}</div>
  )
}
