import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { setAuthedUser } from './authedUsers'

const AUTHED_ID = null


export function handleInitData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({ users, questions }) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}