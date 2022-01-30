import { getQuestions } from "./questions";
import { getUsers } from "./users";
import { getInitialData } from "../utils/api";

export function handleInitData(){
    return dispatch => {
        return getInitialData().then(({users, questions})=>{
            dispatch(getUsers(users))
            dispatch(getQuestions(questions))
        })
    }
}