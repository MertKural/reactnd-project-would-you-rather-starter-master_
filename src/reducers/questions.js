import { GET_QUESTIONS } from "../actions/questions";
import { RETURN_ANSWER } from "../actions/questions";
import { RETURN_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type){
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case RETURN_ANSWER:
            return {
                ...state,
                [action.question_id]: {
                    ...state[action.question_id],
                    [action.answer]: {
                        ...state[action.question_id][action.answer],
                        votes: state[action.question_id][action.answer].votes.concat([
                            action.authedUser
                        ])
                    }
                }
            }
        case RETURN_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default:
            state
    }
}