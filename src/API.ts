import { shuffleArray } from './utils'
import { Question, Difficulty } from './myTypes'


export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  let endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`
  let response = await fetch(endpoint)
  let data = await response.json()
  return data.results.map((question: Question) => (
    {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers, question.correct_answer
      ])
    }
  ))
}