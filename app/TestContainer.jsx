import React, { Component } from 'react'

import Hello from '$APP/Hello'

/**
 * Stateful Component example
 *
 * @type {React}
 */
class TestContainer extends Component {
  /**
   * Construct function of Test container.
   * @param  {Object} props Test props passed to this guy
   */
  constructor(props) {
    super(props)

    this.state = {
      key : 'Testing'
    }
  }

  /**
   * React Life cycle method
   *
   * @returns {DOM} Dummy DOM for hello world
   */
  render() {
    const { match } = this.props
    const { key } = this.state

    return (
      <div>
        <h1>{`Stateful component with state value ${key}`}</h1>
        <h2>
          <Hello path={match.path} />
        </h2>
      </div>
    )
  }
}

export default TestContainer
