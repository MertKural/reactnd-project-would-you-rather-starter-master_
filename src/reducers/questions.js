import { GET_QUESTIONS } from "../actions/questions";
import { ANSWER_QUESTION } from "../actions/questions";
import { ADD_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type){
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.question_id]: {
                    ...state[action.question_id],
                    [action.answer]: {
                        ...state[action.question_id][action.answer],
                        votes: state[action.question_id][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        default:
            return state
    }
}