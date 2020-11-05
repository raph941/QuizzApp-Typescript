import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard'
import { fetchQuizQuestions } from './API'
import { Difficulty, QuestionState } from './myTypes'
import { GlobalStyle, Wrapper } from './App.styles'
import { AnswerObject } from './myTypes'


const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [counter, setCounter] = useState(30);
  const TOTAL_QUESTIONS = 10

  const startTrivia = async () => {
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setLoading(true);
    setGameOver(false);
    setQuestions(newQuestions)
    setUserAnswers([]);
    setScore(0)
    setNumber(0)
    setLoading(false)
    setCounter(29)
  }

  let timer: any
  useEffect(() => {
    if (counter > 0 && !gameOver) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    else {
      nextQuestion()
      setCounter(30)
    }
  }, [counter]);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement> ) => {
    if (!gameOver) {
      // User answers
      const answer = e.currentTarget.value;
      // check answer against the correcct value
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // save in the array of user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const updateNoAnswer = () => {
    if (!gameOver) {
      // save in the array of user answers
      const answerObject = {
        question: questions[number].question,
        answer: '',
        correct: false,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // move to the next question if not on the last question
    const nextQuestion = number + 1;
    nextQuestion === TOTAL_QUESTIONS ? setGameOver(true) : setNumber(nextQuestion)
    clearTimeout(timer) //cleard the already started timer, so we dont have multiple timers
    setCounter(30)
  }


  return (
    <>
      < GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia} >
            Start Quiz
          </button>
        ) : null}

        {!gameOver && <p className="score"> Score: {score}</p>}
        {loading && <p>Loading Questions ...</p>}
        
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1} //added 1 since array starts counting at 0
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            gameOver={gameOver}
            counter={counter}
          />
        )}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? 
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
          : null
        }
      </Wrapper>
    </>
  );
}

export default App;
