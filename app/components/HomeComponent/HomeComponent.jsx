import React from 'react'

/**
 * Shared Component: Shows Loading Text.
 * @param   {Object}  options.pageName  Optional Param, pass the page name.
 *
 * @returns {DOM}                       DOM of loading content.
 */
export default function HomeComponent({ currentQuestion, currentQuestionNo, handleOptionClick, isFinalPage, correctAnswers, wrongAnswers }) {
  return (
    isFinalPage ?
      <div>
        <p>{`Correct Answers : ${correctAnswers}`}</p>
        <p>{`Wrong Answers : ${wrongAnswers}`}</p>
      </div>
      :
      <div>
        <h1>{'Questions List'}</h1>
        <h2>{`Que no. : ${currentQuestionNo + 1}`}</h2>
        <div>
          <p>{currentQuestion.text}</p>
          {currentQuestion.options.map((key, value) => (
            <p key={key} id={value} onClick={handleOptionClick}>{key}</p>
          ))}
        </div>
      </div>
  )
}
