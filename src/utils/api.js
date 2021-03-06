import { _getQuestions } from "./_DATA";
import { _getUsers } from "./_DATA";
import { _saveQuestion } from "./_DATA";
import { _saveQuestionAnswer } from "./_DATA";

export function getInitialData(){
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) =>({
            users,
            questions
        })
    )
}

export function getQuestions (info) {
    return _getQuestions(info)
  }
  
  export function saveQuestion (info) {
    return _saveQuestion(info)
  }

  export function saveQuestionAnswer (info) {
    return _saveQuestionAnswer(info)
  }

  export function getUsers (info) {
    return _getUsers(info)
  }