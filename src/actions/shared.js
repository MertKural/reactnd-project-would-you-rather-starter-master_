import { getQuestions } from "./questions";
import { getUsers } from "./users";
import { getInitialData } from "../utils/api";
import { showLoading } from "react-redux-loading-bar";
import { hideLoading } from "react-redux-loading-bar";
import { setAuthedUser } from "./authedUsers";

const authentication_id = null 

export function handleInitData(){
    return dispatch => {
        dispatch(showLoading())
        return getInitialData().then(({users, questions})=>{
            dispatch(getUsers(users))
            dispatch(getQuestions(questions))
            dispatch(setAuthedUser(authentication_id))
            dispatch(hideLoading)
        })
    }
}