import { ADD_QUESTION } from "../actions/questions"
import { ADD_ANSWER } from "../actions/users"
import { ADD_USER_QUESTION } from "../actions/users"
import { GET_USERS } from "../actions/users"

export default function users(state = {}, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_USER_QUESTION:
            return{
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.question_id])
                }
            }
        default:
            return state
    }
}