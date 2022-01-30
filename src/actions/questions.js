import { saveQuestion } from "../utils/api";
import { saveQuestionAnswer } from "../utils/api";

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const RETURN_ANSWER = 'RETURN_ANSWER'
export const RETURN_QUESTION = 'RETURN_QUESTION'

export function getQuestions(questions) {
    return{
        type: GET_QUESTIONS,
        questions
    }
}

function returnAnswer(authedUserId, question_id, answer) {
    return {
        type: RETURN_ANSWER,
        authedUserId,
        question_id,
        answer
    }
}

function returnQuestion(question){
    return{
        type: RETURN_QUESTION,
        question
    }
}

export function handleReturnedAnswer(question_id, answer){
    return (dispatch, getState) => {
        const {authedUser} = getState();
        dispatch(returnAnswer(authedUser,question_id,answer))
        return saveQuestionAnswer({
            authedUser,
            question_id,
            answer
        })
    }
}

export function handleReturnedQuestion(textOne, textTwo) {
    return (dispatch, getState) => {
        const {authedUser} = getState();
        return saveQuestion({
            textOne,
            textTwo,
            author: authedUser
        }).then(question => dispatch(returnQuestion(question)))
    }
}