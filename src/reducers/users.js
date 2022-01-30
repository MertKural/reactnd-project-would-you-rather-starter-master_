import { RETURN_ANSWER } from "../actions/questions";
import { RETURN_QUESTION } from "../actions/questions";
import { GET_USERS } from "../actions/users";

export default function users(state = {}, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case RETURN_ANSWER:
            return {
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.question_id]: action.answers
                    }
                }
            }
        case RETURN_QUESTION:
            return{
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([
                        action.question.id
                    ])
                }
            }
        default:
            return state
    }
}