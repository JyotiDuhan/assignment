import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActionCreators from '$REDUX/modules/users'
import { ConfigScreen, UsersScreen } from '$COMPONENTS'

const colors = ['red', 'green', 'yellow', 'orange']

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
      userId          : 1,
      btnList         : '',
      userToEdit      : {},
      isInProcess     : true,
      isButtonMapped  : true,
      selectedBtns    : {},
      colorPattern    : colors.map((elem) => elem),
      btnActionList   : {},
      showSubmitError : false,
      canSelectAction : false,
    }
  }

  /**
   * [editUserConfig description]
   * @param  {[type]} userId [description]
   */
  editUserConfig(userId){
    this.props.addUser()

    if (this.props.userInfo[userId * 1]){
      this.setState({
        userToEdit : {
          [userId * 1] : this.props.userInfo[userId * 1]
        },
        colorPattern   : colors.map((elem) => elem)
      })
    }
  }

  /**
   * [addNewUser description]
   */
  addNewUser(){
    this.setState({
      btnList       : '',
      btnActionList : {},
      colorPattern  : colors.map((elem) => elem)
    })
    this.props.addUser()
  }

  /**
   * [handleButtonClick description]
   * @param  {[type]} event [description]
   */
  handleButtonClick(event) {
    if (this.state.isButtonMapped) {
      const btnId = event.currentTarget.id
      const selectedBtnIds = this.state.selectedBtns

      selectedBtnIds[btnId] = this.state.colorPattern.pop()

      this.setState({
        btnList         : btnId,
        selectedBtns    : selectedBtnIds,
        isButtonMapped  : false,
        canSelectAction : true
      })
    }
  }

  /**
   * [handleActionClick description]
   * @param  {[type]} event [description]
   */
  handleActionClick(event){
    if (this.state.canSelectAction) {
      const actionId = event.currentTarget.id
      const temp = this.state.btnActionList
      const selectedActions = {}


      temp[this.state.btnList] = actionId

      Object.keys(temp).map((elem) => {
        if (this.state.selectedBtns.hasOwnProperty(elem)) {
          selectedActions[temp[elem]] = this.state.selectedBtns[elem]
        }

        return selectedActions
      })

      this.setState({
        btnActionList   : temp,
        isButtonMapped  : true,
        canSelectAction : false,
        selectedActions
      })
    }

    if (Object.keys(this.state.btnActionList).length >= 4) {
      this.setState({
        isInProcess     : false,
        showSubmitError : false,
      })
    }
  }

  /**
   * [updateUser description]
   * @param  {[type]} userId [description]
   */
  updateUser(userId){
    if (!this.state.isInProcess) {
      let storeUserId = this.state.userId
      const userIdToUpdate = userId || storeUserId

      if (Object.keys(this.state.btnActionList).length >= 4){
        this.props.usersInfo(userIdToUpdate, this.state.btnActionList)
        this.setState({
          userId          : ++storeUserId,
          userToEdit      : {},
          selectedActions : {},
          selectedBtns    : {}
        })
      }
    } else {
      this.setState({
        showSubmitError : true
      })
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
          selectedBtns={this.state.selectedBtns}
          selectedActions={this.state.selectedActions}
          showSubmitError={this.state.showSubmitError}
        />
        : <div>
          <UsersScreen
            usersData={userInfo}
            addUser={this.addNewUser}
            editUserConfig={this.editUserConfig}
          />
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
    error,
    userInfo,
    isUpdating
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
