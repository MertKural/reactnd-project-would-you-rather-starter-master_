import { saveQuestion } from "../utils/api";
import { saveQuestionAnswer } from "../utils/api";
import { showLoading } from "react-redux-loading-bar";
import { hideLoading } from "react-redux-loading-bar";
import { addAnswer } from "./users";
import { addUserQuestion } from "./users";

export const GET_QUESTIONS = "GET_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const ANSWER_QUESTION = "ANSWER_QUESTION"

export function getQuestions(questions) {
    return {
        type:GET_QUESTIONS,
        questions
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestion(authedUser, question_id, answer) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        question_id,
        answer
    }
}

export function handleQuestionAnswer(question_id, answer){
    return(dispatch, getState) => {
        const {authedUser} = getState()

        dispatch(showLoading())

        return saveQuestionAnswer({
            authedUser,
            question_id,
            answer
        }).then(() => dispatch(answerQuestion(authedUser, question_id, answer)))
        .then(() => dispatch(addAnswer(authedUser, question_id, answer )))
        .then(() =>dispatch(hideLoading()))

    }
}

export function handleQuestionAdd(textOne, textTwo){
    return (dispatch, getState) => {
        const {authedUser} = getState()
        const author = authedUser
        dispatch(showLoading())

        return saveQuestion({
            textOne,
            textTwo,
            author
        }).then(function (question){
            dispatch(addQuestion(question))
            dispatch(addUserQuestion(authedUser,question.id))

        }).then(() => dispatch(hideLoading()))

    }
}