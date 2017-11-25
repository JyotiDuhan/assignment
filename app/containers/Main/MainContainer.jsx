import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActionCreators from '$REDUX/modules/user'
import { Loading, HomeComponent } from '$COMPONENTS'

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
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.state = {
      finalPage : false
    }
  }

  /**
   * [handleOptionClick description]
   * @param  {[type]} event [description]
   */
  handleOptionClick(event){
    console.log(event)
    const currentQuestion = this.props.questionsList[this.props.currentQuestionNo]
    const isCorrect = currentQuestion.answer === (event.currentTarget.id * 1)

    if (isCorrect) {
      let value = this.props.correctAnswers

      this.props.updateCorrectAnswers(++value)
    } else {
      let value = this.props.wrongAnswers

      this.props.updateWrongAnswers(++value)
    }

    if ((this.props.currentQuestionNo + 1) === this.props.totalQuestions) {
      this.setState({
        finalPage : true
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
    const { isFetching, questionsList, currentQuestionNo } = props
    const currentQuestion = questionsList && questionsList[currentQuestionNo]

    return (
      isFetching || !questionsList
        ? <Loading pageName={'Home Page'} />
        :
        <HomeComponent
          currentQuestion={currentQuestion}
          currentQuestionNo={currentQuestionNo}
          handleOptionClick={this.handleOptionClick}
          isFinalPage={this.state.finalPage}
          correctAnswers={this.props.correctAnswers}
          wrongAnswers={this.props.wrongAnswers}
        />
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
  const { isFetching, error, questionsList, currentQuestionNo, wrongAnswers, correctAnswers, totalQuestions } = user

  return {
    questionsList,
    currentQuestionNo,
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    isFetching,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
