import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Fragment } from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitData } from '../actions/shared'
import LeaderBoard from './LeaderBoard';
import NavigationBar from './NavigationBar';
import { LoadingBar } from 'react-redux-loading-bar';
import {BrowserRouser as Router, Route} from 'react-router-dom'
import {QuestionList} from './QuestionList'
import {Questions} from './Questions'
import {AddQuestion} from './AddQuestion'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  render() {
    return (
      <div>
       öert
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  if (users && authedUser) {
    const unanswered_question_ids = [];
    const answered_question_ids = Object.keys(users[authedUser].answers)
    const questions_ids = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
    questions_ids.map(
      id => answered_question_ids.includes(id) === false && unanswered_question_ids.push(id)
    )
    answered_question_ids.sort((a, b) => questions[b] - questions[a])
    return {
      authedUser,
      answered_question_ids,
      unanswered_question_ids
    }
  }
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
