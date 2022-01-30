import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitData } from '../actions/shared'
import Heading from './Heading';
import NavigationBar from './NavigationBar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitData())
  }

  render() {
    return (
      <>
        {this.props.authedUser !== null(
          <div>
            <Heading />
            <NavigationBar />
          </div>
        )}
      </>
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
