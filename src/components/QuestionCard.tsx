import React from 'react';
import { ButtonWrapper, QCWrapper } from './QuestionCard.styles'
import { QCProps } from '../myTypes'


const QuestionCard: React.FC<QCProps> = ({
  counter,
  gameOver,
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions
}) => {

  return (
    <QCWrapper>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />

      { !gameOver && <div>00:{counter}</div> }

      <div>
        {answers.map(answer => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} ></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </QCWrapper>
  )
}

export default QuestionCard