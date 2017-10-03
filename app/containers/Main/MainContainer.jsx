import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActionCreators from '$REDUX/modules/user'
import { Loading } from '$COMPONENTS'

/**
 * Main Container, this will pass on all the Redux Store,
 * Router references to child elements.
 */
class MainContainer extends Component {
  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    const { props } = this
    const { isFetching, userInfo } = props

    return (
      isFetching
        ? <Loading pageName={'Home Page'} />
        : <div>
          {userInfo 
            && <div>
              <p>{`Name : ${userInfo.name}`}</p>
              <p>{`Email : ${userInfo.email}`}</p>
            </div>
          }
        </div>
    )
  }

  /**
    * React Lifecycle Method: Executes when redner execution is completed.
    */
  componentDidMount() {
    const { props } = this
    const TIMEOUT   = 1000
    const { isFetching, error, userLogin } = props

    userLogin()
  }
}

/**
 * Maps dispatch and action ceators to render method
 * @param  {function} dispatch  store's dispatch method
 * @return {object}             action creators in object
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}


/**
 * Avails State to render method
 * @param  {Object}  state  Full State.
 * @return {Object}         State fregment that is necessary to component.
 */
function mapStateToProps({ user }) {
  const { isFetching, error, userInfo } = user

  return {
    userInfo,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
