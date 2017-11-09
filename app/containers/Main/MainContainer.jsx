import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActionCreators from '$REDUX/modules/users'
import { Loading, ConfigScreen, UsersScreen } from '$COMPONENTS'

/**
 * Main Container, this will pass on all the Redux Store,
 * Router references to child elements.
 */
class MainContainer extends Component {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props){
    super(props)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleActionClick = this.handleActionClick.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.addNewUser = this.addNewUser.bind(this)
    this.editUserConfig = this.editUserConfig.bind(this)

    this.state = {
      btnList       : '',
      btnActionList : {},
      userId        : 1,
      userToEdit    : {}
    }
  }

  /**
   * [editUserConfig description]
   * @param  {[type]} userId [description]
   */
  editUserConfig(userId){
    this.props.addUser()
    console.log(this.props.userInfo)
    if (this.props.userInfo[userId * 1]){
      this.setState({
        userToEdit : {
          [userId * 1] : this.props.userInfo[userId * 1]
        }
      })
    }
  }

  /**
   * [addNewUser description]
   */
  addNewUser(){
    this.setState({
      btnList       : '',
      btnActionList : {}
    })
    this.props.addUser()
  }

  /**
   * [handleButtonClick description]
   * @param  {[type]} event [description]
   */
  handleButtonClick(event){
    var btnId = event.currentTarget.id

    console.log(event.currentTarget.id)
    this.setState({
      btnList : btnId
    })
  }

  /**
   * [handleActionClick description]
   * @param  {[type]} event [description]
   */
  handleActionClick(event){
    var actionId = event.currentTarget.id,
      temp = this.state.btnActionList

    temp[this.state.btnList] = actionId
    console.log(event.currentTarget.id)
    this.setState({
      btnActionList : temp
    })
    console.log(this.state.btnActionList)
  }

  /**
   * [updateUser description]
   * @param  {[type]} userId [description]
   */
  updateUser(userId){
    let storeUserId = this.state.userId
    const userIdToUpdate = userId || storeUserId

    if (Object.keys(this.state.btnActionList).length >= 4){
      this.props.usersInfo(userIdToUpdate, this.state.btnActionList)
      this.setState({
        userId     : ++storeUserId,
        userToEdit : {}
      })
    } else {
      alert('Please select all 4 button action combos')
    }
  }

  /**
   * React Lifecycle Method: Renders the data
   *
   * @return {DOM} Main container DOM.
   */
  render() {
    const { props } = this
    const { isUpdating, userInfo } = props

    return (
      (Object.keys(userInfo).length <= 0 || isUpdating) ?
        <ConfigScreen
          handleButtonClick={this.handleButtonClick}
          handleActionClick={this.handleActionClick}
          updateUser={this.updateUser}
          userToEdit={this.state.userToEdit}
        />
        : <div>
          <UsersScreen usersData={userInfo} addUser={this.addNewUser} editUserConfig={this.editUserConfig} />
        </div>
    )
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
function mapStateToProps({ users }) {
  const { isUpdating, error, userInfo } = users

  return {
    userInfo,
    isUpdating,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
