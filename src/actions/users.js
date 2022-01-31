export const GET_USERS = "GET_USERS"
export const ADD_ANSWER = "ADD_ANSWER"
export const ADD_USER_QUESTION="ADD_USER_QUESTION"

export function getUsers(users){
    return{
        type: GET_USERS,
        users
    }
}

export function addAnswer(authedUser, question_id, answer){
    return {
        type:ADD_ANSWER,
        authedUser,
        question_id,
        answer
    }
}

export function addUserQuestion(authedUser, question_id){
    return{
        type: ADD_USER_QUESTION,
        authedUser,
        question_id
    }
}